import { getPayload } from 'payload'
import config from './payload.config'
import 'dotenv/config'

const categoryTranslations: Record<string, { name: string; description: string }> = {
    'for-him': {
        name: 'له',
        description: 'عطور راقية للرجل العصري'
    },
    'for-her': {
        name: 'لها',
        description: 'روائح أنيقة وخالدة للنساء'
    },
    'unisex': {
        name: 'للجنسين',
        description: 'عطور متعددة الاستخدامات للجميع'
    }
}

const productTranslations: Record<string, { name: string; description: string; notes?: { top: string; middle: string; base: string } }> = {
    'midnight-oud': {
        name: 'عود منتصف الليل',
        description: 'مزيج غني وغامض من العود والعنبر. مثالي للمساء.',
        notes: {
            top: 'زعفران، برغموت',
            middle: 'ورد، ياسمين',
            base: 'عود، عنبر، فانيليا'
        }
    },
    'golden-amber': {
        name: 'العنبر الذهبي',
        description: 'دافئ وفاخر مع نوتات العنبر والتوابل.',
        notes: {
            top: 'هيل، برتقال',
            middle: 'عنبر، قرفة',
            base: 'صندل، مسك، تونكا'
        }
    },
    'rose-noir': {
        name: 'الورد الأسود',
        description: 'عطر وردي غامق وجذاب بلمسة عصرية.',
        notes: {
            top: 'كشمش أسود، فلفل وردي',
            middle: 'ورد، باتشولي',
            base: 'جلد، خشب الأرز، بخور'
        }
    }
}

const heroSlideTranslations: Record<string, { title: string; subtitle: string; description: string; primaryButton: { text: string }; secondaryButton: { text: string } }> = {
    'Aura & Essence': {
        title: 'عبق الجوهر',
        subtitle: 'تشكيلة جديدة',
        description: 'اكتشف أحدث عطورنا المميزة المصممة للروح العصرية.',
        primaryButton: { text: 'تسوق الآن' },
        secondaryButton: { text: 'اكتشف المزيد' }
    },
    'Scent of the Golden Hour': {
        title: 'عطر الساعة الذهبية',
        subtitle: 'إصدار محدود',
        description: 'لحظات ذهبية في زجاجة. عطر يجسد دفء الغسق.',
        primaryButton: { text: 'تسوق المجموعة' },
        secondaryButton: { text: 'تعرف على القصة' }
    }
}

const updateTranslations = async () => {
    console.log('Starting translation update...')

    try {
        const payload = await getPayload({ config })

        // Update Categories
        console.log('Updating Categories...')
        const categories = await payload.find({ collection: 'categories', limit: 100 })
        for (const cat of categories.docs) {
            if (categoryTranslations[cat.slug]) {
                console.log(`Translating Category: ${cat.slug}`)
                await payload.update({
                    collection: 'categories',
                    id: cat.id,
                    data: categoryTranslations[cat.slug],
                    locale: 'ar'
                })
            }
        }

        // Update Products
        console.log('Updating Products...')
        const products = await payload.find({ collection: 'products', limit: 100 })
        console.log('Found products with slugs:', products.docs.map(p => p.slug).join(', '))
        for (const p of products.docs) {
            if (productTranslations[p.slug]) {
                console.log(`Translating Product: ${p.slug}`)
                await payload.update({
                    collection: 'products',
                    id: p.id,
                    data: productTranslations[p.slug],
                    locale: 'ar'
                })
            }
        }

        // Update Hero Slides
        console.log('Updating Hero Slides...')
        const slides = await payload.find({ collection: 'hero-slides', limit: 10 })
        for (const slide of slides.docs) {
            if (heroSlideTranslations[slide.title]) {
                console.log(`Translating Hero Slide: ${slide.title}`)
                await payload.update({
                    collection: 'hero-slides',
                    id: slide.id,
                    data: heroSlideTranslations[slide.title],
                    locale: 'ar'
                })
            }
        }

        console.log('Translation update complete!')
    } catch (error) {
        console.error('Error updating translations:', error)
    } finally {
        process.exit(0)
    }
}

updateTranslations()
