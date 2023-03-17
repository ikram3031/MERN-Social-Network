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
    category: {
        type: String,
        required: [true, 'Please provide product Category'],
    },
    rating: {
        type: Number,
        required: [true, 'Please provide product Rating'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
    },
    colors: {
        type: [String],
        // required: true,
    },
    url:{
        type: String,
        required: true,
    },
    sales: {
        type: Number,
        required:[true, 'Please provide url'],
    },
    features: {
        type: String,
        required: [true, 'Please provide product Features'],
    },
    description: {
        type: String,
        required: [true, 'Please provide product Description'],
    },
    details: {
        type: String,
        required: [true, 'Please provide product Details'],
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
