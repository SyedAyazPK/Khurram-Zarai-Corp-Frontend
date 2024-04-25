import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const useScroll = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
};

export default useScroll;
