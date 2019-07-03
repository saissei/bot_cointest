window.onload = function(e) {
  liff.init(function(data) {
    initializeApp(data)
  })
}

function initializeApp(data) {
  console.log(data.context.userId)
  $('#userId').val(data.context.userId)
}
