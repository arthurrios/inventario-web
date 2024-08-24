'use client'

import { DialogContent } from '../ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { DetailsButtonProps } from './details-button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { formatPrice } from '@/utils/formatPrice'
import { Button } from '../ui/button'
import { useState } from 'react'

interface ProductDetailsProps extends DetailsButtonProps {}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [description, setDescription] = useState(product.description)

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
          <TableRow className="flex justify-between">
            <TableCell className="flex-1">Unit price</TableCell>
            <TableCell>{formatPrice(product.price)}</TableCell>
          </TableRow>
          <TableRow className="flex justify-between">
            <TableCell className="flex-1">Quantity in stock</TableCell>
            <TableCell>{product.quantity_in_stock}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Button type="submit">Salvar</Button>
    </DialogContent>
  )
}
