import React, { useState } from 'react';
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
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import './LandingPage.css';

const PROPERTIES_DB = [
  { id: 1, type: "Apartment", name: "Azure Glass Villa", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000", price: "From $1.2M" },
  { id: 2, type: "Townhouse", name: "Emerald Heights", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000", price: "From $2.5M" },
  { id: 3, type: "Studio", name: "Sovereign Urban Loft", img: "https://images.unsplash.com/photo-1600607687940-4e2a09695d51?q=80&w=1000", price: "From $850K" },
  { id: 4, type: "Villa", name: "The Ivory Estate", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000", price: "From $3.2M" },
  { id: 5, type: "Mansion", name: "Midnight Penthouse", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000", price: "From $5.1M" },
  { id: 6, type: "Resort", name: "Emerald Bay Retreat", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000", price: "From $2.8M" }
];

export default function LandingPage() {
  const [showCount, setShowCount] = useState(3);

  const handlePresentationRequest = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const subject = `Presentation Request: ${data.firstName} ${data.lastName}`;
    const body = `Hello, I would like to request a presentation.\n\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nPortfolio: ${data.portfolioSize}`;
    window.location.href = `mailto:yessnoor143@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="nav-sovereign">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#0a6630', padding: '6px', borderRadius: '8px' }}>
            <BuildingOfficeIcon className="h-6 w-6 text-white" />
          </div>
          <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' }}>Rentora</span>
        </div>

        <div className="nav-links">
          <div className="nav-item-container">
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Solutions <ChevronDownIcon className="h-4 w-4" />
            </a>
            <div className="dropdown-sovereign">
              <a href="#" className="dropdown-link">
                <HomeModernIcon className="h-5 w-5 text-emerald-600" />
                <span>For Landlords</span>
              </a>
              <a href="#" className="dropdown-link">
                <GlobeAltIcon className="h-5 w-5 text-emerald-600" />
                <span>Global Managers</span>
              </a>
              <a href="#" className="dropdown-link">
                <ShieldCheckIcon className="h-5 w-5 text-emerald-600" />
                <span>Security First</span>
              </a>
            </div>
          </div>
          <a href="#marketplace">Marketplace</a>
          <a href="#pricing">Pricing</a>
        </div>

        <div className="nav-actions">
          <Link to="/login" style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', textDecoration: 'none' }}>Log in</Link>
          <Link to="/register" className="btn-outline">Presentation</Link>
          <Link to="/register" className="btn-filled">Registry</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-sovereign">
        <div className="hero-badge">Engineered for Maximum Yield</div>
        <h1>The Sovereign <br /> Real Estate OS.</h1>
        <p>Intelligent Software for Elite Landlords & Managers. Reimagining operations with radically simplified, bank-grade infrastructure.</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/register" className="btn-filled" style={{ padding: '16px 40px', fontSize: '16px' }}>Setup Account</Link>
          <Link to="/login" className="btn-outline" style={{ background: 'white', padding: '16px 40px', fontSize: '16px' }}>View Tour</Link>
        </div>
      </header>

      {/* Marketplace Search */}
      <section id="marketplace" className="marketplace-section">
        <div className="search-bar-elite">
          <div className="search-field">
            <label>LOCATION</label>
            <input type="text" placeholder="Nairobi, Kenya" />
          </div>
          <div className="search-field">
            <label>MAX PRICE</label>
            <input type="text" placeholder="Any Price" />
          </div>
          <div className="search-field">
            <label>PROPERTY TYPE</label>
            <input type="text" placeholder="All Types" />
          </div>
          <button style={{ background: '#0a6630', color: 'white', padding: '0 40px', borderRadius: '100px', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <MagnifyingGlassIcon className="h-5 w-5" /> Search
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 800 }}>Discover Premium Rentals</h2>
          <p style={{ color: '#64748b' }}>Browse verified listings directly from elite property managers using Rentora OS.</p>
        </div>

        <div className="property-grid">
          {PROPERTIES_DB.slice(0, showCount).map((p) => (
            <div key={p.id} className="property-card">
              <img src={p.img} alt={p.name} className="property-img" />
              <div className="property-overlay">
                <span className="property-type">{p.type}</span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, marginTop: '12px' }}>{p.name}</h3>
                <p style={{ opacity: 0.8, fontSize: '14px' }}>{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        {showCount < PROPERTIES_DB.length && (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button 
              onClick={() => setShowCount(PROPERTIES_DB.length)}
              style={{ background: 'transparent', border: '2px solid #e2e8f0', padding: '12px 32px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}
            >
              Show more properties
            </button>
          </div>
        )}
      </section>

      {/* REINSTATED & CONSOLIDATED: Capabilities & Presentation Section */}
      <section className="capabilities-section" style={{ padding: '0 10% 100px', background: '#fff' }}>
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 800 }}>Rentora Platform Capabilities</h2>
          <p style={{ color: '#64748b', maxWidth: '600px' }}>A radically simplified approach to complex real estate operations.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginBottom: '80px' }}>
          <div style={{ background: '#0f172a', borderRadius: '32px', padding: '50px', color: 'white' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <ChartBarIcon className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>Intelligent Portfolio Control</h3>
            <p style={{ opacity: 0.7, lineHeight: 1.6 }}>Supervise residential, commercial, and mixed-use structures dynamically. Adjust rent caps, utility lines, and unit statuses in real-time without refreshing.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '32px', padding: '40px', flex: 1 }}>
              <div style={{ background: 'white', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <UserGroupIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>Verified Sync</h3>
              <p style={{ color: '#64748b', fontSize: '15px' }}>Deep integration with identity verification to secure tenant data.</p>
            </div>
            <div style={{ background: '#ecfdf5', border: '1px solid #d1fae5', borderRadius: '32px', padding: '40px', flex: 1 }}>
              <div style={{ background: 'white', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <DocumentTextIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>Digital Leasing</h3>
              <p style={{ color: '#065f46', fontSize: '15px' }}>Generate and execute binding lease agreements via SMS.</p>
            </div>
          </div>
        </div>

        {/* Presentation Card (Nested in the same flow) */}
        <div style={{ 
          background: '#f8fafc', 
          borderRadius: '40px', 
          padding: '80px', 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1fr', 
          gap: '100px',
          boxShadow: '0 20px 80px rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.02)'
        }}>
          <div>
            <h2 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '40px', letterSpacing: '-1px' }}>What to expect</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', gap: '20px', marginBottom: '32px', alignItems: 'flex-start' }}>
                <CheckCircleIcon className="h-7 w-7 text-emerald-500 mt-1" />
                <div>
                  <p style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Hands-on tour of rent automation</p>
                  <p style={{ fontSize: '15px', color: '#64748b', marginTop: '4px' }}>tenant communications, and financial reporting.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '20px', marginBottom: '32px', alignItems: 'flex-start' }}>
                <CheckCircleIcon className="h-7 w-7 text-emerald-500 mt-1" />
                <div>
                  <p style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Answers to your specific questions</p>
                  <p style={{ fontSize: '15px', color: '#64748b', marginTop: '4px' }}>Get direct consultation from a product specialist.</p>
                </div>
              </li>
            </ul>
            <div style={{ marginTop: '60px', padding: '24px 32px', background: 'white', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '20px', width: 'fit-content' }}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px' }}>
                <EnvelopeIcon className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px' }}>DIRECT CONTACT</p>
                <a href="mailto:yessnoor143@gmail.com" style={{ fontSize: '20px', fontWeight: 800, color: '#0a6630', textDecoration: 'none' }}>yessnoor143@gmail.com</a>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '50px', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>Request a demo presentation</h3>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '40px' }}>Tell us about your portfolio.</p>
            <form onSubmit={handlePresentationRequest}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="input-group">
                  <label>First Name</label>
                  <input name="firstName" type="text" placeholder="Jane" required />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input name="lastName" type="text" placeholder="Doe" required />
                </div>
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input name="email" type="email" placeholder="jane@example.com" required />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input name="phone" type="tel" placeholder="+254 700 000 000" required />
              </div>
              <div className="input-group">
                <label>Portfolio Size</label>
                <select name="portfolioSize" style={{ background: 'white' }}>
                  <option>1-50 Units</option>
                  <option>51-200 Units</option>
                  <option>201-500 Units</option>
                  <option>500+ Units</option>
                </select>
              </div>
              <button type="submit" className="btn-filled" style={{ width: '100%', padding: '18px', fontSize: '16px', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
                Request Presentation
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-sovereign">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <div style={{ background: '#0a6630', padding: '6px', borderRadius: '8px' }}>
            <BuildingOfficeIcon className="h-6 w-6 text-white" />
          </div>
          <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>Rentora</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px', fontSize: '14px', opacity: 0.7 }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Solutions</a>
          <a href="#marketplace" style={{ color: 'white', textDecoration: 'none' }}>Marketplace</a>
          <a href="#pricing" style={{ color: 'white', textDecoration: 'none' }}>Pricing</a>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', fontSize: '12px', opacity: 0.5 }}>
          © 2024 Rentora Technologies. Built for the future of global real estate.
        </div>
      </footer>
    </div>
  );
}
