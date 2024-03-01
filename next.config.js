/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

module.exports = {
  async redirects() {
    return [
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key: "USER_AUTHENTICATED",
            value: "true",
          },
        ],
        destination: "/analytics",
        permanent: false,
      },

      {
        source: "/signup",
        has: [
          {
            type: "cookie",
            key: "USER_AUTHENTICATED",
            value: "true",
          },
        ],
        destination: "/analytics",
        permanent: false,
      },

      {
        source: "/analytics",
        has: [
          {
            type: "cookie",
            key: "USER_AUTHENTICATED",
            value: "false",
          },
        ],
        destination: "/login",
        permanent: false,
      },

      {
        source: "/goals",
        has: [
          {
            type: "cookie",
            key: "USER_AUTHENTICATED",
            value: "false",
          },
        ],
        destination: "/login",
        permanent: false,
      },
      {
        source: "/boards",
        has: [
          {
            type: "cookie",
            key: "USER_AUTHENTICATED",
            value: "false",
          },
        ],
        destination: "/login",
        permanent: false,
      },
      {
        source: "/boards/:id*",
        has: [
          {
            type: "cookie",
            key: "USER_AUTHENTICATED",
            value: "false",
          },
        ],
        destination: "/login",
        permanent: false,
      },
      {
        source: "/contacts",
        has: [
          {
            type: "cookie",
            key: "USER_AUTHENTICATED",
            value: "false",
          },
        ],
        destination: "/login",
        permanent: false,
      },
    ];
  },
};
