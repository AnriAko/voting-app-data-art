import { NextApiRequest, NextApiResponse } from "next";
import getJoke from "@/utils/getJoke";

async function handleGetJoke(req: NextApiRequest, res: NextApiResponse) {
    try {
        const joke = await getJoke();

        if (joke) {
            res.status(200).json(joke);
        } else {
            res.status(500).json({ error: "Failed to fetch joke" });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        } else {
            console.error("Unknown error.");
        }
    }
}

export default handleGetJoke;
