import { useRecoilState,useSetRecoilState } from "recoil";
import { logoutpopup } from "../store/atoms/logoutpopup";
import { loggedin } from '../store/atoms/loggedin';

function LogoutPopUp() {
  const [logPopUp, setLogPopUp] = useRecoilState(logoutpopup);
  const setLoggedIn = useSetRecoilState(loggedin);

  if (!logPopUp) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Logout Confirmation</h3>
        <p className="mb-6 text-gray-600">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-200"
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem('token')
              localStorage.removeItem('name')
              setLogPopUp(false);
            }}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75 transition-all duration-200"
            onClick={() => setLogPopUp(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPopUp;
