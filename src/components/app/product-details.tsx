import React from 'react'
import { DialogContent, DialogFooter, DialogTitle } from '../ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { useMaskito } from '@maskito/react'
import BRLmask from '@/masks/BRLmask'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { formatPrice } from '@/utils/formatPrice'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { api } from '@/services/api'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct } from '@/services/productsServices'
import { toast } from 'sonner'
import { ProductDTO } from '@/dtos/productDTO'
import { CategoryDTO } from '@/dtos/categoryDTO'

interface ProductFormProps {
  mode: 'create' | 'update'
  product?: ProductDTO
  onClose?: () => void
}

const schema = z.object({
  product_name: z
    .string()
    .min(3, 'Nome do produto deve ter no mínimo 3 caracteres'),
  description: z.string().min(1, 'Insira uma descrição'),
  unitPrice: z.string().min(1, 'Valor da unidade é obrigatório'),
  quantity_in_stock: z
    .number({ message: 'Digite apenas números' })
    .min(0, 'Quantidade deve ser um número positivo'),
  category_id: z.string().min(1, 'Selecione uma categoria'),
})

export type ProductFormValues = z.infer<typeof schema> & { unit_price: number }

async function getCategories() {
  const response = await api('/category')
  const categories: CategoryDTO[] = await response.json()
  return categories
}

export function ProductDetails({ product, onClose, mode }: ProductFormProps) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn:
      mode === 'update'
        ? (data: ProductFormValues) =>
            updateProduct(product?.product_id as string, data)
        : (data: ProductFormValues) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] })
      router.refresh()
      toast.success(
        `Sucesso ao ${mode === 'update' ? 'atualizar' : 'criar'} item!`,
        {},
      )
      onClose && onClose()
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues:
      mode === 'update' && product
        ? {
            product_name: product.product_name,
            description: product.description,
            unitPrice: formatPrice(product.unit_price),
            quantity_in_stock: product.quantity_in_stock,
            category_id: product.category?.category_id,
          }
        : {
            product_name: '',
            description: '',
            unitPrice: formatPrice(0),
            quantity_in_stock: 0,
            category_id: '',
          },
    resolver: zodResolver(schema),
  })

  const maskedInputRef = useMaskito({ options: BRLmask })

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    const unitPriceNumber = parseFloat(
      data.unitPrice.replace('R$', '').replace(',', '.'),
    )

    const submissionData: ProductFormValues = {
      ...data,
      unit_price: unitPriceNumber,
    }

    delete (submissionData as Partial<ProductFormValues>).unitPrice

    mutation.mutate(submissionData)
  }

  return (
    <DialogContent>
      <DialogTitle>
        {mode === 'update' ? 'Editar produto' : 'Criar Novo Produto'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Controller
            name="product_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Nome do produto" />
            )}
          />
          {errors.product_name && (
            <p className="text-red-500 text-sm">
              {errors.product_name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Descrição do produto"
                className="resize-none"
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <Table>
          <TableBody>
            <TableRow className="flex items-center justify-between">
              <TableCell className="flex-1 relative">Categoria</TableCell>
              <TableCell className="flex flex-col gap-2 items-end">
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(selectedId) => {
                        field.onChange(selectedId)
                      }}
                    >
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Selecione a categoria">
                          {categories?.find(
                            (category) => category.category_id === field.value,
                          )?.category_name || 'Selecione uma categoria'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem
                            key={category.category_id}
                            value={category.category_id}
                          >
                            {category.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category_id && (
                  <p className="text-red-500 text-sm">
                    {errors.category_id.message}
                  </p>
                )}
              </TableCell>
            </TableRow>
            <TableRow className="flex items-center justify-between">
              <TableCell className="flex-1">Preço unitário</TableCell>
              <TableCell className="flex flex-col gap-2 items-end">
                <Controller
                  name="unitPrice"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      ref={maskedInputRef}
                      className="w-fit"
                      onInput={(e) =>
                        setValue('unitPrice', e.currentTarget.value)
                      }
                    />
                  )}
                />
                {errors.unitPrice && (
                  <p className="text-red-500 text-sm">
                    {errors.unitPrice.message}
                  </p>
                )}
              </TableCell>
            </TableRow>
            <TableRow className="flex items-center justify-between">
              <TableCell className="flex-1">Quantidade no estoque</TableCell>
              <TableCell className="flex flex-col gap-2 items-end">
                <Controller
                  name="quantity_in_stock"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      className="w-fit"
                      onChange={(e) => {
                        const value = e.currentTarget.value
                        setValue('quantity_in_stock', parseFloat(value))
                      }}
                    />
                  )}
                />
                {errors.quantity_in_stock && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity_in_stock.message}
                  </p>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <DialogFooter>
          <Button className="w-full mt-4" type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
