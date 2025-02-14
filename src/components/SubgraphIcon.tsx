import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const SubgraphIcon: FC<SvgIconProps> = (props) => {
    return (
      <SvgIcon {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          id="footer-sample-full"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          className="iconify iconify--simple-icons"
        >
          <path
            d="M12.002 0a2.138 2.138 0 1 0 0 4.277a2.138 2.138 0 1 0 0-4.277zm8.54 4.931a2.138 2.138 0 1 0 0 4.277a2.138 2.138 0 1 0 0-4.277zm0 9.862a2.138 2.138 0 1 0 0 4.277a2.138 2.138 0 1 0 0-4.277zm-8.54 4.931a2.138 2.138 0 1 0 0 4.276a2.138 2.138 0 1 0 0-4.276zm-8.542-4.93a2.138 2.138 0 1 0 0 4.276a2.138 2.138 0 1 0 0-4.277zm0-9.863a2.138 2.138 0 1 0 0 4.277a2.138 2.138 0 1 0 0-4.277zm8.542-3.378L2.953 6.777v10.448l9.049 5.224l9.047-5.224V6.777zm0 1.601l7.66 13.27H4.34zm-1.387.371L3.97 15.037V7.363zm2.774 0l6.646 3.838v7.674zM5.355 17.44h13.293l-6.646 3.836z"
            fill="currentColor"
          ></path>
        </svg>
      </SvgIcon>
    );
  };

  export default SubgraphIcon;