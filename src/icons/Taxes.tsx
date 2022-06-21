import { createSvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

const Taxes = createSvgIcon(
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8 4C7.44772 4 7 4.44772 7 5V27C7 27.5523 7.44772 28 8 28H24C24.5523 28 25 27.5523 25 27V5C25 4.44772 24.5523 4 24 4H8ZM5 5C5 3.34315 6.34315 2 8 2H24C25.6569 2 27 3.34315 27 5V27C27 28.6569 25.6569 30 24 30H8C6.34315 30 5 28.6569 5 27V5ZM9 9C9 7.89543 9.89543 7 11 7L21 7C22.1046 7 23 7.89543 23 9V11C23 12.1046 22.1046 13 21 13H11C9.89543 13 9 12.1046 9 11V9ZM21 9L11 9V11H21V9ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17ZM17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16ZM20 17C20.5523 17 21 16.5523 21 16C21 15.4477 20.5523 15 20 15C19.4477 15 19 15.4477 19 16C19 16.5523 19.4477 17 20 17ZM13 20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20C11 19.4477 11.4477 19 12 19C12.5523 19 13 19.4477 13 20ZM16 21C16.5523 21 17 20.5523 17 20C17 19.4477 16.5523 19 16 19C15.4477 19 15 19.4477 15 20C15 20.5523 15.4477 21 16 21ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20ZM16 25C16.5523 25 17 24.5523 17 24C17 23.4477 16.5523 23 16 23C15.4477 23 15 23.4477 15 24C15 24.5523 15.4477 25 16 25Z"
    fill="currentColor"
  />,
  "Taxes",
);

export default (props: SvgIconProps) => (
  <Taxes {...props} viewBox="0 0 32 32" />
);
