import { Router, Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import Post from '../models/Post';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.post('/', upload.single('image'), async (req: Request, res: Response) => {
	try {		
		const title = req.body.title;
		const content = req.body.content;
		const file = req.file;
		let imageUrl = null;

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

		const newPost = await Post.create({ 
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
		const posts = await Post.findAll();
		res.status(200).json(posts);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
		res.status(500).json({ error: errorMessage });
	}
});

router.get('/post/:id', async (req: Request, res: Response) => {
	try {		
		const post = await Post.findByPk(req.params.id);
		if(!post) {
			return res.status(404).json({ error: 'Post not found' });
		}
		
		res.json({
			id: post.id,
			title: post.title,
			content: post.content,
			imageUrl: post.imageUrl,
		});
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
		res.status(500).json({ error: errorMessage });
	}
});

export default router;