import { Router, Request, Response } from 'express';
import multer from 'multer';
import Post from '../models/Post';
import path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
	  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
	  cb(null, uniqueSuffix + '-' + file.originalname);
	},
  });

const upload = multer({ storage });

const router = Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		const { title, content } = req.body;
		const newPost = await Post.create({ title, content });
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

export default router;