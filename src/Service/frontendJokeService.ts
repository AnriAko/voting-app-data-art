import axios from 'axios';
import { Joke } from '@/Types/jokeType';

class FrontendJokeService {
    public async getJoke(): Promise<Joke> {
        try {
            const response = await axios.get<Joke>(
                '/api/joke/dead-men-tell-no'
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching joke:', error);
            throw new Error('Failed to load a joke. Please try again.');
        }
    }
    public async voteOnJoke(jokeId: string, label: string): Promise<Joke> {
        try {
            const response = await axios.post<Joke>(`/api/joke/${jokeId}`, {
                label,
            });
            return response.data;
        } catch (error) {
            console.error(`Error voting on joke (ID: ${jokeId}):`, error);
            throw new Error('Failed to submit your vote. Please try again.');
        }
    }
}
const frontendJokeService = new FrontendJokeService();
export default frontendJokeService;
