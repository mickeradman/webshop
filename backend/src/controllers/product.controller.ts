import { Request, Response } from 'express';
import * as ProductService from '../services/product.service';

export async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const viewLimit = parseInt(req.query.viewLimit as string) || 5;
    const minPrice = parseInt(req.query.minPrice as string) || 0;
    const maxPrice = parseInt(req.query.maxPrice as string) || 25000;
    const search = (req.query.search as string) || '';

    type QueryProps = {
      page: number;
      viewLimit: number;
      minPrice: number;
      maxPrice: number;
      search: string;
    };

    const queryParams: QueryProps = {
      page,
      viewLimit,
      minPrice,
      maxPrice,
      search,
    };

    const { products, total } = await ProductService.getProductsFromDb(
      queryParams
    );

    if (products.length > 0) {
      res.status(200).json({ success: true, products, total });
    } else {
      res.status(200).json({
        success: false,
        message: 'Det finns inga produkter i databasen som matchar inställningarna i sökfiltret.',
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
