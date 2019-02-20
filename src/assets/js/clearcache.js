(function () {
  const num = '1'
  const flag = localStorage.getItem('updata')
  if (flag !== num) {
    localStorage.removeItem('filter')
    localStorage.removeItem('search')
    localStorage.removeItem('details')
    localStorage.removeItem('schedule')
    localStorage.setItem('updata', num)
  }
})()
