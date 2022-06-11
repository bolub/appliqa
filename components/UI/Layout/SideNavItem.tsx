import { useRouter } from 'next/router';
import { FC } from 'react';
import CustomLink from '../CustomLink';

interface Props {
  href: string;
  label: string;
  className?: string;
}

const SideNavItem: FC<Props> = ({ href, label, className }) => {
  const { pathname } = useRouter();

  const isActive = pathname === href;

  return (
    <CustomLink
      href={href}
      containerProps={{
        fontWeight: 'extrabold',
        color: isActive ? 'green.500' : '',
        fontSize: 'sm',
        borderRadius: '4px',
        py: 2,
        className: className,
      }}
    >
      {label}
    </CustomLink>
  );
};

export default SideNavItem;
