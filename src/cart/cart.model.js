import mongoose from 'mongoose';

const CartItemSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const ShoppingCartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [CartItemSchema],
    totalPrice: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('ShoppingCart', ShoppingCartSchema);