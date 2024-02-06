const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="flex flex-col p-5 bg-white rounded-xl w-[400px] shadow-md">
        <div className="w-full flex flex-col gap-y-4 items-center justify-center p-6">
          <div className="text-3xl font-semibold">🔐 Auth</div>
          <p className="text-muted-foreground text-sm">Login to Admin</p>
        </div>
        <div className="flex flex-col p-6 pt-0">
          <div className="flex flex-col">
            <label className="mb-2 font-bold">Username</label>
            <input
              type="text"
              name=""
              autoComplete="off"
              className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              placeholder="dada123"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold">Password</label>
            <input
              type="text"
              name=""
              autoComplete="off"
              className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              placeholder="******"
            />
          </div>
          <button
            type="submit"
            className="bg-[#1EAEF0] rounded-lg px-4 py-2 opacity-100 hover:opacity-80 w-full font-bold text-white"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
