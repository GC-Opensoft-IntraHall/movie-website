import mongoose from "mongoose";
const { Schema } = mongoose;

// Referencing an existing collection

// Perform CRUD operations on the existing 'notes' collection
export const Movies = mongoose.model(
  "movies",
  new mongoose.Schema({}, { strict: false })
);
