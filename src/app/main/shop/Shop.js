import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import {
  getProducts,
  getProductsByBrand,
  getProductsByCategory,
  selectProducts,
  selectProductsByCategory,
  selectWebsiteControls,
} from "app/store/homeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import { TopSellers } from "../home/top-sellers/TopSellers";
import { ShopCard } from "./ShopCard";
import ShopFilters from "./ShopFilters";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { selectSelectedCatBrand } from "app/store/shopSlice";

function ShopPage(props) {
  const products = useSelector(selectProducts);
  const productsByCategory = useSelector(selectProductsByCategory);
  const selectedCategory = useSelector(selectSelectedCatBrand);
  const websiteControls = useSelector(selectWebsiteControls);

  const dispatch = useDispatch();
  const [age, setAge] = useState("");
  const [page, setPage] = useState(1);
  const { id, type } = useParams();

  useEffect(() => {
    if (type == "category") dispatch(getProductsByCategory(id));
    else if (type == "brand") dispatch(getProductsByBrand(id));
  }, [id]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChangePage = (event) => {
    setPage(event.target.value);
  };

  return (
    <>
      <div className="flex w-full relative">
        {type == "category" && (
          <img
            className="w-full h-[40vh] "
            src={
              selectedCategory?.banner?.[0]?.image ||
              websiteControls?.find((it) => it.type == "defaultBanner")
                ?.value ||
              "/assets/images/seeds/slider.jpg"
            }
          />
        )}
        {/* <Typography className="top-1/2 left-1/2"
        sx={{
          // transform:'t'
        }}
        ></Typography> */}
      </div>
      <div className="md:mx-64 mx-12 my-16">
        <div className="md:flex w-full">
          <div className="w-full md:w-1/3">
            <ShopFilters />
          </div>
          <div className="w-full">
            <div className="flex justify-end">
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Sort By</em>
                  </MenuItem>
                  <MenuItem value={"low"}>Low to Hight</MenuItem>
                  <MenuItem value={"high"}>High to Low</MenuItem>
                </Select>
              </FormControl>
              <div>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={page}
                    onChange={handleChangePage}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={1}>1-15</MenuItem>
                    <MenuItem value={2}>15-30</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <Grid container spacing={2}>
              {productsByCategory?.results?.map((product) => (
                <Grid item xs={12} md={4} lg={4} key={product.id}>
                  <Paper
                    elevation={1}
                    sx={{ p: 1, height: "100%", justifyContent: "center" }}
                  >
                    <ShopCard
                      image={product.images}
                      title={product.title}
                      subtitle={product.shortDescription}
                      price={product.price}
                      rating={product.rating}
                      id={product.id}
                      product={product}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <TopSellers />
          </div>
        </div>
      </div>
      <div className="px-16 md:px-0">
        <div>
          <Footer />
          <FloatingWhatsApp
            phoneNumber="+923412001000"
            accountName="Khurram Zarai"
            avatar="/assets/images/logo/logo.png"
            onSubmit={(e) => console.log(e)}
          />
        </div>
      </div>
    </>
  );
}

export default ShopPage;
