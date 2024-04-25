import { useDispatch, useSelector } from "react-redux";
import FuseSearch from "@fuse/core/FuseSearch";
import { selectFlatNavigation } from "app/store/fuse/navigationSlice";
import { useEffect } from "react";
import { getProducts, selectProducts } from "app/store/homeSlice";

function NavigationSearch(props) {
  const dispatch = useDispatch();
  const { variant, className } = props;
  const navigation = useSelector(selectFlatNavigation);
  const products = useSelector(selectProducts);

  return (
    <FuseSearch
      className={className}
      variant={variant}
      navigation={products?.results ?? []}
      // navigation={navigation}
    />
  );
}

export default NavigationSearch;
