import { useRouter } from 'next/router';
import { FC } from 'react';
import CustomLink from '../CustomLink';

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
        fontWeight: 'extrabold',
        color: isActive ? 'green.500' : '',
        fontSize: 'sm',
        borderRadius: '4px',
        py: 2,
        className: className,
        onClick: close,
      }}
    >
      {label}
    </CustomLink>
  );
};

export default SideNavItem;
