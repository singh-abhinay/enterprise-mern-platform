import { useState } from 'react'
import { Plus, Search } from 'lucide-react'

import { Main } from '@/components/layout/main'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { categories } from './data/categories'
import { CategoryGrid } from './components/category-grid'
import { CategoryForm } from './components/category-form'

import { useCategoryStore } from '@/stores/use-category-store'

export function Category() {
    const [search, setSearch] = useState('')

    const openCreate = useCategoryStore(
        (state) => state.openCreate
    )

    const filteredCategories = categories.filter(
        (category) =>
            category.name
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
                            Categories
                        </h1>

                        <p className='text-muted-foreground'>
                            Manage your product categories.
                        </p>
                    </div>

                    <Button onClick={openCreate}>
                        <Plus className='mr-2 size-4' />
                        Add Category
                    </Button>
                </div>

                {/* Search */}
                <div className='relative max-w-sm'>
                    <Search className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />

                    <Input
                        placeholder='Search categories...'
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className='pl-9'
                    />
                </div>

                {/* Grid */}
                <CategoryGrid
                    categories={filteredCategories}
                />

                {/* Modal */}
                <CategoryForm />
            </section>
        </Main>
    )
}