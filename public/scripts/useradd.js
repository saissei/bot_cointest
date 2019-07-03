$(document).ready(() => {
  $('#userAdd').on('click', async () => {
    const userName = $('#userName').val()
    const email = $('#email').val()
    const password = $('#password').val()
    const userId = $('#userId').val()
    const postObject = {
      userName: userName,
      email: email,
      password: password,
      userId: userId
    }
    console.log(postObject)
    axios
      .post('/useradd', postObject)
      .then(result => {
        liff.closeWindow()
      })
      .catch(err => {
        console.error(err)
      })
  })
})
