import {
  getAllPostsService,
  updatePostService,
} from "../services/postService.js";

export async function getAllPosts(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const paginatedPost = await getAllPostsService(offset, limit);

    return res.status(200).json({
      success: true,
      message: "All posts fetched successfully",
      data: paginatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updatePost(req, res) {
  try {
    const updateObject = req.body;
    if (req.file) {
      updateObject.image = req.file.location;
    }
    const response = await updatePostService(req.params.id, updateObject);
    return res.status(200).json({
      success: true,
      message: "post updated successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
