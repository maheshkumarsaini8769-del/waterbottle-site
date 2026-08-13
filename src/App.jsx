import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { SiteProvider, useSite } from './context/SiteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import OurStoryPage from './pages/OurStoryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import { FloatingContactButtons, OrderStatusButton } from './components/QuickContact';

function SiteApp() {
  const { config } = useSite();
  const [activePage, setActivePage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#admin');

  useEffect(() => {
    const onHashChange = () => setIsAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.title = `${config.site.name.toUpperCase()} - ${config.site.tagline}`;
  }, [config.site.name, config.site.tagline]);

  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isAdmin) {
    return (
      <AdminPage onExit={() => { window.location.hash = ''; }} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9] text-[#1a1c1c] selection:bg-[#00aeef] selection:text-white">
      {/* Navigation Bar */}
      <Navbar activePage={activePage} setActivePage={handleNavigate} />

      {/* Page Views */}
      <main className="flex-grow">
        {activePage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {activePage === 'product' && <ProductDetailPage onNavigate={handleNavigate} />}
        {activePage === 'story' && <OurStoryPage onNavigate={handleNavigate} />}
        {activePage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Shopping Cart Drawer */}
      <CartDrawer onNavigate={handleNavigate} />

      {/* Global Toast Alerts */}
      <Toast />

      {/* Floating WhatsApp + Call buttons (mobile, bottom-right) */}
      <FloatingContactButtons />

      {/* Check / Update Order button (bottom-left, after order placed) */}
      <OrderStatusButton />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <SiteProvider>
        <SiteApp />
      </SiteProvider>
    </CartProvider>
  );
}