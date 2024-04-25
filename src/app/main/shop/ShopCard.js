import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import History from "@history";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const ShopCard = ({
  id,
  image,
  title,
  subtitle,
  price,
  reviews,
  product,
}) => {
  const { type } = useParams();

  return (
    <div
      className="cursor-pointer   h-full"
      onClick={() => History.push(`/shop/product/${id}`)}
    >
      <div className="category-card-border top-seller-container h-full">
        <img
          src={
            image?.length > 0 ? image?.[0] : "/assets/images/seeds/IMG_1226.jpg"
          }
          className="p-8"
        />
        <div className="">
          <FuseSvgIcon
            className="text-48 top-seller-icon-position rounded-full p-8"
            size={32}
            color="action"
            style={{ backgroundColor: "white" }}
          >
            heroicons-outline:shopping-cart
          </FuseSvgIcon>
        </div>
        <div className="px-16 mb-16 pb-64">
          <Typography className="my-8 shop-card-title">{title}</Typography>
          <Typography className="my-8  sub-heading">{subtitle}</Typography>
          {type == "brand" ? (
            <div className="my-8 flex items-center">
              <Typography className="font-medium text-16">
                Category :{" "}
              </Typography>
              <Typography className="font-light text-16">
                {product?.Category?.title}
              </Typography>
            </div>
          ) : (
            ""
          )}
          {type == "category" ? (
            <div className="my-8 flex items-center">
              <Typography className="font-medium text-16">
                Company :{" "}
              </Typography>
              <Typography className="font-light text-16">
                {product?.Company?.title}
              </Typography>
            </div>
          ) : (
            ""
          )}
          {product?.attribute ? (
            <div className="my-8">
              <Typography className="font-semibold text-16">
                {product?.attribute?.title} : {product?.attribute?.description}
              </Typography>
            </div>
          ) : (
            ""
          )}
        </div>
        {product.discountedPrice ? (
          <div
            className="my-16 flex px-16  w-full"
            style={{ position: "absolute", bottom: "0px" }}
          >
            <Typography
              className="mt-16 pb-16 shop-card-price mr-16"
              style={{ textDecoration: "line-through" }}
            >
              {price} PKR
            </Typography>
            <Typography className="mt-16 pb-16 shop-card-price">
              {product.discountedPrice} PKR
            </Typography>
          </div>
        ) : (
          <Typography
            className="my-16 pb-16 px-16 shop-card-price"
            style={{ position: "absolute", bottom: "0px" }}
          >
            {price} PKR
          </Typography>
        )}
      </div>
    </div>
  );
};
