import { Request, Response } from 'express';
import { pool } from '../config/database';

export const getFoods = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM foods ORDER BY category, name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
};