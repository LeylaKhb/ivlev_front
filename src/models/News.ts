export class News {
    id: number;
    title: string;
    photoUrl: string;
    shortDescription: string;
    description: string;
    dateCreated: Date;


    constructor(id: number, title: string, photo: string, shortDescription: string, description: string, dateCreated: Date) {
        this.id = id;
        this.title = title;
        this.photoUrl = photo;
        this.shortDescription = shortDescription;
        this.description = description;
        this.dateCreated = dateCreated;
    }
}
