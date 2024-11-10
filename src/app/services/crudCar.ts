import axios from "axios";

interface UpdateCarParams {
  _id: string;
  id?: string;
  company?: string;
  model?: string;
  year?: number;
}

export const getCars = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/carRoutes");
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Error loading cars", error);
      throw new Error("An unexpected error occurred during getting cars.");
    }
  }
};

export const createCar = async (
  id: string, company: string, model: string, year: number
) => {
  try {
    const response = await axios.post("http://localhost:3000/api/carRoutes", {
      id, 
      company,
      model,
      year,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Failed creating new car", error);
      throw new Error("An unexpected error occurred during car creation.");
    }
  }
};


export const updateCar = async (params: UpdateCarParams) => {
  try {
    const { _id, ...updates } = params;
    if (!_id) {
      throw new Error("Car _id is required for update.");
    }
    const response = await axios.put(`http://localhost:3000/api/carRoutes/${_id}`, updates);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Failed updating car", error);
      throw new Error("An unexpected error occurred during car update.");
    }
  }
};

export const deleteCar = async (_id: string) => {
  try {
    if (!_id) {
      throw new Error("Car _id is required for deletion.");
    }
    const response = await axios.delete(`http://localhost:3000/api/carRoutes/${_id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Failed deleting car", error);
      throw new Error("An unexpected error occurred during car deletion.");
    }
  }
};
