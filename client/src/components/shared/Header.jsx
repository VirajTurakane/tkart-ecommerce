import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Header = ({ title }) => {
  return (
    <div className="pl-[3%] sm:pl-[4%] md:pl-[5%] flex items-center gap-2 py-4 md:gap-4 bg-primary-200">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-lg text-twhite" href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-twhite" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-lg text-twhite">{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Header;
