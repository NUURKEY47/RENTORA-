import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BuildingOfficeIcon, 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  HomeIcon,
  CheckCircleIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import './LandingPage.css';

const PROPERTIES_DB = [
  { 
    id: 1, 
    type: "Apartment", 
    name: "Azure Glass Villa", 
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000",
    price: "From $1.2M"
  },
  { 
    id: 2, 
    type: "Townhouse", 
    name: "Emerald Heights", 
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
    price: "From $2.5M"
  },
  { 
    id: 3, 
    type: "Studio", 
    name: "Sovereign Urban Loft", 
    img: "https://images.unsplash.com/photo-1600607687940-4e2a09695d51?q=80&w=1000",
    price: "From $850K"
  }
];

export default function LandingPage() {
  const [properties, setProperties] = useState(PROPERTIES_DB);

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
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Solutions <ChevronDownIcon className="h-4 w-4" />
          </a>
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
        <div className="hero-badge">
           Engineered for Maximum Yield
        </div>
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
          <button style={{ 
            background: '#0a6630', 
            color: 'white', 
            padding: '0 40px', 
            borderRadius: '100px', 
            border: 'none', 
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}>
            <MagnifyingGlassIcon className="h-5 w-5" /> Search
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 800 }}>Discover Premium Rentals</h2>
          <p style={{ color: '#64748b' }}>Browse verified listings directly from elite property managers using Rentora OS.</p>
        </div>

        <div className="property-grid">
          {properties.map((p) => (
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

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <button 
            onClick={() => toast.success("More properties coming soon!")}
            style={{ 
              background: 'transparent', 
              border: '2px solid #e2e8f0', 
              padding: '12px 32px', 
              borderRadius: '12px', 
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Show more properties
          </button>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section">
        <div>
          <h2 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '32px' }}>What to expect</h2>
          <ul style={{ listStyle: 'none', padding: 0, spaceY: '24px' }}>
            <li style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
              <div>
                <p style={{ fontWeight: 700 }}>Hands-on tour of rent automation</p>
                <p style={{ fontSize: '14px', color: '#64748b' }}>tenant communications, and financial reporting.</p>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
              <div>
                <p style={{ fontWeight: 700 }}>Answers to specific questions</p>
                <p style={{ fontSize: '14px', color: '#64748b' }}>Get direct consultation from a product specialist.</p>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '16px' }}>
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
              <div>
                <p style={{ fontWeight: 700 }}>Migration & Setup Guidance</p>
                <p style={{ fontSize: '14px', color: '#64748b' }}>Assistance with migrating data and setting up your first properties.</p>
              </div>
            </li>
          </ul>
          
          <div style={{ marginTop: '40px', padding: '24px', background: 'white', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '12px' }}>
              <EnvelopeIcon className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>DIRECT CONTACT</p>
              <a href="mailto:yessnoor143@gmail.com" style={{ fontSize: '18px', fontWeight: 700, color: '#0a6630', textDecoration: 'none' }}>yessnoor143@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="demo-form-card">
          <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Request a demo presentation</h3>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>Tell us about your portfolio and we will reach out within one business day.</p>
          
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="input-group">
                <label>First Name</label>
                <input type="text" placeholder="Jane" />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" placeholder="Doe" />
              </div>
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="jane@example.com" />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+254 700 000 000" />
            </div>
            <div className="input-group">
              <label>Portfolio Size</label>
              <select>
                <option>1-50 Units</option>
                <option>51-200 Units</option>
                <option>201-500 Units</option>
                <option>500+ Units</option>
              </select>
            </div>
            <button className="btn-filled" style={{ width: '100%', padding: '16px', fontSize: '16px', border: 'none', cursor: 'pointer' }}>
              Request Presentation
            </button>
          </form>
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
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Log in</a>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', fontSize: '12px', opacity: 0.5 }}>
          © 2024 Rentora Technologies. Built for the future of global real estate.
        </div>
      </footer>
    </div>
  );
}
