import React from 'react';
import { useSite } from '../context/SiteContext';
import { Droplets, ShieldCheck, Award, Recycle, Mail } from 'lucide-react';

const BADGE_ICONS = [ShieldCheck, Award, Recycle, Droplets];

export default function Footer({ onNavigate }) {
  const { config, t } = useSite();
  const c = config.colors;

  return (
    <footer className="bg-[#f3f3f4] text-[#3e4850] w-full border-t border-[#bdc8d1]">
      {/* Upper Badges Bar */}
      <div className="border-b border-[#e2e2e2] py-8 px-5 md:px-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {config.footer.badges.map((badge, idx) => {
            const Icon = BADGE_ICONS[idx % BADGE_ICONS.length];
            return (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${c.primary}1a`, color: c.dark }}
                >
                  <Icon className="w-5 h-5" style={idx === 2 ? { color: '#059669' } : undefined} />
                </div>
                <div>
                  <h5 className="font-bold text-xs uppercase text-[#1a1c1c]">{badge.title}</h5>
                  <p className="text-[11px] text-[#6e7881]">{badge.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-16 px-5 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              {config.site.logo ? (
                <img
                  src={config.site.logo}
                  alt={config.site.name}
                  className="w-8 h-8 rounded-lg object-contain bg-white border border-[#e2e2e2]"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: c.primary }}>
                  <Droplets className="w-4 h-4 fill-white" />
                </div>
              )}
              <span className="text-2xl font-black tracking-tight uppercase" style={{ color: c.dark }}>
                {config.site.name.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-[#3e4850] leading-relaxed max-w-sm">
              {t(config.footer.about)}
            </p>
            <p className="text-xs text-[#6e7881]">
              {t(config.footer.copyright)}
            </p>
            <button
              onClick={() => { window.location.hash = 'admin'; }}
              className="text-[11px] text-[#9e9e9e] hover:text-[#6e7881] transition-colors border border-[#e2e2e2] rounded-full px-3 py-1 mt-2"
              title="Admin Panel"
            >
              Admin
            </button>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a1c1c]">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="transition-colors" style={{ color: '#3e4850' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.dark)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3e4850')}
                >
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product')} className="transition-colors" style={{ color: '#3e4850' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.dark)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3e4850')}
                >
                  Products (500ML - 1L)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="transition-colors" style={{ color: '#3e4850' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.dark)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3e4850')}
                >
                  Our Story & Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="transition-colors" style={{ color: '#3e4850' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.dark)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3e4850')}
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Quality & Legal */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a1c1c]">Standards</h4>
            <ul className="space-y-2 text-sm text-[#3e4850]">
              <li><span className="cursor-pointer transition-colors" style={{ color: '#3e4850' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = c.dark)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#3e4850')}
              >Water Quality Report</span></li>
              <li><span className="cursor-pointer transition-colors" style={{ color: '#3e4850' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = c.dark)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#3e4850')}
              >Sustainability Charter</span></li>
              <li><span className="cursor-pointer transition-colors" style={{ color: '#3e4850' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = c.dark)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#3e4850')}
              >Privacy Policy</span></li>
              <li><span className="cursor-pointer transition-colors" style={{ color: '#3e4850' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = c.dark)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#3e4850')}
              >Terms of Service</span></li>
            </ul>
          </div>

          {/* Corporate / Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a1c1c]">{config.footer.newsletterTitle}</h4>
            <p className="text-sm text-[#3e4850]">
              {t(config.footer.newsletterText)}
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert(`Subscribed to ${config.site.name} updates!`); }} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="bg-white border border-[#bdc8d1] rounded px-4 py-2.5 text-sm flex-1 focus:outline-none"
                style={{ borderColor: '#bdc8d1' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = c.primary)}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#bdc8d1')}
              />
              <button
                type="submit"
                className="text-white px-4 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors"
                style={{ backgroundColor: c.dark }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.dark)}
              >
                {config.footer.newsletterButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
