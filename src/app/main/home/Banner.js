import History from "@history";
import {
  ArrowDropDown,
  ArrowRight,
  ArrowRightOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { Button, Menu, Typography } from "@mui/material";
import {
  getCategoriesMain,
  selectMainCat,
  selectSubCat,
} from "app/store/categoriesSlice";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import SingleCategory from "./SingleCategory";
import { setSelectedCatBrand } from "app/store/shopSlice";
import { selectWebsiteControls } from "app/store/homeSlice";

export const Banner = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectMainCat);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const subCat = useSelector(selectSubCat);
  const websiteControls = useSelector(selectWebsiteControls);
  const [items, setItems] = useState([]);

  useEffect(() => {
    dispatch(getCategoriesMain());
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (Boolean(websiteControls?.length)) {
      const paths = websiteControls
        ?.find((it) => it.type == "sliders")
        ?.value?.map((it) => ({ path: it }));
      setItems(paths);
    } else {
      setItems([
        {
          path: "assets/images/seeds/slider.jpg",
        },
      ]);
    }
  }, [websiteControls]);
  // var items = [
  //   {
  //     path: "assets/images/seeds/slider.jpg",
  //   },
  //   {
  //     path: "assets/images/seeds/slider.jpg",
  //   },
  //   {
  //     path: "assets/images/seeds/slider.jpg",
  //   },
  // ];
  return (
    <>
      <div className="grid grid-cols-5  ">
        <div className="mx-8 my-8 md:block hidden flex-col items-center h-full ">
          <div
            onClick={() => setIsOpenMenu((prev) => !prev)}
            className="w-full py-16 cursor-pointer  bg-[#0bbe70] flex justify-between px-8 rounded-tr-2xl rounded-tl-2xl text-white"
          >
            <div className="flex items-center space-x-8">
              <MenuOutlined />
              <Typography className="!text-xl" fontWeight={700}>
                Categories
              </Typography>
            </div>
            <ArrowDropDown />
          </div>
          {isOpenMenu && (
            <div className="h-[70vh] w-full shadow-xl rounded-bl-2xl rounded-br-2xl overflow-y-scroll ">
              {categories?.map((it, i) => (
                <SingleCategory
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  open={open}
                  it={it}
                  key={i}
                />
              ))}
            </div>
          )}
        </div>
        <Carousel
          className="col-span-5 md:col-span-4"
          navButtonsAlwaysVisible
          indicators={false}
        >
          {items.map((item, i) => (
            <img src={item.path} key={i} className="max-h-full w-full " />
          ))}
        </Carousel>
      </div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {subCat?.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              dispatch(setSelectedCatBrand(item));
              History.push(`/shop/category/${item?.id}`);
            }}
            className="flex min-w-[256px] justify-between cursor-pointer transition-colors hover:text-[#0bbe60] pl-24 pr-12 py-16 border-b hover:border-b-[#0bbe70]"
          >
            <Typography className="text-md font-500 ">{item?.title}</Typography>
            <ArrowRightOutlined className="text-lg " />
          </div>
        ))}
      </Menu>
    </>
  );
};
