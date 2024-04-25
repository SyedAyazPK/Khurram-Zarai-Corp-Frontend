import { ArrowRightOutlined } from "@mui/icons-material";
import { Menu, Typography } from "@mui/material";
import {
  getCategoriesSub,
  selectMainCat,
  selectSubCat,
} from "app/store/categoriesSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import History from "@history";
import { setSelectedCatBrand } from "app/store/shopSlice";

const SingleCategory = ({ it, anchorEl, setAnchorEl, open }) => {
  const categories = useSelector(selectMainCat);
  const dispatch = useDispatch();
  const subCat = useSelector(selectSubCat);
  const handleMenuOpen = (event) => {
    dispatch(getCategoriesSub(it?.id)).then(({ payload }) => {
      if (payload?.length === 0) {
        dispatch(setSelectedCatBrand(it));
        History.push(`/shop/category/${it?.id}`);
      }
    });
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    console.log("Closing Menu");
    setAnchorEl(null);
  };
  return (
    <div
      onClick={handleMenuOpen}
      // ={handleMenuClose}
      id="demo-positioned-button"
      aria-controls={open ? "demo-positioned-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      className="flex relative justify-between cursor-pointer transition-colors hover:text-[#0bbe60] pl-24 pr-12 py-16 border-b hover:border-b-[#0bbe70]"
    >
      <Typography className="text-md font-500 ">{it?.title}</Typography>
      <ArrowRightOutlined className="text-lg " />
      {/* <Menu
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
            // className="flex min-w-[256px] justify-between cursor-pointer transition-colors hover:text-[#0bbe60] pl-24 pr-12 py-16 border-b hover:border-b-[#0bbe70]"
          >
            <Typography className="text-md font-500 ">
              {item?.categoryName}
            </Typography>
            <ArrowRightOutlined className="text-lg " />
          </div>
        ))}
      </Menu> */}
    </div>
  );
};

export default SingleCategory;
