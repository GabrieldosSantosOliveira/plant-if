import * as yup from 'yup';
export const resetPasswordValidator = yup.object({
  code: yup
    .string()
    .trim()
    .min(6, 'Código possui 6 dígitos')
    .required('Informe o código'),
  resetPassword: yup
    .string()
    .trim()
    .min(4, 'A senha precisa ter no mínimo 4 caracteres')
    .required('Informe uma nova senha'),
});
