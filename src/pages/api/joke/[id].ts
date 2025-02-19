import { NextApiRequest, NextApiResponse } from 'next';
import BackendJokeService from '@/Service/backendJokeService';

const jokeService = new BackendJokeService();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'GET') {
            const { id } = req.query;
            if (id) {
                const joke = await jokeService.getJokeById(id as string);
                return res.status(200).json(joke);
            } else {
                const joke = await jokeService.createJoke();
                return res.status(200).json(joke);
            }
        }

        if (req.method === 'POST') {
            const { id } = req.query;
            const { label } = req.body;
            const joke = await jokeService.addVoteToJoke(id as string, label);
            return res.status(201).json(joke);
        }

        if (req.method === 'PUT') {
            const { id } = req.query;
            const updatedJoke = req.body;
            if (!id || !updatedJoke) {
                return res.status(400).json({ error: 'Invalid request data' });
            }
            const joke = await jokeService.updateJoke({
                ...updatedJoke,
                _id: id as string,
            });
            if (joke) {
                return res.status(200).json(joke);
            } else {
                return res.status(404).json({ error: 'Joke not found' });
            }
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) {
                return res.status(400).json({ error: 'Joke ID is required' });
            }
            const joke = await jokeService.deleteJoke(id as string);
            if (joke) {
                return res
                    .status(200)
                    .json({ message: 'Joke deleted successfully' });
            } else {
                return res.status(404).json({ error: 'Joke not found' });
            }
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Error handling joke request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
