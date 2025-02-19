import mongoose, { Schema } from 'mongoose';
import { History, Joke, Vote } from '../Types/jokeType';

const voteSchema = new Schema<Vote>({
    value: { type: Number, required: true },
    label: { type: String, required: true },
});

const historySchema = new Schema<History>({
    time: { type: Date, default: Date.now },
    label: { type: String, required: true },
});

const jokeSchema = new Schema<Joke>({
    _id: { type: String, required: true, unique: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    votes: { type: [voteSchema], default: [] },
    availableVotes: { type: [String], default: ['😂', '👍', '❤️'] },
    history: { type: [historySchema], default: [] },
});

const JokeModel =
    mongoose.models.Joke || mongoose.model<Joke>('Joke', jokeSchema);

export default JokeModel;
