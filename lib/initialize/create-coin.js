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
    const uri = `${this.url}/bridges/core`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'POST'
    header['X-REST-REQUEST-PATH'] = 'v2/coins'
    header['X-REST-API-TOKEN'] = userObject.jwt
    header['X-REST-REQUEST-ID'] = userObject.requestId
    header['X-REST-REQUEST-TOKEN'] = userObject.token
    const reqBody = {
      amount: 10000,
      nickname: 'TCOIN',
      avatar: '',
      extraData: {
        imageColor: '#46aade'
      }
    }
    return axios.post(uri, reqBody, { headers: header })
  }

  requestCoinDescription(coinInfo) {
    const uri = `${this.url}/bridges/core`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'GET'
    header['X-REST-REQUEST-PATH'] = `v2/coins/${coinInfo.coinId}`
    header['X-REST-API-TOKEN'] = coinInfo.jwt
    return axios.post(uri, '', { headers: header })
  }

  addEvents(coinObject, userObject) {
    const uri = `${this.url}/bridges/core`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'POST'
    header['X-REST-REQUEST-PATH'] = 'v2/events'
    header['X-REST-API-TOKEN'] = userObject.jwt
    header['X-REST-REQUEST-ID'] = userObject.requestId
    header['X-REST-REQUEST-TOKEN'] = userObject.token
    const reqBody = {
      amount: coinObject.amount,
      nickname: coinObject.eventName,
      coinId: coinObject.coinId,
      extraData: {}
    }
    return axios.post(uri, reqBody, { headers: header })
  }

  requestEventDescription(userObject) {
    const uri = `${this.url}/bridges/core`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'GET'
    header['X-REST-REQUEST-PATH'] = `v2/events`
    header['X-REST-API-TOKEN'] = userObject.jwt
    return axios.post(uri, '', { headers: header })
  }
}

const zebraApi = new zebra()

// Coin作成
/*
;(async () => {
  try {
    const userObject = {
      jwt: process.env.testUser001Jwt,
      requestId: process.env.testUser001requestId,
      token: process.env.testUser001Token,
      amount: '10000',
      coinName: 'OreCoin'
    }
    const createCoin = await zebraApi.createCoin(userObject)
    console.log(createCoin.data)
  } catch (err) {
    console.error(err.response)
  }
})()
*/

// Coin参照
/*
;(async () => {
  try {
    const coinInfo = {
      coinId: process.env.coinId,
      jwt: process.env.testUser001Jwt
    }
    const coinDesc = await zebraApi.requestCoinDescription(coinInfo)
    console.log(coinDesc.data)
  } catch (err) {
    if (!err.response) {
      console.error(err)
    } else {
      console.log(err.response)
    }
  }
})()
*/

// コイン送金イベントの登録
/*
;(async () => {
  try {
    const coinObject = {
      amount: 10,
      eventName: 'testEvent001',
      coinId: process.env.coinId
    }
    const userObject = {
      jwt: process.env.adminJwt,
      requestId: process.env.adminrequestId,
      token: process.env.adminToken
    }
    const eventAdd = await zebraApi.addEvents(coinObject, userObject)
    console.log(eventAdd.data)
  } catch (err) {
    if (!err.response) {
      console.error(err)
    } else {
      console.log(err.response)
    }
  }
})()
*/

// 登録済みイベントの参照
;(async () => {
  try {
    const userObject = {
      jwt: process.env.testUser001Jwt
    }
    const events = await zebraApi.requestEventDescription(userObject)
    console.log(events.data)
  } catch (err) {
    if (err.response === undefined) {
      console.error(err)
    } else {
      console.log(err.response)
    }
  }
})()
