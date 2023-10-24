import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Stack, Chip } from "@mui/material";

// project import
import DrawerHeaderStyled from "./DrawerHeaderStyled";
import Logo from "components/Logo";
import Typography from "themes/overrides/Typography";

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Logo />
        <h5>Project App</h5>
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool,
};

export default DrawerHeader;
