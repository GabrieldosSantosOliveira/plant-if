import * as yup from 'yup'
export const forgotPasswordValidator = yup.object({
  email: yup
    .string()
    .trim()
    .email('Informe um email válido')
    .required('Informe seu email'),
})
