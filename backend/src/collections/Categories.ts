import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Category Name',
            localized: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'URL Slug',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            localized: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Category Image',
        },
        {
            name: 'displayOrder',
            type: 'number',
            defaultValue: 0,
            label: 'Display Order',
            admin: {
                description: 'Lower numbers appear first',
            },
        },
    ],
}
