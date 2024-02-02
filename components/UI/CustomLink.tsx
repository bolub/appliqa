import Link from 'next/link';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  href: string;
  containerProps?: LinkProps;
}

const CustomLink: FC<Props> = ({ href, children, containerProps }) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <ChakraLink {...containerProps}>{children}</ChakraLink>
    </Link>
  );
};

export default CustomLink;
