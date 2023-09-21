import mongoose from "mongoose";

const collection = "tickets";

const schema = new mongoose.Schema(
  {
    code: String,
    amount: Number,
    purchaser: String,
    products: {
      type: [
        {
          product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "products",
          },
          quantity: Number,
        },
      ],
      default: [],
    },
  },

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;
