const mongoose = require('mongoose');
const url = 'mongodb+srv://ecommerce:ecommerce@cluster0.idq5h.mongodb.net/users?retryWrites=true&w=majority'
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


var productsSchema = new mongoose.Schema({
    brand: { type: String },
    nameproducts: { type: String },
    price: { type: String },
    size: { type: String },
    img: { type: String }
});

var products = module.exports = mongoose.model('products', productsSchema);