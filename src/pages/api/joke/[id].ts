import { NextApiRequest, NextApiResponse } from "next";
import JokeService from "@/Service/JokeService";

const jokeService = new JokeService();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "GET") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        if (req.method === "POST") {
            const joke = await jokeService.createJoke();
            return res.status(201).json(joke);
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Error handling joke request:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
