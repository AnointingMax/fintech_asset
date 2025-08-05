import * as Yup from "yup";

const envSchema = Yup.object().shape({
   APP_PORT: Yup.number().required(),
   JWT_SECRET: Yup.string().required(),
});

const env = envSchema.validateSync(process.env, {
   stripUnknown: true,
   abortEarly: false,
});

export default env