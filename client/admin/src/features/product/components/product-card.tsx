import { Pencil, Trash2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { useProductStore } from '@/stores/use-product-store'

interface ProductCardProps {
    productData: {
        _id: string
        name: string
        description: string
        image: string
        slug: string
        isActive: boolean
    }
}

export function ProductCard({ productData }: ProductCardProps) {
    const openEdit = useProductStore(
        (state) => state.openEdit
    )
    return (
        <Card className='overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg'>
            <img
                src={productData.image}
                alt={productData.name}
                className='h-52 w-full object-cover'
            />

            <CardContent className='space-y-4 p-5'>
                <div className='flex items-start justify-between gap-3'>
                    <div>
                        <h2 className='text-lg font-semibold'>{productData.name}</h2>
                        <p className='text-sm text-muted-foreground'>
                            {productData.slug}
                        </p>
                    </div>

                    <Badge variant={productData.isActive ? 'default' : 'destructive'}>
                        {productData.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                </div>

                <p className='line-clamp-3 text-sm text-muted-foreground'>
                    {productData.description}
                </p>
            </CardContent>

            <CardFooter className='flex justify-between border-t p-4'>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => openEdit(productData)}
                >
                    <Pencil className='mr-2 size-4' />
                    Edit
                </Button>

                <Button variant='destructive' size='sm'>
                    <Trash2 className='mr-2 size-4' />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}