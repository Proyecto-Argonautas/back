import type { NextFunction, Request, Response } from "express";
import { createComponentSchema, resumeSchema } from "../schemas/componentSchema";
import prisma from "../services/prismaClient";

// export const createComponent = async (req: Request, res: Response, next: NextFunction) => {
//     const result = createComponentSchema.safeParse(req.body);

//     if (!result.success) {
//         return res.status(400).json({ error: result.error.flatten() });
//     }

//     const { type, tripId, position, data } = result.data;

//     try {
//         const newComponent = await prisma.component.create({
//             data: {
//                 type,
//                 tripId,
//                 position,
//                 data
//             }
//         });

//         return res.status(201).json(newComponent);
//     } catch (error) {
//         console.error("Error creating component:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };

export const createComponent = async (req: Request, res: Response) => {
    try {
        const { component } = req.body;
        // const userId = "b472ea91-61c2-4153-807f-7d2a6eb4e395"

        // if (!component) {
        //     return res.status(400).json({ error: 'travelId y component son requeridos' });
        // }

        const resume = await prisma.resume.create({
            data: {
                component: component,
                userId: "04eae8c2-f2b1-4f05-b282-fd2d85db5695",
            },
        });

        res.status(201).json(resume);
    } catch (error) {
        console.error('Error al crear el componente:', error);
        res.status(500).json({ error: 'Error al crear el componente' });
    }
};

export const createResume = async (req: Request, res: Response) => {
    try {
        const parsed = resumeSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.format() });
        }

        const { component, position } = parsed.data;

        const resume = await prisma.resume.create({
            data: {
                component: component,
                position: position,
            },
        });

        res.status(201).json(resume);
    } catch (error) {
        console.error('Error al crear el componente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createResume2 = async (req: Request, res: Response) => {
    const parsed = resumeSchema.safeParse(req.body);

    // if (!parsed.success) {
    //     return res.status(400).json({ error: parsed.error.flatten() });
    // }

    const { component, userId } = parsed.data;

    try {
        // Contar cuántos resumes tiene ese usuario
        const currentCount = await prisma.resume.count({
            where: { userId },
        });

        const newResume = await prisma.resume.create({
            data: {
                component,
                userId,
                position: currentCount + 1, // el siguiente número libre
            },
        });

        return res.status(201).json(newResume);
    } catch (error) {
        console.error('Error creando resume:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};