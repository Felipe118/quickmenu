import { z } from 'zod'

export const addressSchema = z.object({
  cep: z
    .string()
    .min(8, 'Informe um CEP válido')
    .max(9, 'Informe um CEP válido'),

  address_name: z
    .string()
    .min(3, 'Informe o endereço'),

  number: z
    .string()
    .min(1, 'Informe o número'),

  complement: z
    .string()
    .optional()
    .default(''),

  neighborhood: z
    .string()
    .min(2, 'Informe o bairro'),

  city: z
    .string()
    .min(2, 'Informe a cidade'),

  state: z
    .string()
    .length(2, 'Informe a UF'),
  
  id: z
    .number()
    .optional(),
})

export const restaurantSchema = z.object({
  name: z
    .string()
    .min(3, 'Informe o nome do restaurante')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),

  email: z
    .string()
    .max(100, 'O e-mail deve ter no máximo 100 caracteres'),

  open_time: z
    .string(),

  close_time: z
    .string(),
 
  slug: z
    .string()
    .max(100, 'O slug deve ter no máximo 100 caracteres'),

  phone: z
    .string()
    .min(10, 'Informe um telefone válido'),

  perfil_img: z
    .instanceof(File)
    .optional(),
  
  capa_img: z
    .instanceof(File)
    .optional(),

  address: addressSchema,
})

export type RestaurantFormData = z.infer<typeof restaurantSchema>
