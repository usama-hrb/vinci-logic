import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import CustomNavbar from "../components/CustomNavbar";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      component: <CustomNavbar />,
    },
  };
}
