import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { cloudinaryPlugin } from 'payload-cloudinary-plugin'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { HeroSlides } from './collections/HeroSlides'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products, Categories, HeroSlides],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    cloudinaryPlugin({
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      },
      collections: {
        media: {
          disablePayloadAccessControl: true,
        }
      }
    }),
  ],
  cors: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:4000',
    '*' // Allow all for demo purposes, can be restricted later
  ],
  csrf: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:4000',
  ],
  localization: {
    locales: ['en', 'ar', 'fr'],
    defaultLocale: 'en',
    fallback: true,
  },
  serverURL,
  cookiePrefix: 'payload',
})
