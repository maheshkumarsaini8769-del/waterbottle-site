import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useSite } from '../context/SiteContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  Building2,
  Headphones
} from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useCart();
  const { config, images, t } = useSite();
  const c = config.colors;
  const contact = config.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(`✨ Thank you! Your inquiry has been sent to ${config.site.name}.`, 'success');
  };

  const inputClass = 'w-full bg-transparent border-0 border-b focus:ring-0 border-[#bdc8d1] focus:border-b-2 px-0 py-2.5 text-sm text-[#1a1c1c] transition-colors placeholder:text-[#9e9e9e]';

  return (
    <div className="pt-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12 md:py-20">
        {/* Header Section */}
        <section className="mb-16 max-w-3xl space-y-4">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border"
            style={{ backgroundColor: `${c.primary}1a`, color: c.dark, borderColor: `${c.primary}4d` }}
          >
            {contact.eyebrow}
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase" style={{ color: c.dark }}>
            {contact.title}
          </h1>
          <p className="text-base sm:text-lg text-[#3e4850] leading-relaxed">
            {t(contact.description)}
          </p>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-8 md:p-10 rounded-2xl shadow-lg border border-[#bdc8d1] h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: c.accent }}>{contact.formHeading}</h2>
                <p className="text-xs text-[#6e7881] mb-8">
                  {contact.formSubheading}
                </p>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-4 my-8">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                    <h3 className="text-lg font-bold text-[#1a1c1c]">Inquiry Received!</h3>
                    <p className="text-sm text-[#3e4850]">
                      Thank you, <strong className="text-[#00658d]">{formData.name}</strong>. A hydration specialist will reach out to <strong>{formData.email}</strong> shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', inquiryType: 'general', message: '' });
                      }}
                      className="text-xs font-bold hover:underline uppercase tracking-wider mt-4"
                      style={{ color: c.dark }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#3e4850] mb-2" htmlFor="name">
                        Full Name *
                      </label>
                      <input
                        required
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#3e4850] mb-2" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className={inputClass}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#3e4850] mb-2" htmlFor="company">
                          Company / Organization
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company || ''}
                          onChange={handleChange}
                          placeholder="Acme Enterprises"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#3e4850] mb-2" htmlFor="monthlyCases">
                          Est. Monthly Cases
                        </label>
                        <select
                          id="monthlyCases"
                          name="monthlyCases"
                          value={formData.monthlyCases || '5-20'}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="5-20">5 - 20 Cases (Event / Small Office)</option>
                          <option value="21-50">21 - 50 Cases (Medium Enterprise)</option>
                          <option value="50-200">50 - 200 Cases (Hotel / Facility)</option>
                          <option value="200+">200+ Cases (Institutional / Pallet)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#3e4850] mb-2" htmlFor="inquiryType">
                        Inquiry Category
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="corporate">Corporate & B2B Bulk Supply</option>
                        <option value="events">Event / Wedding Bulk Order</option>
                        <option value="distribution">Regional Distributorship</option>
                        <option value="general">General Inquiry & Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#3e4850] mb-2" htmlFor="message">
                        Your Message *
                      </label>
                      <textarea
                        required
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we assist your hydration needs today?"
                        className={inputClass + ' resize-none'}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white font-bold py-4 px-8 rounded uppercase tracking-wider text-xs shadow-md transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01]"
                      style={{ backgroundColor: c.primary }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.dark)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.primary)}
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-6 border-t border-[#e2e2e2] mt-8 flex items-center justify-between text-xs text-[#6e7881]">
                <span>🔒 Privacy Protected</span>
                <span>⚡ Prompt Response</span>
              </div>
            </div>
          </div>

          {/* Right Column: Location Map & Info Cards */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Headquarters Map Card */}
            <div className="relative h-[380px] md:h-[440px] w-full rounded-2xl border border-[#bdc8d1] overflow-hidden group shadow-lg">
              <img
                src={images.bkcMap}
                alt="Map of Headquarters"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md bg-white/95 backdrop-blur-md p-6 rounded-xl border border-[#bdc8d1] shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1"
                    style={{ backgroundColor: `${c.primary}26`, color: c.dark }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: c.primary }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: c.primary }}>
                      {contact.addressLabel}
                    </div>
                    <h3 className="text-lg font-bold mb-1" style={{ color: c.accent }}>
                      {contact.addressLine1}
                    </h3>
                    <p className="text-xs text-[#3e4850] leading-relaxed">
                      {contact.addressLine2}
                    </p>
                    <a
                      href={contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider mt-3 transition-colors"
                      style={{ color: c.dark }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = c.primary)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = c.dark)}
                    >
                      <span>{contact.mapsLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Support */}
              <div className="glass-panel p-6 rounded-xl border border-[#bdc8d1] shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${c.primary}26`, color: c.dark }}
                  >
                    <Headphones className="w-5 h-5" style={{ color: c.primary }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: c.accent }}>Customer Support</h3>
                    <p className="text-xs text-[#6e7881]">Toll-free & Direct Email</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-sm">
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-[#3e4850] transition-colors font-medium"
                    onMouseEnter={(e) => (e.currentTarget.style.color = c.dark)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#3e4850')}
                  >
                    <Phone className="w-4 h-4" style={{ color: c.primary }} />
                    <span>{contact.phone}</span>
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-[#3e4850] transition-colors font-medium"
                    onMouseEnter={(e) => (e.currentTarget.style.color = c.dark)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#3e4850')}
                  >
                    <Mail className="w-4 h-4" style={{ color: c.primary }} />
                    <span>{contact.email}</span>
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="glass-panel p-6 rounded-xl border border-[#bdc8d1] shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${c.primary}26`, color: c.dark }}
                  >
                    <Clock className="w-5 h-5" style={{ color: c.primary }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: c.accent }}>Operating Hours</h3>
                    <p className="text-xs text-[#6e7881]">Distribution & Despatch</p>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-[#3e4850] pt-2">
                  {contact.hours.map((hour, idx) => (
                    <li key={idx} className="flex justify-between border-b border-[#eeeeee] pb-1">
                      <span>{hour.day}</span>
                      <span className={`font-bold text-[#1a1c1c] ${hour.time === 'Closed' ? 'font-semibold text-[#6e7881]' : ''}`}>
                        {hour.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
