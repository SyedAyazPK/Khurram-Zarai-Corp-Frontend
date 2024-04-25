import History from "@history";
import { Typography } from "@mui/material";
import { setSelectedCatBrand } from "app/store/shopSlice";
import { useDispatch } from "react-redux";

export const CategoryCard = ({ id, image, title, category }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="cursor-pointer mr-16 w-full md:w-auto"
      onClick={() => {
        dispatch(setSelectedCatBrand(category));
        History.push(`/shop/category/${id}`);
      }}
    >
      <div className="category-card-border w-full md:w-auto">
        <img
          src={image ? image : "/assets/images/ecom/Rectangle 25.png"}
          className="p-8"
          style={{ height: "14rem", width: "22rem" }}
        />
      </div>
      <Typography className="my-16 card-title text-center">{title}</Typography>
    </div>
  );
};
