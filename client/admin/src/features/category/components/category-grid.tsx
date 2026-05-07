import { CategoryCard } from './category-card'

interface CategoryGridProps {
    categories: {
        _id: string
        name: string
        description: string
        image: string
        slug: string
        isActive: boolean
    }[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
            ))}
        </div>
    )
}