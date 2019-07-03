require('dotenv').config()
const axios = require('axios')

module.exports = class LINE {
  constructor() {
    const crypto = require('crypto')
    this.replyUri = 'https://api.line.me/v2/bot/message/reply'
    this.pushUri = 'https://api.line.me/v2/bot/message/push'
    this.signature = crypto.createHmac('sha256', process.env.ch_secret)
    this.header = {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${process.env.access_token}`
    }
  }
  validate_signature(signature, body) {
    return (
      signature ==
      crypto
        .createHmac('sha256', process.env.ch_secret)
        .update(Buffer.alloc(JSON.stringify(body), 'utf8'))
        .digest('base64')
    )
  }

  replyMessage(token, body) {
    const data = {
      replyToken: token,
      messages: [
        {
          type: 'text',
          text: body
        }
      ]
    }
    return axios.post(this.replyUri, data, { headers: this.header })
  }

  sendQuickMessage(token, body, actionMenu) {
    const data = {
      replyToken: token,
      messages: [
        {
          type: 'text',
          text: body,
          quickReply: actionMenu
        }
      ]
    }
    return axios.post(this.replyUri, data, { headers: this.header })
  }

  sendTemplateMessage(token, text, actionMenu) {
    const data = {
      replyToken: token,
      messages: [
        {
          type: 'template',
          altText: text,
          template: {
            type: 'buttons',
            title: text,
            text: 'リンクを開いて登録してください。',
            actions: actionMenu
          }
        }
      ]
    }
    return axios.post(this.replyUri, data, { headers: this.header })
  }

  sendFlexMessage(token, actionMenu) {
    const data = {
      replyToken: token,
      messages: [
        {
          type: 'flex',
          altText: '#',
          contents: actionMenu
        }
      ]
    }
    return axios.post(this.replyUri, data, { headers: this.header })
  }
}
