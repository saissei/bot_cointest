const axios = require('axios')
require('dotenv').config()

class zebra {
  constructor() {
    this.header = {
      'Content-Type': 'application/json'
    }
    this.url = 'https://api.zbb.io:8080/app/v1/bridges/core'
  }
  requestApiToken(reqBody) {
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'POST'
    header['X-REST-REQUEST-PATH'] = 'v2/authn'
    return axios.post(this.url, reqBody, { headers: header })
  }

  requestAuthorization(jwt) {
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'POST'
    header['X-REST-REQUEST-PATH'] = 'v2/authz'
    header['X-REST-API-TOKEN'] = jwt
    console.log(header)
    return axios.post(this.url, '', { headers: header })
  }

  createAccount(jwt, reqBody) {
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'POST'
    header['X-REST-REQUEST-PATH'] = 'v2/users'
    header['X-REST-API-TOKEN'] = jwt
    return axios.post(this.url, reqBody, { headers: header })
  }

  reqAccountDescription(jwt) {
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'GET'
    header['X-REST-REQUEST-PATH'] = 'v2/users'
    header['X-REST-API-TOKEN'] = jwt
    return axios.post(this.url, '', { headers: header })
  }

  updateAuthority(userObject) {
    const header = this.header
    header['X-REST-REQUEST-METHOD'] = 'PUT'
    header['X-REST-REQUEST-PATH'] = `v2/users/${userObject.id}/modify-authority`
    header['X-REST-API-TOKEN'] = userObject.jwt
    header['X-REST-REQUEST-ID'] = userObject.requestId
    header['x-rest-request-token'] = userObject.token
    return axios.post(this.url, { issuer: true }, { headers: header })
  }
}

const zebraApi = new zebra()

// アカウント作成
/*
;(async () => {
  try {
    const jwt = process.env.jwt
    const newUserA = {
      password: 'Today123',
      email: 'issei.k@outlook.com',
      nickname: 'testUser002',
      loginId: 'testUser002'
    }
    const userObject = await zebraApi.createAccount(jwt, newUserA)
    console.log(userObject.data)
  } catch (error) {
    console.log(error.response.data)
  }
})()
*/

// AccessTokenの発行
/*
;(async () => {
  try {
    const reqBody = {
      userId: process.env.testUser002Id,
      customerId: process.env.testUser002Customer,
      password: process.env.testUser002Pass
    }
    const token = await zebraApi.requestApiToken(reqBody)
    console.log(token.data)
    console.log('done')
  } catch (err) {
    console.log(err.response.data)
  }
})()
*/

// AccessToken の認可要求
/*
;(async () => {
  try {
    //const jwt = process.env.testUser001Jwt
    const jwt = process.env.jwt
    const authResult = await zebraApi.requestAuthorization(jwt)
    console.log(authResult.data.requestId)
  } catch (error) {
    console.error(error.response)
  }
})()
*/

// アカウント一覧問い合わせ
/*
;(async () => {
  try {
    const jwt = process.env.jwt
    const userObject = await zebraApi.reqAccountDescription(jwt)
    console.log(userObject.data)
  } catch (err) {
    console.error(err.response.data)
  }
})()
*/

//権限変更の実行
/*
;(async () => {
  try {
    const userObject = {
      jwt: process.env.jwt,
      requestId: process.env.requestId,
      id: process.env.testUser001Id,
      token: process.env.testUser001Token
    }
    const updateAuthority = await zebraApi.updateAuthority(userObject)
    console.log(updateAuthority.data)
  } catch (error) {
    console.error(error.response.data)
  }
})()
*/
