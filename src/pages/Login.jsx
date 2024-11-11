import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (
        ["REPAIR_TECHNICIAN", "LEAD_REPAIR_TECHNICIAN"].includes(user.role)
      ) {
        navigate("/technician/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError(err.message || "Failed to login");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log(forgotPasswordEmail);
    try {
      const response = await axios.post("http://localhost:4000/auth/forget-password", {
        email: forgotPasswordEmail,
      });
      console.log(response);
      if (response.status === 200) {
        alert("Password reset email sent");
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">
          Sign in to your account
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
        )}
        {!isForgotPassword ? (
          <>
            {" "}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign in
              </button>
            </form>
            <div
              className="text-sm text-blue-600 cursor-pointer mt-2"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot your password?
            </div>
          </>
        ) : (
      <>    <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
      <div>
        <label
          htmlFor="forgot-password-email"
          className="block text-sm font-medium text-gray-700"
        >
          Enter your email to reset your password
        </label>
        <input
          id="forgot-password-email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={forgotPasswordEmail}
          onChange={(e) => setForgotPasswordEmail(e.target.value)}
        />
      </div>
 <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Send reset email
        </button>
    </form>
         
        <div
          className="text-sm text-blue-600 cursor-pointer mt-2"
          onClick={() => setIsForgotPassword(false)}
        >
          Back to login
        </div></>
        )}
      </div>
    </div>
  );
}
