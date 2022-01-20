export default function latestPostRequest() {
  return `
  fetch('https://simplifiga-api.herokuapp.com/', {
      method: 'POST',
      headers: {
        authorization: {TOKEN}
      }
      body: JSON.stringify({
        url: {YOUR_URL},
        id?: {CUSTOM_ID}
      })
    })
  `;
}
