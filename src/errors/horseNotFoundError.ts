export default class HorseNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'HorseNotFoundError';
    }
}