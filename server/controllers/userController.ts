// import { NextFunction, Request, Response, json } from 'express';
// import { Request, Response } from "express";

import prisma from "../services/prismaClient";

// import userService from '../services/userServices';

// let users: { id: number, name: string }[] = [
//     { id: 1, name: "Jack" }
// ]

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch users' });
    }
}

export const createUser = async (req: Request, res: Response): Promise<any> => {
    const { name, last_name, email } = req.body;
    if (!name || !last_name || !email) {
        return res.status(400).json({ message: 'name and email is required' })
    }
    try {
        const newUser = await prisma.user.create({
            data: { name, last_name, email }
        });
        res.status(201).json({ message: 'user created succesfully', newUser })
    } catch (error) {
        res.status(400).json({ error: 'failed to create new user' })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, last_name, email } = req.body;

    try {
        const updateUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, last_name, email },
        });
        res.status(201).json({
            message: 'user updated succesfully',
            data: updateUser,
        })
    } catch (error) {
        res.status(400).json({ message: 'error updating user' })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(201).json({
            message: 'user deleted succesfully'
        })
    } catch (error) {
        res.status(400).json({ message: 'error deleting user' })
    }
}

// module.exports.getAllUsers = (req, res, next) => {
//     const users = userService.fetchUsers();
//     // res.send('all users')
// }
// module.exports.createUser = (req, res, next) => {
//     const newUser = userService.addUser(req.body);
//     res.send('creating users')
//     res.status(201).json(newUser);
// };