import axios from "axios";

interface UpdateCityParams {
  _id: string;
  name?: string;
  country?: string;
}

export const getCities = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/cityRoutes");
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Error loading cities", error);
      throw new Error("An unexpected error occurred during getting cities.");
    }
  }
};

export const createCity = async (
  name: string, country: string
) => {
  try {
    const response = await axios.post("http://localhost:3000/api/cityRoutes", {
      name, 
      country,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Failed creating new city", error);
      throw new Error("An unexpected error occurred during city creation.");
    }
  }
};


export const updateCity = async (params: UpdateCityParams) => {
  try {
    const { _id, ...updates } = params;
    if (!_id) {
      throw new Error("City _id is required for update.");
    }
    const response = await axios.put(`http://localhost:3000/api/cityRoutes/${_id}`, updates);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Failed updating city", error);
      throw new Error("An unexpected error occurred during city update.");
    }
  }
};

export const deleteCity = async (_id: string) => {
  try {
    if (!_id) {
      throw new Error("City _id is required for deletion.");
    }
    const response = await axios.delete(`http://localhost:3000/api/cityRoutes/${_id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Failed deleting city", error);
      throw new Error("An unexpected error occurred during city deletion.");
    }
  }
};
