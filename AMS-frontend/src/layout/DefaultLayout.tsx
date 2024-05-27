import { useStateContext } from "@/context/ContextProvider";
import FullWindowSpinner from "@/views/components/FullWindowSpinner";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

export default function DefaultLayout() {
  const { token, fullSpinner } = useStateContext();
  const location = useLocation();
  const pathName = location.pathname;
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div
      className="flex items-center min-h-screen p-4 lg:justify-center font-lato"
      style={{
        backgroundImage: "url('bg-img.avif')",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      {fullSpinner && <FullWindowSpinner />}

      <div className="flex flex-col overflow-hidden rounded-[30px] shadow-lg max md:flex-row md:flex-1 lg:max-w-[1024px]">
        <div className="p-4 py-6 bg-black bg-opacity-80 text-white md:w-96 md:flex-shrink-0 md:flex md:flex-col items-center justify-center gap-4">
          <div className="my-3 flex justify-center">
            <img src="ams-logo.png" className="h-48" />
            {/* <span>AMS</span>
            <div className="text-xs">Artist Management System</div> */}
          </div>
          <p className="mt-6 font-normal text-center md:mt-0 text-sm  ">
            Login or sign up now to experience the future of artist management.
            With our platform, you can not only view artists and their music but
            also take control of your music universe.
          </p>
          <p className="sm:flex flex-col items-center justify-center mt-10 text-center hidden">
            <span>
              {pathName.match("login")
                ? "Don't have an account?"
                : "Already have an account"}
            </span>
            {pathName.match("register" || "") ? (
              <Link to="/login" className="font-bold">
                Login Here
              </Link>
            ) : (
              <Link to="/register" className="font-bold">
                Register Here
              </Link>
            )}
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1 items-center flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
