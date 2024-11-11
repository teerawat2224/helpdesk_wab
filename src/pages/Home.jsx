import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold">Welcome to Helpdesk System</h1>
        <p className="text-xl text-gray-600">
          A comprehensive solution for managing support tickets and technical
          issues. With our system, you can easily report issues, track their
          status, and collaborate with support teams to resolve technical
          problems efficiently.
        </p>

        {!user ? (
          <div className="space-x-4">
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
            >
              Register
            </Link>
            <div className="mt-4">
              <Link
                to="/forget-password"
                className="text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        ) : (
          <Link
            to={`/${user?.user.user.role.toLowerCase()}/dashboard`}
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Go to Dashboard
          </Link>
        )}

        {/* ปุ่มลิงก์ไปยังหน้า Create Report */}
        <div className="mt-6">
          <Link
            to="/create-report"
            className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700"
          >
            Create Report
          </Link>
        </div>

        {/* เพิ่มคำอธิบายและลิงก์เพิ่มเติม */}
        <div className="text-lg mt-8">
          <p className="text-gray-500">
            Need help using the system? Visit our
            <Link to="/help" className="text-blue-600 hover:text-blue-800 ml-1">
              User Guide
            </Link>
            to learn more about how to navigate and utilize the Helpdesk system.
          </p>
          <p className="text-gray-500 mt-4">
            For further assistance, feel free to contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
