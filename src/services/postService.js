import {
  countAllPost,
  findAllPost,
  updatePostById,
} from "../repositories/postRepositories.js";

export const getAllPostsService = async (offset, limit) => {
  try {
    const posts = await findAllPost(offset, limit);
    const totalDocument = await countAllPost();
    const totalPages = Math.ceil(totalDocument / limit);

    return {
      posts,
      totalDocument,
      totalPages,
    };
  } catch (error) {
    throw new Error(error.message); // Pass the error to the controller
  }
};

export const updatePostService = async (id, updateObject) => {
  const response = await updatePostById(id, updateObject);
  return response;
};
