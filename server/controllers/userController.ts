import type { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCode } from "../exceptions/root";
// import { PrismaClient } from "@prisma/client";
import { registerSchema, updateUserSchema } from "../schemas/userSchemas";
import prisma from "../services/prismaClient";

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  if (!users) {
    new BadRequestException("there arent any users", ErrorCode.USER_NOT_FOUND);
  }
  res.status(200).json({ data: users.length, users });
};

// export const createUser = async (req: Request, res: Response) => {
//   registerSchema.parse(req.body);
//   // const { name, lastName, email, emailVerified } = req.body;
//   const { name, lastName, email } = req.body;
//   let newUser = await prisma.user.findFirst({ where: { email } });
//   if (newUser) {
//     new BadRequestException(
//       "user already exists",
//       ErrorCode.USER_ALREADY_EXISTS,
//     );
//   }
//   newUser = await prisma.user.create({
//     data: { name, lastName, email },
//   });
//   res.status(201).json({ message: "user created successfully", newUser });
// };

// nuevo creatinguser
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = registerSchema.parse(req.body);

    // Verificamos si ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Creamos nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        name: parsed.name,
        lastName: parsed.lastName,
        email: parsed.email,
        emailVerified: false, // por defecto
      },
    });

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        issues: error.errors,
      });
    }
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, lastName } = req.body;
  const userId = "e8681d37-4c1b-4a92-9291-55554a1dd96e"; // ← esto viene del middleware de auth

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, lastName },
    });

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ error: `Error updating user, ${error}` });
  }
};

// controllers/userController.ts
export const deleteUser = async (req: Request, res: Response) => {
  // TODO añadir typo user en request
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "No autorizado" });
  }

  try {
    const deleteUser = await prisma.user.delete({
      where: { id: userId },
    });

    res.status(204).json({ message: "usuario eliminado", deleteUser }); // 204 = No Content
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "No se pudo eliminar el usuario" });
  }
};

// export const updateUser = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const updateUser = await prisma.user.update({
//       where: { id: parseInt(id) },
//       data: { name, last_name, email },
//     });
//     res.status(201).json({
//       message: "user updated successfully",
//       data: updateUser,
//     });
//   } catch (err) {
//     res.status(400).json({ message: "error updating user" });
//   }
// };

// export const deleteUser = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     await prisma.user.delete({
//       where: { id: parseInt(id) },
//     });
//     res.status(201).json({
//       message: "user deleted successfully",
//     });
//   } catch (err) {
//     res.status(400).json({ message: "error deleting user" });
//   }
// };
