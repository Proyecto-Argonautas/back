/** biome-ignore-all assist/source/organizeImports: <explanation> */
import type { NextFunction, Request, Response } from "express";
import prisma from "../services/prismaClient";
import { registerSchema } from "../schemas/userSchemas";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";

// import userService from '../services/userServices';

// let users: { id: number, name: string }[] = [
//     { id: 1, name: "Jack" }
// ]

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch users" });
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  registerSchema.parse(req.body);
  const { name, last_name, email } = req.body;
  let newUser = await prisma.user.findFirst({ where: { email } });
  if (newUser) {
    new BadRequestException('user already exists', ErrorCode.USER_ALREADY_EXISTS);
  }
  newUser = await prisma.user.create({
    data: { name, last_name, email }
  });
  res.status(201).json({ message: "user created succesfully", newUser });
};

// export const updateUser = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const updateUser = await prisma.user.update({
//       where: { id: parseInt(id) },
//       data: { name, last_name, email },
//     });
//     res.status(201).json({
//       message: "user updated succesfully",
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
//       message: "user deleted succesfully",
//     });
//   } catch (err) {
//     res.status(400).json({ message: "error deleting user" });
//   }
// };

// module.exports.getAllUsers = (req, res, next) => {
//     const users = userService.fetchUsers();
//     // res.send('all users')
// }
// module.exports.createUser = (req, res, next) => {
//     const newUser = userService.addUser(req.body);
//     res.send('creating users')
//     res.status(201).json(newUser);
// };
