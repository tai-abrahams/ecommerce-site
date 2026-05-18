const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const port = process.env.PORT; 
const mongoose = require('mongoose');
const mongoURL2 = process.env.mongo;
const DBURL = process.env.MONGO_URL;
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const ordersRoute = require('./routes/order');
const cartRoute = require('./routes/cart');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');
const middleware = require('./middlewares');
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({ filename: 'combined.log' }),
  ],
});

mongoose.connect(
    DBURL).then(
        () => logger.info('DB connected')
    ).catch((e) => 
    // eslint-disable-next-line no-console
      logger.error(e.message + 'error')
    );


app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/cart', cartRoute);

app.use('/api/checkout', stripeRoute);


app.use(middleware.notFound);
app.use(middleware.errorHandler);

app.listen(port || 8080, ()=>{
     console.log(`listening on ${port}`)
})

