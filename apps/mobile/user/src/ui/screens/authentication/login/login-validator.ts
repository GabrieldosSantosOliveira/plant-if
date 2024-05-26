import * as yup from 'yup';
export const loginValidator = yup.object({
  email: yup
    .string()
    .trim()
    .email('Informe um email válido')
    .required('Informe seu email'),
  password: yup
    .string()
    .trim()
    .min(4, 'A senha precisa ter no mínimo 4 caracteres')
    .required('Informe sua senha'),
});
