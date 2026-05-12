import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { PlusCircle, Package, Tag, AlertCircle } from 'lucide-react'

import { ProductForm } from '../components/product-form'
import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const API_URL = import.meta.env.VITE_API_URL

export function ProductAdd() {
    const navigate = useNavigate()
    const [brand, setBrand] = useState([])
    const [category, setCategory] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Promise.all([getBrandData(), getCategoryData()]).finally(() => {
            setIsLoading(false)
        })
    }, [])

    const getBrandData = async () => {
        try {
            const response = await fetch(`${API_URL}/brands`)
            const responseData = await response.json()

            if (responseData.success === true) {
                setBrand(responseData.data)
            }
        } catch (error) {
            console.error('Brand API Error:', error)
        }
    }

    const getCategoryData = async () => {
        try {
            const response = await fetch(`${API_URL}/categories`)
            const responseData = await response.json()

            if (responseData.success === true) {
                setCategory(responseData.data)
            }
        } catch (error) {
            console.error('Category API Error:', error)
        }
    }

    if (isLoading) {
        return (
            <Main fixed>
                <div className='flex h-[60vh] items-center justify-center'>
                    <div className='text-center'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto'></div>
                        <p className='mt-4 text-muted-foreground'>Loading...</p>
                    </div>
                </div>
            </Main>
        )
    }

    const missingBrands = brand.length === 0
    const missingCategories = category.length === 0

    if (missingBrands || missingCategories) {
        return (
            <div className='container mx-auto max-w-4xl py-10'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold tracking-tight'>Add New Product</h1>
                    <p className='text-muted-foreground mt-2'>
                        Create a new product in your store
                    </p>
                </div>

                <div className='space-y-6'>
                    {/* Warning Alert */}
                    <Alert variant='destructive' className='border-amber-200 bg-amber-50 dark:bg-amber-950/20'>
                        <AlertCircle className='h-4 w-4 text-amber-600' />
                        <AlertTitle className='text-amber-800 dark:text-amber-400'>
                            Missing Requirements
                        </AlertTitle>
                        <AlertDescription className='text-amber-700 dark:text-amber-500'>
                            You need to create the following before adding a product:
                            {missingBrands && ' Brand'}
                            {missingBrands && missingCategories && ' and'}
                            {missingCategories && ' Category'}
                        </AlertDescription>
                    </Alert>

                    {/* Missing Brand Card */}
                    {missingBrands && (
                        <Card className='border-dashed'>
                            <CardHeader>
                                <div className='flex items-center gap-2'>
                                    <div className='rounded-full bg-primary/10 p-2'>
                                        <Tag className='h-5 w-5 text-primary' />
                                    </div>
                                    <CardTitle>No Brands Found</CardTitle>
                                </div>
                                <CardDescription>
                                    You need at least one brand to create a product.
                                    Brands help organize and categorize your products.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground'>
                                    <p>📦 Example brands you can create:</p>
                                    <ul className='mt-2 list-inside list-disc space-y-1'>
                                        <li>Apple</li>
                                        <li>Samsung</li>
                                        <li>Sony</li>
                                        <li>Nike</li>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter className='flex gap-3'>
                                <Button
                                    onClick={() => navigate({ to: '/brands/create' })}
                                    className='gap-2'
                                >
                                    <PlusCircle className='h-4 w-4' />
                                    Create Brand
                                </Button>
                                <Button
                                    variant='outline'
                                    onClick={() => navigate({ to: '/brands' })}
                                >
                                    View All Brands
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {/* Missing Category Card */}
                    {missingCategories && (
                        <Card className='border-dashed'>
                            <CardHeader>
                                <div className='flex items-center gap-2'>
                                    <div className='rounded-full bg-primary/10 p-2'>
                                        <Package className='h-5 w-5 text-primary' />
                                    </div>
                                    <CardTitle>No Categories Found</CardTitle>
                                </div>
                                <CardDescription>
                                    You need at least one category to create a product.
                                    Categories help customers find your products easily.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground'>
                                    <p>📂 Example categories you can create:</p>
                                    <ul className='mt-2 list-inside list-disc space-y-1'>
                                        <li>Electronics</li>
                                        <li>Clothing</li>
                                        <li>Home & Living</li>
                                        <li>Books</li>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter className='flex gap-3'>
                                <Button
                                    onClick={() => navigate({ to: '/categories/create' })}
                                    className='gap-2'
                                >
                                    <PlusCircle className='h-4 w-4' />
                                    Create Category
                                </Button>
                                <Button
                                    variant='outline'
                                    onClick={() => navigate({ to: '/categories' })}
                                >
                                    View All Categories
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </div>
            </div>
        )
    }

    return (
        <ProductForm
            brand={brand}
            category={category}
        />
    )
}