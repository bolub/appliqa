import { useRouter } from "next/router";
import { FC } from "react";
import CustomLink from "../CustomLink";
import { chakra } from "@chakra-ui/react";

interface Props {
  href: string;
  label: string;
  className?: string;
  close: () => void;
}

const SideNavItem: FC<Props> = ({ href, label, className, close }) => {
  const { pathname } = useRouter();

  const isActive = pathname === href;

  return (
    <CustomLink
      href={href}
      containerProps={{
        fontWeight: "extrabold",
        color: isActive ? "green.500" : "",
        fontSize: "sm",
        borderRadius: "4px",
        py: 2,
        className: className,
        onClick: close,
      }}
    >
      {label}

      <chakra.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        w="24px"
        h="24px"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </chakra.svg>
    </CustomLink>
  );
};

export default SideNavItem;
