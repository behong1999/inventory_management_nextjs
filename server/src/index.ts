import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dashboardRouter from './routes/dashboardRoutes';
import productRouter from './routes/productRoutes';

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.get('/hello', (req, res) => {
  res.send('Hello from server');
});

app.use('/dashboard', dashboardRouter); // https://localhost:8000/dashboard
app.use('/products', productRouter); // https://localhost:8000/products

/* SERVER */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
