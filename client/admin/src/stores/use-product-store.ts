import { create } from 'zustand'

export interface Product {
    _id?: string
    name: string
    description: string
    image: string
    slug: string
    isActive: boolean
}

const defaultProduct: Product = {
    name: '',
    description: '',
    image: '',
    slug: '',
    isActive: true,
}

interface ProductState {
    open: boolean
    mode: 'create' | 'edit'
    selectedProduct: Product | null

    formData: Product

    openCreate: () => void
    openEdit: (product: Product) => void
    close: () => void

    updateFormData: (data: Partial<Product>) => void
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