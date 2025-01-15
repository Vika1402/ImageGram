import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: String,
  public_id: String,
  image_url: String,
});
export const File = mongoose.model("cloudinary", fileSchema);

export default fileSchema;
