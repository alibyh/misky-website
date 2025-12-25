import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import {
  getHeroSlides,
  getCategories,
  getFeaturedProducts,
  getImageUrl,
  formatPrice,
  getParfumTypeLabel,
  type HeroSlide,
  type Category,
  type Product,
} from '../services/api';

export const reviews = [
  '/reviews/Screenshot 2025-12-24 at 14.26.55.png',
  '/reviews/Screenshot 2025-12-24 at 14.27.11.png',
  '/reviews/Screenshot 2025-12-24 at 14.27.39.png',
  '/reviews/Screenshot 2025-12-24 at 14.28.36.png'
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // State for data
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [heroData, categoriesData, productsData] = await Promise.all([
          getHeroSlides(i18n.language),
          getCategories(i18n.language),
          getFeaturedProducts(3, i18n.language),
        ]);

        setHeroSlides(heroData);
        setCategories(categoriesData);
        setFeaturedProducts(productsData);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(`Failed to load: ${err.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  // Auto-play hero slides
  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Match with progress-bar animation duration

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Auto-play reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-background-dark text-white font-display antialiased">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
            <p className="text-white/60 text-sm">Loading...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex items-center justify-center min-h-[60vh] px-6">
          <div className="text-center max-w-sm">
            <span className="material-symbols-outlined text-6xl text-primary/50 mb-4">error</span>
            <h3 className="text-white font-serif text-xl mb-2">Oops! Something went wrong</h3>
            <p className="text-white/60 text-sm mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-background-dark rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          {/* HeroSection Carousel */}
          <div className="relative w-full h-[90vh] overflow-hidden bg-background-dark">
            {heroSlides.length > 0 ? (
              heroSlides.map((slide, index) => (
                <div
                  key={slide.id || index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                  {/* Background with Ken Burns effect */}
                  <div
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[15000ms] ${currentSlide === index ? 'animate-ken-burns' : ''
                      }`}
                    style={{ backgroundImage: 'url("/about-header.png")' }}
                  ></div>

                  {/* Enhanced Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-transparent to-background-dark"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-background-dark/60 via-transparent to-transparent"></div>

                  <div className="relative z-20 flex h-full flex-col items-center justify-center pt-20 px-6 text-center">
                    <div className="overflow-hidden mb-4">
                      <span className={`block text-primary text-[10px] font-bold tracking-[0.4em] uppercase ${currentSlide === index ? 'reveal-text' : ''
                        }`}>
                        {slide.subtitle || t('hero.newCollection')}
                      </span>
                    </div>

                    <div className="overflow-hidden mb-6">
                      <h1 className={`text-white font-serif text-5xl md:text-6xl font-normal leading-tight tracking-tight drop-shadow-2xl ${currentSlide === index ? 'reveal-text delay-1' : ''
                        }`}>
                        {(slide.title || "").split(' ').map((word, i, arr) => {
                          if (i18n.language === 'ar') return <span key={i}>{word} </span>;
                          const isLastTwo = i >= arr.length - 2;
                          return isLastTwo ? (
                            <span key={i} className="italic text-primary font-light">
                              {i > arr.length - 2 && ' '}
                              {word}
                            </span>
                          ) : (
                            <span key={i}>{word} </span>
                          );
                        })}
                      </h1>
                    </div>

                    <div className="overflow-hidden mb-10">
                      <p className={`text-white/70 text-sm md:text-base font-light leading-relaxed max-w-[320px] mx-auto ${currentSlide === index ? 'reveal-text delay-2' : ''
                        }`}>
                        {slide.description || t('hero.description')}
                      </p>
                    </div>

                    <div className={`flex w-full gap-4 max-w-[280px] mx-auto ${currentSlide === index ? 'reveal-text delay-3' : ''
                      }`}>
                      <button
                        onClick={() => navigate(slide.primaryButton.link)}
                        className="group relative flex-1 overflow-hidden rounded-full h-14 bg-primary text-background-dark text-xs font-bold tracking-[0.2em] uppercase transition-all hover:scale-105 active:scale-95"
                      >
                        <span className="relative z-10">{slide.primaryButton.text || t('hero.shop')}</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      </button>
                      <button
                        onClick={() => navigate(slide.secondaryButton.link)}
                        className="flex-1 rounded-full h-14 bg-white/5 border border-white/20 backdrop-blur-md text-white text-xs font-bold tracking-[0.2em] uppercase transition-all hover:bg-white/10 hover:border-white/40 active:scale-95"
                      >
                        {slide.secondaryButton.text || t('hero.discover')}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Fallback Static Hero if no CMS data */
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-cover bg-center animate-ken-burns" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZVR_xMbew-ss4-QTkEfleHhUaWz_6WjivE3I1dWzG6bgQVK0WLvs_-d-Jjgb9j-F_mz2n0kX2oFZQqL4dGTpoBKcJ2Q9HytKFHZPPAKZBqnNC4Vcx5sd5uhqI2JePJemq53c_KAVmcw5FjRk6qDc01S5lkmrRufLyDJtMjFMxYjzJLynjxjCRD4_6Iw6n0Dz2rCbn4YvKXmurSrWs-zi9Xg7W45UAgWLJsIXtJ269Iz_pc73A5YHdECXx1tjSMxQCFG2GUHuvxQxo")' }}></div>
                <div className="absolute inset-0 bg-background-dark/60"></div>
                <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
                  <h1 className="text-white font-serif text-5xl reveal-text">Mesky</h1>
                </div>
              </div>
            )}

            {/* Slide Navigation & Indicators */}
            {heroSlides.length > 1 && (
              <div className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-4">
                <div className="flex gap-3">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1 mx-1 rounded-full transition-all duration-500 overflow-hidden bg-white/20 ${currentSlide === i ? 'w-12 text-primary' : 'w-6 text-white/50'}`}
                    >
                      {currentSlide === i && (
                        <div className="h-full bg-primary progress-bar"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scroll Down Arrow */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce-slow z-30 opacity-50">
              <span className="material-symbols-outlined text-white">keyboard_arrow_down</span>
            </div>
          </div>

          {/* Social Proof Strip */}
          <div className="w-full bg-surface-dark py-6 border-y border-white/5">
            <div className="flex justify-around items-center opacity-40 px-4">
              <span className="font-serif italic text-lg text-white">Vogue</span>
              <span className="font-serif italic text-lg text-white">GQ</span>
              <span className="font-serif italic text-lg text-white">Elle</span>
              <span className="font-serif italic text-lg text-white">Bazaar</span>
            </div>
          </div>

          {/* Shop by Category */}
          <section className="py-12 px-4">
            <div className="flex items-end justify-between mb-6 px-1">
              <h3 className="text-white font-serif text-2xl font-normal">{t('sections.shopByCategory')}</h3>
              <button onClick={() => navigate('/shop')} className="text-primary text-xs font-medium tracking-widest uppercase hover:text-white transition-colors mb-1">{t('sections.viewAll')}</button>
            </div>
            <div className="grid grid-cols-2 gap-3 h-[420px]">
              {categories.slice(0, 3).map((category, index) => (
                <div
                  key={category.id}
                  onClick={() => navigate('/shop')}
                  className={`relative ${index === 0 ? 'row-span-2' : 'h-full'} group overflow-hidden rounded-sm cursor-pointer`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url("${getImageUrl(category.image)}")` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 p-4 w-full">
                    <p className="text-white font-serif text-lg italic mb-1">{category.name}</p>
                    <div className="h-[1px] w-8 bg-primary"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Brand Story */}
          <section className="relative py-16 px-6 bg-surface-dark text-center border-y border-white/5">
            <div className="mx-auto max-w-xs flex flex-col items-center gap-6">
              <span className="text-primary text-[10px] uppercase tracking-[0.3em]">{t('sections.ourHeritage')}</span>
              <h2 className={`text-white font-serif text-3xl italic leading-tight ${i18n.language === 'ar' ? 'font-arabic not-italic' : ''}`}>
                "{t('sections.heritageQuote')}"
              </h2>
              <div className="h-[1px] w-12 bg-primary/50"></div>
              <p className={`text-white/60 text-sm font-light leading-relaxed ${i18n.language === 'ar' ? 'font-arabic' : ''}`}>
                {t('sections.heritageText')}
              </p>
              <button onClick={() => navigate('/about')} className="mt-2 text-white border-b border-primary pb-0.5 text-xs font-medium tracking-widest uppercase hover:text-primary transition-colors">
                {t('sections.readOurStory')}
              </button>
            </div>
          </section>

          {/* Bestsellers */}
          <section className="py-12 pb-20 overflow-hidden">
            <div className="flex items-center justify-between px-6 mb-6">
              <h3 className={`text-white font-serif text-2xl font-normal ${i18n.language === 'ar' ? 'font-arabic' : ''}`}>{t('sections.bestsellers')}</h3>
              <div className="flex gap-2">
                <button className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10">
                  <span className="material-symbols-outlined text-[16px] text-white">arrow_back</span>
                </button>
                <button className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10">
                  <span className="material-symbols-outlined text-[16px] text-white">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="flex overflow-x-auto gap-4 px-6 pb-4 hide-scrollbar snap-x snap-mandatory">
              {featuredProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[240px] snap-center group cursor-pointer" onClick={() => navigate(`/product/${product.slug}`)}>
                  <div className="relative bg-surface-dark rounded-sm aspect-[4/5] overflow-hidden mb-4">
                    <div className="absolute top-3 right-3 z-10">
                      <button className="text-white/40 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url("${product.images && product.images.length > 0 ? getImageUrl(product.images[0].image) : ''}")` }}
                    ></div>
                    <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-full bg-white/90 text-background-dark py-2 text-xs font-bold uppercase tracking-wider hover:bg-white">Add to Cart</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-white font-serif text-lg tracking-wide">{product.name}</h4>
                    <p className="text-white/50 text-xs uppercase tracking-wider">{getParfumTypeLabel(product.parfumType)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-primary font-medium">{formatPrice(product.price, i18n.language)}</p>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <p className="text-red-500/80 text-xs line-through">{formatPrice(product.compareAtPrice, i18n.language)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="py-16 px-6 bg-surface-dark/30 border-t border-white/5">
            <div className="text-center mb-10">
              <span className="text-primary text-[10px] uppercase tracking-[0.3em] block mb-2">{t('sections.customerExperiences')}</span>
              <h3 className="text-white font-serif text-3xl font-normal lowercase italic">{t('sections.reviews')}</h3>
            </div>

            <div className="relative max-w-sm mx-auto aspect-[14/9] overflow-hidden rounded-xl bg-black/40 border border-white/5 shadow-2xl">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out px-4 py-4 flex items-center justify-center ${reviewIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  <img
                    src={review}
                    alt={`Review ${index + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              ))}

              {/* Review Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${reviewIndex === i ? 'w-4 bg-primary' : 'w-1 bg-white/20'
                      }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-surface-dark border-t border-white/5 pt-12 pb-24 px-6">
            <div className="flex flex-col gap-8 mb-12">
              <h3 className="text-white font-serif text-2xl font-light">
                <Trans i18nKey="footer.joinInnerCircle" components={{ 1: <span className="text-primary italic" /> }} />
              </h3>
              <p className="text-white/60 text-sm font-light">{t('footer.subscribeText')}</p>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input
                    className={`w-full bg-transparent border-0 border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:border-primary focus:ring-0 transition-colors ${i18n.language === 'ar' ? 'pl-24 pr-0' : 'pr-24 pl-0'}`}
                    placeholder={t('footer.emailPlaceholder')}
                    type="email"
                  />
                  <button
                    className={`absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-3 text-primary uppercase text-xs font-bold tracking-widest hover:text-white transition-colors`}
                    type="button"
                  >
                    {t('footer.subscribe')}
                  </button>
                </div>
              </form>
            </div>
            <div className="grid grid-cols-2 gap-8 text-white/60 text-xs font-medium tracking-wide border-t border-white/10 pt-8">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3 hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/about')}>
                  <i className="fa-solid fa-circle-info text-[14px]"></i>
                  <span>{t('footer.aboutUs')}</span>
                </li>
                <li className="flex items-center gap-3 hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/guide')}>
                  <i className="fa-solid fa-book-open text-[14px]"></i>
                  <span>{t('footer.scentGuide')}</span>
                </li>
                <li className="flex items-center gap-3 hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/contact')}>
                  <i className="fa-solid fa-shop text-[14px]"></i>
                  <span>{t('footer.boutiques')}</span>
                </li>
              </ul>
              <div className="flex flex-col gap-4 text-right">
                <a href="https://www.tiktok.com/@mesky44" target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-2 hover:text-primary transition-colors">
                  <span>TikTok</span>
                  <i className="fa-brands fa-tiktok text-sm"></i>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-2 hover:text-primary transition-colors">
                  <span>Facebook</span>
                  <i className="fa-brands fa-facebook-f text-sm"></i>
                </a>

                <a href="tel:+22232291908" className="flex items-center justify-end gap-2 hover:text-primary transition-colors">
                  <span dir="ltr">+222 32 29 19 08</span>
                  <i className="fa-solid fa-phone text-sm"></i>
                </a>
              </div>
            </div>
            <div className="mt-12 text-center text-white/20 text-[10px] tracking-widest uppercase">
              © {new Date().getFullYear()} Mesky.
            </div>
          </footer>
        </>
      )}
    </div>
  );
};