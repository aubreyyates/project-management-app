// material-ui
import { useTheme } from "@mui/material/styles";

import logo from "assets/images/icons/logo.png";
import Typography from "themes/overrides/Typography";

const imageStyle = {
  borderRadius: "50%",
  border: "1px solid black",
};

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    <>
      <img
        src={logo}
        alt="Logo"
        width="40"
        height="40"
        style={imageStyle} // Apply the border-radius style
        className="d-inline-block align-top"
      />
    </>
  );
};

export default Logo;
