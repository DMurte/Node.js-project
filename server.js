const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const routes = require('./app/routes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use('/api',routes);

app.listen(4000, function() {
});
