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
  SparklesIcon
} from '@heroicons/react/24/outline';
import './LandingPage.css';

const PROPERTIES_DB = [
  { id: 1, type: "Apartment", location: "Nairobi", name: "Azure Glass Villa", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000", price: 1200000 },
  { id: 2, type: "Townhouse", location: "Mombasa", name: "Emerald Heights", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000", price: 2500000 },
  { id: 3, type: "Studio", location: "Nairobi", name: "Sovereign Urban Loft", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000", price: 850000 },
  { id: 4, type: "Villa", location: "Naivasha", name: "The Ivory Estate", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000", price: 3200000 },
  { id: 5, type: "Mansion", location: "Nairobi", name: "Midnight Penthouse", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000", price: 5100000 },
  { id: 6, type: "Resort", location: "Diani", name: "Emerald Bay Retreat", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000", price: 2800000 }
];

export default function LandingPage() {
  const [showCount, setShowCount] = useState(3);
  const [filters, setFilters] = useState({ location: '', type: '', maxPrice: '' });

  const filteredProperties = useMemo(() => {
    return PROPERTIES_DB.filter(p => {
      const matchLoc = !filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchType = !filters.type || p.type.toLowerCase().includes(filters.type.toLowerCase());
      const matchPrice = !filters.maxPrice || p.price <= parseInt(filters.maxPrice);
      return matchLoc && matchType && matchPrice;
    });
  }, [filters]);

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
                <span>For Individual Landlords</span>
              </a>
              <a href="#" className="dropdown-link">
                <GlobeAltIcon className="h-5 w-5 text-emerald-600" />
                <span>Enterprise Property Groups</span>
              </a>
              <a href="#" className="dropdown-link">
                <ShieldCheckIcon className="h-5 w-5 text-emerald-600" />
                <span>Regulatory Compliance</span>
              </a>
            </div>
          </div>
          <a href="#marketplace">Marketplace</a>
          <a href="#pricing">Pricing</a>
        </div>

        <div className="nav-actions">
          <Link to="/login" style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', textDecoration: 'none' }}>Log in</Link>
          <a href="#presentation" className="btn-outline">Presentation</a>
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
          <a href="#marketplace" className="btn-outline" style={{ background: 'white', padding: '16px 40px', fontSize: '16px' }}>View Marketplace</a>
        </div>
      </header>

      {/* Marketplace Search */}
      <section id="marketplace" className="marketplace-section">
        <div className="search-bar-elite">
          <div className="search-field">
            <label>LOCATION</label>
            <input 
              type="text" 
              placeholder="Search City..." 
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            />
          </div>
          <div className="search-field">
            <label>MAX PRICE ($)</label>
            <input 
              type="number" 
              placeholder="Any Price" 
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            />
          </div>
          <div className="search-field">
            <label>PROPERTY TYPE</label>
            <select 
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', fontWeight: 600 }}
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Studio">Studio</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>
          <button style={{ background: '#0a6630', color: 'white', padding: '0 40px', borderRadius: '100px', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MagnifyingGlassIcon className="h-5 w-5" /> Filter
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 800 }}>Discover Premium Rentals</h2>
          <p style={{ color: '#64748b' }}>Browse verified listings directly from elite property managers using Rentora OS.</p>
        </div>

        <div className="property-grid">
          {filteredProperties.slice(0, showCount).map((p) => (
            <div key={p.id} className="property-card">
              <img src={p.img} alt={p.name} className="property-img" />
              <div className="property-overlay">
                <span className="property-type">{p.type} — {p.location}</span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, marginTop: '12px' }}>{p.name}</h3>
                <p style={{ opacity: 0.8, fontSize: '14px' }}>${p.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
          {filteredProperties.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px', background: '#f8fafc', borderRadius: '32px' }}>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#64748b' }}>No properties found matching your search.</p>
            </div>
          )}
        </div>

        {showCount < filteredProperties.length && (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button 
              onClick={() => setShowCount(filteredProperties.length)}
              style={{ background: 'transparent', border: '2px solid #e2e8f0', padding: '12px 32px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}
            >
              Show more properties
            </button>
          </div>
        )}
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '100px 10%', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 800 }}>Predictable, Tiered Pricing</h2>
          <p style={{ color: '#64748b' }}>Choose the OS that fits your portfolio scale.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div className="pricing-card">
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#64748b', letterSpacing: '1px' }}>STARTER</h3>
            <div style={{ fontSize: '48px', fontWeight: 800, margin: '20px 0' }}>$49<span style={{ fontSize: '16px', color: '#94a3b8' }}>/mo</span></div>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>For landlords with up to 10 units.</p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', flex: 1 }}>
              <li style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><CheckCircleIcon className="h-5 w-5 text-emerald-500" /> Automate Rent Collection</li>
              <li style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><CheckCircleIcon className="h-5 w-5 text-emerald-500" /> 1 Landlord Account</li>
              <li style={{ display: 'flex', gap: '12px' }}><CheckCircleIcon className="h-5 w-5 text-emerald-500" /> Basic Marketplace Listing</li>
            </ul>
            <Link to="/register" className="btn-outline" style={{ textAlign: 'center' }}>Choose Starter</Link>
          </div>

          <div className="pricing-card featured">
            <div style={{ position: 'absolute', top: '-15px', right: '30px', background: 'var(--primary)', color: 'white', padding: '4px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 700 }}>MOST POPULAR</div>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px' }}>PROFESSIONAL</h3>
            <div style={{ fontSize: '48px', fontWeight: 800, margin: '20px 0' }}>$199<span style={{ fontSize: '16px', color: '#94a3b8' }}>/mo</span></div>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>Unlimited units for active managers.</p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', flex: 1 }}>
              <li style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><CheckCircleIcon className="h-5 w-5 text-emerald-500" /> Digital Lease Execution</li>
              <li style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><CheckCircleIcon className="h-5 w-5 text-emerald-500" /> Sub-Admin Management</li>
              <li style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><CheckCircleIcon className="h-5 w-5 text-emerald-500" /> Verified Tenant Screening</li>
              <li style={{ display: 'flex', gap: '12px' }}><CheckCircleIcon className="h-5 w-5 text-emerald-500" /> Priority Support</li>
            </ul>
            <Link to="/register" className="btn-filled" style={{ textAlign: 'center' }}>Go Pro</Link>
          </div>

          <div className="pricing-card">
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#64748b', letterSpacing: '1px' }}>ENTERPRISE</h3>
            <div style={{ fontSize: '48px', fontWeight: 800, margin: '20px 0' }}>Custom</div>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>Custom infrastructure for massive groups.</p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', flex: 1 }}>
              <li style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><CheckCircleIcon className="h-5 w-5 text-emerald-500" /> White-label Marketplace</li>
              <li style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><CheckCircleIcon className="h-5 w-5 text-emerald-500" /> Bank-grade API Access</li>
              <li style={{ display: 'flex', gap: '12px' }}><CheckCircleIcon className="h-5 w-5 text-emerald-500" /> Dedicated Account Manager</li>
            </ul>
            <a href="#presentation" className="btn-outline" style={{ textAlign: 'center' }}>Contact Sales</a>
          </div>
        </div>
      </section>

      {/* Presentation Section (FormSubmit) */}
      <section id="presentation" className="demo-section">
        <div style={{ background: 'white', borderRadius: '40px', padding: '80px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '100px' }}>
          <div>
            <h2 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '40px' }}>Request a Presentation</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}><CheckCircleIcon className="h-7 w-7 text-emerald-500" /> Full tour of the automation engine</li>
              <li style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}><CheckCircleIcon className="h-7 w-7 text-emerald-500" /> Custom ROI calculation for your portfolio</li>
              <li style={{ display: 'flex', gap: '20px' }}><CheckCircleIcon className="h-7 w-7 text-emerald-500" /> Data migration strategy session</li>
            </ul>
            <div style={{ marginTop: '60px', padding: '24px', background: '#f8fafc', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <EnvelopeIcon className="h-6 w-6 text-emerald-600" />
              <div>
                <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8' }}>DIRECT CONTACT</p>
                <a href="mailto:yessnoor143@gmail.com" style={{ fontSize: '18px', fontWeight: 800, color: '#0a6630', textDecoration: 'none' }}>yessnoor143@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="demo-form-card">
            <form action="https://formsubmit.co/yessnoor143@gmail.com" method="POST">
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_next" value="https://rentora.cc" />
              <input type="hidden" name="_subject" value="New Presentation Request from Landing Page" />
              <input type="hidden" name="_template" value="table" />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group"><label>First Name</label><input name="First_Name" type="text" placeholder="Jane" required /></div>
                <div className="input-group"><label>Last Name</label><input name="Last_Name" type="text" placeholder="Doe" required /></div>
              </div>
              <div className="input-group"><label>Email Address</label><input name="Email" type="email" placeholder="jane@example.com" required /></div>
              <div className="input-group"><label>Phone Number</label><input name="Phone" type="tel" placeholder="+254..." required /></div>
              <div className="input-group">
                <label>Portfolio Size</label>
                <select name="Portfolio_Size">
                  <option>1-50 Units</option>
                  <option>51-200 Units</option>
                  <option>201+ Units</option>
                </select>
              </div>
              <button type="submit" className="btn-filled" style={{ width: '100%', padding: '18px', fontSize: '16px' }}>Send Request</button>
            </form>
          </div>
        </div>
      </section>

      {/* Compact Horizontal Footer */}
      <footer className="footer-sovereign">
        <div className="footer-grid">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#0a6630', padding: '6px', borderRadius: '8px' }}><BuildingOfficeIcon className="h-6 w-6 text-white" /></div>
            <span style={{ fontSize: '20px', fontWeight: 800 }}>Rentora</span>
          </div>

          <div className="footer-col">
            <ul>
              <li><a href="#marketplace">Marketplace</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#presentation">Presentation</a></li>
              <li><a href="mailto:yessnoor143@gmail.com">Support</a></li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: '#94a3b8' }}><GlobeAltIcon className="h-5 w-5" /></a>
            <a href="#" style={{ color: '#94a3b8' }}><ChatBubbleLeftRightIcon className="h-5 w-5" /></a>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
          © 2024 Rentora Technologies Inc. Built for the future of real estate.
        </div>
      </footer>
    </div>
  );
}
