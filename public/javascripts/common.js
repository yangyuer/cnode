;(function (global) {

  function createXhr() {
    var xhr
    try {
      xhr = new ActiveXObject("microsoft.xmlhttp")
    } catch(e1) {
      try {
        xhr = new XMLHttpRequest()
      } catch(e2) {
         window.alert("您的浏览器不支持ajax")
      }
    }
    return xhr
  }

  function jsonToForm(json) {
    var str = ''
    for (key in json) {
      str += (key + '=' + json[key] + '&')
    }
    str = str.slice(0, str.length - 1)
    return str
  }

  var util = {
    ajax: function (config) {
      var url = config.url
      var data = config.data
      var success = config.success
      var fail = config.fail
      var type = (config.type || 'get').toLowerCase()

      var xhr = createXhr()

      xhr.open(type, url, true)

      if (type === 'get') {
        xhr.send(null)
      } else {
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
        xhr.send(typeof data === 'string' ? data : jsonToForm(data))
      }

      xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
          if (xhr.status == 200) {
            success(JSON.parse(xhr.responseText), xhr)
          } else {
            fail(xhr.responseText, xhr)
          }
        }
      }

    }
  }

  global._ = global.util = util


  var navLoginItem = document.querySelector('#nav-login-item > a')
  var loginDropDown = document.getElementById('user-login-dropdown')
  var loginButton = document.getElementById('login-button')
  var loginInput = document.getElementById('input-token')
  var loginUserInfo = document.querySelector('.login-user-info')
  var loginUserAvatar = document.querySelector('.login-user-avatar > img')
  var loginUserName = document.querySelector('.login-user-name')
  var notLogin = document.querySelector('.not-login')

  // 绑定登陆按钮，控制下拉框的弹出或者因此
  navLoginItem.addEventListener('click', function (e) {
    e.preventDefault()
    var display = loginDropDown.style.display
    if (e.target)
    loginDropDown.style.display = display === 'block' ? 'none' : 'block'
  })

  // 这一步我们读取输入的accesstoken，然后进行登陆
  loginButton.addEventListener('click', function (e) {
    e.preventDefault()
    var token = loginInput.value
    util.ajax({
      type: 'POST',
      url: '/api/login',
      data: {
        accesstoken: token
      },
      success: function (user) {
        if (user.success) {
          window.location.reload()
        }
      }
    })
  })

})(window)
