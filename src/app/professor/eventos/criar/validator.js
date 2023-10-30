import {z} from 'zod'

export const schema = z.object({
  title: z.string({required_error: 'Obrigatório'}).min(3, 'Mínimo três caracteres'),
  start: z.string({required_error: 'Obrigatório'}).min(8, 'Data inválida').transform(data => new Date(data).toISOString()),
  end: z.string({required_error: 'Obrigatório'}).min(8, 'Data inválida').transform(data => new Date(data).toISOString()),
})

