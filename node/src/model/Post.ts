export class Post {
id: number;

title: string;

content: string;

createdAt: Date;

updatedAt: Date;

images: { id: number, url: string }[];
}

export class PostBuilder {
private post: Post;

constructor() {
    this.post = new Post();
}

setTitle(title: string): PostBuilder {
    this.post.title = title;
    return this;
}

setContent(content: string): PostBuilder {
    this.post.content = content;
    return this;
}

setImages(images: { id: number, url: string }[]): PostBuilder {
    this.post.images = images;
    return this;
}

build(): Post {
    // Set default dates if they were not set
    this.post.createdAt = new Date();

    this.post.updatedAt = new Date();
    
    return this.post;
}
}