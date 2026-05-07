import { createFileRoute } from '@tanstack/react-router'
import { Product } from '@/features/product'

export const Route = createFileRoute('/_authenticated/product/')({
  component: Product,
})
