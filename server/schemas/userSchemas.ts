import { z } from 'zod/v4';

export const userRegistrationSchema = z.object({
    name: z.string().min(1, 'The name is required').min(3, 'The name must be at least 3 characters'),
    last_name: z.string(),
    email: z.email(),
});

export const travel = z.object({
    destiny: z.string().min(1, 'name travel is required').min(3, 'the destiny must be at least 2 characters')
})


// export const userLoginSchema = z.object({
//     username: z.string(),
//     password: z.string().min(8),
// })