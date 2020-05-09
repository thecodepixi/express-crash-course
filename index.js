const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

//Init Middleware
// app.use(logger);

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// Set static folder
//does the same as above, setting the public folder as the static file source and rendering each file in public on its own route using the file name as the path
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
