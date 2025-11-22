import React from "react";

const NavLogoIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
  >
    <path
      fillRule="evenodd"
      d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function TopLogo() {
  return (
    <div className=" fixed top-3 left-3 w-fit md:w-full">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-full w-fit gap-2 my-auto pe-5 flex p-1 bg-muted/80 backdrop-blur-md max-w-4xl ">
          <NavLogoIcon size={33} />
          <span className="my-auto font-mono ">CASHLY</span>
        </div>
      </div>
    </div>
  );
}
