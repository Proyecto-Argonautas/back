import type { NextFunction, Request, Response } from "express";
import { createComponentSchema, componentSchema } from "../schemas/componentSchema";
import prisma from "../services/prismaClient";
import { userInfo } from "os";

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
        const parsed = componentSchema.parse(req.body);
        console.log(req.body);

        console.log('prisma.component:', prisma.component);
        console.log(Object.keys(prisma));
        const newResume = await prisma.component.create({
            data: {
                type: parsed.type,
                travelId: parsed.travelId
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

// get all except list

// get only list 