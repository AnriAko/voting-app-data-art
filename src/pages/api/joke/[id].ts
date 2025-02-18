import { NextApiRequest, NextApiResponse } from "next";
import JokeService from "@/Service/JokeService";

const jokeService = new JokeService();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "GET") {
            const id: string = req.body.id as string;
            const joke = await jokeService.getJokeById(id);
            return res.status(200).json(joke);
        }

        if (req.method === "POST") {
            const id: string = req.body.id as string;
            const label: string = req.body.label as string;
            const joke = await jokeService.addVoteToJoke(id, label);
            return res.status(201).json(joke);
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Error handling joke request:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
