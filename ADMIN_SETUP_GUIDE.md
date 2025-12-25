# Payload CMS Admin Dashboard - Quick Start Guide

## What We've Set Up

Your Payload CMS backend is ready with the following collections:

### 1. **Products Collection**
Manage your perfume products with:
- Name, slug, description
- Price and sale pricing
- Category relationship
- Perfume type (Eau de Parfum, Eau de Toilette, etc.)
- Size (50ml, 100ml, etc.)
- Image gallery (up to 5 images)
- Fragrance notes (Top, Middle, Base)
- Featured product toggle
- Inventory management (stock quantity, in-stock status)

### 2. **Categories Collection**
Organize products into categories:
- For Him
- For Her  
- Unisex
- Custom categories

### 3. **Hero Slides Collection**
Manage homepage hero carousel:
- Title and subtitle
- Description
- Background image
- Primary and secondary buttons
- Active/inactive toggle
- Display order

### 4. **Media Collection**
Upload and manage all images for:
- Product photos
- Category images
- Hero backgrounds

### 5. **Users Collection**
Admin user management

## Next Steps

### Step 1: Install and Start MongoDB

**Option A - Quick (using MongoDB Atlas - Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a FREE cluster (no credit card needed)
3. Get your connection string (should look like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/aurum-parfums
   ```
4. Update `/backend/.env` with your connection string:
   ```
   DATABASE_URL=your-connection-string-here
   ```

**Option B - Local MongoDB**
Wait for the current Homebrew installation to complete, then:
```bash
brew services start mongodb-community@8.0
```

### Step 2: Start Payload Backend

```bash
cd /Users/alibyh/Desktop/Projects/mesky-website/backend
npm run dev
```

This will start the backend on **http://localhost:3001**

### Step 3: Create Admin User

1. Open http://localhost:3001/admin in your browser
2. Create your first admin user account
3. Log in

### Step 4: Add Your Data

#### Add Categories First:
1. Go to **Categories** in the admin panel
2. Click **Create New**
3. Add these three categories:
   - **For Him** (slug: `for-him`)
   - **For Her** (slug: `for-her`)
   - **Unisex** (slug: `unisex`)
4. Upload category images

#### Add Products:
1. Go to **Media** and upload product images
2. Go to **Products** → **Create New**
3. Fill in product details:
   - Name: "Midnight Oud"
   - Slug: "midnight-oud"  
   - Price: 180
   - Category: Select "For Him" or "Unisex"
   - Upload images
   - Add fragrance notes
   - Mark as "Featured" for bestsellers
   - Set stock quantity

Repeat for all your products!

#### Add Hero Slide:
1. Go to **Hero Slides** → **Create New**
2. Upload background image
3. Set title: "Scent of the Golden Hour"
4. Add description
5. Configure buttons
6. Mark as "Active"

### Step 5: Update Frontend to Use Payload API

I can help you update the frontend React code to fetch data from Payload instead of using hardcoded data.

## Helpful URLs

- **Admin Panel**: http://localhost:3001/admin
- **API Documentation**: http://localhost:3001/api-docs
- **Products API**: http://localhost:3001/api/products
- **Categories API**: http://localhost:3001/api/categories
- **Hero Slides API**: http://localhost:3001/api/hero-slides

## Troubleshooting

### MongoDB Connection Error
If you see "MongooseServerSelectionError", make sure MongoDB is running:
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb-community@8.0
```

### Port Already in Use
If port 3001 is in use, start on a different port:
```bash
PORT=4000 npm run dev
```

### Need Sample Data?
Check `/backend/src/seed-data.ts` for sample product data structure.

## What's Next?

Once you have data in Payload, I'll help you:
1. Create a data fetching service in your frontend
2. Replace hardcoded data with API calls
3. Add loading states and error handling
4. Implement image optimization
5. Add environment variables for API URL

Ready to proceed? Let me know when MongoDB is installed and I'll help you start the backend!
