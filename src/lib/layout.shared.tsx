import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import CustomNavbar from "../components/CustomNavbar";
import { Logo } from "@/components/Logo";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      enabled: true,
      component: <CustomNavbar />,   
    },
  };
}
