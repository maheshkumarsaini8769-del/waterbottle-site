import React from 'react';
import { useSite } from '../context/SiteContext';
import { Droplets, FlaskConical, Recycle, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

const SOURCE_ICONS = [Droplets, ShieldCheck, Recycle];

export default function OurStoryPage({ onNavigate }) {
  const { config, images, t } = useSite();
  const c = config.colors;
  const story = config.story;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src={images.officeBuilding}
          alt={`${config.site.name} Architecture`}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-[#f9f9f9]/85 backdrop-blur-[2px]" />

        <div className="relative z-10 text-center px-5 md:px-16 max-w-[1280px] mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.25em] bg-white/90 px-4 py-1.5 rounded-full border border-[#bdc8d1] inline-block shadow-sm" style={{ color: c.dark }}>
            {story.eyebrow}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-[#1a1c1c] tracking-tight uppercase">
            {story.title}
          </h1>
          <p className="text-base sm:text-xl text-[#3e4850] max-w-2xl mx-auto leading-relaxed">
            {t(story.heroText)}
          </p>
        </div>
      </section>

      {/* Our Mission for India (Editorial Section) */}
      <section className="editorial-spacing px-5 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Mission Text */}
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
              style={{ backgroundColor: `${c.primary}1a`, color: c.dark, borderColor: `${c.primary}4d` }}
            >
              {story.visionEyebrow}
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1a1c1c] tracking-tight leading-tight">
              {story.visionTitle}
            </h2>

            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: c.primary }} />

            <p className="text-base text-[#3e4850] leading-relaxed">
              {t(story.visionText1)}
            </p>

            <p className="text-base text-[#3e4850] leading-relaxed">
              {t(story.visionText2)}
            </p>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-colors border-b-2 pb-1"
                style={{ color: c.dark, borderColor: c.dark }}
                onMouseEnter={(e) => { e.currentTarget.style.color = c.primary; e.currentTarget.style.borderColor = c.primary; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = c.dark; e.currentTarget.style.borderColor = c.dark; }}
              >
                <span>{story.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mission Image */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#bdc8d1] shadow-2xl bg-white p-2">
              <img
                src={images.waterDrops}
                alt="Pristine Water Droplets on Marble"
                className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Source to Sip (Bento Grid) */}
      <section className="editorial-spacing bg-[#f3f3f4] border-t border-[#e2e2e2] px-5 md:px-16">
        <div className="max-w-[1280px] mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: c.dark }}>
              {story.sourceEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1c1c] tracking-tight">
              {story.sourceTitle}
            </h2>
            <p className="text-base text-[#3e4850]">
              {t(story.sourceDescription)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {story.sourceSteps.map((step, idx) => {
              const Icon = SOURCE_ICONS[idx % SOURCE_ICONS.length];
              const isGreen = idx === 2;
              return (
                <div key={idx} className="bg-white border border-[#bdc8d1] p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 group relative overflow-hidden"
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primary; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#bdc8d1'; }}
                >
                  {isGreen && <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />}
                  <div>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      style={isGreen ? { backgroundColor: '#d1fae5', color: '#059669' } : { backgroundColor: `${c.primary}26`, color: c.primary }}
                    >
                      <Icon className="w-7 h-7" style={isGreen ? { color: '#059669' } : { color: c.primary }} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1a1c1c] mb-3">{t(step.title)}</h3>
                    <p className="text-sm text-[#3e4850] leading-relaxed">
                      {t(step.description)}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-[#eeeeee] mt-6 text-xs font-bold uppercase tracking-wider"
                    style={isGreen ? { color: '#059669' } : { color: c.dark }}
                  >
                    {t(step.footer)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
