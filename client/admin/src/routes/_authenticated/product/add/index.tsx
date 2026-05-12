import { createFileRoute } from '@tanstack/react-router'
import { ProductAdd } from '@/features/product/add'

export const Route = createFileRoute('/_authenticated/product/add/')({
  component: ProductAdd,
})
