import {z} from 'zod'

export const schema = z.object({
  name: z.string({required_error: 'Obrigatório'}).min(3, 'Mínimo três caracteres'),
  email: z.string({required_error: 'Obrigatório'}).email({message: 'Obrigatório'}),
  password: z.string({required_error: 'Obrigatório'}),
})



