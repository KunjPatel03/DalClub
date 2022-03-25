require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const EventRouter = require('./routes/events');
const OrderRouter = require('./routes/order.routes');
const ProductRouter = require('./routes/product.routes');

const PORT = process.env.PORT || 3005;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/status', (req, res) => {
  res.json({ message: 'DalClub.', status: true });
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api/events', EventRouter);
app.use('/api/orders', OrderRouter);
app.use('/api/products', ProductRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
