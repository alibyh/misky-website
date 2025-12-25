import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'price', 'category', 'featured'],
    },
    access: {
        read: () => true, // Public read access
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Product Name',
            localized: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'URL Slug',
            admin: {
                description: 'Used in the URL (e.g., midnight-oud)',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            label: 'Short Description',
            localized: true,
        },
        {
            name: 'fullDescription',
            type: 'richText',
            label: 'Full Description',
            localized: true,
        },
        {
            name: 'price',
            type: 'number',
            required: true,
            min: 0,
            label: 'Price (USD)',
        },
        {
            name: 'compareAtPrice',
            type: 'number',
            min: 0,
            label: 'Compare at Price (for sale items)',
            admin: {
                description: 'Original price if this item is on sale',
            },
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
            hasMany: false,
        },
        {
            name: 'parfumType',
            type: 'select',
            required: true,
            options: [
                { label: 'Eau de Parfum', value: 'eau_de_parfum' },
                { label: 'Eau de Toilette', value: 'eau_de_toilette' },
                { label: 'Extrait de Parfum', value: 'extrait_de_parfum' },
                { label: 'Eau de Cologne', value: 'eau_de_cologne' },
            ],
            defaultValue: 'eau_de_parfum',
        },
        {
            name: 'size',
            type: 'text',
            required: true,
            defaultValue: '50ml',
            label: 'Size',
        },
        {
            name: 'images',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 5,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
        {
            name: 'notes',
            type: 'group',
            fields: [
                {
                    name: 'top',
                    type: 'text',
                    label: 'Top Notes',
                    localized: true,
                    admin: {
                        description: 'e.g., Bergamot, Lemon, Saffron',
                    },
                },
                {
                    name: 'middle',
                    type: 'text',
                    label: 'Middle Notes',
                    localized: true,
                    admin: {
                        description: 'e.g., Rose, Jasmine, Lavender',
                    },
                },
                {
                    name: 'base',
                    type: 'text',
                    label: 'Base Notes',
                    localized: true,
                    admin: {
                        description: 'e.g., Oud, Amber, Vanilla',
                    },
                },
            ],
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
            label: 'Featured Product',
            admin: {
                description: 'Show this product in featured/bestsellers section',
            },
        },
        {
            name: 'newArrival',
            type: 'checkbox',
            defaultValue: false,
            label: 'New Arrival',
        },
        {
            name: 'inStock',
            type: 'checkbox',
            defaultValue: true,
            label: 'In Stock',
        },
        {
            name: 'stockQuantity',
            type: 'number',
            min: 0,
            defaultValue: 0,
            label: 'Stock Quantity',
        },
    ],
}
