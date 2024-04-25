import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import History from "@history";
import { Typography } from "@mui/material";

export const TopSellerCard = ({ id, image, title, subtitle, product }) => {
  return (
    <div
      className="cursor-pointer h-full  "
      onClick={() => History.push(`/shop/product/${id}`)}
      style={{ height: "100%" }}
    >
      <div className="category-card-border top-seller-container h-full">
        <img
          src={image ?? "/assets/images/seeds/IMG_1226.jpg"}
          className="p-8"
        />
        {product.discountedPrice && (
          <div className="">
            <FuseSvgIcon
              className="text-48 top-seller-icon-position rounded-full p-8"
              size={32}
              color="action"
              style={{ backgroundColor: "white" }}
            >
              material-twotone:sell
            </FuseSvgIcon>
          </div>
        )}

        <div className="px-16 mb-16">
          <Typography className="my-8 pb-32   text-16 font-semibold">
            {title}
          </Typography>
          {product.discountedPrice ? (
            <div
              className="flex  w-full"
              style={{ position: "absolute", bottom: "0px" }}
            >
              <Typography
                className="mt-16 pb-16 top-seller-card-price mr-16"
                style={{ textDecoration: "line-through" }}
              >
                {product.price} PKR
              </Typography>
              <Typography className="mt-16 pb-16 top-seller-card-price">
                {product.discountedPrice} PKR
              </Typography>
            </div>
          ) : (
            <Typography
              className="mt-16 pb-16 top-seller-card-price"
              style={{ position: "absolute", bottom: "0px" }}
            >
              {product.price} PKR
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
