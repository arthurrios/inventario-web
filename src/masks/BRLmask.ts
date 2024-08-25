import type { MaskitoOptions } from '@maskito/core'

export default {
  mask: ({ value }) => {
    const digits = value.replace(/\D/g, '')
    const numericValue = parseFloat(digits) / 100

    // Format value as currency with two decimal places
    const formattedValue = numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    })

    return Array.from(formattedValue) // Removes the "R$ " from the returned string and converts it to an array
  },
} as MaskitoOptions
