import mongoose, { Schema } from 'mongoose';
import { Joke, Vote } from '../Types/jokeType';

const voteSchema = new Schema<Vote>({
    value: { type: Number, required: true },
    label: { type: String, required: true },
});

const jokeSchema = new Schema<Joke>({
    _id: { type: String, required: true, unique: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    votes: { type: [voteSchema], default: [] },
    availableVotes: { type: [String], default: ['😂', '👍', '❤️'] },
});

const JokeModel =
    mongoose.models.Joke || mongoose.model<Joke>('Joke', jokeSchema);

export default JokeModel;
