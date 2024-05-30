export class InvalidSearchError extends Error {
    constructor() {
        super('Invalid search. Please provide the necessary information to correctly search.')
    }
}