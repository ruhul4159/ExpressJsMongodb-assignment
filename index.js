const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./bookRoutes');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json());
app.use('/', bookRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
