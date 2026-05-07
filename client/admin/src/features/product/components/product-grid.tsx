import { ProductType } from '@/features/product/types/product.types'

import { ProductCard } from './product-card'

interface ProductGridProps {
    products: ProductType[]
}

export function ProductGrid({
    products,
}: ProductGridProps) {
    return (
        <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    productData={product}
                />
            ))}
        </div>
    )
}