import axios from "axios";

interface UpdateUserParams{
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

export const createUser = async (email: string, firstName: string, lastName: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3000/api/userRoutes", {
      email,
      firstName,
      lastName,
      password,
    });
    return response.data;
  } 
  catch (error:any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Failed creating new user", error);
      throw new Error("An unexpected error occurred during user creation.");
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3000/api/userLogin", {
      email,
      password,
    });
    return response.data;
  } 
  catch (error:any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }else{
      console.error("failed login  user", error);
      throw new Error('An unexpected error occurred during user creation');

    }
  }
};



export const updateUser= async (params: UpdateUserParams)=>{
  try{
    const {email,...updates}=params
    const response=await axios.put("http://localhost:3000/api/userRoutes", {
      email,
    ...updates
    });
    
    return response.data;
  } catch (error){
    console.error('failed updating user',error);
    throw error;
  }
}
