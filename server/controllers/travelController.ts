import type { Request, Response } from "express";
import prisma from "../services/prismaClient";
import { travelSchema, getFilteredTravelsSchema } from "../schemas/travelSchema";

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
  const travelId = req.params.id;

  if (travelId) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const deletedTravel = await prisma.travel.delete({
      where: { id: travelId },
    });

    return res.status(200).json({
      message: "Travel eliminado correctamente (y sus datos relacionados en cascade).",
      deletedTravel,
    });
  } catch (error) {
    console.error("Error al eliminar travel:", error);
    return res.status(500).json({ error: "Error al eliminar el travel." });
  }
};


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