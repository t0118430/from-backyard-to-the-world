import { Request, Response, Router } from 'express';
import multer from 'multer';
import { createPost, getPosts, getPostId } from '../services/PostService'

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('mainImage'), async (req: Request, res: Response) => {
	try {		
		console.log(req.body);
		const { title, content, mainImage, gallery } = req.body;

		const newPost = await createPost(title, content, mainImage, gallery);

		await res.status(201).json(newPost);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
		res.status(500).json({ error: errorMessage });
	}
});

router.get('/', async (req: Request, res: Response) => {
	try {
		const posts = await getPosts();
		res.status(200).json(posts);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
		res.status(500).json({ error: errorMessage });
	}
});

router.get('/post/:id', async (req: Request, res: Response) => {
	try {		
		const post = await getPostId(Number(req.params.id));
		if(!post) {
			throw new Error("Post not found");
		}
		
		res.json({
			id: post.id,
			title: post.title,
			content: post.content,
			images: post.images,
		});
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
		res.status(500).json({ error: errorMessage });
	}
});

export default router;