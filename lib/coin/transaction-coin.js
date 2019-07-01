const axios = require('axios')
require('dotenv').config()

class zebra {
  constructor() {
    this.header = {
      'Content-Type': 'application/json'
    }
    this.url = 'https://api.zbb.io:8080/app/v1'
  }

  createCoin(userObject) {
    const url = `${this.url}/bridges/core`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'POST'
    header['X-REST-REQUEST-PATH'] = 'v2/coins'
    header['X-REST-API-TOKEN'] = userObject.jwt
    header['X-REST-REQUEST-ID'] = userObject.requestId
    header['x-rest-request-token'] = userObject.token
    const reqBody = {
      amount: userObject.amount,
      nickname: userObject.coinName,
      avatar: '',
      extraData: { imageColor: '#FFF' }
    }
    return axios.post(url, reqBody, { headers: header })
  }
}

const zebraApi = new zebra()

;(async () => {
  try {
    const userObject = {
      jwt: process.env.jwt,
      requestId: process.env.requestId,
      token: process.env.testUser001Token,
      amount: '10000',
      coinName: 'OreCoin'
    }
    const createCoin = await zebraApi.createCoin(userObject)
    console.log(createCoin.data)
  } catch (err) {
    console.error(err.response.data)
  }
})()
