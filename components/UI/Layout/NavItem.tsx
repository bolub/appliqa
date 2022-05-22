import { useRouter } from 'next/router';
import { FC } from 'react';
import CustomLink from '../CustomLink';

interface Props {
  href: string;
  label: string;
  className?: string;
}

const NavItem: FC<Props> = ({ href, label, className }) => {
  const { pathname } = useRouter();

  const isActive = pathname === href;

  return (
    <CustomLink
      href={href}
      containerProps={{
        fontWeight: 'extrabold',
        color: 'white',
        fontSize: 'sm',
        borderRadius: '4px',
        px: 4,
        py: 2,
        bg: isActive ? 'green.700' : '',
        // _focus: {
        //   boxShadow: 'none',
        // },
        _hover: {
          bg: 'green.700',
        },
        className: className,
      }}
    >
      {label}
    </CustomLink>
  );
};

export default NavItem;
