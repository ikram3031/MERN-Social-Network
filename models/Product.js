const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide product Title'],
    },
    image: {
        type: String,
        required: [true, 'Please provide product Images'],
    },
    gallery: {
        type: [String],
        default: [],
    },
    category: {
        type: String,
        required: [true, 'Please provide product Category'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
    },
    salePrice: {
        type: Number,
        default: function () {
            return this.price;
        },
    },
    colors: {
        type: [String],
        // required: true,
    },
    features: {
        type: String,
        required: [true, 'Please provide product Features'],
    },
    description: {
        type: String,
        required: [true, 'Please provide product Description'],
    },
    shortDesc: {
        type: String,
        required: [true, 'Please provide product Short Description'],
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
