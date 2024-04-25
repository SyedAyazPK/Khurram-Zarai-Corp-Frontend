import History from "@history";
import { AddOutlined } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import {
  getBrands,
  getCategories,
  selectBrands,
  selectCategories,
} from "app/store/homeSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ShopFilters() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);

  const navigateCatBrand = (type, id) => () =>
    History.push(`/shop/${type}/${id}`);

  return (
    <div className="w-full md:pr-40  mt-12 md:mt-84">
      <Divider
        sx={{
          borderWidth: 3,
          "& .muiltr-qywfm8-MuiDivider-wrapper": {
            fontSize: "15px",
            fontWeight: 500,
            textTransform: "uppercase",
          },
        }}
        variant="fullWidth"
      >
        Categories
      </Divider>
      <div className="flex flex-col mt-16 space-y-12">
        {categories?.results?.map((it, i) => (
          <div
            className="flex items-center md:px-8 justify-between hover:text-[#0bbe70] transition-colors cursor-pointer"
            key={i}
            onClick={navigateCatBrand("category", it.id)}
          >
            <Typography className="!text-md">{it.title}</Typography>
            <AddOutlined className="!text-sm" />
          </div>
        ))}
      </div>
      <div className="md:mt-24">
        <Divider
          sx={{
            borderWidth: 3,
            "& .muiltr-qywfm8-MuiDivider-wrapper": {
              fontSize: "15px",
              fontWeight: 500,
              textTransform: "uppercase",
            },
          }}
          variant="fullWidth"
        >
          Companies
        </Divider>
        <div className="flex flex-col mt-16 space-y-12">
          {brands?.map((it, i) => (
            <div
              className="flex items-center md:px-8 justify-between hover:text-[#0bbe70] transition-colors cursor-pointer"
              key={i}
              onClick={navigateCatBrand("brand", it.id)}
            >
              <Typography className="!text-md">{it.title}</Typography>
              <AddOutlined className="!text-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopFilters;
