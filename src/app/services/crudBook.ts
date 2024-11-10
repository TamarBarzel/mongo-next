import axios from "axios";

interface UpdateBookParams {
  _id: string;
  name?: string;
  author?: string;
  publishYear?: number;
}

export const getBooks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/bookRoutes");
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Error loading books", error);
      throw new Error("An unexpected error occurred during getting books.");
    }
  }
};

export const createBook = async (
  name: string, author: string, publishYear: number
) => {
  try {
    const response = await axios.post("http://localhost:3000/api/bookRoutes", {
      name, 
      author,
      publishYear,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Failed creating new book", error);
      throw new Error("An unexpected error occurred during book creation.");
    }
  }
};


export const updateBook = async (params: UpdateBookParams) => {
  try {
    const { _id, ...updates } = params;
    if (!_id) {
      throw new Error("Book _id is required for update.");
    }
    const response = await axios.put(`http://localhost:3000/api/bookRoutes/${_id}`, updates);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Failed updating book", error);
      throw new Error("An unexpected error occurred during book update.");
    }
  }
};

export const deleteBook = async (_id: string) => {
  try {
    if (!_id) {
      throw new Error("Book _id is required for deletion.");
    }
    const response = await axios.delete(`http://localhost:3000/api/bookRoutes/${_id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Failed deleting book", error);
      throw new Error("An unexpected error occurred during book deletion.");
    }
  }
};
