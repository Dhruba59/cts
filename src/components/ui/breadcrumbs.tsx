import React from "react";
import RightArrow from "../icons/rightArrow";

interface Props {
  title: string;
  subTitle: string;
}

const Breadcrumbs = ({ title, subTitle }: Props) => {
  return (
    <nav className="sm:hidden flex px-6 py-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="text-neutral-gray text-xs inline-flex items-center"
          >
            {title}
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <RightArrow />
            <a
              href="#"
              className="text-primary ml-1 md:ml-2 text-xs font-medium"
            >
              {subTitle}
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
