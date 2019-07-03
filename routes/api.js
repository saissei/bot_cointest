require('dotenv').config()
const actWebhook = require('../lib/actApi/webhook')
const express = require('express')
const router = express.Router()

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

/* GET home page. */
router.get('/', (req, res, next) => {
  res
    .status(200)
    .header(header)
    .json({ status: 'success' })
})

router.post('/webhook', async (req, res, next) => {
  res.status(200).end()

  try {
    const receiveData = req.body.events
    let message = receiveData.filter(item => {
      return (item.type === 'message') | (item.type === 'postback')
    })

    const textMsg = message.filter(item => {
      return item.message.type === 'text'
    })
    if (textMsg) {
      const act = message[0].message.text
      switch (act) {
        case '送金':
          actWebhook.sendCoin(message[0])
          break
        case 'ユーザー登録':
          actWebhook.userContract(message[0])
          break
        case '残高参照':
          actWebhook.balanceCoin(message[0])
          break
        default:
          break
      }
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/useradd', async (req, res, next) => {
  const userObject = req.body
  /*
  {
    userName: '@',
    email: 't',
    password: 'p',
    userId: 'U9662ab31cb433f2a3b9ed6fa8f84bc66'
  }
*/
  console.log(userObject)
  res.status(200).json('green')
})

module.exports = router
