import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

export const Guide: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const families = [
    { id: 'floral', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBst-dNtRyfO05C6dmnuYexeaBAtGhgC0QWO_HCOMjpnQNQ0AeQhOyhbGlTwTNYtbG0Lw8C8jlWnIcE9atyze9zPS0dGo88HfBvRY3Q7x949onTeTQIHXQCWl-gxlAq-BZKDWKEEuRqyCCXTpCZCkx_TN6wHdJE9v1APniaK_H4nNunAIk1xvo0OzOxahqlMZJMz1yaVSOq9W5wyOK3ckHwmYTK5ZtXhbuhrYbzAwcTRz64uAJ9iAJ1Yh49V-aglmLRyLoFfantrmBr', icon: 'local_florist' },
    { id: 'woody', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUHQsTrQyAwRZAYVeQSugRWXj6yYSHNKa-UnMvXgvgIg2eWgFaW-GmC0RrwdhTAq2qBso5gLC1YDBbC1OrNZF5WHI5H5ejx2_hywH-z1F_t_EY9JsqlKS5noZphFTy09NKaunaxTIq37GeHW0NWUlIrjz_dOpECx3wzC451HljhnHLL4mpQlIK23xa--jxpQUEafGJsNZCUhf6dNW2b-rWfk_zKs_SOVoEPtYg8dez5j2Bb4UW1czY1HlSGlQYocFdwPF0v_op9tp0', icon: 'forest' },
    { id: 'amber', img: '/guide-layering.png', icon: 'light_mode' },
    { id: 'fresh', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCViTRiEz8IW0-1V5TVIXe0K-aCYIWubts-6MmITCDH-sXXiQq5YfN35L6VkYHSxCxbJsDWdk6iguntrrpZHF7Hyv5-WZxMZR0iSERek_OCjYY_KHoyF3ijDPhZwZYxBBG0j6wwmcG9D6zISCK3BwWjpr3uztSGDptgTdofPZ_DtKzFE8Snqy7lfuW8A9Rx5Q78KRd6m7w8QL6e4JIMGWqNW-YGFh_jybcYgupjJf1AWFGXZZhwR8Y6GrqfuZmn2V1cvt48Y0hxmV0r', icon: 'water_drop' }
  ];

  return (
    <div className="relative flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display antialiased pb-12">
      <section className="relative w-full">
        <div className="relative h-[420px] w-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-background-dark"></div>
          <div className="h-full w-full bg-cover bg-center animate-zoom-in-slow" style={{ backgroundImage: 'url("/guide-header.png")' }}></div>
          <div className="absolute bottom-0 left-0 z-20 flex w-full flex-col items-center justify-end p-6 pb-10 text-center">
            <span className="mb-3 inline-block rounded-full border border-primary/50 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm animate-fade-in-up">{t('guide.curated')}</span>
            <h2 className="mb-2 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl animate-fade-in-up">
              <Trans i18nKey="guide.discoverTitle" components={{ br: <br />, span: <span className="font-bold text-primary" /> }} />
            </h2>
            <p className="mb-6 max-w-[280px] text-sm text-gray-300 animate-fade-in-up">
              {t('guide.discoverSubtitle')}
            </p>
            <button className="group flex h-12 w-full max-w-[200px] items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-background-dark transition-all hover:bg-primary/90 active:scale-95 animate-fade-in-up">
              {t('guide.startGuide')}
              <span className="material-symbols-outlined transition-transform group-hover:translate-y-1" style={{ fontSize: '18px' }}>arrow_downward</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-6 pl-4 rtl:pl-0 rtl:pr-4">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">{t('guide.shopByMood')}</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 pr-4 rtl:pr-0 rtl:pl-4 hide-scrollbar">
          <button onClick={() => navigate('/shop')} className="whitespace-nowrap rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-background-dark transition-colors">{t('guide.moods.romantic')}</button>
          <button onClick={() => navigate('/shop')} className="whitespace-nowrap rounded-full border border-white/10 bg-surface-dark px-4 py-2 text-sm font-medium text-gray-300 hover:border-primary/50 hover:text-white transition-colors">{t('guide.moods.bold')}</button>
          <button onClick={() => navigate('/shop')} className="whitespace-nowrap rounded-full border border-white/10 bg-surface-dark px-4 py-2 text-sm font-medium text-gray-300 hover:border-primary/50 hover:text-white transition-colors">{t('guide.moods.everyday')}</button>
          <button onClick={() => navigate('/shop')} className="whitespace-nowrap rounded-full border border-white/10 bg-surface-dark px-4 py-2 text-sm font-medium text-gray-300 hover:border-primary/50 hover:text-white transition-colors">{t('guide.moods.elegant')}</button>
        </div>
      </section>

      <section className="px-6 pt-4 pb-2">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-light text-black dark:text-white">{t('guide.familiesTitle')}</h2>
          <button onClick={() => navigate('/shop')} className="text-xs font-medium text-primary hover:underline">{t('guide.viewAll')}</button>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('guide.familiesSubtitle')}</p>
      </section>

      <section className="flex flex-col gap-5 p-4">
        {families.map((item, i) => (
          <div key={i} className="group relative overflow-hidden rounded-lg bg-white dark:bg-surface-dark shadow-md transition-all hover:shadow-lg dark:shadow-none cursor-pointer" onClick={() => navigate('/shop')}>
            <div className="flex flex-row">
              <div className="w-1/3 bg-cover bg-center" style={{ backgroundImage: `url('${item.img}')` }}></div>
              <div className="flex flex-1 flex-col justify-center p-4">
                <div className="mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>{item.icon}</span>
                  <h3 className="text-lg font-medium text-black dark:text-white">{t(`guide.families.${item.id}.title`)}</h3>
                </div>
                <p className="text-xs font-medium uppercase tracking-wide text-primary/80 mb-2 rtl:text-right" dir="ltr">{t(`guide.families.${item.id}.notes`)}</p>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t(`guide.families.${item.id}.desc`)}</p>
              </div>
              <div className="flex w-8 items-center justify-center pr-2 rtl:pr-0 rtl:pl-2">
                <span className="material-symbols-outlined text-gray-400 rtl:rotate-180" style={{ fontSize: '20px' }}>chevron_right</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="p-4 py-8">
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-surface-dark p-6 text-center shadow-lg">
          <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl"></div>
          <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl"></div>
          <span className="mb-3 inline-flex items-center justify-center rounded-full bg-primary/20 p-3 text-primary">
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>psychology_alt</span>
          </span>
          <h2 className="mb-2 text-xl font-bold text-white">{t('guide.quiz.title')}</h2>
          <p className="mb-6 text-sm text-gray-400">{t('guide.quiz.text')}</p>
          <button className="w-full rounded-lg bg-primary py-3 text-sm font-bold uppercase tracking-wide text-background-dark transition-transform active:scale-95">{t('guide.quiz.button')}</button>
        </div>
      </section>

      <footer className="mt-auto border-t border-white/5 bg-background-dark py-12 px-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-4 mb-8">
          <a href="https://www.snapchat.com/@fatales_m" target="_blank" rel="noopener noreferrer" className="size-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
            <i className="fa-brands fa-snapchat"></i>
          </a>
          <a href="https://www.facebook.com/fatalesmauritanie/" target="_blank" rel="noopener noreferrer" className="size-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
            <i className="fa-brands fa-facebook-f"></i>
          </a>

          <a href="https://wa.me/22234258492" target="_blank" rel="noopener noreferrer" className="size-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="tel:+22234258492" className="size-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
            <i className="fa-solid fa-phone"></i>
          </a>
        </div>
        <h3 className="mb-2 font-display text-lg font-light text-white uppercase tracking-[0.2em]">FATALES</h3>
        <p className="mb-6 text-[10px] text-gray-500 uppercase tracking-widest">EST. {new Date().getFullYear()}</p>
        <button onClick={() => navigate('/shop')} className="inline-block border-b border-primary pb-1 text-sm text-primary transition-opacity hover:opacity-80 uppercase tracking-wider font-bold">{t('about.shopAll')}</button>
      </footer>
    </div>
  );
};