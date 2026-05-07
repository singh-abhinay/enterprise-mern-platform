import { ProductType } from '../types/product.types'

export const defaultProduct: ProductType = {
    name: '',
    description: '',
    shortDescription: '',

    brand: '',

    category: '',

    price: 0,
    currency: 'INR',

    sku: '',

    stock: 0,
    minStock: 0,

    trackStock: true,
    inStock: true,

    images: [],

    averageRating: 0,
    numReviews: 0,

    freeShipping: false,

    metaKeywords: [],

    isActive: true,
    isFeatured: false,
    isDeleted: false,

    variants: [],
    variantProducts: [],

    slug: '',

    metaTitle: '',
    metaDescription: '',
}