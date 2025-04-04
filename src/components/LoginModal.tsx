import { FC, FormEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { doLogin, updateModal } from "../redux/features/authSlice";
import { FaUnlock } from "react-icons/fa";
import { RiLockPasswordFill, RiUser3Fill } from "react-icons/ri";
import { GiArchiveRegister } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const LoginModal: FC = () => {
  const [clicked, setClicked] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.authReducer.modalOpen);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phone && otp) {
      dispatch(doLogin({ phone, otp }));
    }
  };

  if (!open) return null;

  return (
    <div className="bg-[#0000007d] w-full min-h-screen fixed inset-0 z-30 flex items-center justify-center font-karla">
      <div
        className="relative border shadow rounded p-8 bg-white max-w-md w-full z-40 dark:bg-slate-800 dark:text-white"
        data-test="login-container"
      >
        <RxCross1
          className="absolute cursor-pointer right-5 top-5 hover:opacity-85"
          onClick={() => dispatch(updateModal(false))}
          title="Close Modal"
        />

        {clicked ? (
          <>
            <div className="flex mb-4 space-x-2 justify-center items-center">
              <GiArchiveRegister />
              <h3 className="font-bold text-center text-xl">Register</h3>
              <GiArchiveRegister />
            </div>
            <p className="leading-5 text-sm text-center">
              This is a hobby project for development purposes only. Please use <b>8050570067</b> as
              phone number & <b>000000</b> as OTP.{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setClicked(false)}
              >
                Go to login
              </span>
            </p>
          </>
        ) : (
          <>
            <div className="flex mb-4 space-x-2 justify-center items-center">
              <FaUnlock />
              <h3 className="font-bold text-center text-2xl">Login</h3>
              <FaUnlock />
            </div>

            <form onSubmit={submitForm} className="flex flex-col space-y-4">
              <div className="relative">
                <input
                  data-test="input-phone"
                  type="tel"
                  autoComplete="off"
                  placeholder="Enter your Phone Number (8050570067)"
                  className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <RiUser3Fill className="absolute top-3 left-2 text-lg" />
              </div>

              <div className="relative">
                <input
                  data-test="input-otp"
                  type="password"
                  autoComplete="off"
                  placeholder="Enter OTP (000000)"
                  className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <RiLockPasswordFill className="absolute top-3 left-2 text-lg" />
              </div>

              <button
                type="submit"
                data-test="input-submit"
                className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 disabled:opacity-60"
                disabled={!phone || !otp}
              >
                Submit
              </button>
            </form>

            <p className="text-center mt-2 text-sm">
              No Account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setClicked(true)}
              >
                Register
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
