import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';

class Post extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public imageUrl?: string;
  public videoUrl?: string;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'posts',
  }
);

export default Post;
