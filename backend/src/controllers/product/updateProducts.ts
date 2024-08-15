import { Request, Response } from 'express';
import { updateProductsInDb } from '../../services/product/updateProductsInDb';

export const updateProducts = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const updateFields = req.body;

  try {
    const updatedProduct = await updateProductsInDb({
      productId,
      updateFields,
    });

    if (updatedProduct) {
      res.status(200).json({ success: true, product: updatedProduct });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to update product' });
  }
};
