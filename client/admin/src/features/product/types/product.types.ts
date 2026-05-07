export interface ProductTypeImage {
    _id?: string
    url: string
    alt: string
}

export interface ProductType {
    _id?: string

    name: string
    description: string
    shortDescription: string

    brand: string

    category: string

    price: number
    currency: string

    sku: string

    stock: number
    minStock: number

    trackStock: boolean
    inStock: boolean

    images: ProductTypeImage[]

    averageRating: number
    numReviews: number

    freeShipping: boolean

    metaKeywords: string[]

    isActive: boolean
    isFeatured: boolean
    isDeleted: boolean

    variants: unknown[]
    variantProducts: unknown[]

    slug: string

    metaTitle: string
    metaDescription: string

    createdAt?: string
    updatedAt?: string
}