"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const expenseRoutes_1 = __importDefault(require("./routes/expenseRoutes"));
/* CONFIGURATIONS */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Parse incoming JSON requests
app.use((0, helmet_1.default)()); // Set secure HTTP headers
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' })); // Allow cross-origin resource sharing
app.use((0, cors_1.default)()); // Enable Cross-Origin Resource Sharing (CORS) for requests from other origins
app.use((0, morgan_1.default)('common')); // Log HTTP requests
app.use(body_parser_1.default.urlencoded({ extended: false })); // Parse URL-encoded data
/* ROUTES */
app.get('/hello', (req, res) => {
    res.send('Hello from server');
});
app.use('/dashboard', dashboardRoutes_1.default); // https://localhost:8000/dashboard
app.use('/products', productRoutes_1.default); // https://localhost:8000/products
app.use('/users', userRoutes_1.default); // https://localhost:8000/users
app.use('/expenses', expenseRoutes_1.default); // https://localhost:8000/expenses
/* SERVER */
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
