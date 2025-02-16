import React, { useState } from "react";
import { account } from "../lib/appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = await account.createPhoneToken(ID.unique(), phone);
            console.log(token);
            navigate(`/verify?token=${token.userId}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Signin with your phone number</h3>
            <input
                type="tel"
                placeholder="+1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit">Send verification code</button>
        </form>
    );
};

export default Signin;
