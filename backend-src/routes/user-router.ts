import express, { Request, Response, Router } from "express";
import { User } from "../models/user-model.js";
import {
    getAllUsers,
    getUser,
    insertUser,
    deleteUser,
    updateUser,
    searchUser,
} from "../database/users.js";
import { ObjectId, WithId } from "mongodb";
import { validateUser, validateSearchQuery } from "../validation/validation.js";

export const router: Router = express.Router();

// GET: all users
router.get("/", async (req: Request, res: Response<WithId<User>[]>) => {
    const allUsers: WithId<User>[] = await getAllUsers();
    res.send(allUsers);
});

// GET: Search user
router.get("/search", async (req: Request, res: Response) => {
    const { error } = validateSearchQuery(req.query.q);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const name: string = req.query.q as string;
    try {
        const users = await searchUser(name);
        if (users.length > 0) {
            res.send(users);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// GET: specific user
router.get("/:id", async (req: Request, res: Response<WithId<User> | null>) => {
    const id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.sendStatus(400);
    }

    try {
        const user = await getUser(id);
        if (user) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// // POST: add user
router.post("/", async (req: Request, res: Response) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const newUser: User = req.body;
    try {
        const insertedId = await insertUser(newUser);
        if (insertedId) {
            res.status(201).send({ id: insertedId });
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        console.error("Error inserting:", error);
        res.sendStatus(500);
    }
});

// DELETE: delete user
router.delete("/:id", async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    if (!ObjectId.isValid(userId)) {
        return res.sendStatus(400);
    }

    try {
        const deletedId = await deleteUser(new ObjectId(userId));
        if (deletedId) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.sendStatus(500);
    }
});

// PUT: Update user
router.put("/:id", async (req: Request, res: Response) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const updatedUser: User = req.body;
    const id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.sendStatus(400);
    }

    try {
        const result = await updateUser(id, updatedUser);
        if (result.modifiedCount > 0) {
            res.status(200).send({ id });
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error("Error updating:", error);
        res.sendStatus(500);
    }
});
