import MantisApp from "components/MantisApp";
import ApiAuthorzationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/dashboard",
    requireAuth: true,
    element: <MantisApp />,
  },
  ...ApiAuthorzationRoutes,
];

export default AppRoutes;
