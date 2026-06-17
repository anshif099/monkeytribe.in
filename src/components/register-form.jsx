import { useState } from 'react';
import { saveRegistration } from '../lib/firebase';
import './register-form.css';

const RAZORPAY_CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

const COURSES = [
  {
    id: 'promptx',
    badge: 'PromptX',
    popular: true,
    title: 'AI Prompt Engineering Mastery',
    duration: '30 Hours',
    modules: '10 Modules',
    features: ['Prompt design frameworks', 'AI workflow automation', 'Real-world projects'],
    price: 12500,
    originalPrice: 15000,
    color: '#3127b2',
    accent: 'indigo'
  },
  {
    id: 'growthx',
    badge: 'GrowthX',
    popular: false,
    title: 'AI Digital Marketing Mastery',
    duration: '30 Hours',
    modules: '10 Modules',
    features: ['AI content strategy', 'Campaign automation', 'Performance analytics'],
    price: 12500,
    originalPrice: 15000,
    color: '#035a41',
    accent: 'green'
  },
  {
    id: 'brandx',
    badge: 'BrandX',
    popular: false,
    title: 'Brand Builder Pro',
    duration: '8 Weeks',
    modules: '10 Modules',
    features: ['Brand positioning', 'Visual identity', 'Audience storytelling'],
    price: 9999,
    originalPrice: 14999,
    color: '#ff6b00',
    accent: 'orange'
  },
  {
    id: 'copycraft',
    badge: 'CopyCraft',
    popular: false,
    title: 'CopyCraft Mastery',
    duration: '6 Weeks',
    modules: '10 Modules',
    features: ['Persuasive copywriting', 'Consumer psychology', 'Campaign creation'],
    price: 11999,
    originalPrice: 17999,
    color: '#7c3aed',
    accent: 'purple'
  }
];

const loadRazorpayCheckout = () => {
  if (window.Razorpay) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${RAZORPAY_CHECKOUT_SCRIPT}"]`);

    if (existingScript) {
      existingScript.addEventListener('load', resolve, { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Unable to load Razorpay Checkout.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_CHECKOUT_SCRIPT;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Unable to load Razorpay Checkout.'));
    document.body.appendChild(script);
  });
};

const postJson = async (url, payload) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.error || 'The payment server could not process this request.');
  }

  if (!data) {
    throw new Error('The payment server returned an unexpected response.');
  }

  return data;
};

const getCourseIcon = (id) => {
  switch (id) {
    case 'promptx':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="course-icon-svg">
          <path d="M12 2v20M2 12h20M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
        </svg>
      );
    case 'growthx':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="course-icon-svg">
          <path d="M22 7L13.5 15.5L8.5 10.5L2 17" />
          <path d="M16 7h6v6" />
        </svg>
      );
    case 'brandx':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="course-icon-svg">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    case 'copycraft':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="course-icon-svg">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          <path d="m15 5 4 4" />
        </svg>
      );
    default:
      return null;
  }
};

