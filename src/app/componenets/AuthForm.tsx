'use client'
import React, { FC, useState } from "react";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (email: string, password: string, firstName?: string, lastName?: string) => void;
}

const AuthForm: FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register") {
      onSubmit(email, password, firstName, lastName);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center">{mode === "register" ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        {mode === "register" && (
          <>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </>
        )}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {mode === "register" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
