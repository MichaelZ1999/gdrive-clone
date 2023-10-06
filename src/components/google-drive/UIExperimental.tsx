import { useState, useRef, useEffect, createRef } from "react";
import logoFile from "../../assets/File3.png";
import { useNavigate } from "react-router";
import {
  FileTextOutlined,
  PictureOutlined,
  SoundOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "antd";

type Props = {
  class: string;
};

// Profile Dropdown
const ProfileDropDown = (props: Props) => {
  const [state, setState] = useState(false);
  const profileRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>();
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout(): Promise<void> {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const navigation = [
    { title: "Profile", path: "/home/profile" },
    { title: "Log out", path: "/login", onClick: () => handleLogout() },
  ];

  useEffect(() => {
    const handleDropDown = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setState(false);
    };
    document.addEventListener("click", handleDropDown);
  }, []);

  return (
    <>
      <div className={`relative ${props.class}`}>
        <div className="flex items-center space-x-4">
          <button
            ref={buttonRef}
            className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
            onClick={() => setState(!state)}
          >
            <UserOutlined />
          </button>
          <div className="lg:hidden">
            <span className="block text-sm text-gray-500">
              {currentUser.email}
            </span>
          </div>
        </div>
        <ul
          className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
            state ? "" : "lg:hidden"
          }`}
        >
          {navigation.map((item, idx) => (
            <li>
              <a
                key={idx}
                className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
                href={item.path}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default () => {
  const [menuState, setMenuState] = useState(false);
  const { currentUser } = useAuth();

  // Replace javascript:void(0) path with your path
  //   const navigation = [
  //     { title: "Customers", path: "#" },
  //     { title: "Careers", path: "#" },
  //     { title: "Guides", path: "#" },
  //     { title: "Partners", path: "#" },
  //   ];
  return (
    <>
      <nav className="bg-white border-b">
        <div className="flex items-center space-x-8 py-0 px-0 max-w-screen-xl mx-auto ">
          <div className="flex-none lg:flex-initial">
            <a href="#">
              <img src={logoFile} width={120} height={50} alt="Float UI logo" />
            </a>
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div
              className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
                menuState ? "" : "hidden"
              }`}
            >
              {/* <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                {navigation.map((item, idx) => (
                  <li key={idx} className="text-gray-600 hover:text-gray-900">
                    <a href={item.path}>{item.title}</a>
                  </li>
                ))}
              </ul> */}
              <ProfileDropDown class="mt-5 pt-5 border-t lg:hidden" />
            </div>
            <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
              {/* the div below was a search form */}
              <div className="flex items-center space-x-2 border rounded-md p-2">
                {currentUser.email}
                {currentUser.displayName}
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-none text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
                                type="text"
                                placeholder="Search"
                            /> */}
              </div>
              <ProfileDropDown class="hidden lg:block" />
              <button
                className="outline-none text-gray-400 block lg:hidden"
                onClick={() => setMenuState(!menuState)}
              >
                {menuState ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
