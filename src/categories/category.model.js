import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "this name is required"],
    },
    state: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Category', CategorySchema);