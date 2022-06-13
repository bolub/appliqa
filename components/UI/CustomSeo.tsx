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
      canonical='https://appliqa.net'
      openGraph={{
        url: 'https://appliqa.net',
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
          {
            url: 'https://res.cloudinary.com/bolub/image/upload/v1655155925/appliqa/MetaImagep.png',
            width: 900,
            height: 800,
            alt: 'Og Image Alt Second',
            type: 'image/jpeg',
          },
        ],
        site_name: 'Appliqa',
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
