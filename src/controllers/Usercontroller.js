import { PrismaClient } from "@prisma/client";
import { response } from "express";

const prisma = new PrismaClient();

export default {
    //criar usuario
    async createUser(Request, Response) {
        try {
            const { name, email } = Request.body;

            let user = await prisma.user.findUnique({ where: { email } });

            if (user) {
                return Response.status(400).json({
                    error: "email já cadastrado com outro usuário.",
                });
            }

            user = await prisma.user.create({ data: { name, email } });

            return Response.json(user);
        } catch (error) {
            return { error };
        }
    },
    // Listar todos os usuarios cadastrados
    async findallUsers(Request, Response) {
        try {
            const users = await prisma.user.findMany();
            return Response.json(users);
        } catch (error) {
            return Response.json({ error });
        }
    },
    // Buscar usuario pelo ID
    async findUser(Request, Response) {
        try {
            const { id } = Request.params;
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });

            if (!user)
                return Response.status(404).json({
                    error: "Usuário não encontrado!",
                });
            return Response.json(user);
        } catch (error) {
            return Response.json({ error });
        }
    },
    // Atualizar usuario
    async updateUser(Request, Response) {
        try {
            const { id } = Request.params;
            const { name, email } = Request.body;

            let user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });

            if (!user)
                return Response.status(404).json({
                    error: "Usuário não encontrado!",
                });

            user = await prisma.user.update({
                where: { id: Number(id) },
                data: { name, email },
            });
            return Response.json({
                message: "Usuário atualizado com sucesso!",
            });
        } catch (error) {
            Response.json({ error });
        }
    },

    //deletar usuario
    async deleteUser(Request, Response) {
        try {
            const { id } = Request.params;
            let user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });

            if (!user)
                return Response.status(404).json({
                    erro: "Usuário não encontrado!",
                });

            await prisma.user.delete({ where: { id: Number(id) } });

            return Response.json({ message: "Usuário deletado com sucesso!" });
        } catch (error) {
            Response.json({ error });
        }
    },
};