function RegisterForm() {
  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState('promptx'); // Default pre-selected course

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    qualification: '',
    experience: ''
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedCourse) {
        setErrors({ course: 'Please select a course to continue.' });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const newErrors = {};
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1 && !isPaying) {
      setStep(step - 1);
    }
  };

  const handlePayment = async () => {
    if (isPaying) {
      return;
    }

    setErrors({});
    setIsPaying(true);

    try {
      await loadRazorpayCheckout();

      const order = await postJson('/api/create-razorpay-order.php', {
        courseId: selectedCourse,
        student: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone
        }
      });

      let paymentCompleted = false;
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Monkey Tribe',
        description: `${selectedCourseDetails?.badge} - ${selectedCourseDetails?.title}`,
        image: '/logo.png',
        order_id: order.orderId,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          courseId: selectedCourse,
          course: selectedCourseDetails?.badge || selectedCourse
        },
        theme: {
          color: '#161824'
        },
        handler: async (response) => {
          paymentCompleted = true;

          try {
            const verification = await postJson('/api/verify-razorpay-payment.php', {
              razorpay_order_id: order.orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: selectedCourse
            });

            if (!verification.verified) {
              throw new Error('Razorpay payment could not be verified.');
            }

            const paidAmount = (verification.payment?.amount || order.amount) / 100;
            const verifiedCourseId = verification.order?.courseId || selectedCourse;
            const verifiedCourse = COURSES.find((course) => course.id === verifiedCourseId) || selectedCourseDetails;
            const paymentRecord = {
              paymentId: verification.payment?.id || response.razorpay_payment_id,
              orderId: verification.order?.id || order.orderId,
              method: verification.payment?.method || 'razorpay',
              amount: paidAmount,
              currency: verification.payment?.currency || order.currency
            };

            await saveRegistration({
              name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              city: formData.city || '',
              qualification: formData.qualification || '',
              experience: formData.experience || '',
              transactionId: paymentRecord.paymentId,
              razorpayPaymentId: paymentRecord.paymentId,
              razorpayOrderId: paymentRecord.orderId,
              razorpaySignature: response.razorpay_signature,
              paymentMethod: paymentRecord.method,
              amountPaid: paidAmount,
              currency: paymentRecord.currency,
              course: verifiedCourse?.badge || selectedCourse,
              status: 'PAID'
            });

            setPaymentDetails(paymentRecord);
            setIsSuccess(true);
          } catch (err) {
            console.error('Failed to verify Razorpay payment:', err);
            setErrors({
              payment: err.message || 'Payment was received but verification failed. Please contact support.'
            });
          } finally {
            setIsPaying(false);
          }
        },
        modal: {
          ondismiss: () => {
            if (!paymentCompleted) {
              setErrors({ payment: 'Payment was not completed. You can try again whenever you are ready.' });
              setIsPaying(false);
            }
          }
        }
      });

      checkout.on('payment.failed', (response) => {
        setErrors({
          payment: response.error?.description || 'Payment failed. Please try another payment method.'
        });
        setIsPaying(false);
      });

      checkout.open();
    } catch (err) {
      console.error('Failed to start Razorpay payment:', err);
      setErrors({
        payment: err.message || 'Something went wrong while starting your payment. Please try again.'
      });
      setIsPaying(false);
    }
  };

  const selectedCourseDetails = COURSES.find(c => c.id === selectedCourse);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="register-form-section">
      <div className="register-form-section__container">

        {/* Step Indicators */}
        {!isSuccess && (
          <div className="step-indicator" role="navigation" aria-label="Registration steps">

            {/* Step 1 indicator */}
            <div className={`step-indicator__item ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <div className="step-indicator__icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="step-icon">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <span className="step-indicator__label">Choose Course</span>
            </div>

            <div className="step-indicator__line" />

            {/* Step 2 indicator */}
            <div className={`step-indicator__item ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <div className="step-indicator__icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="step-icon">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="step-indicator__label">Your Details</span>
            </div>

            <div className="step-indicator__line" />

            {/* Step 3 indicator */}
            <div className={`step-indicator__item ${step === 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
              <div className="step-indicator__icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="step-icon">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <span className="step-indicator__label">Pay & Confirm</span>
            </div>
          </div>
        )}

        {/* Wizard Panel */}
        <div className="register-box">
          {isSuccess ? (
            /* SUCCESS PAGE */
            <div className="register-box__success">
              <div className="register-box__success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>

              <h2 className="register-box__success-title">Enrolment Successful!</h2>
              <p className="register-box__success-text">
                Welcome to Monkey Tribe, <strong>{formData.fullName}</strong>! Your registration for <strong>{selectedCourseDetails?.title}</strong> is complete.
              </p>

              <div className="register-box__receipt">
                <div className="register-box__receipt-row">
                  <span>Student Name:</span>
                  <strong>{formData.fullName}</strong>
                </div>
                <div className="register-box__receipt-row">
                  <span>Enrolled Course:</span>
                  <strong>{selectedCourseDetails?.badge} — {selectedCourseDetails?.title}</strong>
                </div>
                <div className="register-box__receipt-row">
                  <span>Location:</span>
                  <strong>{formData.city || 'India'}</strong>
                </div>
                <div className="register-box__receipt-row">
                  <span>Payment Method:</span>
                  <strong>{paymentDetails?.method ? `Razorpay (${paymentDetails.method.toUpperCase()})` : 'Razorpay Checkout'}</strong>
                </div>
                <div className="register-box__receipt-row">
                  <span>Payment ID:</span>
                  <strong>{paymentDetails?.paymentId || 'Razorpay verified'}</strong>
                </div>
                <div className="register-box__receipt-row">
                  <span>Amount Paid:</span>
                  <strong className="receipt-price">{formatCurrency(paymentDetails?.amount || selectedCourseDetails?.price)}</strong>
                </div>
                <div className="register-box__receipt-row">
                  <span>Status:</span>
                  <span className="receipt-status-badge">PAID</span>
                </div>
              </div>

              <p className="register-box__success-footer">
                A confirmation email along with access credentials and the onboarding guide has been sent to <strong>{formData.email}</strong>.
              </p>
            </div>
          ) : (
            <div className="register-wizard">

              {/* STEP 1: SELECT COURSE */}
              {step === 1 && (
                <div className="wizard-step">
                  <h2 className="wizard-step__title">Select your course</h2>
                  <p className="wizard-step__subtitle">All courses include lifetime access, certificate, and community support.</p>

                  <div className="wizard-step__courses-list">
                    {COURSES.map((course) => {
                      const isSelected = selectedCourse === course.id;
                      return (
                        <div
                          key={course.id}
                          className={`wizard-step__list-card ${isSelected ? 'selected' : ''}`}
                          style={{ '--course-accent': course.color }}
                          onClick={() => handleCourseSelect(course.id)}
                        >
                          {/* Column 1: Icon Box */}
                          <div
                            className="wizard-step__card-icon-container"
                            style={{
                              background: `${course.color}12`,
                              color: course.color
                            }}
                          >
                            {getCourseIcon(course.id)}
                          </div>

                          {/* Column 2: Text details */}
                          <div className="wizard-step__card-details-container">
                            <div className="wizard-step__card-title-row">
                              <h3 className="wizard-step__card-badge-name">{course.badge}</h3>
                              {course.popular && (
                                <span className="wizard-step__popular-badge">
                                  ☆ Most Popular
                                </span>
                              )}
                            </div>

                            <p className="wizard-step__card-subtitle-name">{course.title}</p>

                            <div className="wizard-step__card-features">
                              <span className="wizard-step__feature-item">
                                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10" fill="none" />
                                  <polyline points="8 12 11 15 16 9" />
                                </svg>
                                {course.duration}
                              </span>
                              <span className="wizard-step__feature-item">
                                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10" fill="none" />
                                  <polyline points="8 12 11 15 16 9" />
                                </svg>
                                {course.modules}
                              </span>
                              {course.features.map((feature, i) => (
                                <span key={i} className="wizard-step__feature-item">
                                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" fill="none" />
                                    <polyline points="8 12 11 15 16 9" />
                                  </svg>
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Column 3: Price and Selector */}
                          <div className="wizard-step__card-action-container">
                            <div className="wizard-step__card-price-block">
                              <span className="wizard-step__price-primary">{formatCurrency(course.price)}</span>
                              <span className="wizard-step__price-secondary">{formatCurrency(course.originalPrice)}</span>
                            </div>

                            <div className="wizard-step__radio-circle">
                              {isSelected && <div className="wizard-step__radio-dot" />}
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                  <div className="wizard-actions">
                    <button
                      type="button"
                      className="wizard-actions__btn-continue-full"
                      onClick={handleNextStep}
                    >
                      Continue to Details →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SHARE YOUR DETAILS */}
              {step === 2 && (
                <div className="wizard-step">

                  {/* Selected Course Summary bar */}
                  <div className="selected-course-bar">
                    <div className="selected-course-bar__left">
                      <div className="selected-course-bar__icon-wrapper" style={{ background: `${selectedCourseDetails?.color}15`, color: selectedCourseDetails?.color }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          {selectedCourse === 'copycraft' ? (
                            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          ) : selectedCourse === 'promptx' ? (
                            <path d="M12 3l1.8 5.3L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.7L12 3z" />
                          ) : selectedCourse === 'growthx' ? (
                            <path d="M22 7L13.5 15.5L8.5 10.5L2 17M16 7h6v6" />
                          ) : (
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          )}
                        </svg>
                      </div>
                      <div className="selected-course-bar__info">
                        <span className="selected-course-bar__label">Selected Course</span>
                        <strong className="selected-course-bar__title">
                          {selectedCourseDetails?.badge} — {selectedCourseDetails?.title}
                        </strong>
                      </div>
                    </div>
                    <div className="selected-course-bar__right">
                      <strong className="selected-course-bar__price">{formatCurrency(selectedCourseDetails?.price)}</strong>
                      <button
                        type="button"
                        className="selected-course-bar__change-link"
                        onClick={() => setStep(1)}
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <h2 className="wizard-step__title">Your details</h2>
                  <p className="wizard-step__subtitle">We'll use these to set up your course access and send your confirmation.</p>

                  <div className="wizard-step__form">

                    <div className="wizard-step__form-row">
                      <div className="register-form-group">
                        <label htmlFor="reg-fullName">FULL NAME <span className="required">*</span></label>
                        <input
                          type="text"
                          id="reg-fullName"
                          name="fullName"
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={errors.fullName ? 'error' : ''}
                        />
                        {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                      </div>

                      <div className="register-form-group">
                        <label htmlFor="reg-email">EMAIL ADDRESS <span className="required">*</span></label>
                        <input
                          type="email"
                          id="reg-email"
                          name="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>
                    </div>

                    <div className="wizard-step__form-row">
                      <div className="register-form-group">
                        <label htmlFor="reg-phone">PHONE NUMBER <span className="required">*</span></label>
                        <div className="phone-input-wrapper">
                          <div className="phone-prefix">+91</div>
                          <input
                            type="tel"
                            id="reg-phone"
                            name="phone"
                            placeholder="10-digit number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={errors.phone ? 'error' : ''}
                          />
                        </div>
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                      </div>

                      <div className="register-form-group">
                        <label htmlFor="reg-city">CITY</label>
                        <input
                          type="text"
                          id="reg-city"
                          name="city"
                          placeholder="Your city"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="wizard-step__form-row">
                      <div className="register-form-group">
                        <label htmlFor="reg-qualification">HIGHEST QUALIFICATION</label>
                        <select
                          id="reg-qualification"
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleInputChange}
                        >
                          <option value="">Select qualification</option>
                          <option value="high-school">High School</option>
                          <option value="diploma">Diploma</option>
                          <option value="bachelors">Bachelor's Degree</option>
                          <option value="masters">Master's Degree</option>
                          <option value="phd">PhD</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="register-form-group">
                        <label htmlFor="reg-experience">WORK EXPERIENCE</label>
                        <select
                          id="reg-experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                        >
                          <option value="">Select experience</option>
                          <option value="fresher">Student / Fresher</option>
                          <option value="0-1">0-1 Years</option>
                          <option value="1-3">1-3 Years</option>
                          <option value="3-5">3-5 Years</option>
                          <option value="5-10">5-10 Years</option>
                          <option value="10+">10+ Years</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  <div className="wizard-actions">
                    <button
                      type="button"
                      className="wizard-actions__btn-back"
                      onClick={handlePrevStep}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="wizard-actions__btn-next"
                      onClick={handleNextStep}
                    >
                      Continue to Payment →
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 3: PAY & CONFIRM */}
              {step === 3 && (
                <div className="wizard-step">

                  {/* Selected Course Summary bar (Dark Midnight theme) */}
                  <div className="selected-course-bar selected-course-bar--dark">
                    <div className="selected-course-bar__top-row">
                      <div className="selected-course-bar__left">
                        <div className="selected-course-bar__icon-wrapper" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            {selectedCourse === 'copycraft' ? (
                              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            ) : selectedCourse === 'promptx' ? (
                              <path d="M12 3l1.8 5.3L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.7L12 3z" />
                            ) : selectedCourse === 'growthx' ? (
                              <path d="M22 7L13.5 15.5L8.5 10.5L2 17M16 7h6v6" />
                            ) : (
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            )}
                          </svg>
                        </div>
                        <div className="selected-course-bar__info">
                          <span className="selected-course-bar__label">ORDER SUMMARY</span>
                          <strong className="selected-course-bar__title">
                            {selectedCourseDetails?.badge}
                            <span className="selected-course-bar__meta">
                              {selectedCourseDetails?.title} • {selectedCourseDetails?.duration}
                            </span>
                          </strong>
                        </div>
                      </div>
                      <div className="selected-course-bar__right">
                        <strong className="selected-course-bar__price">{formatCurrency(selectedCourseDetails?.price)}</strong>
                        <span className="selected-course-bar__price-secondary">{formatCurrency(selectedCourseDetails?.originalPrice)}</span>
                      </div>
                    </div>

                    <div className="selected-course-bar__student-meta">
                      <div className="student-meta-item">
                        <span className="student-meta-label">Name</span>
                        <span className="student-meta-value">{formData.fullName}</span>
                      </div>
                      <div className="student-meta-item">
                        <span className="student-meta-label">Email</span>
                        <span className="student-meta-value">{formData.email}</span>
                      </div>
                      <div className="student-meta-item">
                        <span className="student-meta-label">Phone</span>
                        <span className="student-meta-value">+91 {formData.phone}</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="wizard-step__title">Complete Payment</h2>
                  <p className="wizard-step__subtitle">Pay securely through Razorpay Checkout.</p>

                  <div className="wizard-step__payment-gateways">

                    <div className="payment-box-wrapper razorpay-checkout-box">

                      <div className="razorpay-brand-row">
                        <div className="razorpay-brand-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                        <div className="razorpay-brand-copy">
                          <span className="razorpay-brand-label">Razorpay Checkout</span>
                          <strong>UPI, cards, netbanking and wallets</strong>
                        </div>
                        <span className="razorpay-live-badge">Live</span>
                      </div>

                      {/* Amount block */}
                      <div className="payment-amount-block">
                        <span className="payment-amount-label">Amount to Pay</span>
                        <strong className="payment-amount-value">{formatCurrency(selectedCourseDetails?.price)}</strong>
                      </div>

                      <div className="payment-instructions razorpay-summary-list">
                        <div className="instruction-item">
                          <span className="instruction-number">1</span>
                          <span className="instruction-text">Razorpay order is created for <strong>{selectedCourseDetails?.badge}</strong></span>
                        </div>
                        <div className="instruction-item">
                          <span className="instruction-number">2</span>
                          <span className="instruction-text">Payment opens in the official Razorpay checkout</span>
                        </div>
                        <div className="instruction-item">
                          <span className="instruction-number">3</span>
                          <span className="instruction-text">Registration is saved after Razorpay verification</span>
                        </div>
                      </div>

                      {errors.payment && <span className="error-text payment-error-text">{errors.payment}</span>}

                    </div>

                  </div>

                  {/* Action buttons */}
                  <div className="wizard-actions">
                    <button
                      type="button"
                      className="wizard-actions__btn-back"
                      onClick={handlePrevStep}
                      disabled={isPaying}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="wizard-actions__btn-pay-secure"
                      onClick={handlePayment}
                      disabled={isPaying}
                      aria-busy={isPaying}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-lock-icon">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>{isPaying ? 'Processing Payment...' : 'Pay & Confirm'}</span>
                    </button>
                  </div>

                  {/* Trust badge footer indicators */}
                  <div className="payment-trust-badges">
                    <div className="trust-badge-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="trust-badge-icon" style={{ width: '14px', height: '14px', color: '#10b981' }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Secure & Encrypted</span>
                    </div>
                    <div className="trust-badge-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="trust-badge-icon" style={{ width: '14px', height: '14px', color: '#10b981' }}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>Razorpay Verified</span>
                    </div>
                    <div className="trust-badge-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="trust-badge-icon" style={{ width: '14px', height: '14px', color: '#10b981' }}>
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>Confirmation within 24hrs</span>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default RegisterForm;
