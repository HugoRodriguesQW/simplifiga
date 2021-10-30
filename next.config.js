module.exports = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/api',
        destination: '/api/v1',
        permanent: true,
      },
    ]
  },
}