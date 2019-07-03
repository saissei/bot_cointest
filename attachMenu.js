const lineMenu = require('./lib/initialize/line-richmenu')
const readline = require('readline-sync')

const menuAdd = async (height, items, imagePath) => {
  try {
    const addMenu = await lineMenu.addMenu(height, items)
    const addMenuResult = addMenu.data
    const richMenuId = addMenuResult.richMenuId
    const addImage = lineMenu.addImage(richMenuId, imagePath)
    if (!addImage) {
      return richMenuId
    }
  } catch (err) {
    if (err.response) {
      console.error(err.response.data)
    } else {
      console.error(err)
    }
  }
}

const AssignUser = async (richMenuId, userId) => {
  try {
    const assignResult = lineMenu.assignUser(richMenuId, userId)
    if (!assignResult) {
      return '登録が成功しました'
    }
  } catch (err) {
    console.error(err.response.data)
  }
}

const AssignAllUsers = async richMenuId => {
  try {
    const assignResult = lineMenu.assignAllUsers(richMenuId)
    if (!assignResult) {
      return '登録が成功しました'
    }
  } catch (err) {
    if (err.response) {
      console.error(err.response.data)
    } else {
      console.error(err)
    }
  }
}

const height = readline.questionInt(
  '全体の高さを指定してください。 [ 1686 | 843 ] : '
)

const menuItems = [
  {
    bounds: {
      x: 0,
      y: 0,
      width: 1250,
      height: parseInt(height)
    }
  },
  {
    bounds: {
      x: 1250,
      y: 0,
      width: 1250,
      height: parseInt(height)
    }
  }
]
const types = readline.question(
  'メニューの種類を入力してください。 [ message | datetimepicker | uri ] : '
)
switch (types) {
  case 'message':
    const msg = readline.question(
      'メニューを押された時の入力メッセージを入力してください : '
    )
    menuItems[0].action = { type: 'message', text: msg }
    break
  case 'datetimepicker':
    menuItems[0].action = {
      type: 'datetimepicker',
      data: 'datetime=001',
      mode: 'datetime'
    }
    break
  case 'uri':
    const uri = readline.question('リンクアドレスを入力してください : ')
    menuItems[0].action = { type: 'uri', uri: uri }
    break
  default:
    console.log('入力された種類は選択できません。')
    process.exit(1)
    break
}

const types2 = readline.question(
  'メニューの種類を入力してください。 [ message | datetimepicker | uri ] : '
)
switch (types2) {
  case 'message':
    const msg = readline.question(
      'メニューを押された時の入力メッセージを入力してください : '
    )
    menuItems[1].action = { type: 'message', text: msg }
    break
  case 'datetimepicker':
    menuItems[1].action = {
      type: 'datetimepicker',
      data: 'datetime=001',
      mode: 'datetime'
    }
    break
  case 'uri':
    const uri = readline.question('リンクアドレスを入力してください : ')
    menuItems[1].action = { type: 'uri', uri: uri }
    break
  default:
    console.log('入力された種類は選択できません。')
    process.exit(1)
    break
}

const imagePath = readline.questionPath(
  '登録する画像のPATHを入力してください : '
)
const assignType = readline
  .question('ユーザー単位の紐付けですか？ [yYnN] : ')
  .toLowerCase()

switch (assignType) {
  case 'y':
    console.log('リッチメニューの登録を開始します..')
    console.log('-----------------------------------')
    menuAdd(height, menuItems, imagePath)
      .then(richMenuId => {
        AssignAllUsers(richMenuId)
          .then(result => console.log(result))
          .catch(err => {
            if (err.response !== undefined) {
              console.error(err.response.data)
            } else {
              console.error(err)
            }
          })
      })
      .catch(err => {
        if (err.response !== undefined) {
          console.error(err.response.data)
        } else {
          console.error(err)
        }
      })
    break
  case 'n':
    const userId = readline.question(
      '紐付けするユーザーのIDを入力して下さい : '
    )
    menuAdd(height, menuItems, imagePath)
      .then(richMenuId => {
        assignUser(richMenuId, userId)
          .then(result => console.log(result))
          .catch(err => {
            if (err.response !== undefined) {
              console.error(err.response.data)
            } else {
              console.error(err)
            }
          })
      })
      .catch(err => {
        if (err.response !== undefined) {
          console.error(err.response.data)
        } else {
          console.error(err)
        }
      })
    break
  default:
    console.log('入力された種類は選択できません。')
    process.exit(1)
    break
}
