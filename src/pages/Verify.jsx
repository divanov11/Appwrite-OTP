import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { account } from "../lib/appwriteConfig";

const Verify = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const secretoken = searchParams.get("secret");
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        if (userId && secretoken) {
            setSession();
        }
        setLoading(false);
    };

    const setSession = async () => {
        setLoading(true);
        try {
            const session = await account.createSession(userId, secretoken);
            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    if (email) {
        return (
            <div>
                We emailed a magic link to {email}. Click the link to sign in.
            </div>
        );
    }
};

export default Verify;
