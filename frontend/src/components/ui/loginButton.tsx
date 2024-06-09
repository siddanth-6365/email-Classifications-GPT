"use client";
import { signIn, useSession } from "next-auth/react";

const LoginButton = () => {

  async function handleLogin() {
    window.location.href = `http://localhost:8000/auth`; 
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
      onClick={handleLogin}
    >
      Login with Google
    </button>
  );
};

export default LoginButton;
