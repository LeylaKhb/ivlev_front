export class NewsRequest {
    id: number;
    title: string;
    mediaId: number;
    shortDescription: string;
    description: string;


    constructor(id: number, title: string, mediaId: number, shortDescription: string, description: string) {
        this.id = id;
        this.title = title;
        this.mediaId = mediaId;
        this.shortDescription = shortDescription;
        this.description = description;
    }
}
