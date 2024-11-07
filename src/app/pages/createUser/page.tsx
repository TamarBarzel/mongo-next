'use client'
import React ,{FC} from 'react'
import AuthForm from "@/app/componenets/AuthForm";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/services/crudUser";


const page:FC = () => {
    const router=useRouter();

    const handleSubmit =async(
        email: string,
        password: string,
        firstName?: string,
        lastName?: string
    )=>{
        try{
            await createUser(email, password, firstName!, lastName!)
            alert("User registered successfully!");
            router.push('/login');
        }
        catch (error) {
            console.error("Error registering user:", error);
            alert("Failed to register user");
          }
        };
      
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <AuthForm mode="register" onSubmit={handleSubmit} />
          </div>
        );
      };
      
      export default page;
        
