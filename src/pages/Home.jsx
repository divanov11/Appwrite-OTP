import { useState, useEffect } from "react";
import { account } from "../lib/appwriteConfig";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    {loading ? (
                        "Loading..."
                    ) : !user ? (
                        <div>
                            Please login to continue:{" "}
                            <Link to="/signin">Sign in</Link>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Welcome Back!
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Hello, {user?.name ? user.name : user?.phone} 👋
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
