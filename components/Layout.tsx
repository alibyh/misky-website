import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    // This menu is a helper to navigate between the 6 distinct screens provided in the prompt
    // since they aren't all naturally linked in a linear flow in the HTML snippets.
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const menuItems = [
        { label: t('nav.home'), path: '/', icon: 'fa-house' },
        { label: t('nav.shop'), path: '/shop', icon: 'fa-bag-shopping' },
        { label: t('nav.guide'), path: '/guide', icon: 'fa-book-open' },
        { label: t('nav.about'), path: '/about', icon: 'fa-circle-info' },
        { label: t('nav.boutiques'), path: '/contact', icon: 'fa-shop' },
    ];

    const location = useLocation();
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    // Listen for custom event 'toggle-menu' dispatched from child components
    React.useEffect(() => {
        const handleToggle = () => setIsMenuOpen(prev => !prev);
        window.addEventListener('toggle-nav-menu', handleToggle);
        return () => window.removeEventListener('toggle-nav-menu', handleToggle);
    }, []);

    // Scroll to top on navigation
    React.useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return (
        <div className="flex justify-center min-h-screen bg-[#111] overflow-hidden">
            <div
                ref={scrollContainerRef}
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                className="relative w-full max-w-md h-[100dvh] bg-background-dark shadow-2xl overflow-y-auto hide-scrollbar border-x border-white/5"
            >
                {/* Global Header */}
                <header className="sticky top-0 z-40 bg-background-dark/80 backdrop-blur-md border-b border-white/10 w-full">
                    <div className="flex items-center p-4 justify-between h-16">
                        <div className="flex items-center gap-2">
                            <button onClick={toggleMenu} className="text-white flex items-center justify-center p-2 rounded-full hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[24px]">menu</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
                            <img src="/FatalesLogo.png" alt={t('brand')} className="h-32 w-auto object-contain mix-blend-screen" />
                        </div>

                        <div className="flex items-center gap-1">
                            <button onClick={() => navigate('/shop')} className="flex items-center justify-center relative p-2 rounded-full hover:bg-white/5 transition-colors text-white">
                                <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                                <span className="absolute top-1 right-1 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </header>

                <main>
                    {children}
                </main>

                {/* Global Navigation Overlay */}
                <div
                    className={`fixed inset-0 z-[100] transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleMenu}></div>

                    {/* Sidebar Panel */}
                    <div
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                        className={`absolute inset-y-0 w-[280px] bg-background-dark shadow-2xl transition-transform duration-300 ease-out flex flex-col p-8 overflow-y-auto overscroll-contain ${i18n.language === 'ar'
                            ? (isMenuOpen ? 'right-0 translate-x-0' : 'right-0 translate-x-full')
                            : (isMenuOpen ? 'left-0 translate-x-0' : 'left-0 -translate-x-full')
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex-shrink-0 flex items-center justify-between mb-12">
                            <h2 className="text-primary font-arabic text-2xl tracking-wide">{t('nav.menu')}</h2>
                            <button onClick={toggleMenu} className="text-white/50 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>
                        </div>

                        <div className="flex flex-col space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => {
                                        navigate(item.path);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`flex items-center gap-4 px-4 py-4 rounded-xl text-white text-base font-medium tracking-wide uppercase transition-all group w-full ${location.pathname === item.path
                                        ? 'bg-primary/10 text-primary'
                                        : 'hover:bg-white/5'
                                        }`}
                                >
                                    <i className={`fa-solid ${item.icon} text-lg w-6 text-center ${location.pathname === item.path ? 'text-primary' : 'text-primary/40 group-hover:text-primary transition-colors'
                                        }`}></i>
                                    <span>{item.label}</span>
                                </button>
                            ))}

                            <div className="h-px bg-white/5 my-4"></div>

                            <button
                                onClick={() => { }}
                                className="flex items-center gap-4 px-4 py-4 rounded-xl text-white/70 text-base font-medium tracking-wide uppercase hover:bg-white/5 transition-all group w-full"
                            >
                                <i className="fa-solid fa-user text-lg w-6 text-center text-primary/40 group-hover:text-primary transition-colors"></i>
                                <span>{t('nav.account')}</span>
                            </button>

                            <div className="flex flex-col">
                                <button
                                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                    className="flex items-center justify-between px-4 py-4 rounded-xl text-white/70 text-base font-medium tracking-wide uppercase hover:bg-white/5 transition-all group w-full"
                                >
                                    <div className="flex items-center gap-4">
                                        <i className="fa-solid fa-globe text-lg w-6 text-center text-primary/40 group-hover:text-primary transition-colors"></i>
                                        <span className={i18n.language === 'ar' ? 'font-arabic' : ''}>
                                            {i18n.language === 'en' ? 'Language' : (i18n.language === 'ar' ? 'اللغة' : 'Langue')}
                                        </span>
                                    </div>
                                    <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`}></i>
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ${isLangMenuOpen ? 'max-h-48 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                    {[
                                        { code: 'en', label: 'English', badge: 'EN' },
                                        { code: 'ar', label: 'العربية', badge: 'AR', font: 'font-arabic' },
                                        { code: 'fr', label: 'Français', badge: 'FR' }
                                    ].map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                i18n.changeLanguage(lang.code);
                                                setIsMenuOpen(false);
                                                setIsLangMenuOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between px-14 py-3 text-sm font-medium tracking-wide transition-colors hover:text-primary ${i18n.language === lang.code ? 'text-primary' : 'text-white/40'
                                                } ${lang.font || ''}`}
                                        >
                                            <span>{lang.label}</span>
                                            <span className="text-[10px] opacity-40">{lang.badge}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-8 border-t border-white/5">
                            <div className="flex flex-col gap-6">
                                <a href="https://www.snapchat.com/@fatales_m" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors text-sm">
                                    <i className="fa-brands fa-snapchat w-5 text-center"></i>
                                    <span>Snapchat</span>
                                </a>
                                <a href="https://www.facebook.com/fatalesmauritanie/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors text-sm">
                                    <i className="fa-brands fa-facebook-f w-5 text-center"></i>
                                    <span>Facebook</span>
                                </a>
                                <a href="tel:+22234258492" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors text-sm">
                                    <i className="fa-solid fa-phone w-5 text-center"></i>
                                    <span dir="ltr">+222 34 25 84 92</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};