import React, { useState } from "react";
import { Phone, Mail } from "lucide-react";
import { countryCodes } from "../data/countryCodes";
import { useNavigate } from "react-router-dom";
import { account } from "../lib/appwriteConfig";
import { ID } from "appwrite";

const Signin = () => {
    const [isPhoneAuth, setIsPhoneAuth] = useState(true);
    const [countryCode, setCountryCode] = useState("+1");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        console.log(fullPhoneNumber);
        try {
            const token = await account.createPhoneToken(
                ID.unique(),
                fullPhoneNumber
            );
            navigate(`/verify?token=${token.userId}`);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = await account.createEmailToken(ID.unique(), email);
            navigate(`/verify?token=${token.userId}`);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (value.length <= 10) {
            setPhoneNumber(value);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setIsPhoneAuth(true)}
                            className={`bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                                isPhoneAuth ? "ring-2 ring-indigo-600" : ""
                            }`}
                        >
                            <Phone className="w-6 h-6 text-indigo-600" />
                        </button>
                        <button
                            onClick={() => setIsPhoneAuth(false)}
                            className={`bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                                !isPhoneAuth ? "ring-2 ring-indigo-600" : ""
                            }`}
                        >
                            <Mail className="w-6 h-6 text-indigo-600" />
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-4">
                        Sign in with {isPhoneAuth ? "Phone" : "Email"}
                    </h2>
                    <p className="text-gray-600 mt-2">
                        {isPhoneAuth
                            ? "Enter your phone number to receive a verification code"
                            : "Enter your email to receive a verification code"}
                    </p>
                </div>

                <form
                    onSubmit={
                        isPhoneAuth ? handlePhoneSubmit : handleEmailSubmit
                    }
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        {isPhoneAuth ? (
                            <>
                                <div>
                                    <label
                                        htmlFor="countryCode"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Country Code
                                    </label>
                                    <select
                                        id="countryCode"
                                        value={countryCode}
                                        onChange={(e) =>
                                            setCountryCode(e.target.value)
                                        }
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                                    >
                                        {countryCodes.map(
                                            ({ code, country }) => (
                                                <option key={code} value={code}>
                                                    {country} ({code})
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        required
                                        value={phoneNumber}
                                        onChange={handlePhoneChange}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter your number (e.g., 2025550123)"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Enter your number without country code
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm">{error}</div>
                    )}

                    {success && (
                        <div className="text-green-600 text-sm">
                            Verification code sent! Check your{" "}
                            {isPhoneAuth ? "phone" : "email"}.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Sending..." : "Send verification code"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signin;
