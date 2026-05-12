import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { useProductStore } from '@/stores/use-product-store'
import { ProductForm } from '../components/product-form'

const API_URL = import.meta.env.VITE_API_URL

export function ProductAdd() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const openCreate = useProductStore(
        (state) => state.openCreate
    )

    const [brand, setBrand] = useState([])
    const [category, setCategory] = useState([])

    useEffect(() => {
        getBrandData()
        getCategoryData()
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

    if (brand.length === 0 || category.length === 0) {
        return (
            <div className='flex flex-col gap-2'>
                {brand.length === 0 && (
                    <p>Please create a brand first.</p>
                )}

                {category.length === 0 && (
                    <p>Please create a category first.</p>
                )}
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