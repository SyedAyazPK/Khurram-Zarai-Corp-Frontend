import { Grid, Pagination, Paper } from "@mui/material";
import { getProducts, selectProducts } from "app/store/homeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Headings } from "../Headings";
import { TopSellerCard } from "./TopSellerCard";

export const TopSellers = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const id = useParams().id;
  useEffect(() => {
    dispatch(getProducts(`limit=20`));
  }, [id]);

  useEffect(() => {
    dispatch(getProducts(`limit=20&page=${page}`)).then(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, [page]);
  return (
    <div>
      <Headings
        heading={"Our Top Sellers"}
        subheading={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        }
      />
      <Grid container spacing={2}>
        {products?.results?.map((product) => (
          <Grid item xs={6} md={4} lg={3}>
            <Paper
              elevation={1}
              sx={{ p: 1, height: "100%", justifyContent: "center" }}
            >
              <TopSellerCard
                image={product.images?.[0]}
                title={product.title}
                subtitle={product.shortDescription}
                id={product.id}
                product={product}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      {products?.totalResults > 20 && (
        <div className="flex items-center justify-center my-24 w-full">
          <Pagination
            count={Math.ceil(products?.totalResults / 20)}
            page={page}
            size="large"
            onChange={(_, value) => {
              setPage(value);
            }}
          />
        </div>
      )}
    </div>
  );
};
