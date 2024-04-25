import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  selectCart,
  selectCartSubtotal,
  selectQuantity,
  updateCart,
  updateCartSubtotal,
  updateCartTotal,
} from "app/store/shopSlice";
import { useParams } from "react-router-dom";
import { showMessage } from "app/store/fuse/messageSlice";
import { getSingleProduct, selectSingleProduct } from "app/store/homeSlice";
import { TopSellers } from "../home/top-sellers/TopSellers";
import Footer from "../Footer";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const images = [
  "assets/images/seeds/pesticide.jpg",
  "assets/images/seeds/arshad5c.webp",
  "assets/images/seeds/IMG_1226.jpg",
  "assets/images/seeds/seed_fsf.jpg",
];

export const SingleProduct = () => {
  const singleProduct = useSelector(selectSingleProduct);
  const dispatch = useDispatch();
  const quantity = useSelector(selectQuantity);
  const cartSubtotal = useSelector(selectCartSubtotal);
  const cart = useSelector(selectCart);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [id]);

  const [image, setImage] = useState("assets/images/seeds/seed_fsf.jpg");
  return (
    <>
      {" "}
      <div className="my-24 md:px-80 px-32">
        <div className="md:flex w-full md:space-x-32">
          <div className="md:w-1/2">
            <img
              src={
                singleProduct?.images?.[0] ??
                "/assets/images/seeds/IMG_1226.jpg"
              }
              className="mb-16 flex"
            />
            {/* <div className='flex w-full space-x-4'>
            {images.map((image, index) => (
              <img
                src={singleProduct?.image[0]}
                key={index}
                width={100}
                height={100}
                onClick={() => setImage(image)}
                className='cursor-pointer'
              />
            ))}
          </div> */}

            <div className="my-16">
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="font-bold">Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{singleProduct?.description}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className="font-bold">
                    Care Instructions
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className="font-bold">
                    Shipping & Return Policy
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div className="md:w-1/2 space-y-16">
            <Typography className="single-product-title uppercase">
              {singleProduct?.title}
            </Typography>
            {singleProduct?.discountedPrice ? (
              <div className="my-16 flex  ">
                <Typography
                  className="single-product-price my-16 mr-16"
                  style={{ textDecoration: "line-through" }}
                >
                  {singleProduct.price} PKR
                </Typography>
                <Typography className="single-product-price my-16">
                  {singleProduct.discountedPrice} PKR
                </Typography>
              </div>
            ) : (
              <Typography className="single-product-price my-16">
                Rs. {singleProduct?.price}
              </Typography>
            )}

            {singleProduct?.options ? (
              <div className="my-8">
                <Typography className="font-semibold flex items-center mr-6 space-x-6 text-16">
                  Pack Size :
                  <Typography fontWeight={300} className="pl-6">
                    {singleProduct?.options?.packSize}{" "}
                    {singleProduct?.options?.packSizeDescription && ":"}{" "}
                    {singleProduct?.options?.packSizeDescription}
                  </Typography>
                </Typography>
              </div>
            ) : (
              ""
            )}
            <div className="my-8">
              <Typography className="font-semibold flex items-center mr-6 space-x-6 text-16">
                Company :
                <Typography fontWeight={300} className="pl-6">
                  {singleProduct?.Company?.title}{" "}
                </Typography>
              </Typography>
            </div>
            <div className="mt-8 mb-4">
              <Typography className="font-semibold flex items-center mr-6 space-x-6 text-16">
                Category :
                {singleProduct?.Category?.ParentId ? (
                  <Typography fontWeight={300} className="pl-6">
                    {singleProduct?.Category?.ParentId ? (
                      <>
                        {(
                          <>
                            {singleProduct?.Category?.ParentId?.title} &rarr;{" "}
                          </>
                        ) ?? ""}
                      </>
                    ) : (
                      ""
                    )}
                    {singleProduct?.Category?.title}{" "}
                  </Typography>
                ) : (
                  <Typography fontWeight={300} className="pl-6">
                    {singleProduct?.Category?.title}
                  </Typography>
                )}
              </Typography>
            </div>
            <div className="my-8">
              <Typography className="font-semibold flex items-center mr-6 space-x-6 text-16">
                Active Ingredients :
                <Typography fontWeight={300} className="pl-6">
                  {singleProduct?.shortDescription}{" "}
                </Typography>
              </Typography>
            </div>
            <div className="my-8">
              <Typography className="font-semibold flex items-center mr-6 space-x-6 text-16">
                Delivery Charges in Pakistan :{" "}
                <Typography fontWeight={300} className="pl-6">
                  Free (No Charges)
                </Typography>
              </Typography>
            </div>
            {singleProduct?.variations?.length && (
              <>
                <Typography>Options</Typography>
                <div className="flex items-center space-x-4 my-16">
                  {singleProduct?.variations?.map((variation, index) => (
                    <Button
                      variant="contained"
                      color="secondary"
                      className="px-16 single-product-button"
                      key={index}
                    >
                      {variation}
                    </Button>
                  ))}
                </div>
              </>
            )}

            {/* <ListItem>
                  <Typography>{singleProduct?.description}</Typography>
                </ListItem> */}
            <div className="flex w-full items-center space-x-16">
              <div className="border-1 flex" style={{ borderRadius: "5px" }}>
                <div
                  className="border-r-1 p-8 px-16 cursor-pointer"
                  onClick={() => {
                    dispatch(decrementQuantity());
                  }}
                >
                  <Typography>-</Typography>
                </div>
                <div className="border-r-1 p-8 px-16 cursor-pointer">
                  <Typography>{quantity}</Typography>
                </div>
                <div
                  className="p-8 px-16 cursor-pointer"
                  onClick={() => {
                    dispatch(incrementQuantity());
                  }}
                >
                  +
                </div>
              </div>
              <Button
                variant="contained"
                color="secondary"
                className="px-16 single-product-button"
                disabled={quantity < 1}
                onClick={() => {
                  dispatch(
                    updateCartSubtotal(
                      singleProduct?.discountedPrice
                        ? quantity * singleProduct.discountedPrice
                        : quantity * singleProduct.price
                    )
                  );
                  dispatch(
                    updateCart({
                      id: id,
                      quantity: quantity,
                      price: singleProduct?.discountedPrice
                        ? singleProduct.discountedPrice
                        : singleProduct.price,
                      title: singleProduct?.title,
                      image: singleProduct.images?.[0],
                      subtotal: singleProduct?.discountedPrice
                        ? quantity * singleProduct.discountedPrice
                        : quantity * singleProduct.price,
                    })
                  );
                  dispatch(
                    showMessage({ message: "Cart updated", variant: "success" })
                  );
                  dispatch(updateCartTotal());
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <TopSellers />
      </div>
      <Footer />
      <FloatingWhatsApp
        phoneNumber="+923412001000"
        accountName="Khurram Zarai"
        avatar="/assets/images/logo/logo.png"
        onSubmit={(e) => console.log(e)}
      />
    </>
  );
};
