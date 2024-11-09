
export class PostNotFoundException extends Error {
    public statusCode: number;

    constructor() {
        super('Post not found.')
        this.name = 'PostNotFoundException';
        this.statusCode = 404;
    }    	
}