import React, { useState } from "react";
import { account } from "../lib/appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = await account.createMagicURLToken(
                ID.unique(),
                email,
                "http://localhost:5173/verify"
            );
            console.log(token);
            navigate(`/verify?email=${email}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Send with your email</h3>
            <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Send link to email</button>
        </form>
    );
};

export default Signin;
