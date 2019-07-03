require('dotenv').config()
const LINE = require('../line/sendMessage')
const zebra = require('../coin/transaction-coin')
const lineApi = new LINE()

const usercheck = (type, userId) => {
  const userObject = {}
  if (type === 'transaction') {
    switch (userId) {
      case 'U9662ab31cb433f2a3b9ed6fa8f84bc66':
        userObject.jwt = process.env.user001Jwt
        userObject.senderAccount = process.env.user001UserId
        userObject.receiverAccount = process.env.user002UserId
        break
      default:
        userObject.jwt = process.env.user002Jwt
        userObject.senderAccount = process.env.user002UserId
        userObject.receiverAccount = process.env.user001UserId
        break
    }
  } else if (type === 'balance') {
    switch (userId) {
      case 'U9662ab31cb433f2a3b9ed6fa8f84bc66':
        userObject.jwt = process.env.user001Jwt
        userObject.userId = process.env.user001UserId
        break
      default:
        userObject.jwt = process.env.user002Jwt
        userObject.userId = process.env.user002UserId
        break
    }
  }
  return userObject
}

exports.userContract = message => {
  const replyToken = message.replyToken
  const action = [
    {
      type: 'uri',
      label: 'ページを開く',
      uri: 'line://app/1594588654-BJXAOywg'
    }
  ]
  lineApi
    .sendTemplateMessage(replyToken, 'ユーザー登録', action)
    .then(result => console.log(result.data))
    .catch(err => console.error(err.response.data))
}

exports.sendCoin = message => {
  const user = message.source.userId
  const replyToken = message.replyToken
  const zebraApi = new zebra()
  const userObject = usercheck('transaction', user)
  const coinObject = {
    coinId: process.env.coinId,
    coinName: process.env.coinName,
    amount: 5
  }
  zebraApi
    .sendCoin(coinObject, userObject)
    .then(result => {
      console.log(result.data)
      lineApi.replyMessage(replyToken, '送金が完了しました')
    })
    .catch(err => {
      if (err.response !== undefined) {
        console.error(err.response.data)
      } else {
        console.error(err)
      }
      lineApi.replyMessage(replyToken, '送金に失敗しました')
    })
}

exports.balanceCoin = message => {
  console.log(message)
  const user = message.source.userId
  const replyToken = message.replyToken

  const zebraApi = new zebra()
  const userObject = usercheck('balance', user)

  zebraApi
    .balancesCoins(userObject)
    .then(coins => {
      lineApi.replyMessage(
        replyToken,
        `コイン残高は ${coins.data[0].balance} TCOIN です。`
      )
    })
    .catch(err => {
      console.log(err.response.data)
      lineApi.replyMessage(replyToken, '残高照会処理に失敗しました')
    })
}
