export class Post {
    id: number;
    postText: string;
    hour: Date;
    userId: number;
    postTextValue: string;
    constructor (postText: string, postTextValue: string, userId: number, id?: number ) {
        this.id = id;
        this.postText = postText;
        this.hour = new Date();
        this.userId = userId;
        this.postTextValue = postTextValue;
    }
}