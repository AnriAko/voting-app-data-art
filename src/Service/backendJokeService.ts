import mongoose from 'mongoose';
import JokeModel from '@/Schema/jokeSchema';
import { Joke, Vote } from '@/Types/jokeType';
import getJoke from '@/utils/getJoke';

class BackendJokeService {
    private async connectDb() {
        if (mongoose.connections[0].readyState) {
            return;
        }
        await mongoose.connect(process.env.DB_URI || '');
    }
    public async createJoke(): Promise<Joke> {
        try {
            await this.connectDb();
            const getJokeTH = await getJoke();
            if (!getJokeTH) {
                throw new Error('Joke not found');
            }
            const candidateJoke = await JokeModel.findOne({
                _id: getJokeTH.id,
            });
            if (candidateJoke) {
                return candidateJoke;
            } else {
                const joke = new JokeModel({
                    _id: getJokeTH.id,
                    question: getJokeTH.question,
                    answer: getJokeTH.answer,
                });
                await joke.save();
                return joke;
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error creating joke:', error);
                throw error;
            } else {
                throw new Error('Unknown error');
            }
        }
    }

    public async addVoteToJoke(
        id: string,
        label: string
    ): Promise<Joke | null> {
        try {
            await this.connectDb();
            const joke = await JokeModel.findById(id);
            if (!joke) {
                throw new Error('Joke not found');
            }

            const existingVote = joke.votes.find(
                (vote: Vote) => vote.label === label
            );

            if (existingVote) {
                existingVote.value += 1;
            } else {
                if (!joke.availableVotes.includes(label)) {
                    throw new Error('Label not available');
                }
                joke.votes.push({ value: 1, label });
            }

            joke.history.push({ label });
            await joke.save();
            return joke;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error adding vote:', error);
                throw error;
            } else {
                throw new Error('Unknown error');
            }
        }
    }

    public async getJokeById(id: string): Promise<Joke | null> {
        try {
            await this.connectDb();
            const joke = await JokeModel.findById(id);
            if (!joke) {
                throw new Error('Joke not found');
            }
            return joke;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error getting joke by ID:', error);
                throw error;
            } else {
                throw new Error('Unknown error');
            }
        }
    }
    public async updateJoke(updatedJoke: Joke): Promise<Joke | null> {
        try {
            await this.connectDb();
            const joke = await JokeModel.findById(updatedJoke._id);
            if (!joke) {
                throw new Error('Joke not found');
            }

            joke.question = updatedJoke.question;
            joke.answer = updatedJoke.answer;

            await joke.save();
            return joke;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error updating joke:', error);
                throw error;
            } else {
                throw new Error('Unknown error');
            }
        }
    }
    public async deleteJoke(id: string): Promise<boolean> {
        try {
            await this.connectDb();
            const joke = await JokeModel.findByIdAndDelete(id);
            if (!joke) {
                return false;
            }
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error deleting joke:', error);
                throw error;
            } else {
                throw new Error('Unknown error');
            }
        }
    }
}

export default BackendJokeService;
