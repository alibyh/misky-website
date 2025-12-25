import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Contact: React.FC = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const branches = [
        {
            id: 'branch1',
            coords: '18.108288824702704, -15.980190034653045',
            image: '/images/branches/branch-1.jpg',
            key: 'branch1',
            searchQuery: 'مسكي للعطور فرع التلفزيون Nouakchott Mauritania'
        },
        {
            id: 'branch2',
            coords: '18.118304918608672, -15.960671199999997',
            image: '/images/branches/branch-2.jpg',
            key: 'branch2',
            searchQuery: 'مسكي للعطور كرفور بكار Nouakchott'
        },
        {
            id: 'branch3',
            coords: '18.073877285811534, -15.956373213082069',
            image: '/images/branches/branch-3.jpg',
            key: 'branch3',
            searchQuery: 'مسكي للعطور فرع عرفات Nouakchott'
        }
    ];

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/22232291908', '_blank');
    };

    const handleMapClick = (branch: typeof branches[0]) => {
        const query = `${branch.searchQuery} ${branch.coords}`;
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
    };

    return (
        <div className="relative flex flex-col min-h-screen bg-background-light dark:bg-[#1a1712] text-gray-900 dark:text-white transition-colors duration-300 font-display pt-4">
            <main className="flex-1 overflow-y-auto pb-12">
                {/* Hero Section */}
                <div className="flex flex-col items-center pt-12 pb-10 px-6 text-center animate-fade-in-up">
                    <div className="mb-4 inline-flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary">
                        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>location_on</span>
                    </div>
                    <h1 className="text-4xl font-light leading-tight tracking-tight text-gray-900 dark:text-white mb-4">
                        {t('contact.visitUs').split(' ').map((word, i) => (
                            <React.Fragment key={i}>
                                {i === t('contact.visitUs').split(' ').length - 1 ? (
                                    <span className="font-bold text-primary block mt-1 uppercase tracking-wider">{word}</span>
                                ) : (
                                    <>{word} </>
                                )}
                            </React.Fragment>
                        ))}
                    </h1>
                    <p className="text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400 max-w-[300px]">
                        {t('contact.subtitle')}
                    </p>
                </div>

                {/* WhatsApp Button */}
                <div className="px-6 pb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <button
                        onClick={handleWhatsAppClick}
                        className="relative w-full group overflow-hidden rounded-2xl bg-primary hover:bg-[#cba83d] transition-all duration-500 shadow-[0_10px_30px_rgba(217,183,74,0.2)] active:scale-[0.98]"
                    >
                        <div className="flex items-center justify-center h-16 gap-4 px-8">
                            <span className="text-[#201c12] text-sm font-bold tracking-[0.1em] uppercase">{t('contact.whatsapp')}</span>
                            <span className="material-symbols-outlined text-[#201c12]" style={{ fontSize: '24px' }}>chat_bubble</span>

                        </div>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"></div>
                    </button>
                </div>

                <div className="px-6 mb-12">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
                </div>

                {/* Branches Grid */}
                <div className="px-6 space-y-12 mb-16">
                    {branches.map((branch, index) => (
                        <div
                            key={branch.id}
                            className="group animate-fade-in-up"
                            style={{ animationDelay: `${200 + index * 100}ms` }}
                        >
                            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-white/5">
                                <img
                                    src={branch.image}
                                    alt={t(`contact.branches.${branch.key}.name`)}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} flex flex-col gap-1`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>verified_user</span>
                                        <span className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">Official Boutique</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-wide">
                                        {t(`contact.branches.${branch.key}.name`)}
                                    </h3>
                                </div>

                                <button
                                    onClick={() => handleMapClick(branch)}
                                    className="absolute top-6 right-6 size-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-[#201c12] hover:border-primary transition-all duration-300 group/map"
                                >
                                    <span className="material-symbols-outlined group-hover/map:scale-110 transition-transform">directions</span>
                                </button>
                            </div>

                            <div className="space-y-4 px-2">
                                <div className="flex items-start gap-4">
                                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>location_on</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                            {t(`contact.branches.${branch.key}.address`)}
                                        </p>
                                        <button
                                            onClick={() => handleMapClick(branch)}
                                            className="text-xs font-bold text-primary hover:underline underline-offset-4 uppercase tracking-wider"
                                        >
                                            {t('contact.getDirections')}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>schedule</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {t(`contact.branches.${branch.key}.hours`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Support Section */}
                <div className="px-6 mb-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                    <div className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5">
                        <h3 className="text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6 uppercase">
                            {t('contact.support')}
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mail</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wider font-bold">Email</p>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">contact@mesky.mr</p>
                                    </div>
                                </div>
                                <span className={`material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors ${isRTL ? 'rotate-180' : ''}`}>chevron_right</span>
                            </div>
                            <div className="h-px bg-gray-100 dark:bg-white/5"></div>
                            <div className="flex items-center justify-between group cursor-pointer" onClick={handleWhatsAppClick}>
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>phone_iphone</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wider font-bold">WhatsApp</p>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200" dir="ltr">+222 32 29 19 08</p>
                                    </div>
                                </div>
                                <span className={`material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors ${isRTL ? 'rotate-180' : ''}`}>chevron_right</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer info */}
                <footer className="mt-12 mb-12 px-6 flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-8">
                        <a href="https://www.tiktok.com/@mesky44" target="_blank" rel="noopener noreferrer" className="size-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                            <i className="fa-brands fa-tiktok"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="size-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="https://wa.me/22232291908" target="_blank" rel="noopener noreferrer" className="size-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                            <i className="fa-brands fa-whatsapp"></i>
                        </a>
                        <a href="tel:+22232291908" className="size-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                            <i className="fa-solid fa-phone"></i>
                        </a>
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-600 tracking-[0.3em] uppercase mb-2">
                        MESKY • EST. {new Date().getFullYear()}
                    </p>
                    <p className="text-[8px] text-gray-400 dark:text-gray-700 font-light italic">
                        Quality without compromise
                    </p>
                </footer>
            </main>
        </div>
    );
};
