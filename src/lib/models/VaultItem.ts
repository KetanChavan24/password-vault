import mongoose, { Schema, models } from 'mongoose';

const VaultItemSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: String,
  username: String,
  encryptedPassword: String, // This will store encrypted data
  url: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const VaultItem = models.VaultItem || mongoose.model('VaultItem', VaultItemSchema);

export default VaultItem;