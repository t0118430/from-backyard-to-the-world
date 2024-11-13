import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AttractionImageEntity } from './AttractionImageEntity';

@Entity()
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => AttractionImageEntity, (image) => image.post, { cascade: true })
  images: AttractionImageEntity[];
}

export class PostBuilder {
  private post: PostEntity;

  constructor() {
    this.post = new PostEntity();
  }

  setTitle(title: string): PostBuilder {
    this.post.title = title;
    return this;
  }

  setContent(content: string): PostBuilder {
    this.post.content = content;
    return this;
  }

  setImages(images: AttractionImageEntity[]): PostBuilder {
    this.post.images = images;
    return this;
  }

  build(): PostEntity {
    // Set default dates if they were not set
    this.post.createdAt = new Date();

    this.post.updatedAt = new Date();
    
    return this.post;
  }
}