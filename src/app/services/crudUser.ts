import axios from "axios";

interface UpdateUserParams{
  email: string;
  firstName?: string;
  lastName?: string;
  age?: number;
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
  catch (error) {
    console.error("failed creating new user", error);
    throw error;
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
