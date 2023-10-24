// assets
import { FormOutlined } from "@ant-design/icons";

// icons
const icons = {
  FormOutlined,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: "pages",
  title: "Pages",
  type: "group",
  children: [
    {
      id: "projects",
      title: "Projects",
      type: "item",
      url: "/dashboard/projects",
      icon: icons.FormOutlined,
      target: false,
    },
  ],
};

export default pages;
