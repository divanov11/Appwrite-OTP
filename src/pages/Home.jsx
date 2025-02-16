import { useState, useEffect } from "react";
import { account } from "../lib/appwriteConfig";
import { Link } from "react-router-dom";

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const user = await account.get();
            setUser(user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!loading && !user) {
        return (
            <div>
                Please login to continue: <Link to="/signin">Sign in</Link>
            </div>
        );
    }

    return <div>Hello {user?.name ? user.name : user?.phone} 👋</div>;
};

export default Home;
