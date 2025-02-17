import { Joke } from "./joke";

const getJoke = async (): Promise<Joke | undefined> => {
    try {
        const response = await fetch("https://teehee.dev/api/joke");

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data: Joke = await response.json();
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        } else {
            console.error("Unknown error.");
        }
    }
};

export default getJoke;
