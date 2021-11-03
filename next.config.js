module.exports = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/api',
        destination: '/api/v2',
        permanent: true,
      },
    ]
  },
}