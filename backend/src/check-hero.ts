import { getPayload } from 'payload'
import config from './payload.config'
import 'dotenv/config'

const checkHeroSlides = async () => {
    try {
        const payload = await getPayload({ config })
        const slidesEn = await payload.find({ collection: 'hero-slides', locale: 'en' })
        const slidesAr = await payload.find({ collection: 'hero-slides', locale: 'ar' })

        console.log('--- English Slides ---')
        slidesEn.docs.forEach(s => console.log(`Title: ${s.title}, Sub: ${s.subtitle}, Btn1: ${s.primaryButton?.text}, Btn2: ${s.secondaryButton?.text}`))

        console.log('--- Arabic Slides ---')
        slidesAr.docs.forEach(s => console.log(`Title: ${s.title}, Sub: ${s.subtitle}, Btn1: ${s.primaryButton?.text}, Btn2: ${s.secondaryButton?.text}`))
    } catch (error) {
        console.error(error)
    }
    process.exit(0)
}

checkHeroSlides()
