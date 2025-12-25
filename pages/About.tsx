import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

export const About: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white font-display antialiased overflow-x-hidden pt-4">

      <div className="relative w-full aspect-[4/5]">
        <div className="absolute inset-0 bg-cover bg-center animate-zoom-in-slow" style={{ backgroundImage: 'url("/about-header.png")' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </div>
        <div className="relative h-full flex flex-col justify-end items-center pb-12 px-6 text-center z-10">
          <div className="mb-4">
            <span className="material-symbols-outlined text-primary text-[48px] drop-shadow-lg">spa</span>
          </div>
          <h2 className="text-white text-3xl font-light tracking-tight mb-2 drop-shadow-md">{t('about.heroTitle')}</h2>
          <div className="h-px w-12 bg-primary my-4"></div>
          <p className="text-neutral-200 tracking-[0.15em] text-xs font-medium uppercase drop-shadow-sm">{t('about.heroSubtitle')}</p>
        </div>
      </div>

      <div className="flex flex-col px-6 py-8 space-y-16">
        <section className="flex flex-col items-center text-center animate-fade-in-up">
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">{t('about.originTitle')}</span>
          <h3 className="text-neutral-900 dark:text-white text-2xl font-light leading-tight mb-6 tracking-wide">
            <Trans i18nKey="about.originHeading" components={{ br: <br /> }} />
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 text-base font-normal leading-relaxed max-w-sm">
            {t('about.originText')}
          </p>
        </section>

        <div className="w-full h-56 rounded-sm overflow-hidden relative group shadow-2xl">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("/about-craft.png")' }}>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>

        <section className="flex flex-col items-center text-center">
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">{t('about.craftTitle')}</span>
          <h3 className="text-neutral-900 dark:text-white text-2xl font-light leading-tight mb-6 tracking-wide">
            <Trans i18nKey="about.craftHeading" components={{ br: <br /> }} />
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 text-base font-normal leading-relaxed mb-8 max-w-sm">
            {t('about.craftText')}
          </p>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-[#141414]/5 dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col items-center justify-center rounded-lg gap-2">
              <span className="material-symbols-outlined text-primary text-[28px]">local_florist</span>
              <span className="text-xs uppercase tracking-widest text-neutral-500">{i18n.language === 'en' ? 'Saffron' : 'زعفران'}</span>
            </div>
            <div className="bg-[#141414]/5 dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col items-center justify-center rounded-lg gap-2">
              <span className="material-symbols-outlined text-primary text-[28px]">water_drop</span>
              <span className="text-xs uppercase tracking-widest text-neutral-500">{i18n.language === 'en' ? 'Oud Oil' : 'دهن العود'}</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center text-center relative pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="absolute -top-3 bg-white dark:bg-black px-4 text-primary">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <h3 className="text-neutral-900 dark:text-white text-xl font-light leading-tight mb-4 tracking-wide mt-4">{t('about.promiseTitle')}</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm italic font-light leading-relaxed mb-8 max-w-xs">
            {t('about.promiseText')}
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.15em] text-neutral-500">{i18n.language === 'en' ? 'Crafted for you' : 'صُنع من أجلك'}</span>
            <div className="h-16 w-32 relative">
              <svg viewBox="0 0 200 100" className="w-full h-full stroke-primary fill-none stroke-2" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))' }}>
                <path d="M20,60 Q50,20 70,60 T120,60 T170,40" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M40,70 L160,70" opacity="0.5" strokeWidth="1"></path>
              </svg>
            </div>
            <span className="text-xs text-primary font-medium">{t('about.founder')}</span>
          </div>
        </section>
      </div>
      <footer className="mt-12 mb-12 px-6 flex flex-col items-center border-t border-neutral-200 dark:border-neutral-800 pt-12">
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
      </footer>
    </div>
  );
};