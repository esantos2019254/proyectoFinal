import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "this name is required"],
    },
    price: {
        type: Number,
        required: [true, "this price is required"],
    },
    quantityStock: {
        type: Number,
        required: [true, "this amount is required"],
    },
    quantitySold: {
        type: Number,
        required: [true, "this amount sold is required"],
    },
    state: {
        type: Boolean,
        default: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

export default mongoose.model('Product', ProductSchema);