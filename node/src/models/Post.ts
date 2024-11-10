class Post {
    title: string;
    content: string;
    images: AttractionImage[];
  
    constructor(title: string, content: string, images: AttractionImage[]) {
      this.title = title;
      this.content = content;
      this.images = images;
    }
  }
  
  class PostBuilder {
    private title: string = '';
    private content: string = '';
    private images: AttractionImage[] = [];
  
    setTitle(title: string): PostBuilder {
      this.title = title;
      return this;
    }
  
    setContent(content: string): PostBuilder {
      this.content = content;
      return this;
    }
  
    setImages(images: AttractionImage[]): PostBuilder {
      this.images = images;
      return this;
    }
  
    build(): Post {
      return new Post(this.title, this.content, this.images);
    }
  }