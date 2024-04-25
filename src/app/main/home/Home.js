import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import DemoContent from "@fuse/core/DemoContent";
import { Button, Typography } from "@mui/material";
import { Banner } from "./Banner";
import { Categories } from "./categories/Categories";
import { Brands } from "./brands/Brands";
import { TopSellers } from "./top-sellers/TopSellers";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getBrands,
  getCategories,
  getWebsiteControls,
} from "app/store/homeSlice";
import { FloatingWhatsApp } from "react-floating-whatsapp";

function HomePage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getWebsiteControls());
  }, []);
  return (
    <div>
      <Banner />
      <div className="md:mx-80 mx-24">
        {/* <Categories /> */}
        <div className="md:mt-112" />
        <Brands />
        <TopSellers />
        <div className="my-24"></div>
      </div>
      <div className=" ">
        <Footer />
        <FloatingWhatsApp
          phoneNumber="+923412001000"
          accountName="Khurram Zarai"
          avatar="/assets/images/logo/logo.png"
          onSubmit={(e) => console.log(e)}
        />
      </div>
    </div>
  );
}

export default HomePage;
