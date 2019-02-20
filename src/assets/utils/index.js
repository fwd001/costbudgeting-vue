export function getFullHeight (height) {
  return document.documentElement.clientHeight - height
}

// 设置标签title
export function setTagTitle (boxCllass) {
  if (document.querySelector(boxCllass) !== null) {
    var tagTextList = document.querySelector(boxCllass).querySelectorAll('.el-table td div')
    // console.log(tagTextList)
    tagTextList.forEach((item) => {
      if (item.innerText !== '编辑 删除') {
        item.setAttribute('title', item.innerText)
      }
    })
  }
}
// 千分位过滤
export function getThousandNum (num, fixed = 0) {
  // console.log(fixed)
  if (typeof (num) !== 'object' && typeof (num) !== 'undefined') {
    if (num.toString().indexOf('/') === -1 && /^\d+(\.\d+)?$/.test(num)) {
      let num1 = Number(num).toFixed(fixed)
      return num1.toString().replace(/\d+/, function (n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
          return $1 + ','
        })
      })
    } else {
      return num
    }
  } else {
    return ''
  }
}
