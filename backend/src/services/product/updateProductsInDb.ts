import Product, { IProduct } from '../../models/productModel';

type UpdateProductParams = {
  productId: string;
  updateFields: Partial<IProduct>;
};

export async function updateProductsInDb({
  productId,
  updateFields,
}: UpdateProductParams): Promise<IProduct | null> {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}
