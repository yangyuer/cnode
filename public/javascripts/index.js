var tabList = document.querySelectorAll('#tabs .tab')
var topicList = document.querySelectorAll('#topics .topic')

function filterTopics(type) {
  for (var i=0; i<topicList.length; i++) {
    var topic = topicList[i]
    if (type === 'all') {
      topic.style.display = 'block'
    } else if (topic.getAttribute('tab') === type) {
      topic.style.display = 'block'
    } else {
      topic.style.display = 'none'
    }
  }
}

for(var i=0; i<tabList.length; i++) {
  tabList[i].addEventListener('click', function(e) {
    var tab = e.target.parentNode
    var type = tab.getAttribute('tab')
    filterTopics(type)
  })
}
