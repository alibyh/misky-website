import { getPayload } from 'payload'
import config from './payload.config'
import 'dotenv/config'

const fixHeroSlides = async () => {
    try {
        const payload = await getPayload({ config })

        // Find all slides
        const slides = await payload.find({ collection: 'hero-slides' })

        for (const slide of slides.docs) {
            console.log(`Fixing Slide ID: ${slide.id}`)

            // Set English values
            await payload.update({
                collection: 'hero-slides',
                id: slide.id,
                data: {
                    title: 'Scent of the Golden Hour',
                    subtitle: 'New Collection',
                    description: 'Experience the essence of luxury with notes of amber, saffron, and oud.',
                    primaryButton: { text: 'Shop', link: '/shop' },
                    secondaryButton: { text: 'Discover', link: '/guide' }
                },
                locale: 'en'
            })

            // Set Arabic values
            await payload.update({
                collection: 'hero-slides',
                id: slide.id,
                data: {
                    title: 'عطر الساعة الذهبية',
                    subtitle: 'تشكيلة جديدة',
                    description: 'استمتع بعبق الفخامة مع نوتات العنبر والزعفران والعود.',
                    primaryButton: { text: 'تسوق', link: '/shop' },
                    secondaryButton: { text: 'اكتشف', link: '/guide' }
                },
                locale: 'ar'
            })
        }

        console.log('Hero slides fixed and localized!')
    } catch (error) {
        console.error(error)
    }
    process.exit(0)
}

fixHeroSlides()
