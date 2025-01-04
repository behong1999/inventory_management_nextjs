import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dashboardRouter from './routes/dashboardRoutes';
import productRouter from './routes/productRoutes';
import userRouter from './routes/userRoutes';
import expenseRouter from './routes/expenseRoutes';

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json()); // Parse incoming JSON requests
app.use(helmet()); // Set secure HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); // Allow cross-origin resource sharing
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for requests from other origins
app.use(morgan('common')); // Log HTTP requests
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data

/* ROUTES */
app.get('/hello', (req, res) => {
  res.send('Hello from server');
});

app.use('/dashboard', dashboardRouter); // https://localhost:8000/dashboard
app.use('/products', productRouter); // https://localhost:8000/products
app.use('/users', userRouter); // https://localhost:8000/users
app.use('/expenses', expenseRouter); // https://localhost:8000/expenses

/* SERVER */
const port =Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
