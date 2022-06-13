import { NextSeo } from 'next-seo';
import React, { FC } from 'react';

interface Props {
  title?: string;
  description?: string;
}

const CustomSeo: FC<Props> = ({
  title = 'Appliqa',
  description = 'Track your job applications with ease',
}) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical='https://www.canonical.ie/'
      openGraph={{
        url: 'https://www.url.ie/a',
        title: title,
        description: description,
        images: [
          {
            url: 'https://res.cloudinary.com/bolub/image/upload/v1655155925/appliqa/MetaImagep.png',
            width: 800,
            height: 600,
            alt: 'Appliqa',
            type: 'image/jpeg',
          },
        ],
        site_name: 'SiteName',
      }}
      // twitter={{
      //   handle: '@handle',
      //   site: '@site',
      //   cardType: 'summary_large_image',
      // }}
    />
  );
};

export default CustomSeo;
