import type { CollectionConfig } from 'payload'

export const HeroSlides: CollectionConfig = {
    slug: 'hero-slides',
    admin: {
        useAsTitle: 'title',
        description: 'Manage homepage hero section slides',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
            localized: true,
        },
        {
            name: 'subtitle',
            type: 'text',
            label: 'Subtitle/Tag',
            localized: true,
            admin: {
                description: 'e.g., "New Collection"',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            localized: true,
        },
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Background Image',
        },
        {
            name: 'primaryButton',
            type: 'group',
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    defaultValue: 'Shop',
                    localized: true,
                },
                {
                    name: 'link',
                    type: 'text',
                    defaultValue: '/shop',
                },
            ],
        },
        {
            name: 'secondaryButton',
            type: 'group',
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    defaultValue: 'Discover',
                    localized: true,
                },
                {
                    name: 'link',
                    type: 'text',
                    defaultValue: '/guide',
                },
            ],
        },
        {
            name: 'active',
            type: 'checkbox',
            defaultValue: true,
            label: 'Active',
        },
        {
            name: 'displayOrder',
            type: 'number',
            defaultValue: 0,
            label: 'Display Order',
        },
    ],
}
