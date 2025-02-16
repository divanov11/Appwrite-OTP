import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../lib/appwriteConfig";
import { useSearchParams } from "react-router-dom";

const Verify = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("token");

    useEffect(() => {
        const getSession = async () => {
            try {
                const session = await account.get();
                console.log(session);
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        };
        getSession();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const session = await account.createSession(userId, code);
            console.log(session);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Verify your phone number</h3>
            <input
                type="text"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button type="submit">Verify</button>
        </form>
    );
};

export default Verify;
