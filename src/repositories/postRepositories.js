import cloudinary from "../config/cloudinaryConfig.js";
import Post from "../schema/post.js";

export const createPost = async (req, res) => {
  const { caption, user } = req.body;

  const file = req.file.path;

  try {
    if (!file) {
      return res.json({ success: false, message: "file not founds" });
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(file, {
      folder: "ImageGram",
    });

    const newPost = await Post.create({
      caption,
      user,

      image_url: cloudinaryResponse.secure_url,
    });

    res.status(201).json({ sucess: true, data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

//display all posts
//api/v1/post?limit=10&offset=0
export const findAllPost = async (offset, limit) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(parseInt(offset, 10))
      .limit(parseInt(limit, 10));
    return posts;
  } catch (error) {
    throw new Error(error.message); // Pass the error to the calling function
  }
};

export const countAllPost = async () => {
  try {
    return await Post.countDocuments();
  } catch (error) {
    throw new Error(error.message);
  }
};

//display single post by id
export const findPostByid = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return res.json({ success: false, message: "post not found" });
  } else {
    return res.json({ post });
  }
};

//delete post using id
export const deletePostById = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const post = await Post.findByIdAndDelete(id);
      if (!post) {
        res.json({ success: false, message: "id not found" });
      } else {
        return res.json({ success: true, message: "post deleted", post });
      }
    } else {
      res.json({ success: false, message: "id not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
};

export const updatePostById = async (id, updateObject) => {
  try {
    const post = await Post.findByIdAndUpdate(id, updateObject, { new: true });
    return post;
  } catch (error) {
    console.log(error);
  }
};
