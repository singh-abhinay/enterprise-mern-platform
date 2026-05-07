import { ProductCard } from './product-card'

interface ProductGridProps {
    products: {
        _id: string
        name: string
        description: string
        image: string
        slug: string
        isActive: boolean
    }[]
}

export function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {products.map((product) => (
                <ProductCard key={product._id} productData={product} />
            ))}
        </div>
    )
}