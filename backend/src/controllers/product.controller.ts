import { Request, Response } from 'express';
import * as ProductService from '../services/product.service';

export async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const viewLimit = parseInt(req.query.viewLimit as string) || 5;

    const { products, total } = await ProductService.getProductsFromDb(
      page,
      viewLimit
    );

    if (products.length > 0) {
      res.status(200).json({ products, total });
    } else {
      res.status(404).json({
        success: false,
        message: 'Hittade inga produkter i databasen.',
      });
    }
  } catch (error) {
    console.error('Fel vid hämtning av produkter:', error);
    res.status(500).json({
      success: false,
      message: 'Något gick snett. Vänligen försök igen.',
    });
  }
}

export async function getProductsCount(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const count = await ProductService.getProductCount();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Fel vid hämtning av antal produkter:', error);
    res.status(500).json({
      success: false,
      message: 'Något gick snett. Vänligen försök igen.',
    });
  }
}
