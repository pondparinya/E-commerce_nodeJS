const mongoose = require('mongoose');
const url = 'mongodb+srv://ecommerce:ecommerce@cluster0.idq5h.mongodb.net/users?retryWrites=true&w=majority'
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    admin: { type: Number },
    date: {

        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('userdata', userSchema);