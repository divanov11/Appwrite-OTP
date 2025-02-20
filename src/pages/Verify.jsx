import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { KeyRound } from "lucide-react";
import { OTPInput } from "../components/OTPInput";
import { useSearchParams } from "react-router-dom";
import { account } from "../lib/appwriteConfig";

export default function Verify() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [searchParams] = useSearchParams();
    const userId = searchParams.get("token");

    const navigate = useNavigate();

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

    const handleVerify = async () => {
        setIsLoading(true);

        const otpString = otp.join("");
        if (otpString.length !== 6) {
            setError("Please enter a valid 6-digit code");
            return;
        }

        console.log("OTP:", otpString);
        try {
            const session = await account.createSession(userId, otpString);
            console.log(session);
            navigate("/");
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <KeyRound className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Enter Verification Code
                    </h2>
                    <p className="text-gray-600 mt-2">
                        We've sent a verification code to{" "}
                        <span className="font-medium">
                            {/* {verificationSession.phoneNumber} */}
                        </span>
                    </p>
                </div>

                <div className="space-y-6">
                    <OTPInput otp={otp} setOtp={setOtp} />

                    {error && (
                        <div className="text-red-600 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <button
                            onClick={handleVerify}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Verifying..." : "Verify Code"}
                        </button>

                        <button
                            onClick={() => navigate("/signin")}
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Try a different number
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
