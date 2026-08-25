import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BuildingOfficeIcon, 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BanknotesIcon,
  HomeModernIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  Bars3Icon,
  XMarkIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  WrenchScrewdriverIcon,
  CreditCardIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';
import './LandingPage.css';

const PROPERTIES_DB = [
  { id: 1, mode: "RENT", type: "Comm", category: "Commercial Stall", location: "Eastleigh 1st Ave", name: "Amal Plaza Ground Stall G-14", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000", price: 45000, specs: "High Footfall • Retail" },
  { id: 2, mode: "SALE", type: "Res", category: "Apartment", location: "Nairobi - Kileleshwa", name: "Azure Glass Luxury Penthouse", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000", price: 35000000, specs: "3 Bed • 3 Bath • 1,950 sqft" },
  { id: 3, mode: "RENT", type: "Comm", category: "Office Space", location: "Nairobi - Westlands", name: "Modern Commercial Office Suite", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000", price: 120000, specs: "5,000 sqft • Prime Location" },
  { id: 4, mode: "RENT", type: "Comm", category: "Retail Shop", location: "Eastleigh Jam Street", name: "High Street Retail Shop", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=1000", price: 85000, specs: "850 sqft • Busy Market Area" },
  { id: 5, mode: "SALE", type: "Res", category: "Townhouse", location: "Mombasa - Nyali", name: "Emerald Beachfront Villa", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000", price: 25000000, specs: "4 Bed • 4 Bath • Ocean View" },
  { id: 6, mode: "RENT", type: "Res", category: "Apartment", location: "Nairobi - Parklands", name: "Sovereign Urban Executive Loft", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000", price: 65000, specs: "2 Bed • 2 Bath • Balcony" }
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('RENT'); // 'RENT' | 'SALE'
  const [showCount, setShowCount] = useState(6);
  const [filters, setFilters] = useState({ location: '', category: '', maxPrice: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredProperties = useMemo(() => {
    return PROPERTIES_DB.filter(p => {
      const matchMode = p.mode === activeTab;
      const matchLoc = !filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchCat = !filters.category || p.category.toLowerCase().includes(filters.category.toLowerCase());
      const matchPrice = !filters.maxPrice || p.price <= parseInt(filters.maxPrice);
      return matchMode && matchLoc && matchCat && matchPrice;
    });
  }, [activeTab, filters]);

  return (
    <div className="landing-container">
      {/* 1. Header Navigation */}
      <nav className="nav-sovereign">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
            padding: '8px', 
            borderRadius: '12px',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 8V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V8L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="12" cy="10.5" r="2.5" stroke="white" strokeWidth="2" />
              <path d="M10.5 13L9.5 17.5H14.5L13.5 13" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', color: '#0f172a' }}>
            Rentora<span style={{ color: '#6366f1' }}>.</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="nav-links">
          <a href="#" className="nav-active">Home</a>
          <a href="#marketplace">Buy</a>
          <a href="#marketplace">Rent</a>
          <a href="#marketplace">Sell</a>
          <a href="#marketplace">Commercial</a>
          <a href="#features">Solutions</a>
        </div>

        <div className="nav-actions">
          <Link to="/login" style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', textDecoration: 'none' }}>Sign In</Link>
          <Link to="/register" className="btn-filled" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)' }}>Register</Link>
        </div>

        {/* Mobile Toggle */}
        <div className="nav-mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <XMarkIcon className="h-8 w-8 text-slate-800" /> : <Bars3Icon className="h-8 w-8 text-slate-800" />}
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="nav-mobile-menu">
            <a href="#marketplace" onClick={() => setIsMobileMenuOpen(false)}>Properties</a>
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Success Stories</a>
            <div style={{ borderTop: '1px solid #f1f5f9', margin: '10px 0' }}></div>
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
            <Link to="/register" style={{ color: '#4f46e5', fontWeight: 700 }} onClick={() => setIsMobileMenuOpen(false)}>Register Account</Link>
          </div>
        )}
      </nav>

      {/* 2. Skyline Search Hero Banner */}
      <header className="hero-sovereign">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Find Your Perfect Space with Rentora.<br />Property Management Made Simple.</h1>
          <p>The #1 Real Estate & Commercial Plaza Platform in Nairobi. Manage plaza stalls, commercial shops & residential properties seamlessly.</p>

          {/* Search Filter Box */}
          <div className="search-box-master">
            {/* Rent / Sale Tabs */}
            <div className="tab-group-master">
              <button 
                className={`tab-btn ${activeTab === 'RENT' ? 'active' : ''}`}
                onClick={() => setActiveTab('RENT')}
              >
                For Rent
              </button>
              <button 
                className={`tab-btn ${activeTab === 'SALE' ? 'active' : ''}`}
                onClick={() => setActiveTab('SALE')}
              >
                For Sale
              </button>
            </div>

            {/* Filter Inputs Grid */}
            <div className="filter-grid-master">
              <div className="filter-item">
                <label>LOCATION</label>
                <input 
                  type="text" 
                  placeholder="e.g. Eastleigh 1st Ave, Westlands..." 
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                />
              </div>

              <div className="filter-item">
                <label>PROPERTY TYPE</label>
                <select 
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="">All Categories</option>
                  <option value="Commercial Stall">Commercial Stall / Plaza</option>
                  <option value="Retail Shop">Retail Shop</option>
                  <option value="Office Space">Office Space</option>
                  <option value="Apartment">Residential Apartment</option>
                  <option value="Townhouse">Townhouse / Villa</option>
                </select>
              </div>

              <div className="filter-item">
                <label>MAX PRICE (KES)</label>
                <input 
                  type="number" 
                  placeholder="Any Budget" 
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>

              <button className="btn-search-master">
                <MagnifyingGlassIcon className="h-5 w-5" /> SEARCH PROPERTIES
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Featured Properties & Plaza Stalls Grid */}
      <section id="marketplace" className="marketplace-section">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a' }}>Featured Listings</h2>
          <p style={{ color: '#64748b', fontSize: '16px' }}>Explore top commercial plaza stalls, retail shops, and residential apartments.</p>
        </div>

        <div className="property-grid">
          {filteredProperties.slice(0, showCount).map((p) => (
            <div key={p.id} className="card-master">
              <div className="card-image-wrapper">
                <img src={p.img} alt={p.name} className="card-image" />
                <div className="badge-price">KES {p.price.toLocaleString()}{p.mode === 'RENT' ? '/mo' : ''}</div>
                <div className="badge-type">{p.type}</div>
                <div className={`badge-mode ${p.mode === 'RENT' ? 'mode-rent' : 'mode-sale'}`}>{p.mode}</div>
              </div>
              <div className="card-body">
                <h3 className="card-title">{p.name}</h3>
                <p className="card-location"><MapPinIcon className="h-4 w-4 inline mr-1 text-indigo-600" /> {p.location}</p>
                <p className="card-specs">{p.specs}</p>
                <Link to="/register" className="btn-view-details">VIEW DETAILS</Link>
              </div>
            </div>
          ))}
          {filteredProperties.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px', background: '#f8fafc', borderRadius: '24px' }}>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#64748b' }}>No listings match your search criteria for {activeTab}.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Trusted Partners & Payment Integrations Banner */}
      <section className="partners-banner">
        <p className="partners-title">TRUSTED PAYMENT INTEGRATIONS & BANKING PARTNERS</p>
        <div className="partners-logos">
          <div className="partner-chip mp-chip">💚 M-PESA Daraja API</div>
          <div className="partner-chip">KCB Bank</div>
          <div className="partner-chip">Equity Bank</div>
          <div className="partner-chip">ABSA Bank</div>
          <div className="partner-chip">Co-op Bank</div>
          <div className="partner-chip">Stanbic Bank</div>
        </div>
      </section>

      {/* 5. How Rentora Works (3 Steps) */}
      <section id="how-it-works" className="how-it-works-section">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: '#4f46e5', fontWeight: 700, fontSize: '14px', letterSpacing: '1px' }}>3 SIMPLE STEPS</span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginTop: '8px' }}>How Rentora Works</h2>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon-bg"><ClipboardDocumentCheckIcon className="h-8 w-8 text-indigo-600" /></div>
            <h3>1. Register & List</h3>
            <p>Create your account, input plaza building details, floor stall maps, or residential units with pricing and media.</p>
          </div>

          <div className="step-card">
            <div className="step-icon-bg"><CreditCardIcon className="h-8 w-8 text-emerald-600" /></div>
            <h3>2. Manage & Market</h3>
            <p>Automate M-Pesa rent prompts, track caretaker reports, and market vacant stalls directly to prospective shopkeepers.</p>
          </div>

          <div className="step-card">
            <div className="step-icon-bg"><BanknotesIcon className="h-8 w-8 text-amber-600" /></div>
            <h3>3. Close Deals & Collect</h3>
            <p>Receive instant M-Pesa notifications, issue automated digital receipts, and generate 1-click monthly financial statements.</p>
          </div>
        </div>
      </section>

      {/* 6. Comprehensive Plaza & Property Management Features */}
      <section id="features" className="features-section">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a' }}>Comprehensive Plaza & Property Features</h2>
          <p style={{ color: '#64748b' }}>Everything you need to run commercial shopping plazas and residential estates.</p>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <DocumentTextIcon className="h-7 w-7 text-indigo-600" />
            <h4>Lease Management</h4>
            <p>Digital tenancy agreements and lease expiry tracking.</p>
          </div>
          <div className="feature-item">
            <UserGroupIcon className="h-7 w-7 text-emerald-600" />
            <h4>Tenant & Trader Portal</h4>
            <p>Self-service dashboard for rent payment & receipt history.</p>
          </div>
          <div className="feature-item">
            <ChartBarIcon className="h-7 w-7 text-blue-600" />
            <h4>Financial Reporting</h4>
            <p>1-click revenue breakdown, overdue rent, & caretaker audits.</p>
          </div>
          <div className="feature-item">
            <WrenchScrewdriverIcon className="h-7 w-7 text-amber-600" />
            <h4>Maintenance Requests</h4>
            <p>Track plumbing, electrical, and stall repair tickets.</p>
          </div>
          <div className="feature-item">
            <SparklesIcon className="h-7 w-7 text-purple-600" />
            <h4>Analytics Dashboard</h4>
            <p>Real-time occupancy rates and revenue performance.</p>
          </div>
          <div className="feature-item">
            <BanknotesIcon className="h-7 w-7 text-emerald-600" />
            <h4>M-Pesa Rent Collection</h4>
            <p>Automated STK Push prompts and instant receipt verification.</p>
          </div>
        </div>
      </section>

      {/* 7. Success Stories (Testimonials) */}
      <section className="testimonials-section">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: '#4f46e5', fontWeight: 700, fontSize: '14px', letterSpacing: '1px' }}>TESTIMONIALS</span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginTop: '8px' }}>Hear From Our Success Stories</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars-row"><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /></div>
            <p className="testimonial-text">"Rentora has made managing our 180 plaza stalls in Eastleigh completely effortless. Automated M-Pesa collections eliminated fake SMS receipts entirely!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">N</div>
              <div>
                <h5>Nuurkey A.</h5>
                <p>Plaza Property Manager, Nairobi</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars-row"><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /></div>
            <p className="testimonial-text">"The floor-by-floor stall matrix gives me complete clarity on which shops are paid, overdue, or vacant right from my phone."</p>
            <div className="testimonial-author">
              <div className="author-avatar">D</div>
              <div>
                <h5>David O.</h5>
                <p>Commercial Real Estate Agent</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars-row"><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /><StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" /></div>
            <p className="testimonial-text">"Easily the best property management software in Kenya. Financial reporting takes seconds at the end of every month."</p>
            <div className="testimonial-author">
              <div className="author-avatar">M</div>
              <div>
                <h5>Mary K.</h5>
                <p>Residential Estate Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Rentora Footer */}
      <footer className="footer-sovereign">
        <div className="footer-content-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
                padding: '6px', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 8V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V8L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="12" cy="10.5" r="2.5" stroke="white" strokeWidth="2" />
                  <path d="M10.5 13L9.5 17.5H14.5L13.5 13" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800 }}>Rentora<span style={{ color: '#6366f1' }}>.</span></span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>Modern Property Management & Commercial Plaza Platform in Kenya.</p>
          </div>

          <div className="footer-links-group">
            <h5>Sitemap</h5>
            <ul>
              <li><a href="#marketplace">Properties</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#features">Features</a></li>
              <li><Link to="/login">Sign In</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h5>Legal & Support</h5>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><a href="mailto:yessnoor143@gmail.com">Support</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h5>Contact Info</h5>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Nairobi, Kenya</p>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>yessnoor143@gmail.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          © 2026 Rentora Platform. Built for the future of commercial & residential real estate.
        </div>
      </footer>
    </div>
  );
}
