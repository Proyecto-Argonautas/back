import { z } from 'zod/v4';

const noteSchema = z.object({
    description: z
        .string()
});

const flightSchema = z.object({
    from: z.string(),
    to: z.string(),
    airline: z.string(),
    flightNumber: z.string(),
    departure: z.string(), // ISO date or HH:mm format
    arrival: z.string(),   // same format
    reservationNumber: z.string(),
    price: z.number()
});

const hotelSchema = z.object({
    name: z.string(),
    address: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    reservationNumber: z.string(),
    price: z.number()
});

const currencySchema = z.object({
    base: z.string(),
    target: z.string(),
    rate: z.number(),
    date: z.string()
});

export const createComponentSchema = z.object({
    type: z.enum(["note", "flight", "hotel", "currency"]),
    tripId: z.string().cuid(),
    position: z.number().nonnegative(),
    data: z.union([
        noteSchema,
        flightSchema,
        hotelSchema,
        currencySchema
    ])
});

export const componentSchema = z.object({
    type: z.enum(['note', 'flight', 'hotel', 'currency', 'weather', 'translate', 'list']),
    travelId: z.string()
});