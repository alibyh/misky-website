// Payload CMS API Service
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export interface PayloadImage {
    id: string;
    alt?: string;
    url: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: PayloadImage;
    displayOrder: number;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    fullDescription?: any;
    price: number;
    compareAtPrice?: number;
    category: Category;
    parfumType: 'eau_de_parfum' | 'eau_de_toilette' | 'extrait_de_parfum' | 'eau_de_cologne';
    size: string;
    images: Array<{ image: PayloadImage }>;
    notes?: {
        top?: string;
        middle?: string;
        base?: string;
    };
    featured: boolean;
    newArrival: boolean;
    inStock: boolean;
    stockQuantity: number;
    createdAt: string;
    updatedAt: string;
}

export interface HeroSlide {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    backgroundImage: PayloadImage;
    primaryButton: {
        text: string;
        link: string;
    };
    secondaryButton: {
        text: string;
        link: string;
    };
    active: boolean;
    displayOrder: number;
}

export interface PayloadResponse<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

// 1. Better Locale Sanitizer
const sanitizeLocale = (loc?: string) => {
    if (!loc) return 'en';
    const l = loc.toLowerCase();
    if (l.startsWith('ar')) return 'ar';
    if (l.startsWith('fr')) return 'fr';
    return 'en';
};

// 2. Fetch Helper with Cache Bashing
const fetchWithCacheControl = async (url: string) => {
    const separator = url.includes('?') ? '&' : '?';
    const timestampedUrl = `${url}${separator}t=${Date.now()}`;
    const response = await fetch(timestampedUrl);
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
    return response.json();
};

// Fetch all products
export async function getProducts(params?: {
    limit?: number;
    page?: number;
    where?: any;
    locale?: string;
}): Promise<PayloadResponse<Product>> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.where) queryParams.append('where', JSON.stringify(params.where));
    queryParams.append('locale', sanitizeLocale(params?.locale));
    queryParams.append('depth', '2');

    return fetchWithCacheControl(`${API_URL}/products?${queryParams}`);
}

// Fetch featured products
export async function getFeaturedProducts(limit = 10, locale?: string): Promise<Product[]> {
    const response = await getProducts({
        limit,
        where: { featured: { equals: true } },
        locale,
    });
    return response.docs;
}

// Fetch single product by slug
export async function getProductBySlug(slug: string, locale?: string): Promise<Product | null> {
    const loc = sanitizeLocale(locale);
    const data: PayloadResponse<Product> = await fetchWithCacheControl(
        `${API_URL}/products?where[slug][equals]=${slug}&limit=1&locale=${loc}&depth=2`
    );
    return data.docs[0] || null;
}

// Fetch all categories
export async function getCategories(locale?: string): Promise<Category[]> {
    const loc = sanitizeLocale(locale);
    const data: PayloadResponse<Category> = await fetchWithCacheControl(
        `${API_URL}/categories?sort=displayOrder&limit=100&locale=${loc}&depth=2`
    );
    // Debug: log category images to help diagnose
    if (data.docs.length > 0) {
        console.log('Categories fetched:', data.docs.map(cat => ({
            name: cat.name,
            image: cat.image,
            imageType: typeof cat.image,
            imageUrl: typeof cat.image === 'object' ? cat.image?.url : cat.image
        })));
    }
    return data.docs;
}

// Fetch active hero slides
export async function getHeroSlides(locale?: string): Promise<HeroSlide[]> {
    const loc = sanitizeLocale(locale);
    const data: PayloadResponse<HeroSlide> = await fetchWithCacheControl(
        `${API_URL}/hero-slides?where[active][equals]=true&sort=displayOrder&limit=10&locale=${loc}&depth=2`
    );
    return data.docs;
}

// Helper to get image URL
export function getImageUrl(image: PayloadImage | string | undefined): string {
    if (!image) return '';
    const baseUrl = API_URL.replace('/api', '');
    if (typeof image === 'string') {
        // If it's a string ID, we can't resolve it here - it should be populated by the API
        // But if it's already a URL, return it
        if (image.startsWith('http') || image.startsWith('data:')) return image;
        // If it's a relative path, prepend base URL
        return `${baseUrl}${image}`;
    }
    if (image.url) {
        if (image.url.startsWith('http') || image.url.startsWith('data:')) return image.url;
        return `${baseUrl}${image.url}`;
    }
    // Fallback: try to construct URL from filename if available
    if (image.filename) {
        console.warn('Image URL missing, using filename fallback:', image.filename);
    }
    return '';
}

export function formatPrice(price: number, locale = 'en'): string {
    const isAr = locale.startsWith('ar');
    const isFr = locale.startsWith('fr');

    // Using en-US or fr-FR for the number part
    const formattedNumber = isFr
        ? price.toLocaleString('fr-FR')
        : price.toLocaleString('en-US');

    return isAr
        ? `${formattedNumber} أوقية`
        : `${formattedNumber} MRU`;
}

export function getParfumTypeLabel(type: string): string {
    const labels: Record<string, string> = {
        eau_de_parfum: 'Eau de Parfum',
        eau_de_toilette: 'Eau de Toilette',
        extrait_de_parfum: 'Extrait de Parfum',
        eau_de_cologne: 'Eau de Cologne',
    };
    return labels[type] || type;
}
