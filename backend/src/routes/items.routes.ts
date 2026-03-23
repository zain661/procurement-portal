import express from 'express';
import { Item } from '../models/item.model';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = express.Router();

// GET /items - get all items (protected)
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const items = await Item.find().populate('createdBy', 'name email').sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST /items - create new item (protected)
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { title, description, category, price } = req.body;

    const item = await Item.create({
      title,
      description,
      category,
      price,
      createdBy: req.userId
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;