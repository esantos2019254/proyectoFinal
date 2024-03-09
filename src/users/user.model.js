import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  lastName: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligarorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligaroria"],
  },
  role: {
    type: String,
    enum: ['CLIENT_ROLE', 'ADMIN_ROLE'],
    default: 'CLIENT_ROLE'
  },
  state: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('User', UserSchema);