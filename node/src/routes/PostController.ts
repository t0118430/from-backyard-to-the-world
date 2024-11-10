import { Router, Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { PostEntity } from '../entities/PostEntity';
import { PostNotFoundException } from '../exceptions/PostNotFoundException';
import { AppDataSource } from '../config';
import { Post } from '../models/Post';
import { AttractionImage } from '../models/AttractionImage';


const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.post('/', upload.array('image', 10), async (req: Request, res: Response) => {
	try {		
		const { title, content } = req.body;
		const mainImage = req.files['mainImage'] as Express.Multer.File[];
		const galleryImages = req.files['gallery'] as Express.Multer.File[];

		if (mainImage) {
			throw Error('Main image cannot be null.');
		}

		if (file) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
			const outputFileName = `compressed-${uniqueSuffix}-${file.originalname}`;
			const outputPath = path.join(__dirname, '../../src/uploads', outputFileName);

			//compress and save the image
			await sharp(file.buffer)
				.resize({ width: 800 })
				.jpeg({ quality: 70 })
				.toFile(outputPath);
			
			imageUrl = `/uploads/${outputFileName}`;
		}
		


		const newPost =  PostEntity({ 
			title: title, 
			content: content,
			imageUrl: imageUrl
		});
		res.status(201).json(newPost);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
		res.status(500).json({ error: errorMessage });
	}
});

router.get('/', async (req: Request, res: Response) => {
	try {
		const posts = await PostEntity.find();
		res.status(200).json(posts);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
		res.status(500).json({ error: errorMessage });
	}
});

router.get('/post/:id', async (req: Request, res: Response) => {
	try {		
		const post = await PostEntity.findOneBy({ id: Number(req.params.id) });
		if(!post) {
			throw new PostNotFoundException();
		}
		
		res.json({
			id: post.id,
			title: post.title,
			content: post.content,
			images: post.images,
		});
	} catch (error) {
		if (error instanceof PostNotFoundException) {
			res.status(404).json({ error: 'Post not found' });
		} else {
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
			res.status(500).json({ error: errorMessage });
		}
	}
});

export default router;