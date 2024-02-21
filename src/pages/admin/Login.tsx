import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO: Check token
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post<any>(
        `${process.env.REACT_APP_API}/auth/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem(
        "token",
        JSON.stringify(response.data.data.access_token)
      );
      navigate("/admin123dada");
    } catch (error: any) {
      console.error("Login failed", error.response);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    const rawToken: string | null = localStorage.getItem("token"); // Ensure token is of type string or null
    const getAuthenticated = async () => {
      try {
        if (rawToken) {
          const token = rawToken.replace(/"/g, "");
          await axios.get(`${process.env.REACT_APP_API}/auth/protected`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          navigate("/admin123dada");
        }
      } catch (error: any) {}
    };

    getAuthenticated();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="flex flex-col p-5 bg-white rounded-xl w-[400px] shadow-md">
        <div className="w-full flex flex-col gap-y-4 items-center justify-center p-6">
          <div className="text-3xl font-semibold">🔐 Auth</div>
          <p className="text-muted-foreground text-sm">Login to Admin</p>
        </div>
        <div className="flex flex-col p-6 pt-0">
          <div className="flex flex-col">
            <label className="mb-2 font-bold">Email</label>
            <input
              type="email"
              name=""
              autoComplete="off"
              className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold">Password</label>
            <input
              type="password"
              name=""
              autoComplete="off"
              className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="button"
            className="bg-[#1EAEF0] rounded-lg px-4 py-2 opacity-100 hover:opacity-80 w-full font-bold text-white"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
