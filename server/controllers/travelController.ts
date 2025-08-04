import type { Request, Response } from "express";
import prisma from "../services/prismaClient";
import { travelSchema } from "../schemas/travelSchema";
// import { PrismaClient as prisma } from "../generated/prisma";

export const getTravels = async (req: Request, res: Response) => {
  try {
    const travels = await prisma.travel.findMany();
    res.status(200).json(travels);
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch travels" });
  }
};

// export const getTravelByTitle = async (req: Request, res: Response) => {
//   const { destiny } = req.body;
//   const travel = await prisma.travel.findFirst({
//     where: { destiny },
//   });
//   if (travel) {
//     res.status(200).json({ travel });
//   } else {
//     res.status(404).json({ message: "travel not found" });
//   }
// };

// export const createTravel = async (req: Request, res: Response) => {
//   console.log("create travel");
//   const parsed = travelSchema.parse(req.body);
//   const { destiny, start_date, end_date, user_id } = parsed.data;
//   console.log(destiny, start_date, end_date, user_id);
//   const travel = await prisma.travel.create({
//     data: {
//       destiny,
//       startDate: new Date(start_date),
//       endDate: new Date(end_date),
//       userId: user_id,
//     },
//   });
//   res.status(201).json({ message: "user created successfully", travel });
//   // res.status(201).json({ message: "user created successfully" });
// };

// export const createTravel = async (req: Request, res: Response) => {
//   try {
//     const parsed = travelSchema.safeParse(req.body);

//     if (!parsed.success) {
//       return res.status(400).json({
//         message: "Datos inválidos",
//         errors: parsed.error.format(),
//       });
//     }

//     const { destiny, startDate, endDate, userId } = parsed.data;

//     const travel = await prisma.travel.create({
//       data: {
//         destiny,
//         startDate: startDate,
//         endDate: endDate,
//         user: {
//           connect: { id: userId },
//         },
//       },
//     });

//     return res.status(201).json({ travel });
//   } catch (err) {
//     console.error("Error al crear travel:", err);
//     return res.status(500).json({ message: "Error del servidor" });
//   }
// };

// "fb3357f6-fcb4-4e32-99ee-c143b36d8757"

export const createTravel = async (req: Request, res: Response) => {
  try {
    const parsed = travelSchema.parse(req.body);

    const { destiny, startDate, endDate, companions, userId } = parsed;

    const newTravel = await prisma.travel.create({
      data: {
        destiny,
        startDate: startDate,
        endDate: endDate,
        user: {
          connect: { id: userId }
        },
        companions: {
          create: companions.map((name) => ({ name }))
        }
      },
      include: {
        companions: true
      }
    });

    return res.status(201).json(newTravel);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Error interno del servidor" });
  }
};