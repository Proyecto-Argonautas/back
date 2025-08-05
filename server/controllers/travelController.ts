import type { Request, Response } from "express";
import prisma from "../services/prismaClient";
import { travelSchema, getFilteredTravelsSchema } from "../schemas/travelSchema";

export const getTravels = async (req: Request, res: Response) => {
  try {
    const travels = await prisma.travel.findMany();
    res.status(200).json(travels);
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch travels" });
  }
};
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

export const getAllTravels = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID de usuario es requerido" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        travels: {
          include: {
            companions: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Formatear los viajes para incluir solo la información necesaria
    const formattedTravels = user.travels.map((travel) => ({
      id: travel.id,
      destiny: travel.destiny,
      startDate: travel.startDate,
      endDate: travel.endDate,
      companions: travel.companions.map((c) => c.name),
    }));

    res.status(200).json(formattedTravels);
  } catch (error) {
    console.error("Error al obtener los viajes:", error);
    res.status(500).json({ error: "Error al obtener los viajes." });
  }
};

export const deleteTravel = async (req: Request, res: Response) => {
  const { userId, travelId } = req.params;
  try {
    // Verifica que el travel pertenece al usuario
    const travel = await prisma.travel.findUnique({
      where: { id: Number(travelId) },
    });

    if (!travel || travel.userId !== userId) {
      return res.status(404).json({ error: "Travel no encontrado para el usuario." });
    }

    await prisma.travel.delete({
      where: { id: Number(travelId) },
    });

    res.status(200).json({ message: "Travel eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el travel." });
  }
};

// `
// {
//     latest_edited: travel,
//     nexts_travels: [travels <- viejes que son posteriores a la fecha actual comparar con startdate y ordenarlos por el mismo de mas cercano a mas lejano]
//     previus_travels: [travels <- viajes que son anteriores a la fecha actual comparar con endDate y ordenados por la misma de mas cercano a mas lejano]
// }
// `


export const getFilteredTravels = async (req: Request, res: Response) => {
  try {
    const { userId } = getFilteredTravelsSchema.parse(req.params);
    const now = new Date();

    // Último actualizado
    const latest_edited = await prisma.travel.findFirst({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: { companions: true },
    });

    // Próximos viajes
    const nexts_travels = await prisma.travel.findMany({
      where: {
        userId,
        startDate: { gt: now },
      },
      orderBy: { startDate: 'asc' },
      include: { companions: true },
    });

    // Viajes anteriores
    const previus_travels = await prisma.travel.findMany({
      where: {
        userId,
        endDate: { lt: now },
      },
      orderBy: { endDate: 'desc' },
      include: { companions: true },
    });

    res.json({
      latest_edited,
      nexts_travels,
      previus_travels,
    });
  } catch (error) {
    console.error('Error al obtener travels filtrados:', error);
    res.status(500).json({ error: 'Error al obtener los travels' });
  }
};