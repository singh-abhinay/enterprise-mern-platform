import { create } from 'zustand'
import { ProductType } from '@/features/product/types/product.types'
import { defaultProduct } from '@/features/product/constants/default-product'


interface ProductState {
    open: boolean
    mode: 'create' | 'edit'
    selectedProduct: ProductType | null

    formData: ProductType

    openCreate: () => void
    openEdit: (product: ProductType) => void
    close: () => void

    updateFormData: (data: Partial<ProductType>) => void
    resetForm: () => void
}

export const useProductStore = create<ProductState>((set) => ({
    open: false,
    mode: 'create',
    selectedProduct: null,
    formData: { ...defaultProduct },

    openCreate: () =>
        set({
            open: true,
            mode: 'create',
            selectedProduct: null,
            formData: { ...defaultProduct },
        }),

    openEdit: (product) =>
        set({
            open: true,
            mode: 'edit',
            selectedProduct: product,
            formData: { ...product },
        }),

    close: () =>
        set({
            open: false,
            selectedProduct: null,
            formData: { ...defaultProduct },
        }),

    updateFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data }
        })),

    resetForm: () =>
        set({ formData: { ...defaultProduct } }),
}))