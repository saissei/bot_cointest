const axios = require('axios')
require('dotenv').config()

class zebra {
  constructor() {
    this.header = {
      'Content-Type': 'application/json'
    }
    this.url = 'https://api.zbb.io:8080/app/v1'
  }
  sendCoin(coinObject, userObject) {
    const uri = `${this.url}/users/${userObject.senderAccount}/transactions`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'POST'
    header['X-REST-API-TOKEN'] = userObject.jwt
    const reqBody = {
      coinId: coinObject.coinId,
      recipientUserId: userObject.receiverAccount,
      amount: coinObject.amount,
      extraData: {
        imageColor: '#46aade'
      },
      coinName: coinObject.coinName,
      senderName: ''
    }

    return axios.post(uri, reqBody, { headers: header })
  }

  SendFromTriggeredEvent(coinObject, userObject) {
    const uri = `${this.url}/events/${coinObject.eventId}/transactions`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'POST'
    header['X-REST-API-TOKEN'] = userObject.jwt
    const reqBody = {
      recipientUserId: userObject.receiverAccount,
      extraData: {
        imageColor: '#46aade'
      }
    }

    return axios.post(uri, reqBody, { headers: header })
  }

  balancesCoins(userObject) {
    const uri = `${this.url}/bridges/core`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'GET'
    header['X-REST-REQUEST-PATH'] = `/v2/users/${userObject.userId}/balances`
    header['X-REST-API-TOKEN'] = userObject.jwt
    return axios.post(uri, '', { headers: header })
  }

  paymentHistories(userObject) {
    const uri = `${this.url}/bridges/core`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'GET'
    header['X-REST-REQUEST-PATH'] = `/v2/users/${userObject.userId}/histories`
    header['X-REST-API-TOKEN'] = userObject.jwt
    return axios.post(uri, '', { headers: header })
  }

  possessionRanking(coinObject, userObject) {
    const uri = `${this.url}/bridges/core`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'GET'
    header['X-REST-REQUEST-PATH'] = `/v2/ranking`
    header['X-REST-API-TOKEN'] = userObject.jwt
    const reqBody = {
      coinId: coinObject.coinId,
      offset: coinObject.offset,
      limit: coinObject.limit
    }
    return axios.post(uri, reqBody, { headers: header })
  }
}

const zebraApi = new zebra()

// Coin 送金
/*
;(async () => {
  try {
    const coinObject = {
      coinId: process.env.coinId,
      coinName: process.env.coinName,
      amount: 5
    }
    const userObject = {
      senderAccount: process.env.testUser001Id,
      jwt: process.env.testUser001Jwt,
      receiverAccount: process.env.testUser002Id
    }
    const sendResult = await zebraApi.sendCoin(coinObject, userObject)
    console.log(sendResult.data)
  } catch (err) {
    if (!err.response) {
      console.error(err)
    } else {
      console.log(err.response)
    }
  }
})()
*/

// Coinの残高照会
/*
;(async () => {
  try {
    const userObject = {
      userId: process.env.testUser002Id,
      jwt: process.env.testUser002Jwt
    }
    const balances = await zebraApi.balancesCoins(userObject)
    console.log(balances.data)
  } catch (err) {
    if (!err.response) {
      console.error(err)
    } else {
      console.log(err.response.data)
    }
  }
})()
*/

// イベントによる Coin 送金
/*
;(async () => {
  try {
    const coinObject = {
      eventId: process.env.event001
    }
    const userObject = {
      jwt: process.env.testUser002Jwt,
      receiverAccount: process.env.testUser002Id
    }
    const sendResult = await zebraApi.SendFromTriggeredEvent(
      coinObject,
      userObject
    )
    console.log(sendResult.data)
  } catch (err) {
    if (!err.response) {
      console.error(err)
    } else {
      console.log(err.response)
    }
  }
})()
*/

// Coinの入出履歴
/*
;(async () => {
  try {
    const userObject = {
      userId: process.env.testUser002Id,
      jwt: process.env.testUser002Jwt
    }
    const histories = await zebraApi.paymentHistories(userObject)
    console.log(histories.data)
  } catch (err) {
    if (!err.response) {
      console.error(err)
    } else {
      console.log(err.response.data)
    }
  }
})()
*/

// Coinの所持数Ranking
;(async () => {
  try {
    const userObject = {
      jwt: process.env.testUser001Jwt
    }
    const coinObject = {
      coinId: process.env.coinId,
      offset: 0,
      limit: 100
    }
    const rank = await zebraApi.possessionRanking(coinObject, userObject)
    console.log(rank.data)
  } catch (err) {
    if (!err.response) {
      console.error(err)
    } else {
      console.log(err.response.data)
    }
  }
})()
