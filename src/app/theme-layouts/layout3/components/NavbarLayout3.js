import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { memo } from "react";
import Navigation from "../../shared-components/Navigation";
import {
  FacebookOutlined,
  Instagram,
  Twitter,
  YouTube,
} from "@mui/icons-material";

const Root = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

function NavbarLayout3(props) {
  return (
    <Root
      className={clsx(
        "w-full h-64 min-h-64 max-h-64 shadow-md",
        props.className
      )}
      style={{ backgroundColor: "#DFF8E2" }}
    >
      <div className="flex flex-auto items-center w-full h-full container px-16 lg:px-24">
        <FuseScrollbars className="flex h-full justify-between items-center">
          <div className="md:flex hidden items-center md:space-x-12 cursor-pointer md:mr-32">
            <FacebookOutlined
              className="text-gray-900"
              onClick={() => {
                window.open("https://www.facebook.com/profile.php?id=61555629786554", "_blank");
              }}
            />
            <Instagram
              className="text-gray-900"
              onClick={() => {
                window.open("https://www.instagram.com/khurramzarai/", "_blank");
              }}
            />
            {/* <Twitter
              className="text-gray-900"
              onClick={() => {
                window.open("https://twitter.com", "_blank");
              }}
            /> */}
            <YouTube
              className="text-gray-900"
              onClick={() => {
                window.open("http://www.youtube.com/@KhurramZarai", "_blank");
              }}
            />
          </div>
          <Navigation className="w-full" layout="horizontal" dense />
        </FuseScrollbars>
      </div>
    </Root>
  );
}

export default memo(NavbarLayout3);
