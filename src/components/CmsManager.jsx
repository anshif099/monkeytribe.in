import React, { useState, useEffect, useRef } from 'react';
import './CmsManager.css';
import defaultCmsData from '../cms-data.json';

// Utility helper to get unique CSS selector for elements
function getUniqueSelector(element) {
  if (!(element instanceof Element)) return null;
  const path = [];
  let current = element;
  
  while (current && current.nodeType === Node.ELEMENT_NODE) {
    let selector = current.nodeName.toLowerCase();
    
    if (current.id) {
      selector += '#' + current.id;
      path.unshift(selector);
      break;
    } else {
      let sib = current;
      let nth = 1;
      while (sib = sib.previousElementSibling) {
        if (sib.nodeName.toLowerCase() === current.nodeName.toLowerCase()) {
          nth++;
        }
      }
      if (nth > 1) {
        selector += `:nth-of-type(${nth})`;
      }
    }
    
    path.unshift(selector);
    current = current.parentNode;
    
    // Stop traversing if we hit body or html
    if (current && (current.tagName === 'BODY' || current.tagName === 'HTML')) {
      break;
    }
  }
  return path.join(' > ');
}

function CmsManager({ currentPage, onNavigate }) {
  // Authentication & CMS states
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('mt_cms_logged_in') === 'true';
  });
  const [isAdminPath, setIsAdminPath] = useState(() => {
    return window.location.pathname === '/admin';
  });
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [editMode, setEditMode] = useState(false);
  const [cmsData, setCmsData] = useState(() => {
    const localData = localStorage.getItem('mt_cms_data');
    if (localData) {
      try {
        return JSON.parse(localData);
      } catch (e) {
        return defaultCmsData || {};
      }
    }
    return defaultCmsData || {};
  });
  
  // Selection and editor states
  const [hoveredElement, setHoveredElement] = useState(null);
  const [hoverRect, setHoverRect] = useState(null);
  const [hoverTag, setHoverTag] = useState('');
  
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedRect, setSelectedRect] = useState(null);
  const [selectedSelector, setSelectedSelector] = useState('');
  
  // Dragging & Direct Editing states
  const [isDragging, setIsDragging] = useState(false);
  const [isTextEditing, setIsTextEditing] = useState(false);
  const [floatingMenuPos, setFloatingMenuPos] = useState(null);
  const [propColor, setPropColor] = useState('#ffffff');
  const [propBgColor, setPropBgColor] = useState('transparent');
  const [propSrc, setPropSrc] = useState('');
  
  // UI states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Refs for Mutation Observer & dragging
  const observerRef = useRef(null);
  const isObservingRef = useRef(true);
  const activeHoverElementRef = useRef(null);
  const dragStartRef = useRef({ startX: 0, startY: 0, left: 0, top: 0, element: null, selector: '', hasMoved: false });
  const fileInputRef = useRef(null);

  // 1. ADMIN PATHWAY LISTENER
  useEffect(() => {
    const checkPath = () => {
      const isCurrentlyAdmin = window.location.pathname === '/admin';
      setIsAdminPath(isCurrentlyAdmin);
    };
    
    // Check path changes
    window.addEventListener('popstate', checkPath);
    // Listen to custom navigate events if any
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(this, args);
      checkPath();
    };
    
    return () => {
      window.removeEventListener('popstate', checkPath);
      window.history.pushState = originalPushState;
    };
  }, []);

  // Sync state to body classes for page layout padding adjustments
  useEffect(() => {
    if (isLoggedIn && (isAdminPath || editMode)) {
      document.body.classList.add('mt-cms-admin-active');
    } else {
      document.body.classList.remove('mt-cms-admin-active');
    }
    
    if (editMode) {
      document.body.classList.add('mt-cms-edit-active');
    } else {
      document.body.classList.remove('mt-cms-edit-active');
    }
    
    if (isDragging) {
      document.body.classList.add('mt-cms-dragging');
    } else {
      document.body.classList.remove('mt-cms-dragging');
    }
    
    if (isTextEditing) {
      document.body.classList.add('mt-cms-text-editing');
    } else {
      document.body.classList.remove('mt-cms-text-editing');
    }
    
    return () => {
      document.body.classList.remove('mt-cms-admin-active');
      document.body.classList.remove('mt-cms-edit-active');
      document.body.classList.remove('mt-cms-dragging');
      document.body.classList.remove('mt-cms-text-editing');
    };
  }, [isLoggedIn, isAdminPath, editMode, isDragging, isTextEditing]);

  // Floating menu position coordinator
  useEffect(() => {
    if (!selectedElement) {
      setFloatingMenuPos(null);
      return;
    }
    const updatePosition = () => {
      if (!selectedElement) return;
      const rect = selectedElement.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      // Position floating menu 45px above the element. If not enough space, place it 10px below
      let top = rect.top + scrollY - 50;
      if (top < scrollY + 10) {
        top = rect.bottom + scrollY + 10;
      }
      
      setFloatingMenuPos({
        top: top,
        left: Math.max(10, rect.left + scrollX + (rect.width / 2) - 110)
      });
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [selectedElement, cmsData]);

  // 2. DOM OVERLAY / APPLICATOR MUTATION OBSERVER
  const applyCmsDataToDom = (dataToApply) => {
    if (!dataToApply || isTextEditing) return;
    
    // Temporarily pause observer to prevent infinite loops
    isObservingRef.current = false;
    if (observerRef.current) observerRef.current.disconnect();
    
    Object.keys(dataToApply).forEach(pageRoute => {
      const pageData = dataToApply[pageRoute] || {};
      Object.keys(pageData).forEach(selector => {
        const overrides = pageData[selector];
        if (!overrides) return;
        
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            // Apply text edits
            if (overrides.text !== undefined && overrides.text !== null) {
              if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.value !== overrides.text) {
                  element.value = overrides.text;
                }
              } else if (element.tagName === 'IMG') {
                // If user selected img and tried to edit text somehow
              } else if (element.children.length === 0) {
                if (element.innerText !== overrides.text) {
                  element.innerText = overrides.text;
                }
              }
            }
            
            // Apply image src edits
            if (overrides.src && element.tagName === 'IMG') {
              if (element.src !== overrides.src) {
                element.src = overrides.src;
              }
            }
            
            // Apply inline style edits
            if (overrides.styles) {
              Object.keys(overrides.styles).forEach(styleKey => {
                if (element.style[styleKey] !== overrides.styles[styleKey]) {
                  element.style[styleKey] = overrides.styles[styleKey];
                }
              });
            }
            
            // Apply custom CSS string
            if (overrides.customCss) {
              const rules = overrides.customCss.split(';');
              rules.forEach(rule => {
                const parts = rule.split(':');
                if (parts.length === 2) {
                  const name = parts[0].trim();
                  const value = parts[1].trim();
                  if (name && value) {
                    element.style.setProperty(name, value);
                  }
                }
              });
            }
          });
        } catch (e) {
          // Ignore querySelector exceptions for dynamic or custom selectors
        }
      });
    });
    
    // Resume MutationObserver
    isObservingRef.current = true;
    if (observerRef.current) {
      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  };

  // Setup MutationObserver on document load / change of cmsData or text-edit state
  useEffect(() => {
    // High-performance bypass: avoid running MutationObserver on load for standard public visitors
    const hasLocalEdits = localStorage.getItem('mt_cms_data') !== null;
    if (!isLoggedIn && !isAdminPath && !hasLocalEdits) return;

    applyCmsDataToDom(cmsData);
    
    observerRef.current = new MutationObserver(() => {
      if (isObservingRef.current && !isTextEditing) {
        applyCmsDataToDom(cmsData);
      }
    });
    
    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [cmsData, isTextEditing, isLoggedIn, isAdminPath]);

  // Re-apply styles on page/currentRoute change to avoid loading delays
  useEffect(() => {
    // High-performance bypass: avoid running layout computations on route changes for standard public visitors
    const hasLocalEdits = localStorage.getItem('mt_cms_data') !== null;
    if (!isLoggedIn && !isAdminPath && !hasLocalEdits) return;

    const timer = setTimeout(() => {
      applyCmsDataToDom(cmsData);
    }, 150);
    return () => clearTimeout(timer);
  }, [currentPage, isLoggedIn, isAdminPath]);

  // 3. HANDLERS FOR ELEMENT SELECTOR, DRAGGING AND IN-PLACE TEXT EDITING
  useEffect(() => {
    if (!editMode) {
      setHoveredElement(null);
      setHoverRect(null);
      return;
    }

    const parsePx = (val) => {
      if (!val) return 0;
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    };

    const handleMouseMove = (e) => {
      // 1. Handle element dragging positioning
      if (dragStartRef.current.element) {
        const dragInfo = dragStartRef.current;
        const dx = e.clientX - dragInfo.startX;
        const dy = e.clientY - dragInfo.startY;

        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          dragInfo.hasMoved = true;
          setIsDragging(true);

          const el = dragInfo.element;
          const computed = window.getComputedStyle(el);
          if (computed.position === 'static') {
            el.style.position = 'relative';
          }
          
          el.style.left = (dragInfo.left + dx) + 'px';
          el.style.top = (dragInfo.top + dy) + 'px';

          // Update selection border coordinate relative to moving element
          const rect = el.getBoundingClientRect();
          setSelectedRect({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height
          });
        }
        return;
      }

      // 2. Otherwise run normal element hover highlighting
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (!target) return;
      
      // Ignore CMS elements
      if (target.closest('.mt-cms')) {
        setHoveredElement(null);
        setHoverRect(null);
        activeHoverElementRef.current = null;
        return;
      }
      
      if (target === activeHoverElementRef.current) return;
      activeHoverElementRef.current = target;
      
      const rect = target.getBoundingClientRect();
      setHoveredElement(target);
      setHoverTag(target.tagName.toLowerCase());
      setHoverRect({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
      });
    };

    const handleScroll = () => {
      if (activeHoverElementRef.current && !dragStartRef.current.element) {
        const rect = activeHoverElementRef.current.getBoundingClientRect();
        setHoverRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
      }
      if (selectedElement) {
        const rect = selectedElement.getBoundingClientRect();
        setSelectedRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
      }
    };

    const handleMouseDown = (e) => {
      if (e.button !== 0) return; // Left click only
      
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (!target || target.closest('.mt-cms') || isTextEditing || target.closest('[contenteditable="true"]')) return;

      const selector = getUniqueSelector(target);

      dragStartRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        left: parsePx(target.style.left),
        top: parsePx(target.style.top),
        element: target,
        selector: selector,
        hasMoved: false
      };

      // Only prevent default on non-text elements (like buttons or images) to allow natural browser text caret focus!
      const isLeafText = target.children.length === 0 && target.tagName !== 'IMG';
      if (!isLeafText) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleMouseUp = (e) => {
      const dragInfo = dragStartRef.current;
      if (!dragInfo.element) return;

      // Let standard editing caret clicks and selections bypass interception
      if (isTextEditing || dragInfo.element.contentEditable === 'true' || dragInfo.element.closest('[contenteditable="true"]')) {
        dragStartRef.current = { startX: 0, startY: 0, left: 0, top: 0, element: null, selector: '', hasMoved: false };
        setIsDragging(false);
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const el = dragInfo.element;
      const selector = dragInfo.selector;

      if (dragInfo.hasMoved) {
        // DRAG FINISHED: Save positioning styles to cmsData
        const currentRoute = currentPage || 'home';
        const updatedCmsData = { ...cmsData };
        if (!updatedCmsData[currentRoute]) {
          updatedCmsData[currentRoute] = {};
        }
        if (!updatedCmsData[currentRoute][selector]) {
          updatedCmsData[currentRoute][selector] = { styles: {} };
        }
        
        const elConfig = updatedCmsData[currentRoute][selector];
        if (!elConfig.styles) elConfig.styles = {};
        
        elConfig.styles.position = el.style.position;
        elConfig.styles.left = el.style.left;
        elConfig.styles.top = el.style.top;

        setCmsData(updatedCmsData);
        setHasUnsavedChanges(true);
        triggerToast('Element repositioned!');
      } else {
        // A PURE CLICK: Select element and trigger in-place text editing / floating tooltip
        setSelectedElement(el);
        setSelectedSelector(selector);
        
        const rect = el.getBoundingClientRect();
        setSelectedRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });

        // Pre-populate swatches and inputs
        const computed = window.getComputedStyle(el);
        setPropColor(rgb2hex(computed.color));
        setPropBgColor(computed.backgroundColor === 'rgba(0, 0, 0, 0)' ? 'transparent' : rgb2hex(computed.backgroundColor));
        setPropSrc(el.src || '');

        // IN-PLACE EDITING TRIGGER (if leaf text element)
        if (el.children.length === 0 && el.tagName !== 'IMG') {
          setIsTextEditing(true);
          el.contentEditable = 'true';
          el.focus();
          
          // Save handler on focus lost
          const saveTextOnBlur = () => {
            el.contentEditable = 'false';
            setIsTextEditing(false);
            
            const currentRoute = currentPage || 'home';
            const textValue = el.innerText;
            
            const updated = { ...cmsData };
            if (!updated[currentRoute]) updated[currentRoute] = {};
            if (!updated[currentRoute][selector]) updated[currentRoute][selector] = {};
            
            updated[currentRoute][selector].text = textValue;
            setCmsData(updated);
            setHasUnsavedChanges(true);
            
            el.removeEventListener('blur', saveTextOnBlur);
            el.removeEventListener('keydown', handleKeyDown);
          };

          const handleKeyDown = (keyEvent) => {
            if (keyEvent.key === 'Escape') {
              el.blur();
            }
          };

          el.addEventListener('blur', saveTextOnBlur);
          el.addEventListener('keydown', handleKeyDown);
        }
      }

      // Reset dragging tracking
      dragStartRef.current = { startX: 0, startY: 0, left: 0, top: 0, element: null, selector: '', hasMoved: false };
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleMouseDown, true);
    window.addEventListener('mouseup', handleMouseUp, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown, true);
      window.removeEventListener('mouseup', handleMouseUp, true);
    };
  }, [editMode, selectedElement, cmsData, currentPage, isTextEditing]);

  // Utility to convert rgb color to Hexadecimal format
  const rgb2hex = (rgb) => {
    if (!rgb || rgb === 'transparent') return '#ffffff';
    if (rgb.startsWith('#')) return rgb;
    const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    if (!match) return '#ffffff';
    const r = parseInt(match[1], 10).toString(16).padStart(2, '0');
    const g = parseInt(match[2], 10).toString(16).padStart(2, '0');
    const b = parseInt(match[3], 10).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  };

  // 4. APPLY PROPERTY CHANGES INSTANTLY TO DOM AND CACHE THEM
  const updateElementProperty = (key, value, styleKey = null) => {
    if (!selectedElement || !selectedSelector) return;
    
    // 1. Instantly update live element in DOM
    if (styleKey) {
      selectedElement.style[styleKey] = value;
    } else if (key === 'text') {
      if (selectedElement.children.length === 0) {
        selectedElement.innerText = value;
      }
    } else if (key === 'src') {
      selectedElement.src = value;
    } else if (key === 'customCss') {
      selectedElement.style.cssText = value;
    }
    
    // Update local React state to keep inputs synced
    if (key === 'text') setPropText(value);
    if (key === 'src') setPropSrc(value);
    if (styleKey === 'color') setPropColor(value);
    if (styleKey === 'backgroundColor') setPropBgColor(value);
    if (styleKey === 'fontSize') setPropFontSize(value);
    if (styleKey === 'fontWeight') setPropFontWeight(value);
    if (styleKey === 'textAlign') setPropTextAlign(value);
    if (styleKey === 'padding') {
      setPropPadding(value);
      selectedElement.style.padding = `${value}px`;
    }
    if (styleKey === 'margin') {
      setPropMargin(value);
      selectedElement.style.margin = `${value}px`;
    }
    if (styleKey === 'borderRadius') {
      setPropBorderRadius(value);
      selectedElement.style.borderRadius = `${value}px`;
    }
    if (key === 'customCss') setPropCustomCss(value);
    
    // 2. Prepare structural overrides tree
    const currentRoute = currentPage || 'home';
    const updatedCmsData = { ...cmsData };
    if (!updatedCmsData[currentRoute]) {
      updatedCmsData[currentRoute] = {};
    }
    if (!updatedCmsData[currentRoute][selectedSelector]) {
      updatedCmsData[currentRoute][selectedSelector] = { styles: {} };
    }
    
    const elementConfig = updatedCmsData[currentRoute][selectedSelector];
    
    if (key === 'text') {
      elementConfig.text = value;
    } else if (key === 'src') {
      elementConfig.src = value;
    } else if (key === 'customCss') {
      elementConfig.customCss = value;
    } else if (styleKey) {
      if (!elementConfig.styles) elementConfig.styles = {};
      if (styleKey === 'padding' || styleKey === 'margin' || styleKey === 'borderRadius') {
        elementConfig.styles[styleKey] = `${value}px`;
      } else if (styleKey === 'fontSize') {
        elementConfig.styles[styleKey] = `${value}px`;
      } else {
        elementConfig.styles[styleKey] = value;
      }
    }
    
    setCmsData(updatedCmsData);
    setHasUnsavedChanges(true);
    
    // Refresh selection borders in case spacing altered elements size
    setTimeout(() => {
      if (selectedElement) {
        const rect = selectedElement.getBoundingClientRect();
        setSelectedRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
      }
    }, 50);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (uploadEvent) => {
      const base64String = uploadEvent.target.result;

      // Try uploading to local development API
      try {
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            base64: base64String
          })
        });

        const data = await response.json();
        if (data.success && data.url) {
          // Set the image src to the clean public URL returned by server
          updateElementProperty('src', data.url);
          triggerToast('Image uploaded successfully!');
        } else {
          // Fallback if server returned error
          updateElementProperty('src', base64String);
          triggerToast('Embedded image file directly (Base64).');
        }
      } catch (err) {
        // Fallback if server API is unavailable (production/no dev server)
        updateElementProperty('src', base64String);
        triggerToast('Embedded image file directly (Base64).');
      }
    };
    reader.readAsDataURL(file);
  };

  // 5. FILE WRITER & PUBLISHING LOGIC
  const handlePublish = async () => {
    // Save to localStorage immediately
    localStorage.setItem('mt_cms_data', JSON.stringify(cmsData));
    
    try {
      // Post to local Vite backend handler
      const response = await fetch('/api/save-cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cmsData)
      });
      
      const resData = await response.json();
      if (resData.success) {
        triggerToast('Website published successfully!');
        setHasUnsavedChanges(false);
      } else {
        triggerToast('Saved to browser. Dev server write failed.');
      }
    } catch (e) {
      // Fallback if production (no DevServer api)
      triggerToast('Published successfully to browser storage!');
      setHasUnsavedChanges(false);
    }
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard all unsaved edits on this page?')) {
      localStorage.removeItem('mt_cms_data');
      setCmsData(defaultCmsData || {});
      setHasUnsavedChanges(false);
      setSelectedElement(null);
      setSelectedRect(null);
      window.location.reload();
    }
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cmsData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'cms-data.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('Configuration JSON downloaded successfully!');
  };

  // 6. LOGIN / AUTH HANDLERS
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'adminlogin') {
      setIsLoggedIn(true);
      sessionStorage.setItem('mt_cms_logged_in', 'true');
      setLoginError('');
      // Redirect from /admin path if they entered directly, or let them stay in admin panel view
      triggerToast('Welcome back, Admin!');
    } else {
      setLoginError('Invalid Administrator Username or Password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEditMode(false);
    sessionStorage.removeItem('mt_cms_logged_in');
    setSelectedElement(null);
    setSelectedRect(null);
    triggerToast('Logged out of Admin CMS panel.');
  };

  // Render Login overlay if on /admin and not logged in
  if (isAdminPath && !isLoggedIn) {
    return (
      <div className="mt-cms mt-cms-login-overlay">
        <div className="mt-cms-login-card">
          <div className="mt-cms-login-logo">
            <h2>Monkey Tribe CMS</h2>
            <p>Administrator Access Portal</p>
          </div>
          <form className="mt-cms-login-form" onSubmit={handleLoginSubmit}>
            <div className="mt-cms-input-group">
              <label htmlFor="mt-username">Username</label>
              <input
                id="mt-username"
                className="mt-cms-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="mt-cms-input-group">
              <label htmlFor="mt-password">Password</label>
              <input
                id="mt-password"
                className="mt-cms-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {loginError && <div className="mt-cms-login-error">{loginError}</div>}
            <button className="mt-cms-login-btn" type="submit">
              Authenticate Portal
            </button>
          </form>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '10px' }}>
            Hardcoded Credentials: <strong>admin</strong> / <strong>adminlogin</strong>
          </div>
        </div>
      </div>
    );
  }

  // Render normal layout overrides or show complete Admin Control Panels
  return (
    <div className="mt-cms">
      {/* 1. FLOATING CONTROL BAR (VISIBLE TO ADMINS) */}
      {isLoggedIn && (
        <div className="mt-cms-topbar">
          <div className="mt-cms-topbar-brand">
            <span className="mt-cms-topbar-title">
              Monkey Tribe CMS <span className="mt-cms-badge">Live Panel</span>
            </span>
          </div>

          <div className="mt-cms-topbar-controls">
            <div className="mt-cms-page-indicator">
              Currently Editing: <strong>{currentPage || 'home'}</strong>
            </div>

            <div className="mt-cms-mode-toggle">
              <button 
                className={`mt-cms-mode-btn ${!editMode ? 'active' : ''}`}
                onClick={() => {
                  setEditMode(false);
                  setSelectedElement(null);
                  setSelectedRect(null);
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Preview Mode
              </button>
              <button 
                className={`mt-cms-mode-btn edit-mode ${editMode ? 'active' : ''}`}
                onClick={() => setEditMode(true)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Edit Mode
              </button>
            </div>
          </div>

          <div className="mt-cms-actions">
            <button 
              className="mt-cms-btn mt-cms-btn-primary" 
              onClick={handlePublish}
              disabled={!hasUnsavedChanges}
            >
              Publish Updates
            </button>
            <button className="mt-cms-btn" onClick={handleExportJson}>
              Export JSON
            </button>
            <button 
              className="mt-cms-btn mt-cms-btn-danger" 
              onClick={handleDiscard}
              disabled={!hasUnsavedChanges}
            >
              Discard Changes
            </button>
            <button className="mt-cms-btn" onClick={handleLogout} style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
              Exit CMS
            </button>
          </div>
        </div>
      )}

      {/* 2. HOVER DETECTOR LAYER (EDIT MODE ACTIVE) */}
      {editMode && hoverRect && !selectedElement && (
        <div 
          className="mt-cms-highlighter"
          style={{
            top: hoverRect.top - 2,
            left: hoverRect.left - 2,
            width: hoverRect.width + 4,
            height: hoverRect.height + 4
          }}
        >
          <span className="mt-cms-highlighter-label">
            {hoverTag} • Click to Edit
          </span>
        </div>
      )}

      {/* 3. SELECTED ELEMENT PULSING BOX */}
      {editMode && selectedRect && (
        <div 
          className="mt-cms-selected-border"
          style={{
            top: selectedRect.top - 2,
            left: selectedRect.left - 2,
            width: selectedRect.width + 4,
            height: selectedRect.height + 4
          }}
        />
      )}

      {/* 4. FLOATING CONTEXT MENU (VISUAL BUILDER TOOLBAR) */}
      {editMode && selectedElement && floatingMenuPos && (
        <div 
          className="mt-cms-floating-menu"
          style={{
            top: floatingMenuPos.top,
            left: floatingMenuPos.left
          }}
        >
          {/* Draggable position indicator */}
          <div className="mt-cms-floating-item mt-cms-drag-indicator">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3" />
              <path d="M2 12h20M12 2v20" />
            </svg>
            <span>Drag to Move</span>
          </div>

          {/* Color Picker Swatches */}
          <div className="mt-cms-floating-item">
            <span className="mt-cms-floating-label" style={{ marginRight: '6px' }}>Text</span>
            <div className="mt-cms-floating-color" style={{ backgroundColor: propColor }} title="Text Color">
              <input 
                type="color" 
                value={propColor}
                onChange={(e) => updateElementProperty(null, e.target.value, 'color')}
              />
            </div>
          </div>

          <div className="mt-cms-floating-item">
            <span className="mt-cms-floating-label" style={{ marginRight: '6px' }}>BG</span>
            <div className="mt-cms-floating-color" style={{ backgroundColor: propBgColor === 'transparent' ? '#ffffff' : propBgColor }} title="Background Color">
              <input 
                type="color" 
                value={propBgColor === 'transparent' ? '#000000' : propBgColor}
                onChange={(e) => updateElementProperty(null, e.target.value, 'backgroundColor')}
              />
            </div>
          </div>

          {/* Hidden Image File Uploader & Trigger */}
          {selectedElement.tagName === 'IMG' && (
            <div className="mt-cms-floating-item">
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageFileUpload} 
                style={{ display: 'none' }} 
              />
              <button 
                className="mt-cms-floating-btn" 
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                title="Upload New Image File"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '16px', height: '16px', color: '#fff' }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </button>
            </div>
          )}

          {/* Reset button */}
          <div className="mt-cms-floating-item">
            <button 
              className="mt-cms-floating-btn"
              onClick={() => {
                if (window.confirm('Reset this element\'s customizations?')) {
                  const currentRoute = currentPage || 'home';
                  const updated = { ...cmsData };
                  if (updated[currentRoute] && updated[currentRoute][selectedSelector]) {
                    delete updated[currentRoute][selectedSelector];
                    setCmsData(updated);
                    setHasUnsavedChanges(true);
                    setSelectedElement(null);
                    setSelectedRect(null);
                    triggerToast('Element reset!');
                    window.location.reload();
                  }
                }
              }}
              title="Reset Element overrides"
              style={{ color: '#ff4d4d', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '16px', height: '16px' }}>
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
              </svg>
            </button>
          </div>

          {/* Close selection */}
          <div className="mt-cms-floating-item">
            <button 
              className="mt-cms-floating-btn"
              onClick={() => {
                setSelectedElement(null);
                setSelectedRect(null);
              }}
              title="Close Panel"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#888' }}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* 5. GLASSMORPHIC SUCCESS TOAST */}
      {showToast && (
        <div className="mt-cms-toast mt-cms-toast-success">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default CmsManager;
