import { Grid } from "@mui/material";
import { selectCategories } from "app/store/homeSlice";
import { useSelector } from "react-redux";
import { Headings } from "../Headings";
import { CategoryCard } from "./CategoryCard";

export const Categories = () => {
  const categories = useSelector(selectCategories);
  return (
    <div>
      <Headings
        heading={"Shop our Top categories"}
        subheading={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        }
      />

      <div className="hidden md:flex w-full">
        {categories.results.map((category) => (
          <CategoryCard
            image={category.categoryImage}
            title={category.categoryName}
            id={category._id}
            category={category}
          />
        ))}
      </div>
      <Grid className="md:hidden flex" container spacing={2}>
        {categories.results.map((category, index) => (
          <Grid item xs={6} md={6} lg={4} key={index}>
            <CategoryCard
              image={category.categoryImage}
              title={category.categoryName}
              id={category._id}
              category={category}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
