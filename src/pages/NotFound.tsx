import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col h-screen mt-[-96px] items-center justify-center gap-4">
        <h3 className="text-4xl font-bold">Sorry, Page Not Found!</h3>
        <p>Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL? Be sure to check your spelling.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 h-9 px-4 py-2"
        >
          Back Home
        </Link>
    </div>
  );
};
export default NotFound;
