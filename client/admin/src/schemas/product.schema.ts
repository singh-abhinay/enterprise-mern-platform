import { z } from 'zod'

export const productSchema = z.object({
    name: z
        .string()
        .min(3, 'Product name must be at least 3 characters')
        .max(100, 'Product name must be less than 100 characters'),

    slug: z
        .string()
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'Slug must contain only lowercase letters, numbers, and hyphens'
        ),

    shortDescription: z
        .string()
        .min(1, 'Short description is required')
        .max(200, 'Short description must be less than 200 characters'),

    description: z
        .string()
        .min(20, 'Description must be at least 20 characters'),

    brand: z.string().min(1, 'Brand is required'),
    category: z.string().min(1, 'Category is required'),
    subCategory: z.string().optional(),

    price: z.coerce.number().min(0, 'Price must be positive'),
    discountPrice: z.coerce.number().optional(),
    costPrice: z.coerce.number().optional(),
    currency: z
        .string()
        .regex(/^[A-Z]{3}$/, 'Currency must be a 3-letter code (e.g., USD, INR, EUR)'),
    tax: z.coerce.number().min(0).max(100).optional(),

    sku: z.string().min(1, 'SKU is required'),
    stock: z.coerce.number().min(0, 'Stock must be positive'),
    minStock: z.coerce.number().min(0).optional(),
    trackStock: z.boolean().optional().default(true),
    inStock: z.boolean().optional().default(true),

    thumbnail: z.string().url().optional().or(z.literal('')),
    videoUrl: z.string().url().optional().or(z.literal('')),

    weight: z.coerce.number().positive().optional(),
    shippingCost: z.coerce.number().min(0).optional(),

    metaTitle: z.string().max(60, 'Meta title should be less than 60 characters').optional(),
    metaDescription: z.string().max(160, 'Meta description should be less than 160 characters').optional(),
    metaKeywords: z.array(z.string()).optional(),

    isActive: z.boolean().optional().default(true),
    isFeatured: z.boolean().optional().default(false),
    isDeleted: z.boolean().optional().default(false),

    freeShipping: z.boolean().optional().default(false),
})

export type ProductFormValues = z.infer<typeof productSchema>