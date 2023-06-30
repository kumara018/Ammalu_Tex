const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import route files
const productsRoute = require('./routes/productRoutes');
const categoriesRoute = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const signupRoute = require('./routes/signupRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');

// Middleware
app.use(express.json());
// Parse JSON bodies
app.use(bodyParser.json());

// Use the payment routes
app.use('/api/payment', paymentRoutes);

// Use routes
app.use('/api', authRoutes);
app.use('/api/products', productsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/signup', signupRoute);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

// Set up MongoDB connection
mongoose.connect('mongodb://localhost:27017/ammalu_tex_shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define data models
const Product = mongoose.model('Product', {
  name: String,
  image: String,
  price: Number,
  description: String,
});

const Category = mongoose.model('Category', {
  name: String,
  image: String,
  description: String,
});

const Users = mongoose.model('Users', {
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', {
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const CartItem = mongoose.model('CartItem', {
  name: String,
  price: Number,
  quantity: Number,
});

// Define the Order model
const Order = mongoose.model('Order', {
  name: String,
  price: Number,
  quantity: Number
});


// Serve static files
app.use(express.static('public'));

// Define routes
app.get('/api/products', (req, res) => {
  Product.find()
    .then(products => {
      res.json(products);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    });
});

app.get('/api/categories', (req, res) => {
  Category.find()
    .then(categories => {
      res.json(categories);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    });
});

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });
  user.save()
    .then(() => {
      res.status(201).json({ message: 'User created successfully' });
    })
    .catch(error => {
      console.error('Error signing up:', error);
      res.status(500).json({ error: 'Failed to sign up' });
    });
});

app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password })
    .then(user => {
      if (user) {
        res.status(200).json({ message: 'Sign in successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    })
    .catch(error => {
      console.error('Error signing in:', error);
      res.status(500).json({ error: 'Failed to sign in' });
    });
});

app.get('/api/cart', (req, res) => {
  CartItem.find()
    .then(cartItems => {
      res.json(cartItems);
    })
    .catch(error => {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Failed to fetch cart items' });
    });
});



// Retrieve order items
app.get('/api/order', (req, res) => {
  Order.find()
    .then(orderItems => {
      res.json(orderItems);
    })
    .catch(error => {
      console.error('Error fetching order items:', error);
      res.status(500).json({ error: 'Failed to fetch order items' });
    });
});
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
