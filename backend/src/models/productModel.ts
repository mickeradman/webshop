import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  description: string;
  price: number;
  stockQty: number;
  imgPath: string;
  category: string;
}

const Product: Schema = new Schema(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stockQty: {
      type: Number,
      required: true,
    },
    imgPath: { type: String, required: true },
    category: { type: String },
  },
  { collection: 'wares' }
);

export default mongoose.model<IProduct>('Product', Product);
