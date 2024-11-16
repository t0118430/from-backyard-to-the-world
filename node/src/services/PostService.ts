import { AppDataSource } from '../config';
import { PostEntity } from '../entities/PostEntity';
import { AttractionImageEntity } from '../entities/AttractionImageEntity';
import { PostBuilder,Post } from '../model/Post';
import { AttractionImageBuilder,AttractionImage } from '../model/AttractionImage';
import uploadImageToFirebase from '../firebase/FirebaseService';
import sharp from 'sharp';

const postRepository = AppDataSource.getRepository(PostEntity);
const imageRepository = AppDataSource.getRepository(AttractionImageEntity);

export async function createPost(
    title: string, 
    content: string, 
    mainImage: Express.Multer.File, 
    gallery: Express.Multer.File[]): Promise<Post> {

        console.log(mainImage);

        if (!mainImage) {
			throw Error('Main image cannot be null.');
		}
        
        try {
            const newPost = new PostBuilder()
            .setTitle(title)
            .setContent(content)
            .build();

            await postRepository.save(newPost);

            const mainImageCompressed = await compressImage(mainImage);

            console.log("before uploadImageToFirebase")
            const urlMainImage = await uploadImageToFirebase(mainImage.filename, mainImageCompressed);

            const mainImageEntity = new AttractionImageBuilder()
                                .setUrl(urlMainImage)
                                .setIsMain(true)
                                .setPost(newPost)
                                .build();

            await  imageRepository.save(mainImageEntity);

            const galleryImages = await createGalleryImages(gallery, newPost);

            newPost.images = [mainImageEntity, ...galleryImages];

            return newPost;
        } catch(error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            console.log(errorMessage);
        }
}

export async function getPosts(): Promise<Post[]> {
    return await postRepository.find({
        relations: ['images'],
        order: { createdAt: 'DESC' }
    })
}

export async function getPostId(postId: number): Promise<Post | null> {
    return await postRepository.findOne({
        where: {id: postId},
        relations: ['images'],
    });
} 

async function compressImage(image: Express.Multer.File): Promise<Buffer> {    
    if (!Buffer.isBuffer(image.buffer)) {
        throw new Error("Input is not a valid buffer.");
      }
    return await sharp(image.buffer).resize(800).jpeg({quality: 70}).toBuffer();
}

async function createGalleryImages(gallery: Express.Multer.File[], newPost: Post): Promise<AttractionImage[]> {
    if(!gallery || gallery.length === 0) {
        return [];
    }
    console.log("depois do retun null")
    return await Promise.all(
        gallery.map(async (image) => {
        const galleryImageCompress = await compressImage(image);
        const url = await uploadImageToFirebase(image.originalname, galleryImageCompress);

        const galleryImage = new AttractionImageBuilder()
                                .setUrl(url)
                                .setPost(newPost)
                                .build();
        return imageRepository.save(galleryImage);
        })
    );
}