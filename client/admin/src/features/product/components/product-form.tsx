import React, { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, ProductFormValues } from '@/schemas/product.schema'

import { useProductStore } from '@/stores/use-product-store'

export function ProductForm(props) {
    const {
        mode,
        formData,
        updateFormData,
        resetForm,
    } = useProductStore()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: formData,
    })

    useEffect(() => {
        reset(formData)
    }, [formData, reset])

    const onSubmit = (data: ProductFormValues) => {
        updateFormData(data)

        if (mode === 'create') {
            console.log('Create Product', data)
            // Add your API call here
        } else {
            console.log('Update Product', data)
            // Add your API call here
        }
    }

    const onReset = () => {
        resetForm()
        reset()
    }

    return (
        <div className='h-full overflow-auto'>
            <div className='mx-auto max-w-7xl p-6'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    {/* Header */}
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold tracking-tight'>
                                {mode === 'create'
                                    ? 'Create Product'
                                    : 'Edit Product'}
                            </h1>

                            <p className='text-muted-foreground'>
                                {mode === 'create'
                                    ? 'Add a new product to your store.'
                                    : 'Update your product information.'}
                            </p>
                        </div>

                        <div className='flex items-center gap-3'>
                            <Button
                                type='button'
                                variant='outline'
                                onClick={onReset}
                            >
                                Reset
                            </Button>

                            <Button type='submit'>
                                {mode === 'create'
                                    ? 'Create Product'
                                    : 'Update Product'}
                            </Button>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className='rounded-xl border p-6 space-y-4'>
                        <h2 className='text-xl font-semibold'>
                            Basic Information
                        </h2>

                        <div className='grid gap-4 md:grid-cols-2'>
                            <div className='space-y-2'>
                                <Label htmlFor='name'>
                                    Product Name <span className='text-red-500'>*</span>
                                </Label>

                                <Input
                                    id='name'
                                    placeholder='iPhone 15 Pro'
                                    {...register('name')}
                                />
                                {errors.name && (
                                    <p className='text-sm text-red-500'>
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='slug'>
                                    Slug <span className='text-red-500'>*</span>
                                </Label>

                                <Input
                                    id='slug'
                                    placeholder='iphone-15-pro'
                                    {...register('slug')}
                                />
                                {errors.slug && (
                                    <p className='text-sm text-red-500'>
                                        {errors.slug.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='shortDescription'>
                                Short Description <span className='text-red-500'>*</span>
                            </Label>

                            <Textarea
                                id='shortDescription'
                                placeholder='Short description'
                                {...register('shortDescription')}
                            />
                            {errors.shortDescription && (
                                <p className='text-sm text-red-500'>
                                    {errors.shortDescription.message}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='description'>
                                Description <span className='text-red-500'>*</span>
                            </Label>

                            <Textarea
                                id='description'
                                className='min-h-[180px]'
                                placeholder='Full product description'
                                {...register('description')}
                            />
                            {errors.description && (
                                <p className='text-sm text-red-500'>
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Organization */}
                    <div className='rounded-xl border p-6 space-y-4'>
                        <h2 className='text-xl font-semibold'>
                            Organization
                        </h2>

                        <div className='grid gap-4 md:grid-cols-3'>
                            <div className='space-y-2'>
                                <Label htmlFor='brand'>
                                    Brand <span className='text-red-500'>*</span>
                                </Label>

                                <select
                                    id='brand'
                                    className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                                    {...register('brand')}
                                >
                                    <option value=''>Select Brand</option>
                                    {props.brand?.map((brand) => (
                                        <option key={brand._id || brand.id} value={brand._id || brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.brand && (
                                    <p className='text-sm text-red-500'>
                                        {errors.brand.message}
                                    </p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='category'>
                                    Category <span className='text-red-500'>*</span>
                                </Label>

                                <select
                                    id='category'
                                    className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                                    {...register('category')}
                                >
                                    <option value=''>Select Category</option>
                                    {props.category?.map((category) => (
                                        <option key={category._id || category.id} value={category._id || category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className='text-sm text-red-500'>
                                        {errors.category.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className='rounded-xl border p-6 space-y-4'>
                        <h2 className='text-xl font-semibold'>
                            Pricing
                        </h2>

                        <div className='grid gap-4 md:grid-cols-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='price'>
                                    Price <span className='text-red-500'>*</span>
                                </Label>

                                <Input
                                    id='price'
                                    type='number'
                                    placeholder='999'
                                    {...register('price')}
                                />
                                {errors.price && (
                                    <p className='text-sm text-red-500'>
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='discountPrice'>
                                    Discount Price
                                </Label>

                                <Input
                                    id='discountPrice'
                                    type='number'
                                    placeholder='899'
                                    {...register('discountPrice')}
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='costPrice'>
                                    Cost Price
                                </Label>

                                <Input
                                    id='costPrice'
                                    type='number'
                                    placeholder='700'
                                    {...register('costPrice')}
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='currency'>
                                    Currency <span className='text-red-500'>*</span>
                                </Label>

                                <Input
                                    id='currency'
                                    placeholder='INR'
                                    {...register('currency')}
                                />
                                {errors.currency && (
                                    <p className='text-sm text-red-500'>
                                        {errors.currency.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='tax'>
                                Tax (%)
                            </Label>

                            <Input
                                id='tax'
                                type='number'
                                placeholder='18'
                                {...register('tax')}
                            />
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className='rounded-xl border p-6 space-y-4'>
                        <h2 className='text-xl font-semibold'>
                            Inventory
                        </h2>

                        <div className='grid gap-4 md:grid-cols-3'>
                            <div className='space-y-2'>
                                <Label htmlFor='sku'>
                                    SKU <span className='text-red-500'>*</span>
                                </Label>

                                <Input
                                    id='sku'
                                    placeholder='SKU001'
                                    {...register('sku')}
                                />
                                {errors.sku && (
                                    <p className='text-sm text-red-500'>
                                        {errors.sku.message}
                                    </p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='stock'>
                                    Stock <span className='text-red-500'>*</span>
                                </Label>

                                <Input
                                    id='stock'
                                    type='number'
                                    placeholder='50'
                                    {...register('stock')}
                                />
                                {errors.stock && (
                                    <p className='text-sm text-red-500'>
                                        {errors.stock.message}
                                    </p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='minStock'>
                                    Minimum Stock
                                </Label>

                                <Input
                                    id='minStock'
                                    type='number'
                                    placeholder='5'
                                    {...register('minStock')}
                                />
                            </div>
                        </div>

                        <div className='grid gap-4 md:grid-cols-3'>
                            <div className='flex items-center justify-between rounded-lg border p-4'>
                                <Label htmlFor='trackStock'>
                                    Track Stock
                                </Label>

                                <Switch
                                    id='trackStock'
                                    checked={watch('trackStock')}
                                    onCheckedChange={(checked) =>
                                        setValue('trackStock', checked)
                                    }
                                />
                            </div>

                            <div className='flex items-center justify-between rounded-lg border p-4'>
                                <Label htmlFor='inStock'>
                                    In Stock
                                </Label>

                                <Switch
                                    id='inStock'
                                    checked={watch('inStock')}
                                    onCheckedChange={(checked) =>
                                        setValue('inStock', checked)
                                    }
                                />
                            </div>

                            <div className='flex items-center justify-between rounded-lg border p-4'>
                                <Label htmlFor='freeShipping'>
                                    Free Shipping
                                </Label>

                                <Switch
                                    id='freeShipping'
                                    checked={watch('freeShipping')}
                                    onCheckedChange={(checked) =>
                                        setValue('freeShipping', checked)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div className='rounded-xl border p-6 space-y-4'>
                        <h2 className='text-xl font-semibold'>
                            Media
                        </h2>

                        <div className='space-y-2'>
                            <Label htmlFor='thumbnail'>
                                Thumbnail
                            </Label>

                            <Input
                                id='thumbnail'
                                placeholder='https://example.com/image.jpg'
                                {...register('thumbnail')}
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='videoUrl'>
                                Video URL
                            </Label>

                            <Input
                                id='videoUrl'
                                placeholder='https://youtube.com/...'
                                {...register('videoUrl')}
                            />
                        </div>
                    </div>

                    {/* Shipping */}
                    <div className='rounded-xl border p-6 space-y-4'>
                        <h2 className='text-xl font-semibold'>
                            Shipping
                        </h2>

                        <div className='grid gap-4 md:grid-cols-2'>
                            <div className='space-y-2'>
                                <Label htmlFor='weight'>
                                    Weight
                                </Label>

                                <Input
                                    id='weight'
                                    type='number'
                                    placeholder='1.5'
                                    {...register('weight')}
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='shippingCost'>
                                    Shipping Cost
                                </Label>

                                <Input
                                    id='shippingCost'
                                    type='number'
                                    placeholder='100'
                                    {...register('shippingCost')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO */}
                    <div className='rounded-xl border p-6 space-y-4'>
                        <h2 className='text-xl font-semibold'>
                            SEO
                        </h2>

                        <div className='space-y-2'>
                            <Label htmlFor='metaTitle'>
                                Meta Title
                            </Label>

                            <Input
                                id='metaTitle'
                                placeholder='SEO title'
                                {...register('metaTitle')}
                            />
                            {errors.metaTitle && (
                                <p className='text-sm text-red-500'>
                                    {errors.metaTitle.message}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='metaDescription'>
                                Meta Description
                            </Label>

                            <Textarea
                                id='metaDescription'
                                placeholder='SEO description'
                                {...register('metaDescription')}
                            />
                            {errors.metaDescription && (
                                <p className='text-sm text-red-500'>
                                    {errors.metaDescription.message}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='metaKeywords'>
                                Meta Keywords
                            </Label>

                            <Input
                                id='metaKeywords'
                                placeholder='iphone, apple, mobile'
                                defaultValue={watch('metaKeywords')?.join(', ') || ''}
                                onChange={(e) =>
                                    setValue(
                                        'metaKeywords',
                                        e.target.value.split(',').map(k => k.trim())
                                    )
                                }
                            />
                        </div>
                    </div>

                    {/* Product Status */}
                    <div className='rounded-xl border p-6 space-y-4'>
                        <h2 className='text-xl font-semibold'>
                            Product Status
                        </h2>

                        <div className='grid gap-4 md:grid-cols-3'>
                            <div className='flex items-center justify-between rounded-lg border p-4'>
                                <Label htmlFor='isActive'>
                                    Active
                                </Label>

                                <Switch
                                    id='isActive'
                                    checked={watch('isActive')}
                                    onCheckedChange={(checked) =>
                                        setValue('isActive', checked)
                                    }
                                />
                            </div>

                            <div className='flex items-center justify-between rounded-lg border p-4'>
                                <Label htmlFor='isFeatured'>
                                    Featured
                                </Label>

                                <Switch
                                    id='isFeatured'
                                    checked={watch('isFeatured')}
                                    onCheckedChange={(checked) =>
                                        setValue('isFeatured', checked)
                                    }
                                />
                            </div>

                            <div className='flex items-center justify-between rounded-lg border p-4'>
                                <Label htmlFor='isDeleted'>
                                    Deleted
                                </Label>

                                <Switch
                                    id='isDeleted'
                                    checked={watch('isDeleted')}
                                    onCheckedChange={(checked) =>
                                        setValue('isDeleted', checked)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}