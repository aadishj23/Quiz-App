import zod from 'zod';

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(10),
});

const signupSchema = zod.object({
    name: zod.string().min(3),
    email: zod.string().email(),
    phone: zod.number().min(10),
    password: zod.string().min(10),
    confirmPassword: zod.string().min(10),
});

export { signinSchema, signupSchema };