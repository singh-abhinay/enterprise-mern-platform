import { Button } from '@/components/ui/button'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { useCategoryStore } from '@/stores/use-category-store'

export function CategoryForm() {
    const {
        open,
        mode,
        formData,
        updateFormData,
        close,
        resetForm,
    } = useCategoryStore()

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target

        updateFormData({
            [name]: value,
        })
    }

    const handleSwitchChange = (checked: boolean) => {
        updateFormData({
            isActive: checked,
        })
    }

    const handleClose = () => {
        resetForm()
        close()
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (mode === 'create') {
            console.log('Create Category', formData)
        } else {
            console.log('Update Category', formData)
        }

        handleClose()
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    handleClose()
                }
            }}
        >
            <DialogContent className='sm:max-w-lg'>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {mode === 'create'
                                ? 'Create Category'
                                : 'Edit Category'}
                        </DialogTitle>

                        <DialogDescription>
                            {mode === 'create'
                                ? 'Add a new category for your products.'
                                : 'Update the category details below.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className='space-y-5 py-4'>
                        {/* Name */}
                        <div className='space-y-2'>
                            <Label htmlFor='name'>Name</Label>

                            <Input
                                id='name'
                                name='name'
                                placeholder='Enter category name'
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Slug */}
                        <div className='space-y-2'>
                            <Label htmlFor='slug'>Slug</Label>

                            <Input
                                id='slug'
                                name='slug'
                                placeholder='home-appliances'
                                value={formData.slug}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Image */}
                        <div className='space-y-2'>
                            <Label htmlFor='image'>Image URL</Label>

                            <Input
                                id='image'
                                name='image'
                                placeholder='https://example.com/image.jpg'
                                value={formData.image}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Description */}
                        <div className='space-y-2'>
                            <Label htmlFor='description'>
                                Description
                            </Label>

                            <Textarea
                                id='description'
                                name='description'
                                placeholder='Write category description...'
                                className='min-h-[120px]'
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Active Status */}
                        <div className='flex items-center justify-between rounded-lg border p-4'>
                            <div>
                                <p className='font-medium'>
                                    Active Status
                                </p>

                                <p className='text-sm text-muted-foreground'>
                                    Enable or disable this category
                                </p>
                            </div>

                            <Switch
                                checked={formData.isActive}
                                onCheckedChange={handleSwitchChange}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>

                        <Button type='submit'>
                            {mode === 'create'
                                ? 'Create Category'
                                : 'Update Category'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}