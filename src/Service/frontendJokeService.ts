import axios from 'axios';
import { Joke } from '@/Types/jokeType';

class FrontendJokeService {
    public async getJoke(): Promise<Joke> {
        try {
            const response = await axios.get<Joke>('/api/joke/');
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
    public async updateJoke(updatedJoke: Joke): Promise<Joke> {
        try {
            const response = await axios.put<Joke>(
                `/api/joke/${updatedJoke._id}`,
                updatedJoke
            );
            return response.data;
        } catch (error) {
            console.error(
                `Error updating joke (ID: ${updatedJoke._id}):`,
                error
            );
            throw new Error('Failed to update joke. Please try again.');
        }
    }
    public async deleteJoke(id: string): Promise<void> {
        try {
            await axios.delete(`/api/joke/${id}`);
        } catch (error) {
            console.error(`Error deleting joke (ID: ${id}):`, error);
            throw new Error('Failed to delete joke. Please try again.');
        }
    }
}
const frontendJokeService = new FrontendJokeService();
export default frontendJokeService;
