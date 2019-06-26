const axios = require('axios')
const moment = require('moment')
require('dotenv').config()

class zebra {
  constructor() {
    this.header = {
      'Content-Type': 'application/json'
    }
    this.url = 'https://api.zbb.io:8080/app/v1'
  }
  requestApiToken() {
    const url = `${this.url}/bridges/core`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'POST'
    header['X-REST-REQUEST-PATH'] = 'v2/authn'
    const reqBody = {
      customerId: process.env.customerId,
      userId: process.env.adminId,
      password: process.env.adminPass
    }
    return axios.post(url, reqBody, { headers: header })
  }

  createAccount(jwt, reqBody) {
    const url = `${this.url}/bridges/core`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'POST'
    header['X-REST-REQUEST-PATH'] = 'v2/users'
    header['X-REST-API-TOKEN'] = jwt
    return axios.post(url, reqBody, { headers: header })
  }

  reqAccountDescription(jwt) {
    const url = `${this.url}/bridges/core`
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'GET'
    header['X-REST-REQUEST-PATH'] = 'v2/users'
    header['X-REST-API-TOKEN'] = jwt
    return axios.post(url, '', { headers: header })
  }
}

const zebraApi = new zebra()
/*;(async () => {
  try {
    const token = await zebraApi.requestApiToken()
    console.log(token.data)
    console.log('done')
  } catch (err) {
    console.log(err)
  }
})()*/

/*
;(async () => {
  try {
    const jwt = process.env.jwt
    const newUserA = {
      password: 'Today123',
      email: 'issei.k@outlook.com',
      nickname: 'testUser001',
      loginId: 'testUser001'
    }
    const userObject = await zebraApi.createAccount(jwt, newUserA)
    console.log(userObject.data)
  } catch (error) {
    console.log(error.response.data)
  }
})()
*/
;(async () => {
  try {
    const jwt = process.env.jwt
    const userObject = await zebraApi.reqAccountDescription(jwt)
    console.log(userObject.data)
  } catch (err) {
    console.error(err.response.data)
  }
})()
