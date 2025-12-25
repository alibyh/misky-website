import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  getProducts,
  getCategories,
  getImageUrl,
  formatPrice,
  getParfumTypeLabel,
  type Category,
  type Product,
} from '../services/api';

export const Shop: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const triggerMenu = () => window.dispatchEvent(new Event('toggle-nav-menu'));

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, productsData] = await Promise.all([
          getCategories(i18n.language),
          getProducts({ locale: i18n.language, limit: 100 }), // increased limit for list
        ]);

        setCategories(categoriesData);
        setProducts(productsData.docs);
        setError(null);
      } catch (err) {
        console.error('Error fetching shop data:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  // Filter products locally for now (could be API based)
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category.id === selectedCategory)
    : products;

  return (
    <div className="relative flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display transition-colors">
      {/* Categories / Filters */}
      <div className="flex w-full overflow-x-auto hide-scrollbar gap-2 px-4 pt-4 pb-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 shadow-lg transition-transform active:scale-95 ${!selectedCategory ? 'bg-primary text-background-dark shadow-primary/20' : 'bg-transparent border border-slate-200 dark:border-white/20 text-slate-600 dark:text-gray-300 hover:border-primary/50'}`}
        >
          {!selectedCategory && <span className="material-symbols-outlined !text-[18px]">tune</span>}
          <span className="text-xs font-bold uppercase tracking-wide">{t('sections.viewAll')}</span>
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full border px-4 transition-colors active:scale-95 ${selectedCategory === cat.id ? 'bg-primary border-primary text-background-dark' : 'bg-transparent border-slate-200 dark:border-white/20 text-slate-600 dark:text-gray-300 hover:border-primary/50'}`}
          >
            <span className="text-xs font-medium tracking-wide">{cat.name}</span>
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-10 px-6">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="text-primary underline uppercase text-xs font-bold">Retry</button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-4 mt-6">
        {!loading && filteredProducts.map((p) => (
          <div key={p.id} className="group flex flex-col gap-3 cursor-pointer" onClick={() => navigate(`/product/${p.slug}`)}>
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-dark/50">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url("${p.images && p.images.length > 0 ? getImageUrl(p.images[0].image) : ''}")` }}
              ></div>
              {(p.featured || p.newArrival) && (
                <div className="absolute top-2 left-2">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-wide border ${p.featured ? 'bg-black/40 backdrop-blur text-white border-white/10' : 'bg-primary text-background-dark border-transparent'}`}>
                    {p.featured ? 'BESTSELLER' : 'NEW'}
                  </span>
                </div>
              )}
              <button className="absolute bottom-3 right-3 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary hover:text-background-dark hover:border-primary transition-all active:scale-95 shadow-lg">
                <span className="material-symbols-outlined !text-[20px]">add</span>
              </button>
            </div>
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-slate-900 dark:text-white text-base font-semibold leading-tight tracking-tight">{p.name}</h3>
                <div className="flex flex-col items-end">
                  <span className="text-primary text-sm font-bold">{formatPrice(p.price, i18n.language)}</span>
                  {p.compareAtPrice && p.compareAtPrice > p.price && (
                    <span className="text-red-500/80 text-[10px] line-through">{formatPrice(p.compareAtPrice, i18n.language)}</span>
                  )}
                </div>
              </div>
              <p className="text-slate-500 dark:text-[#c3b998] text-xs font-normal mt-1">{getParfumTypeLabel(p.parfumType)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};