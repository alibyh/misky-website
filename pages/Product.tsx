import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  getProductBySlug,
  getFeaturedProducts,
  getImageUrl,
  formatPrice,
  getParfumTypeLabel,
  type Product as ProductType,
} from '../services/api';

export const Product: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState('50ml');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        let data: ProductType | null = null;

        if (slug) {
          data = await getProductBySlug(slug, i18n.language);
        } else {
          // Fallback: Get first featured product if no slug provided
          const featured = await getFeaturedProducts(1, i18n.language);
          if (featured.length > 0) {
            data = featured[0];
          }
        }

        if (data) {
          setProduct(data);
          setSelectedSize(data.size || '50ml');
          setError(null);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug, i18n.language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-center px-6">
        <p className="text-red-400 mb-4">{error || 'Product not found'}</p>
        <button onClick={() => navigate('/shop')} className="text-primary underline uppercase text-xs font-bold">Return to Shop</button>
      </div>
    );
  }

  // Helper to safely get notes
  const notes = product.notes || { top: '-', middle: '-', base: '-' };

  return (
    <div className="relative flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased pb-28">
      {/* Hero Section */}
      <div className="mt-0 w-full pt-24 pb-8 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#e8e6df] to-background-light dark:from-[#2a261a] dark:to-background-dark">
        <div className="relative w-full aspect-[4/5] max-w-sm mx-auto overflow-hidden rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40">
          <div
            className="w-full h-full bg-center bg-cover bg-no-repeat transform transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url("${product.images && product.images.length > 0 ? getImageUrl(product.images[0].image) : ''}")` }}
          ></div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images?.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full shadow-sm ${idx === 0 ? 'w-6 bg-primary' : 'w-1.5 bg-slate-400/50 backdrop-blur-sm'}`}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        <div className="flex flex-col gap-1 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">{getParfumTypeLabel(product.parfumType)}</p>
            <div className="flex items-center gap-1 text-primary text-sm">
              <span className="material-symbols-outlined text-[18px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold">4.8</span>
              <span className="text-xs text-slate-400 dark:text-gray-500 font-normal ms-1 border-b border-slate-400/30">(124)</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">{product.name}</h1>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{formatPrice(product.price, i18n.language)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-red-500/80 text-base font-medium line-through">{formatPrice(product.compareAtPrice, i18n.language)}</span>
            )}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-3">{t('product.selectSize')}</p>
          <div className="flex gap-3">
            <button className="relative flex-1 py-3 px-4 rounded-lg border border-primary bg-primary/10 text-primary transition-all active:scale-[0.98]">
              <span className="text-sm font-bold">{product.size}</span>
              <span className="absolute top-0 right-0 -mt-2 -mr-2 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
              </span>
            </button>
            <button className="flex-1 py-3 px-4 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent text-slate-600 dark:text-gray-400 hover:border-slate-300 dark:hover:border-white/30 transition-all active:scale-[0.98]">
              <span className="text-sm font-medium">100 ml</span>
            </button>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm font-light">
            {product.description}
          </p>
        </div>

        <div className="w-full flex items-center justify-center mb-10 opacity-30">
          <div className="h-px bg-current w-12 text-primary"></div>
          <span className="mx-2 text-primary material-symbols-outlined text-sm">diamond</span>
          <div className="h-px bg-current w-12 text-primary"></div>
        </div>

        <div className="space-y-8 mb-10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('product.olfactoryNotes')}</h3>
          <div className="relative flex flex-col items-center gap-8 py-2">
            <div className="flex flex-col items-center text-center gap-3 relative z-10 w-full">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-background-light to-white dark:from-white/5 dark:to-white/10 border border-slate-100 dark:border-white/5 flex items-center justify-center text-primary shadow-lg dark:shadow-black/20">
                <span className="material-symbols-outlined">filter_drama</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-gray-500 mb-1">{t('product.topNotes')}</span>
                <span className="text-base font-medium text-slate-900 dark:text-white">{notes.top}</span>
              </div>
            </div>
            <div className="absolute top-10 bottom-10 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-x-1/2 -z-0 border-l border-dashed border-primary/50"></div>
            <div className="flex flex-col items-center text-center gap-3 relative z-10 w-full">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-background-light to-white dark:from-white/5 dark:to-white/10 border border-slate-100 dark:border-white/5 flex items-center justify-center text-primary shadow-lg dark:shadow-black/20">
                <span className="material-symbols-outlined">favorite</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-gray-500 mb-1">{t('product.heartNotes')}</span>
                <span className="text-base font-medium text-slate-900 dark:text-white">{notes.middle}</span>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3 relative z-10 w-full">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-background-light to-white dark:from-white/5 dark:to-white/10 border border-slate-100 dark:border-white/5 flex items-center justify-center text-primary shadow-lg dark:shadow-black/20">
                <span className="material-symbols-outlined">spa</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-gray-500 mb-1">{t('product.baseNotes')}</span>
                <span className="text-base font-medium text-slate-900 dark:text-white">{notes.base}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-10">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <span className="material-symbols-outlined text-lg">hourglass_top</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">{t('product.longevity')}</span>
            </div>
            <div className="mt-auto">
              <div className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary w-[85%] rounded-full shadow-[0_0_10px_rgba(217,183,74,0.5)]"></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-gray-400 text-end font-medium bg-transparent">{t('product.longLasting')}</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <span className="material-symbols-outlined text-lg">air</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">{t('product.sillage')}</span>
            </div>
            <div className="mt-auto">
              <div className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary w-[60%] rounded-full shadow-[0_0_10px_rgba(217,183,74,0.5)]"></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-gray-400 text-end font-medium bg-transparent">{t('product.moderate')}</p>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-slate-100 dark:bg-white/5 mb-8"></div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/90 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-white/5 z-50 max-w-md mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-gray-400">{t('product.total')}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-900 dark:text-white">{formatPrice(product.price, i18n.language)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-red-500/80 text-[10px] line-through">{formatPrice(product.compareAtPrice, i18n.language)}</span>
              )}
            </div>
          </div>
          <button className="flex-1 bg-primary hover:bg-[#c2a33f] text-[#201c12] font-bold py-3.5 px-6 rounded-lg shadow-[0_0_20px_rgba(217,183,74,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">shopping_bag</span>
            {t('product.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};