import mongoose, { Schema, Document } from "mongoose";

export interface Vote {
    value: number;
    label: string;
}

export interface Joke extends Document {
    question: string;
    answer: string;
    votes: Vote[];
    availableVotes: string[];
}

const voteSchema = new Schema<Vote>({
    value: { type: Number, required: true },
    label: { type: String, required: true },
});

const jokeSchema = new Schema<Joke>({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    votes: { type: [voteSchema], default: [] },
    availableVotes: { type: [String], default: [] },
});

const JokeModel =
    mongoose.models.Joke || mongoose.model<Joke>("Joke", jokeSchema);

export default JokeModel;
