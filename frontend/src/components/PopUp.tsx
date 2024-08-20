import { useRecoilState } from "recoil";
import { PopUpAtom } from "../store/atoms/popup";

const PopUp = () => {
    const [popup,setPopUp] = useRecoilState(PopUpAtom);

    if (!popup) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Notification</h3>
                <p className="mb-4">Please answer all questions before submitting.</p>
                <div className="flex justify-end">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    onClick={() => setPopUp(false)}
                >
                    Close
                </button>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
