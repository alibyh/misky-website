# Payload CMS Backend for Aurum Parfums

This is the admin backend for the Aurum Parfums e-commerce site, built with Payload CMS.

## Features

- **Products Collection**: Manage perfume products with images, prices, fragrance notes, and inventory
- **Categories Collection**: Organize products (For Him, For Her, Unisex)
- **Hero Slides Collection**: Manage homepage hero carousel content
- **Media Collection**: Upload and manage images
- **Users Collection**: Admin user management

## Prerequisites

- Node.js 18+ or 20+
- MongoDB (local or cloud instance)

## Setup

### 1. Install MongoDB

**Option A: Using Homebrew (Mac)**
```bash
brew tap mongodb/brew
brew install mongodb-community@8.0
brew services start mongodb-community@8.0
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `.env` file with your connection string

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

The `.env` file should contain:
```env
DATABASE_URL=mongodb://127.0.0.1/backend
PAYLOAD_SECRET=your-secret-key-here
```

### 4. Start the Development Server

```bash
npm run dev
```

The admin panel will be available at: **http://localhost:3001/admin**

### 5. Create Your First Admin User

When you first visit `/admin`, you'll be prompted to create an admin user.

## Adding Initial Data

1. **Categories**: Add these first
   - For Him (slug: for-him)
   - For Her (slug: for-her)
   - Unisex (slug: unisex)

2. **Products**: Add your perfume products
   - Upload product images through the Media collection
   - Link to appropriate categories
   - Set fragrance notes, price, and other details

3. **Hero Slides**: Add homepage hero content
   - Upload background images
   - Set titles, descriptions, and button links

## API Endpoints

Once running, your frontend can access data at:

- **Products**: `GET http://localhost:3001/api/products`
- **Categories**: `GET http://localhost:3001/api/categories`
- **Hero Slides**: `GET http://localhost:3001/api/hero-slides`
- **Single Product**: `GET http://localhost:3001/api/products/{id}`

### Example API Response

```json
{
  "docs": [
    {
      "id": "123",
      "name": "Midnight Oud",
      "price": 180,
      "category": {...},
      "images": [...]
    }
  ],
  "totalDocs": 10,
  "limit": 10,
  "page": 1
}
```

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate:types` - Generate TypeScript types
- `npm start` - Start production server

## Port Configuration

By default, Payload runs on **port 3001** (configured in Next.js).

To change the port, run:
```bash
PORT=4000 npm run dev
```

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (your frontend)
- `http://127.0.0.1:3000`

## Next Steps

1. Start MongoDB
2. Run `npm run dev`
3. Visit `http://localhost:3001/admin`
4. Create admin user
5. Add your perfume data
6. Update frontend to fetch from API instead of using mock data
