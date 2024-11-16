export default class OwnerNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'OwnerNotFoundError';
    }
}