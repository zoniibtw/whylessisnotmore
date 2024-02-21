import React, { ReactNode, FC } from "react";
import Section from "../section/section";

interface CategoryProps {
  children: ReactNode;
  color?: "purple" | "blue" | "pink" | "gold" | "default";
}

const CategoryViewall: FC<CategoryProps> = ({
  children,
  color = "default",
}) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case "purple":
        return "bg-light-purple";
      case "blue":
        return "bg-light-blue";
      case "pink":
        return "bg-light-pink";
      case "gold":
        return "bg-light-gold";
      default:
        return "bg-white";
    }
  };

  return (
    <div className={`${getColorClass(color)}`}>
      <Section>
        <div className="w-full flex py-[5%]">
          <div className="w-full grid grid-cols-4 grid-rows-1 gap-x-10 gap-y-14 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-x-5">
            {children}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CategoryViewall;
