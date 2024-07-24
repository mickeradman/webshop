import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import productRoutes from './routes/product.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();
const app = express();
const port = parseInt(process.env.PORT ?? '3000');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/users/products', productRoutes);
app.use('/api/admin/products', adminRoutes);
app.use('/api/admin/products/count', adminRoutes);

mongoose
  .connect(process.env.DB_URL ?? 'undefined')
  .then(() => console.log('Ansluten till databasen.'))
  .catch((err) =>
    console.error('Ett fel inträffade vid anslutning till databasen:', err)
  );

app.use((_req: Request, res: Response) => {
  res.status(404).send({ error: 'Adressen kan inte hittas.' });
});

interface CustomError extends Error {
  status?: number;
  body?: any;
}

app.use(
  (
    err: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Felaktig JSON-syntax:', err);
      res
        .status(400)
        .json({ success: false, message: 'Felaktig JSON-syntax.' });
    } else {
      console.error('Serverfel:', err);
      res.status(500).json({ success: false, message: 'Något gick fel.' });
    }
  }
);

app.listen(port, () => {
  console.log(`Servern körs på port ${port}.`);
});

export default mongoose.connection;
