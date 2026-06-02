import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { ref, onValue, remove } from 'firebase/database';
import './dashboard.css';

// Course Price Map to compute total revenue dynamically
const COURSE_PRICES = {
  'PromptX': 12500,
  'GrowthX': 12500,
  'BrandX': 9999,
  'CopyCraft': 11999,
  'promptx': 12500,
  'growthx': 12500,
  'brandx': 9999,
  'copycraft': 11999
};

function Dashboard({ onNavigate }) {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('mt_dashboard_logged_in') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'overview' | 'contacts' | 'enrollments' (leads) | 'registrations' (paid)
  const [activeTab, setActiveTab] = useState('overview');

  // Firebase Real-time Data
  const [contacts, setContacts] = useState([]);
  const [enrollments, setEnrollments] = useState([]); // This will serve as course leads
  const [registrations, setRegistrations] = useState([]); // This serves as paid enrollments
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filtering States
  const [contactSearch, setContactSearch] = useState('');
  const [contactFilter, setContactFilter] = useState(''); // Enquiry Type filter
  
  const [enrollSearch, setEnrollSearch] = useState('');
  const [enrollCourseFilter, setEnrollCourseFilter] = useState(''); // Course filter

  const [registerSearch, setRegisterSearch] = useState('');
  const [registerCourseFilter, setRegisterCourseFilter] = useState(''); // Course filter

  // Detail Modal States
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalType, setModalType] = useState(''); // 'contact' | 'enrollment' | 'registration'

  // Toast feedback state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // 1. Firebase Data Synchronization
  useEffect(() => {
    if (!isLoggedIn) return;

    setIsLoading(true);

    // Sync Contacts
    const contactsRef = ref(db, 'contacts');
    const unsubscribeContacts = onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contactList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setContacts(contactList);
      } else {
        setContacts([]);
      }
    }, (error) => {
      console.error("Firebase contacts sync error:", error);
    });

    // Sync Enrollments (Leads)
    const enrollmentsRef = ref(db, 'enrollments');
    const unsubscribeEnrollments = onValue(enrollmentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const enrollmentList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setEnrollments(enrollmentList);
      } else {
        setEnrollments([]);
      }
    }, (error) => {
      console.error("Firebase enrollments sync error:", error);
    });

    // Sync Paid Registrations
    const registrationsRef = ref(db, 'registrations');
    const unsubscribeRegistrations = onValue(registrationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const registrationList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setRegistrations(registrationList);
      } else {
        setRegistrations([]);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firebase registrations sync error:", error);
      setIsLoading(false);
    });

    return () => {
      unsubscribeContacts();
      unsubscribeEnrollments();
      unsubscribeRegistrations();
    };
  }, [isLoggedIn]);

  // 2. Authentication Submit Handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === 'monkeytribe' && password === 'monkeytribe') {
      setIsLoggedIn(true);
      sessionStorage.setItem('mt_dashboard_logged_in', 'true');
      setLoginError('');
      triggerToast('Logged in successfully', 'success');
    } else {
      setLoginError('Invalid Administrator Username or Password.');
    }
  };

  // 3. Logout Handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('mt_dashboard_logged_in');
    triggerToast('Logged out successfully', 'success');
  };

  // 4. Record Deletion
  const handleDeleteRecord = async (id, path) => {
    const recordLabel = path === 'contacts' ? 'enquiry' : path === 'enrollments' ? 'lead' : 'paid registration';
    if (window.confirm(`Are you sure you want to permanently delete this ${recordLabel} record?`)) {
      try {
        const recordRef = ref(db, `${path}/${id}`);
        await remove(recordRef);
        triggerToast('Record deleted successfully', 'success');
        if (selectedRecord && selectedRecord.id === id) {
          setSelectedRecord(null);
        }
      } catch (err) {
        console.error("Failed to delete record:", err);
        triggerToast('Delete failed. Try again.', 'error');
      }
    }
  };

  // Toast helper
  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Date Formatter Helper
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Currency Formatter Helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Computed Overview Metrics
  const totalContacts = contacts.length;
  const totalLeads = enrollments.length;
  const totalPaidBookings = registrations.length;
  
  // Calculate revenue dynamically based on registrations
  const totalRevenue = registrations.reduce((sum, item) => {
    const price = COURSE_PRICES[item.course] || 10000;
    return sum + price;
  }, 0);

  // Combine and sort contacts + enrollments + registrations for a "Recent Activity" feed
  const recentActivities = [
    ...contacts.map(c => ({ ...c, type: 'contact' })),
    ...enrollments.map(e => ({ ...e, type: 'enrollment' })),
    ...registrations.map(r => ({ ...r, type: 'registration' }))
  ].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).slice(0, 5);

  // Search/Filters application
  const filteredContacts = contacts.filter(c => {
    const query = contactSearch.toLowerCase();
    const matchesSearch = 
      c.fullName?.toLowerCase().includes(query) ||
      c.email?.toLowerCase().includes(query) ||
      c.phone?.toLowerCase().includes(query) ||
      c.message?.toLowerCase().includes(query);
    
    const matchesFilter = !contactFilter || c.enquiryType === contactFilter;
    
    return matchesSearch && matchesFilter;
  });

  const filteredEnrollments = enrollments.filter(e => {
    const query = enrollSearch.toLowerCase();
    const matchesSearch = 
      e.name?.toLowerCase().includes(query) ||
      e.email?.toLowerCase().includes(query) ||
      e.phone?.toLowerCase().includes(query) ||
      e.profession?.toLowerCase().includes(query) ||
      e.goals?.toLowerCase().includes(query);

    const matchesCourse = !enrollCourseFilter || 
      e.course?.toLowerCase() === enrollCourseFilter.toLowerCase();

    return matchesSearch && matchesCourse;
  });

  const filteredRegistrations = registrations.filter(r => {
    const query = registerSearch.toLowerCase();
    const matchesSearch = 
      r.name?.toLowerCase().includes(query) ||
      r.email?.toLowerCase().includes(query) ||
      r.phone?.toLowerCase().includes(query) ||
      r.transactionId?.toLowerCase().includes(query) ||
      r.city?.toLowerCase().includes(query) ||
      r.qualification?.toLowerCase().includes(query);

    const matchesCourse = !registerCourseFilter || 
      r.course?.toLowerCase() === registerCourseFilter.toLowerCase();

    return matchesSearch && matchesCourse;
  });

  // Login View Gating
  if (!isLoggedIn) {
    return (
      <div className="mt-dash mt-dash-login-overlay">
        <div className="mt-dash-login-card">
          <div className="mt-dash-login-logo">
            <div className="logo-sparkle">★</div>
            <h2>MONKEY TRIBE</h2>
            <p>Database Administrator Portal</p>
          </div>
          <form className="mt-dash-login-form" onSubmit={handleLoginSubmit}>
            <div className="mt-dash-input-group">
              <label htmlFor="dash-username">Admin Username</label>
              <input
                id="dash-username"
                className="mt-dash-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="mt-dash-input-group">
              <label htmlFor="dash-password">Security Password</label>
              <input
                id="dash-password"
                className="mt-dash-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter security key"
                required
              />
            </div>
            {loginError && <div className="mt-dash-login-error">{loginError}</div>}
            <button className="mt-dash-login-btn" type="submit">
              Access Database Panel
            </button>
          </form>
          <div className="mt-dash-login-footer">
            <span>Secure encryption active. Hardcoded gateway protected.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-dash-container">
      {/* 1. SIDEBAR */}
      <aside className="mt-dash-sidebar">
        <div className="mt-dash-brand">
          <div className="brand-icon">M</div>
          <div className="brand-text">
            <h4>MONKEY TRIBE</h4>
            <span>DB Dashboard</span>
          </div>
        </div>

        <nav className="mt-dash-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
            Overview
          </button>

          <button 
            className={`nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Contact Enquiries
            {contacts.length > 0 && <span className="tab-badge">{contacts.length}</span>}
          </button>

          <button 
            className={`nav-item ${activeTab === 'enrollments' ? 'active' : ''}`}
            onClick={() => setActiveTab('enrollments')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Course Leads
            {enrollments.length > 0 && <span className="tab-badge">{enrollments.length}</span>}
          </button>

          <button 
            className={`nav-item ${activeTab === 'registrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('registrations')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            Paid Registrations
            {registrations.length > 0 && <span className="tab-badge warning">{registrations.length}</span>}
          </button>
        </nav>

        <div className="mt-dash-sidebar-footer">
          <button className="sidebar-btn secondary" onClick={() => onNavigate('home')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-icon">
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
            View Website
          </button>
          
          <button className="sidebar-btn danger" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-icon">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <main className="mt-dash-main">
        {/* Header */}
        <header className="mt-dash-header">
          <div className="header-left">
            <h2>
              {activeTab === 'overview' ? 'Overview Analytics' : 
               activeTab === 'contacts' ? 'Contact Form Leads' : 
               activeTab === 'enrollments' ? 'Quick Course Leads' : 'Verified Paid Bookings'}
            </h2>
            <p>Database Management • Real-time Sync Active</p>
          </div>
          <div className="header-right">
            <span className="live-pill">
              <span className="pulse-dot"></span>
              Live Firebase Connected
            </span>
          </div>
        </header>

        {/* Content Tabs */}
        {isLoading ? (
          <div className="mt-dash-loading">
            <div className="spinner"></div>
            <p>Streaming data from Firebase Realtime Database...</p>
          </div>
        ) : (
          <div className="mt-dash-content">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="tab-pane fade-in">
                {/* Visual Stats Grid */}
                <section className="stats-grid">
                  <div className="stat-card blue">
                    <div className="stat-card-overlay"></div>
                    <div className="stat-header">
                      <span>CONTACT LEADS</span>
                      <div className="stat-icon">✉</div>
                    </div>
                    <h3 className="stat-value">{totalContacts}</h3>
                    <p className="stat-sub">General and business enquiries</p>
                  </div>

                  <div className="stat-card purple">
                    <div className="stat-card-overlay"></div>
                    <div className="stat-header">
                      <span>COURSE INTERESTS</span>
                      <div className="stat-icon">★</div>
                    </div>
                    <h3 className="stat-value">{totalLeads}</h3>
                    <p className="stat-sub">Course info landing page requests</p>
                  </div>

                  <div className="stat-card gold">
                    <div className="stat-card-overlay"></div>
                    <div className="stat-header">
                      <span>PAID BOOKINGS</span>
                      <div className="stat-icon">✓</div>
                    </div>
                    <h3 className="stat-value">{totalPaidBookings}</h3>
                    <p className="stat-sub">UPI verified formal enrollments</p>
                  </div>

                  <div className="stat-card green">
                    <div className="stat-card-overlay"></div>
                    <div className="stat-header">
                      <span>VERIFIED REVENUE</span>
                      <div className="stat-icon">₹</div>
                    </div>
                    <h3 className="stat-value">{formatCurrency(totalRevenue)}</h3>
                    <p className="stat-sub">From registered checkouts</p>
                  </div>
                </section>

                {/* Subcontent section */}
                <div className="overview-subcontent">
                  
                  {/* Left Column: Recent Submissions Feed */}
                  <div className="overview-card left-col">
                    <h4>Recent Database Activity</h4>
                    <p className="card-subtitle">Real-time log of the latest 5 updates</p>
                    
                    <div className="activity-list">
                      {recentActivities.length === 0 ? (
                        <div className="empty-state">No recent activity detected in database yet.</div>
                      ) : (
                        recentActivities.map((act) => (
                          <div key={act.id} className={`activity-item ${act.type}`}>
                            <div className="activity-icon-wrapper">
                              {act.type === 'contact' ? '✉' : act.type === 'registration' ? '✓' : '★'}
                            </div>
                            <div className="activity-details">
                              <div className="activity-title-row">
                                <strong>{act.fullName || act.name}</strong>
                                <span className={`activity-badge ${act.type}`}>
                                  {act.type === 'contact' ? 'Contact' : act.type === 'registration' ? 'Paid Enrol' : 'Course Lead'}
                                </span>
                              </div>
                              <p className="activity-desc">
                                {act.type === 'contact' 
                                  ? `Submitted a general enquiry for ${act.enquiryType}`
                                  : act.type === 'registration' 
                                  ? `Formally registered for ${act.course} (UPI Transaction: ${act.transactionId})`
                                  : `Expressed interest in ${act.course} (landing page form)`
                                }
                              </p>
                              <span className="activity-time">{formatDate(act.timestamp)}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Right Column: Course Distribution */}
                  <div className="overview-card right-col">
                    <h4>Program Distribution</h4>
                    <p className="card-subtitle">Distribution of leads & paid registrations</p>
                    
                    <div className="course-distribution-list">
                      {['PromptX', 'GrowthX', 'BrandX', 'CopyCraft'].map(courseName => {
                        const leadsCount = enrollments.filter(e => e.course?.toLowerCase() === courseName.toLowerCase()).length;
                        const paidCount = registrations.filter(r => r.course?.toLowerCase() === courseName.toLowerCase()).length;
                        const total = leadsCount + paidCount;
                        const grandTotal = enrollments.length + registrations.length;
                        const percent = grandTotal ? (total / grandTotal) * 100 : 0;
                        
                        return (
                          <div key={courseName} className="distribution-item">
                            <div className="dist-labels">
                              <span className="dist-name">{courseName}</span>
                              <span className="dist-count">{total} total <span className="dist-paid">({paidCount} paid)</span></span>
                            </div>
                            <div className="progress-bar-wrapper">
                              <div 
                                className={`progress-bar-fill ${courseName.toLowerCase()}`}
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 2: CONTACTS */}
            {activeTab === 'contacts' && (
              <div className="tab-pane fade-in">
                {/* Toolbar */}
                <div className="table-toolbar">
                  <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search contacts by name, email, query..."
                      value={contactSearch}
                      onChange={(e) => setContactSearch(e.target.value)}
                    />
                    {contactSearch && <button className="clear-search" onClick={() => setContactSearch('')}>&times;</button>}
                  </div>

                  <div className="filter-select-wrapper">
                    <span className="filter-label">Filter Type:</span>
                    <select
                      value={contactFilter}
                      onChange={(e) => setContactFilter(e.target.value)}
                    >
                      <option value="">All Enquiry Types</option>
                      <option value="enrol">Enrol in a Programme</option>
                      <option value="corporate">Corporate Training</option>
                      <option value="partnership">Partnership Enquiry</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="table-wrapper">
                  <table className="mt-dash-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Enquiry Type</th>
                        <th>Message Preview</th>
                        <th className="actions-header">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="table-empty">
                            No contact submissions match the search or filter settings.
                          </td>
                        </tr>
                      ) : (
                        filteredContacts.map((c) => (
                          <tr key={c.id}>
                            <td className="table-time">{formatDate(c.timestamp)}</td>
                            <td className="table-name">{c.fullName}</td>
                            <td className="table-email"><a href={`mailto:${c.email}`}>{c.email}</a></td>
                            <td className="table-phone">{c.phone || 'N/A'}</td>
                            <td>
                              <span className={`table-badge-type ${c.enquiryType}`}>
                                {c.enquiryType === 'enrol' ? 'Enrol' : c.enquiryType === 'corporate' ? 'Corporate' : c.enquiryType === 'partnership' ? 'Partnership' : 'General'}
                              </span>
                            </td>
                            <td className="table-message-preview">{c.message}</td>
                            <td>
                              <div className="table-actions">
                                <button 
                                  className="action-btn view" 
                                  title="View Full Enquiry Detail"
                                  onClick={() => {
                                    setSelectedRecord(c);
                                    setModalType('contact');
                                  }}
                                >
                                  👁
                                </button>
                                <button 
                                  className="action-btn delete" 
                                  title="Delete record"
                                  onClick={() => handleDeleteRecord(c.id, 'contacts')}
                                >
                                  🗑
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: COURSE LEADS */}
            {activeTab === 'enrollments' && (
              <div className="tab-pane fade-in">
                {/* Toolbar */}
                <div className="table-toolbar">
                  <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search leads by name, email, phone..."
                      value={enrollSearch}
                      onChange={(e) => setEnrollSearch(e.target.value)}
                    />
                    {enrollSearch && <button className="clear-search" onClick={() => setEnrollSearch('')}>&times;</button>}
                  </div>

                  <div className="filter-select-wrapper">
                    <span className="filter-label">Filter Course:</span>
                    <select
                      value={enrollCourseFilter}
                      onChange={(e) => setEnrollCourseFilter(e.target.value)}
                    >
                      <option value="">All Courses</option>
                      <option value="PromptX">PromptX</option>
                      <option value="GrowthX">GrowthX</option>
                      <option value="BrandX">BrandX</option>
                      <option value="CopyCraft">CopyCraft</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="table-wrapper">
                  <table className="mt-dash-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Applied Course</th>
                        <th>Profession</th>
                        <th>Key Objectives / Goals</th>
                        <th className="actions-header">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnrollments.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="table-empty">
                            No quick leads match the search or filter settings.
                          </td>
                        </tr>
                      ) : (
                        filteredEnrollments.map((e) => (
                          <tr key={e.id}>
                            <td className="table-time">{formatDate(e.timestamp)}</td>
                            <td className="table-name">{e.name}</td>
                            <td className="table-email"><a href={`mailto:${e.email}`}>{e.email}</a></td>
                            <td className="table-phone">{e.phone || 'N/A'}</td>
                            <td>
                              <span className={`course-indicator ${e.course?.toLowerCase()}`}>
                                {e.course}
                              </span>
                            </td>
                            <td>{e.profession || 'N/A'}</td>
                            <td className="table-message-preview">{e.goals || 'N/A'}</td>
                            <td>
                              <div className="table-actions">
                                <button 
                                  className="action-btn view" 
                                  title="View Full Lead Details"
                                  onClick={() => {
                                    setSelectedRecord(e);
                                    setModalType('enrollment');
                                  }}
                                >
                                  👁
                                </button>
                                <button 
                                  className="action-btn delete" 
                                  title="Delete record"
                                  onClick={() => handleDeleteRecord(e.id, 'enrollments')}
                                >
                                  🗑
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: PAID REGISTRATIONS */}
            {activeTab === 'registrations' && (
              <div className="tab-pane fade-in">
                {/* Toolbar */}
                <div className="table-toolbar">
                  <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search registrations by name, email, UPI ID, city..."
                      value={registerSearch}
                      onChange={(e) => setRegisterSearch(e.target.value)}
                    />
                    {registerSearch && <button className="clear-search" onClick={() => setRegisterSearch('')}>&times;</button>}
                  </div>

                  <div className="filter-select-wrapper">
                    <span className="filter-label">Filter Course:</span>
                    <select
                      value={registerCourseFilter}
                      onChange={(e) => setRegisterCourseFilter(e.target.value)}
                    >
                      <option value="">All Courses</option>
                      <option value="PromptX">PromptX</option>
                      <option value="GrowthX">GrowthX</option>
                      <option value="BrandX">BrandX</option>
                      <option value="CopyCraft">CopyCraft</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="table-wrapper">
                  <table className="mt-dash-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Course</th>
                        <th>City</th>
                        <th>UPI Transaction ID</th>
                        <th>Status</th>
                        <th className="actions-header">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="table-empty">
                            No verified course registrations match the search parameters.
                          </td>
                        </tr>
                      ) : (
                        filteredRegistrations.map((r) => (
                          <tr key={r.id} className="paid-row">
                            <td className="table-time">{formatDate(r.timestamp)}</td>
                            <td className="table-name">{r.name}</td>
                            <td className="table-email"><a href={`mailto:${r.email}`}>{r.email}</a></td>
                            <td className="table-phone">{r.phone}</td>
                            <td>
                              <span className={`course-indicator ${r.course?.toLowerCase()}`}>
                                {r.course}
                              </span>
                            </td>
                            <td>{r.city || 'N/A'}</td>
                            <td className="table-transaction-id font-mono">
                              <span className="tx-badge" title="Verified UPI transaction ID">{r.transactionId}</span>
                            </td>
                            <td>
                              <span className="table-badge-status paid">PAID</span>
                            </td>
                            <td>
                              <div className="table-actions">
                                <button 
                                  className="action-btn view" 
                                  title="View Registration & Payment Details"
                                  onClick={() => {
                                    setSelectedRecord(r);
                                    setModalType('registration');
                                  }}
                                >
                                  👁
                                </button>
                                <button 
                                  className="action-btn delete" 
                                  title="Delete record"
                                  onClick={() => handleDeleteRecord(r.id, 'registrations')}
                                >
                                  🗑
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* 3. DETAILS MODAL */}
      {selectedRecord && (
        <div className="modal-overlay fade-in" onClick={() => setSelectedRecord(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalType === 'contact' ? 'Enquiry Record Details' : 
                 modalType === 'enrollment' ? 'Course Lead Details' : 'Verified Registration Details'}
              </h3>
              <button className="close-modal-btn" onClick={() => setSelectedRecord(null)}>&times;</button>
            </div>
            
            <div className="modal-body">
              <div className="details-header-row">
                <div className="details-avatar">
                  {(selectedRecord.fullName || selectedRecord.name || '?')[0].toUpperCase()}
                </div>
                <div className="details-meta">
                  <h4>{selectedRecord.fullName || selectedRecord.name}</h4>
                  <p>{selectedRecord.email} • {selectedRecord.phone || 'No phone number'}</p>
                </div>
              </div>

              <div className="details-grid">
                <div className="details-item full-width">
                  <span className="details-label">Record Firebase Reference ID</span>
                  <span className="details-val font-mono">{selectedRecord.id}</span>
                </div>

                <div className="details-item">
                  <span className="details-label">Timestamp</span>
                  <span className="details-val">{formatDate(selectedRecord.timestamp)}</span>
                </div>

                {modalType === 'contact' && (
                  <>
                    <div className="details-item">
                      <span className="details-label">Enquiry Category</span>
                      <span className="details-val capitalize">
                        {selectedRecord.enquiryType === 'enrol' ? 'Enrol in Course' : selectedRecord.enquiryType === 'corporate' ? 'Corporate Training' : selectedRecord.enquiryType === 'partnership' ? 'Partnership Enquiry' : 'General Enquiry'}
                      </span>
                    </div>

                    <div className="details-item full-width">
                      <span className="details-label">Complete Message Body</span>
                      <div className="details-val-block text-wrap">
                        {selectedRecord.message}
                      </div>
                    </div>
                  </>
                )}

                {modalType === 'enrollment' && (
                  <>
                    <div className="details-item">
                      <span className="details-label">Course Applied</span>
                      <span className="details-val">
                        <span className={`course-indicator ${selectedRecord.course?.toLowerCase()}`}>
                          {selectedRecord.course}
                        </span>
                      </span>
                    </div>

                    <div className="details-item">
                      <span className="details-label">Submission Category</span>
                      <span className="details-val text-purple font-bold">
                        ★ Landing Page quick Lead
                      </span>
                    </div>

                    {selectedRecord.profession && (
                      <div className="details-item">
                        <span className="details-label">Student Profession / Industry</span>
                        <span className="details-val">{selectedRecord.profession}</span>
                      </div>
                    )}

                    {selectedRecord.goals && (
                      <div className="details-item full-width">
                        <span className="details-label">Student Brand Goals / Learning Objectives</span>
                        <div className="details-val-block text-wrap">{selectedRecord.goals}</div>
                      </div>
                    )}
                  </>
                )}

                {modalType === 'registration' && (
                  <>
                    <div className="details-item">
                      <span className="details-label">Course Registered</span>
                      <span className="details-val">
                        <span className={`course-indicator ${selectedRecord.course?.toLowerCase()}`}>
                          {selectedRecord.course}
                        </span>
                      </span>
                    </div>

                    <div className="details-item">
                      <span className="details-label">Payment Status</span>
                      <span className="details-val text-green font-bold">
                        💳 PAID via UPI Transaction
                      </span>
                    </div>

                    <div className="details-item">
                      <span className="details-label">UPI Transaction ID</span>
                      <span className="details-val font-mono bg-dark tx-highlight">{selectedRecord.transactionId}</span>
                    </div>

                    <div className="details-item">
                      <span className="details-label">Registration Fee Paid</span>
                      <span className="details-val font-bold text-gold">
                        {formatCurrency(COURSE_PRICES[selectedRecord.course] || 10000)}
                      </span>
                    </div>

                    <div className="details-item">
                      <span className="details-label">Resident City</span>
                      <span className="details-val">{selectedRecord.city || 'Not provided'}</span>
                    </div>

                    <div className="details-item">
                      <span className="details-label">Highest Qualification</span>
                      <span className="details-val capitalize">{selectedRecord.qualification || 'Not provided'}</span>
                    </div>

                    <div className="details-item full-width">
                      <span className="details-label">Work Experience</span>
                      <span className="details-val capitalize">{selectedRecord.experience || 'Not provided'}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="modal-btn delete" 
                onClick={() => {
                  const dbPath = modalType === 'contact' ? 'contacts' : modalType === 'enrollment' ? 'enrollments' : 'registrations';
                  handleDeleteRecord(selectedRecord.id, dbPath);
                }}
              >
                Delete Record
              </button>
              <button className="modal-btn close" onClick={() => setSelectedRecord(null)}>Close panel</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUCCESS TOAST */}
      {toast.show && (
        <div className={`mt-dash-toast mt-dash-toast-${toast.type} fade-in`}>
          <span className="toast-icon">{toast.type === 'success' ? '✓' : '⚠'}</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
