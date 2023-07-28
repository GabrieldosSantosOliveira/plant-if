import * as yup from 'yup'
export const singUpValidator = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(3, 'O nome precisa ter no mínimo 3 caracteres')
    .required('Informe seu nome'),
  lastName: yup
    .string()
    .trim()
    .min(4, 'O sobrenome precisa ter no mínimo 3 caracteres')
    .required('Informe seu sobrenome'),
  email: yup
    .string()
    .trim()
    .email('Informe um email válido')
    .required('Informe seu email'),
  password: yup
    .string()
    .trim()
    .min(4, 'A senha precisa ter no mínimo 4 caracteres')
    .required('Informe uma senha'),
})
