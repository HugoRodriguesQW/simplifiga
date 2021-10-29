module.exports = {
  reactStrictMode: true,
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