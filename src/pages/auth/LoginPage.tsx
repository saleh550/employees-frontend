import React from "react";


import LoginForm from "./components/LoginForm";
import Title from "./components/Title";

export const LoginPage: React.FC = () => {
    return (
        <>
       
            <div
                data-aos="flip-left"
                className="isolate bg-white px-6 py-20 sm:py-32 lg:px-8  rounded-lg"
            >
                <Title />
                <LoginForm />
            </div>
        </>
    );
};