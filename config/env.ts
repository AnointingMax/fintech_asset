import * as Yup from "yup";

export const envSchema = Yup.object().shape({
   APP_PORT: Yup.number().required(),
});

const env = envSchema.validateSync(process.env, {
   stripUnknown: true,
   abortEarly: false,
});

export default env