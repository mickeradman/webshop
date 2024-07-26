import Product, { IProduct } from '../../models/productModel';

type QueryProps = {
  page: number;
  viewLimit: number;
  minPrice: number;
  maxPrice: number;
  search: string;
};

type MongoQuery = {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
  price?: { $gte?: number; $lte?: number };
};

export async function getProductsFromDb({
  page,
  viewLimit,
  minPrice = 0,
  maxPrice = Infinity,
  search = '',
}: QueryProps): Promise<{ products: IProduct[]; total: number }> {
  const query: MongoQuery = {};

  if (search) {
    const searchWords = search
      .split(' ')
      .map((word) => `(?=.*${word})`)
      .join('');
    const regexString = `^${searchWords}.*$`;
    query.$or = [
      { productName: { $regex: regexString, $options: 'i' } },
      { description: { $regex: regexString, $options: 'i' } },
      { tags: { $regex: regexString, $options: 'i' } },
    ];
  }

  if (minPrice > 0 || maxPrice < Infinity) {
    query.price = {};
    if (minPrice > 0) query.price.$gte = minPrice;
    if (maxPrice < Infinity) query.price.$lte = maxPrice;
  }

  const total = await Product.countDocuments(query).exec();

  if (total === 0) {
    return { products: [], total };
  } else if (total <= viewLimit * page) {
    page = Math.ceil(total / viewLimit);
  }

  const products = await Product.find(query)
    .skip((page - 1) * viewLimit)
    .limit(viewLimit)
    .exec();

  return { products, total };
}
