import { z } from "zod/v4";

// export const travelSchema = z.object({
//     destiny: z.string().min(1, "El destino es obligatorio"),
//     startDate: z.coerce.date(),
//     endDate: z.coerce.date(),
//     userId: z.string().min(1, "El userId es obligatorio"),
// }).superRefine((data, ctx) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (data.startDate < today) {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "La fecha de inicio no puede ser anterior a hoy",
//             path: ["startDate"],
//         });
//     }

//     if (data.endDate < data.startDate) {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "La fecha de fin no puede ser anterior a la de inicio",
//             path: ["endDate"],
//         });
//     }
// });

export const travelSchema = z.object({
    destiny: z.string().min(1),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    userId: z.string().min(1, "El userId es obligatorio"),
    companions: z.array(z.string().min(1)).max(20)
}).refine(
    (data) => data.endDate > data.startDate,
    { message: "La fecha de fin debe ser posterior a la de inicio", path: ["endDate"] }
).refine(
    (data) => data.startDate >= new Date(),
    { message: "La fecha de inicio no puede ser en el pasado", path: ["startDate"] }
);