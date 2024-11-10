import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity
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

  @ManyToOne(() => PostEntity, (post) => post.images)
  post: PostEntity;
}