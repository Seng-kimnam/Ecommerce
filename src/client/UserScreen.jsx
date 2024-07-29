import brand from "../brand";
import product from "../product";
import category from "../category";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import shoplogo from "../assets/shoplogo.png";
const UserScreen = () => {
  const goto = useNavigate("");
  const [isloading, setIsloading] = useState(false);
  const location = useLocation();

  // console.log(product)
  function doesLocalStorageItemExist(id) {
    return localStorage.getItem(id) !== null;
  }
  if (!doesLocalStorageItemExist("brand")) {
    localStorage.setItem("brand", JSON.stringify(brand));
  }
  if (!doesLocalStorageItemExist("cate")) {
    localStorage.setItem("cate", JSON.stringify(category));
  }
  if (!doesLocalStorageItemExist("product")) {
    localStorage.setItem("product", JSON.stringify(product));
  }
  if (!doesLocalStorageItemExist("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  if (!doesLocalStorageItemExist("ordered")) {
    localStorage.setItem("ordered", JSON.stringify([]));
  }

  function navColor(path) {
    return location.pathname === path ? "black" : "white";
  }

  // navigation to different pages with delay time
  const navigate = (path) => {
    {
      return () => {
        setIsloading(true);
        setTimeout(() => {
          setIsloading(false);
          goto(path);
        }, 1000);
      };
    }
  };

  if (isloading) {
    return (
      <div className="h-screen flex text-2xl text-center m-0 bg-black align justify-center items-center ">
        <Loading3QuartersOutlined
          className="animate-spin"
          style={{ color: "white", fontSize: 40, marginRight: 10 }}
        />
        <span className="text-white font-freehand">សូមធ្វើការរង់ចាំ</span>
      </div>
    );
  }
  // nav's name store as array including khmer and english
  const nav = [
    { id: 1, type: "", kh: "ទំព័រដើម", eng: "" },
    { id: 2, type: "/Ecommerce", kh: "ផលិតផល", eng: "/Products" },
    { id: 3, type: "/Ecommerce", kh: "ប្រភេទទំនិញ", eng: "/Category" },
    { id: 4, type: "/Ecommerce", kh: "ម៉ាកទំនិញ", eng: "/Brand" },
    {
      id: 5,
      type: "",
      kh: <i class="fa-solid fa-bars"></i>,
      eng: "",
    },
  ];
  return (
    <>
      <div className="flex container py-5  w-screen justify-between gap-x-10  align-middle header sticky top-0 z-10">
        <nav className="font-freehand flex header">
          <div className="flex logo items-center self-center">
            <img
              // className="lg:w-32 lg:h-52  sm:object-cover "
             
              src={shoplogo}
              alt=""
            />
          </div>
          <div className="flex flex-wrap nav items-center justify-center gap-x-6">
            {nav.map((n, i) => {
              return i == 4 ? (
                <button
                  key={n.id}
                  className="font-freehand menu hidden"
                  style={{
                    color: navColor(`${n.type}${n.eng}`),
                    border: "none",
                    flexWrap: "wrap",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  onClick={showMenu}
                >
                  <span>{n.kh}</span>
                </button>
              ) : (
                <button
                  key={n.id}
                  className="font-freehand nav-links"
                  style={{
                    color: navColor(`${n.type}${n.eng}`),
                    border: "none",
                    flexWrap: "wrap",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  onClick={navigate(`${n.type}${n.eng}`)}
                >
                  <span>{n.kh}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
      <div className="flex-1">
      <Outlet />
      <Footer />
      </div>
    </>
  );

  function showMenu() {
    // call all navigate 
    const navLinks = document.querySelectorAll(".nav-links");

    // loop for show all of them
    navLinks.forEach((a) => a.classList.toggle("show"));
  }
};

export default UserScreen;
