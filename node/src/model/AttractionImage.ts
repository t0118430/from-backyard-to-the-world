import { Post } from './Post';

export class AttractionImage {
  id: number;

  url: string;

  isMain: boolean;

  createdAt: Date;

  updatedAt: Date;

  post: Post;
}

export class AttractionImageBuilder {
  private attractionImage: AttractionImage;

  constructor() {
    this.attractionImage = new AttractionImage();
  }

  setUrl(url: string): AttractionImageBuilder {
    this.attractionImage.url = url;
    return this;
  }

  setIsMain(isMain: boolean): AttractionImageBuilder {
    this.attractionImage.isMain = isMain;
    return this;
  }

  setPost(post: Post): AttractionImageBuilder {
    this.attractionImage.post = post;
    return this;
  }

  build(): AttractionImage {   
    return this.attractionImage;
  }
}