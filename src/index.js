const express = require('express');
const app = express();
const morgan = require('morgan');


// Settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);


// Middlewares
app.use(morgan('common'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.json({
      status: "running",
      message: "API is working",
      timestamp: new Date().toISOString()
  });
});

// Starting server
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})