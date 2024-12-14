import { Request, Response } from 'express';
import { pool } from '../config/database';
import { validateOrder } from '../utils/validation';

export const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;

  try {
    const validatedOrder = validateOrder(orderData);
    
    await pool.query('BEGIN');
    
    const orderResult = await pool.query(
      'INSERT INTO orders (customer_name, address, phone, total_amount) VALUES ($1, $2, $3, $4) RETURNING id',
      [validatedOrder.customerName, validatedOrder.address, validatedOrder.phone, validatedOrder.totalAmount]
    );
    
    const orderId = orderResult.rows[0].id;
    
    for (const item of validatedOrder.items) {
      await pool.query(
        'INSERT INTO order_items (order_id, food_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.id, item.quantity, item.price]
      );
    }
    
    await pool.query('COMMIT');
    res.json({ success: true, orderId });
  } catch (err) {
    await pool.query('ROLLBACK');
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to create order' });
    }
  }
};