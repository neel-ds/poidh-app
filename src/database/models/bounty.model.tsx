import { Schema, models, model } from 'mongoose';

const BountySchema = new Schema({
  id: { type: String, required: true },
  issuer: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: String, required: true },
  description: { type: String, required: true },
  claimer: { type: String },
  createdAt: { type: String },
  claimId: { type: String },
  isMultiplayer: { type: Boolean },
  inProgress: { type: Boolean },
  mongodbCreateDateTime: { type: Date, default: Date.now },
});

const Bounty = models?.Bounty || model('Bounty', BountySchema);

export default Bounty;
