import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from './PostEntity';

@Entity()
export class AttractionImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ default: false })
  isMain: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.images)
  post: PostEntity;
}

export class AttractionImageBuilder {
  private attractionImage: AttractionImageEntity;

  constructor() {
    this.attractionImage = new AttractionImageEntity();
  }

  setUrl(url: string): AttractionImageBuilder {
    this.attractionImage.url = url;
    return this;
  }

  setIsMain(isMain: boolean): AttractionImageBuilder {
    this.attractionImage.isMain = isMain;
    return this;
  }

  setPost(post: PostEntity): AttractionImageBuilder {
    this.attractionImage.post = post;
    return this;
  }

  build(): AttractionImageEntity {   
    return this.attractionImage;
  }
}