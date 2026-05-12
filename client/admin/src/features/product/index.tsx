import { useState } from 'react'
import { Plus, Search } from 'lucide-react'

import { Main } from '@/components/layout/main'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { products } from './data/product'
import { ProductGrid } from './components/product-grid'
import { ProductForm } from './components/product-form'

import { useProductStore } from '@/stores/use-product-store'
import { useNavigate } from '@tanstack/react-router'

export function Product() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const openCreate = useProductStore(
        (state) => state.openCreate
    )

    const filteredProducts = products.filter(
        (product) =>
            product.name
                .toLowerCase()
                .includes(search.toLowerCase())
    )

    return (
        <Main fixed>
            <section className='space-y-6'>
                {/* Top Section */}
                <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold tracking-tight'>
                            Products
                        </h1>

                        <p className='text-muted-foreground'>
                            Manage your products list.
                        </p>
                    </div>

                    <Button onClick={() => navigate({ to: '/product/add' })}>
                        <Plus className='mr-2 size-4' />
                        Add Product
                    </Button>
                </div>

                {/* Search */}
                <div className='relative max-w-sm'>
                    <Search className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />

                    <Input
                        placeholder='Search products...'
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className='pl-9'
                    />
                </div>

                {/* Grid */}
                <ProductGrid
                    products={filteredProducts}
                />
            </section>
        </Main>
    )
}