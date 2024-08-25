'use client'

import { DialogContent } from '../ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { DetailsButtonProps } from './details-button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { useMaskito } from '@maskito/react'
import BRLmask from '@/masks/BRLmask'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Input } from '../ui/input'
import { formatPrice } from '@/utils/formatPrice'

interface ProductDetailsProps extends DetailsButtonProps {}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [description, setDescription] = useState(product.description)
  const [unitPrice, setUnitPrice] = useState(formatPrice(product.price))
  const [quantity, setQuantity] = useState(product.quantity_in_stock)

  const maskedInputRef = useMaskito({ options: BRLmask })

  return (
    <DialogContent>
      <h1>{product.name}</h1>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição do produto"
          value={description}
          className="resize-none"
        />
      </div>
      <Table>
        <TableBody>
          <TableRow className="flex justify-between">
            <TableCell className="flex-1">Category</TableCell>
            <TableCell>{product.category}</TableCell>
          </TableRow>
          <TableRow className="flex items-center justify-between">
            <TableCell className="flex-1">Unit price</TableCell>
            <TableCell>
              <Input
                ref={maskedInputRef}
                value={unitPrice}
                onInput={(e) => setUnitPrice(e.currentTarget.value)}
                className="w-36"
              />
            </TableCell>
          </TableRow>
          <TableRow className="flex items-center justify-between">
            <TableCell className="flex-1">Quantity in stock</TableCell>
            <TableCell>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Button type="submit">Salvar</Button>
    </DialogContent>
  )
}
