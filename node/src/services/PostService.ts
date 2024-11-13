import { AppDataSource } from '../config';
import { PostEntity, PostBuilder } from '../entities/PostEntity';
import { AttractionImageEntity, AttractionImageBuilder } from '../entities/AttractionImageEntity';
import uploadImageToFirebase from '../firebase/FirebaseService'; // Assuming these utility functions exist
import sharp from 'sharp';

const postRepository = AppDataSource.getRepository(PostEntity);
const imageRepository = AppDataSource.getRepository(AttractionImageEntity);

export async function createPost(
    title: string, 
    content: string, 
    mainImage: Express.Multer.File, 
    gallery: Express.Multer.File[]): Promise<PostEntity> {

        if (!mainImage) {
			throw Error('Main image cannot be null.');
		}

		const newPost = new PostBuilder()
							.setTitle(title)
							.setContent(content)
							.build();

        await postRepository.save(newPost);

		const mainImageCompressed = await compressImage(mainImage);
		
		const urlMainImage = await uploadImageToFirebase(mainImage.filename, mainImageCompressed);
		
		const mainImageEntity = new AttractionImageBuilder()
									.setUrl(urlMainImage)
									.setIsMain(true)
                                    .setPost(newPost)
									.build();

        await  imageRepository.save(mainImageEntity);

        const galleryImages = await Promise.all(
            gallery.map(async (image) => {
                const galleryImageCompress = await compressImage(image);
                const url = await uploadImageToFirebase(image.originalname, galleryImageCompress);

                const galleryImage = new AttractionImageBuilder()
                                        .setUrl(url)
                                        .setPost(newPost)
                                        .build();
                return imageRepository.save(galleryImage);
            })
        )
        
        newPost.images = [mainImageEntity, ...galleryImages];

        return newPost;
}

export async function getPosts(): Promise<PostEntity[]> {
    return await postRepository.find({
        relations: ['images'],
        order: { createdAt: 'DESC' }
    })
}

export async function getPostId(postId: number): Promise<PostEntity | null> {
    return await postRepository.findOne({
        where: {id: postId},
        relations: ['images'],
    });
} 

async function compressImage(image: Express.Multer.File): Promise<Buffer> {
	return sharp(image.buffer).resize(800).jpeg({quality: 80}).toBuffer();
}