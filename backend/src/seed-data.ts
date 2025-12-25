export const seedCategories = [
    {
        name: 'For Him',
        slug: 'for-him',
        description: 'Sophisticated fragrances for the modern gentleman',
        displayOrder: 1,
    },
    {
        name: 'For Her',
        slug: 'for-her',
        description: 'Elegant and timeless scents for women',
        displayOrder: 2,
    },
    {
        name: 'Unisex',
        slug: 'unisex',
        description: 'Versatile fragrances for everyone',
        displayOrder: 3,
    },
]

export const seedProducts = [
    {
        name: 'Midnight Oud',
        slug: 'midnight-oud',
        description: 'A rich, mysterious blend of oud and amber. Perfect for evening wear.',
        price: 180,
        parfumType: 'eau_de_parfum',
        size: '50ml',
        notes: {
            top: 'Saffron, Bergamot',
            middle: 'Rose, Jasmine',
            base: 'Oud, Amber, Vanilla',
        },
        featured: true,
        newArrival: false,
        inStock: true,
        stockQuantity: 25,
    },
    {
        name: 'Golden Amber',
        slug: 'golden-amber',
        description: 'Warm and luxurious with notes of amber and spice.',
        price: 210,
        parfumType: 'extrait_de_parfum',
        size: '50ml',
        notes: {
            top: 'Cardamom, Orange',
            middle: 'Amber, Cinnamon',
            base: 'Sandalwood, Musk, Tonka Bean',
        },
        featured: true,
        newArrival: true,
        inStock: true,
        stockQuantity: 15,
    },
    {
        name: 'Rose Noir',
        slug: 'rose-noir',
        description: 'A dark, seductive rose fragrance with a modern twist.',
        price: 145,
        parfumType: 'eau_de_toilette',
        size: '50ml',
        notes: {
            top: 'Black Currant, Pink Pepper',
            middle: 'Rose, Patchouli',
            base: 'Leather, Cedarwood, Incense',
        },
        featured: true,
        newArrival: false,
        inStock: true,
        stockQuantity: 30,
    },
]

export const seedHeroSlide = {
    title: 'Scent of the Golden Hour',
    subtitle: 'New Collection',
    description: 'Experience the essence of luxury with notes of amber, saffron, and oud.',
    primaryButton: {
        text: 'Shop',
        link: '/shop',
    },
    secondaryButton: {
        text: 'Discover',
        link: '/guide',
    },
    active: true,
    displayOrder: 1,
}
