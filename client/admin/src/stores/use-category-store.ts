import { create } from 'zustand'

export interface Category {
    _id?: string
    name: string
    description: string
    image: string
    slug: string
    isActive: boolean
}

const defaultCategory: Category = {
    name: '',
    description: '',
    image: '',
    slug: '',
    isActive: true,
}

interface CategoryState {
    open: boolean
    mode: 'create' | 'edit'
    selectedCategory: Category | null

    formData: Category

    openCreate: () => void
    openEdit: (category: Category) => void
    close: () => void

    updateFormData: (data: Partial<Category>) => void
    resetForm: () => void
}

export const useCategoryStore = create<CategoryState>((set) => ({
    open: false,
    mode: 'create',
    selectedCategory: null,
    formData: { ...defaultCategory },

    openCreate: () =>
        set({
            open: true,
            mode: 'create',
            selectedCategory: null,
            formData: { ...defaultCategory },
        }),

    openEdit: (category) =>
        set({
            open: true,
            mode: 'edit',
            selectedCategory: category,
            formData: { ...category },
        }),

    close: () =>
        set({
            open: false,
            selectedCategory: null,
            formData: { ...defaultCategory },
        }),

    updateFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data }
        })),

    resetForm: () =>
        set({ formData: { ...defaultCategory } }),
}))