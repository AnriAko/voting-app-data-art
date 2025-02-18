export interface Vote {
    value: number;
    label: string;
}

export interface Joke {
    _id: string;
    question: string;
    answer: string;
    votes: Vote[];
    availableVotes: string[];
}
