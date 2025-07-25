import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface IGeneration extends Document {
  user: Types.ObjectId;
  prompt: string;
  modelName: string; // ✅ renamed to avoid conflict
  output: string;
  steps?: { code?: string; id?: number; description?: string; path?: string; status?: string; title?: string; type?: number }[];
  files?: { name: string; content: string }[];
  createdAt: Date;
}

const GenerationSchema = new Schema<IGeneration>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    prompt: { type: String, required: true },
    modelName: { type: String, required: true }, // ✅ renamed
    output: { type: String, required: true },
    steps: [
      {
        code: { type: String },
        id: { type: Number, required: true },
        description: { type: String, required: false, default: '' }, // ✅ explicitly mark as not required
        path: { type: String, required: false, default: '' },        // ✅ explicitly mark as not required
        status: { type: String, required: true },
        title: { type: String, required: true },
        type: { type: Number, required: true },
      }
    ],
    files: [
      {
        name: String,
        content: String,
      },
    ],
  },
  { timestamps: true }
);

const Generation: Model<IGeneration> =
  mongoose.models.Generation || mongoose.model<IGeneration>("Generation", GenerationSchema);

export default Generation;