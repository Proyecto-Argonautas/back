import { z } from "zod/v4";

export const travelSchema = z.object({
    destiny: z.string().min(1),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    userId: z.string().min(1, "El userId es obligatorio"),
    companions: z.array(z.string().min(1)).max(20)
}).refine(
    (data) => data.endDate > data.startDate,
    { message: "La fecha de fin debe ser posterior a la de inicio", path: ["endDate"] }
);

export const getFilteredTravelsSchema = z.object({
    userId: z.string().min(1, "El userId es obligatorio"),
});
