import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Product from '../src/models/productModel';
import { products } from './products';

dotenv.config();

mongoose
  .connect(process.env.DB_URL ?? 'undefined')
  .then(() => {
    console.log('Ansluten till databasen.');
    return seedDatabase();
  })
  .catch((err) =>
    console.error('Ett fel inträffade vid anslutning till databasen:', err)
  );

async function seedDatabase() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Databasen är nu populerad med data!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.disconnect();
  }
}
