var collectBtn = document.querySelector('.collector')

if (collectBtn) {
  collectBtn.addEventListener('click', function (e) {
    e.preventDefault()
    var topicId = collectBtn.getAttribute('topicId')
    if (collectBtn.classList.contains('collected')) {
      // 执行取消收藏操作
      util.ajax({
        url: '/api/decollect',
        type: 'POST',
        data: {
          topic_id: topicId
        },
        success: function (resp) {
          if (resp.success) {
            collectBtn.classList.remove('collected')
            collectBtn.innerText = '收藏'
          } else {
            alert('取消收藏失败')
          }
        }
      })
    } else {
      // 执行收藏操作
      util.ajax({
        url: '/api/collect',
        type: 'POST',
        data: {
          topic_id: topicId
        },
        success: function (resp) {
          if (resp.success) {
            collectBtn.classList.add('collected')
            collectBtn.innerText = '取消收藏'
          } else {
            alert('收藏失败')
          }
        }
      })
    }
  })
}
