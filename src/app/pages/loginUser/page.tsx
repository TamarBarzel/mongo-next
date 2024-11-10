'use client'
import React ,{FC} from 'react'
import AuthForm from "@/app/componenets/AuthForm";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/services/crudUser";


const page:FC = () => {
    const router=useRouter();

    const handleSubmit =async(
        email: string,
        password: string,
    )=>{
        try{
            await loginUser(email, password!)
            alert("User login successfully!");
            router.push('/pages/homePage');
        }
        catch (error:any) {
            console.error("Error logining user:", error);
            alert(error.message);            }
        };
      
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <AuthForm mode="login" onSubmit={handleSubmit} />
          </div>
        );
      };
      
      export default page;
        
