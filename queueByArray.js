const queue = (function() {
  const list = []

  function backIn(data) {
    list.push(data)
  }

  function frontOut() {
    const data = list[0]
    list.shift()
    return data
  }

  function showList() {
    console.log(list)
  }
  return {
    backIn,
    frontOut,
    showList
  }
})()

queue.backIn(5)
queue.backIn(3)
queue.backIn(4)
queue.backIn(1)
queue.showList()

const head = queue.frontOut()
console.log('head = ', head)
queue.showList()
