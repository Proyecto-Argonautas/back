import type { NextFunction, Request, Response } from "express";
import { createComponentSchema, resumeSchema } from "../schemas/componentSchema";
import prisma from "../services/prismaClient";

// export const createResume = async (req: Request, res: Response) => {
//     try {
//         const parsed = resumeSchema.safeParse(req.body);

//         if (!parsed.success) {
//             return res.status(400).json({ error: parsed.error.format() });
//         }

//         const { component, position } = parsed.data;

//         const resume = await prisma.resume.create({
//             data: {
//                 component: component,
//                 position: position,
//             },
//         });

//         res.status(201).json(resume);
//     } catch (error) {
//         console.error('Error al crear el componente:', error);
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
// };


export const createResume = async (req: Request, res: Response) => {
    try {
        const parsed = resumeSchema.parse(req.body);

        const newResume = await prisma.resume.create({
            data: {
                component: parsed.component,
                position: parsed.position,
                userId: parsed.userId,
            },
        });

        res.status(201).json(newResume);
    } catch (error) {
        console.error("Error al crear componente resume:", error);
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error interno del servidor." });
        }
    }
};