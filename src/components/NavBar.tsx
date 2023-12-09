import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { pathname } = useRouter();
  const [navbarBg, setNavbarBg] = useState("bg-transparent");
  const [dividerDisabled, setDividerDisabled] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerHeight = 50;

      if (scrollY > triggerHeight) {
        setNavbarBg("bg-black");
        setDividerDisabled(true);
      } else {
        setNavbarBg("bg-transparent");
        setDividerDisabled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar fixed z-10 w-full mx-auto px-2 sm:px-4 py-3 rounded drop-shadow-md ${navbarBg} bg-opacity-90`}
      >
        <div className="max-w-[1080px] container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center flex-1">
            <span className="flex flex-row items-end self-center font-['trap'] text-neutral-100 text-2xl whitespace-nowrap">
              <Image
                src="/finn.png"
                width="40"
                height="40"
                alt="Finn"
                className="mr-3"
              />
              Finn
            </span>
          </Link>
          <div className="flex md:order-2" style={{ marginLeft: "2rem" }}>
            <w3m-button />
            <button
              data-collapse-toggle="mobile-menu-4"
              type="button"
              className="ml-2 md:ml-0 inline-flex items-center py-2 px-3 text-sm text-gray-300 rounded-lg md:hidden hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <span className="sr-only">Open main menu</span>
              <HiMenuAlt3 size="25" />
            </button>
          </div>
          <div
            className={`${
              isOpenMenu ? "block" : "hidden"
            } justify-between items-center w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li></li>
              <li>
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "underline" : ""
                  } block underline-offset-4 py-2 pr-4 pl-3 text-neutral-300 hover:text-teal-400 border-b border-neutral-400 hover:bg-neutral-800 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className={`${
                    pathname === "/create" ? "underline" : ""
                  } block underline-offset-4 py-2 pr-4 pl-3 text-neutral-300 hover:text-teal-400 border-b border-neutral-400 hover:bg-neutral-800 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0`}
                  aria-current="page"
                >
                  Create
                </Link>
              </li>
              <li>
                <Link
                  href="/invest"
                  className={`${
                    pathname === "/invest" ? "underline" : ""
                  } block underline-offset-4 py-2 pr-4 pl-3 text-neutral-300 hover:text-teal-400 border-b border-neutral-400 hover:bg-neutral-800 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0`}
                  aria-current="page"
                >
                  Invest
                </Link>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  onClick={toggleDropdown}
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-200 rounded md:hover:bg-transparent md:border-0 md:hover:text-teal-400 md:p-0 md:w-auto "
                >
                  Profile{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className={`z-10 ${
                    isDropdownVisible ? "" : "hidden"
                  } absolute font-normal bg-neutral-800 rounded-lg shadow w-44`}
                >
                  <ul
                    className="py-2 text-sm text-gray-200"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <Link
                        href="/bucket"
                        className="block px-4 py-2 text-gray-200 hover:bg-neutral-700 hover:text-teal-400"
                      >
                        Your buckets
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/portfolio"
                        className="block px-4 py-2 text-gray-200 hover:bg-neutral-700 hover:text-teal-400"
                      >
                        Portfolio
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {!dividerDisabled && !isOpenMenu && (
          <div className="flex justify-center">
            <hr className="my-2 w-[90%] sm:w-[80%] md:w-[75%] h-[1px] border-t-0 bg-slate-400/40" />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
