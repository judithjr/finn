import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { pathname } = useRouter();
  const [navbarBg, setNavbarBg] = useState("bg-transparent");
  const [dividerDisabled, setDividerDisabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerHeight = 50;

      if (scrollY > triggerHeight) {
        setNavbarBg("bg-white");
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
        className={`navbar fixed z-10 w-full mx-auto px-2 sm:px-4 py-3 rounded drop-shadow-md ${navbarBg} ${
          isOpenMenu ? "bg-white" : "bg-transparent"
        } bg-opacity-90`}
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
            <button
              data-collapse-toggle="mobile-menu-4"
              type="button"
              className="ml-2 md:ml-0 inline-flex items-center py-2 px-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <span className="sr-only">Open main menu</span>
              <AiOutlineMenu size="20" />
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
                  } block underline-offset-4 py-2 pr-4 pl-3 text-neutral-300 hover:text-teal-400 border-b border-neutral-400 hover:bg-neutral-200 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/bucket"
                  className={`${
                    pathname === "/bucket" ? "underline" : ""
                  } block underline-offset-4 py-2 pr-4 pl-3 text-neutral-300 hover:text-teal-400 border-b border-neutral-400 hover:bg-neutral-200 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0`}
                  aria-current="page"
                >
                  Bucket
                </Link>
              </li>
              <li>
                <Link
                  href="/deposit"
                  className={`${
                    pathname === "/deposit" ? "underline" : ""
                  } block underline-offset-4 py-2 pr-4 pl-3 text-neutral-300 hover:text-teal-400 border-b border-neutral-400 hover:bg-neutral-200 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0`}
                  aria-current="page"
                >
                  Deposit
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className={`${
                    pathname === "faq" ? "underline" : ""
                  } block underline-offset-4 py-2 pr-4 pl-3 text-neutral-300 hover:text-teal-400 border-b border-neutral-400 hover:bg-neutral-200 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0`}
                  aria-current="page"
                >
                  FAQ
                </Link>
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
