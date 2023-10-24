// project import
import ThemeCustomization from "themes";
import ScrollTop from "components/ScrollTop";
import { Outlet } from "../../node_modules/react-router-dom/dist/index";
import MainLayout from "layout/MainLayout/index";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const MantisApp = () => (
  <ThemeCustomization>
    <ScrollTop>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </ScrollTop>
  </ThemeCustomization>
);

export default MantisApp;
