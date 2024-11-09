export interface Post {
    id?: string;
    title: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    createdAt: Date;
  }