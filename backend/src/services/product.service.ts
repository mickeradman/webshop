import Product, { IProduct } from '../models/product.schema';

export async function getProductsFromDb(
  page: number,
  viewLimit: number
): Promise<{ products: IProduct[]; total: number }> {
  const products = await Product.find()
    .skip((page - 1) * viewLimit)
    .limit(viewLimit)
    .exec();
  const total = await Product.countDocuments().exec();
  return { products, total };
}

export async function getProductCount(): Promise<number> {
  return await Product.countDocuments().exec();
}
