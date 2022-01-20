import latestPostRequest from "./latest";

const Codes = {
  v1RequestDefault: latestPostRequest,

  authExample: () => `
    header: {
      authorization: "{Secret_API_Auth_Key}"
    }
  `,

  bodyEncrypted: () => `
  body: {
    encrypted: "{Encrypted_JSON_stringified_With_API_Key}"
  }
  `,

  headerEncrypted: () => `
    header: {
      "x-api-key": "{Public_RSA_1024bits_key_example}"
    }
  `,

  postRequest: () => `
    fetch('https://simplifiga-api.herokuapp.com/v1/', {
      method: 'POST',
      headers: {
        authorization: {TOKEN}
      }
      body: JSON.stringify({
        url: 'https://example.url/?longUrlExampleParameterKey=longparametervalue'
      })
    })
  `,

  patchRequest: () => `
    fetch('https://simplifiga-api.herokuapp.com/v1/example', {
      method: 'PATCH',
      headers: {
        authorization: {TOKEN}
      }
      body: JSON.stringify({
        props: [
          ['id', 'new-example-id']
        ]
      })
    })
  `,

  getRequest: () => `
    fetch('https://simplifiga-api.herokuapp.com/v1/', {
      headers: {
        authorization: {TOKEN}
      }
    )
  `,

  delRequest: () => `
    fetch('https://simplifiga-api.herokuapp.com/v1/new-example-id', {
      method: 'DEL',
      headers: {
        authorization: {TOKEN}
      }
    )
  `,

  postResponse: () => `
  {
    id: "example",
    target: "https://example.url/?longUrlExampleParameterKey=longparametervalue",
    shortcut: "https://simplifi.ga/example"
  }
  `,

  patchResponse: () => `
    {
      "applied": true,
      "acknowledged": [
          [
              "id",
              "new-example-id"
          ]
      ]
    }
  `,

  getResponse: () => `
  [
    ...
    {
      "id": "new-example-id",
      "target": "https://example.url/?longUrlExampleParameterKey=longparametervalue",
      "references": [],
      "locations": [],
      "clicks": 0
    }
    ...
  ]
  `,

  delResponse: () => `
  {
    "id": "new-example-id",
    "deleted": true
  }
  `,
};

export default Codes;
