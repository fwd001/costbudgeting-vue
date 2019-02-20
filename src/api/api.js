import axios from './http'

// // 获取导航栏权限接口
export function getMenuLimits () {
  const url = '/api/menuList'
  return axios
    .post(url, {})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取工作类型
export function workerClass () {
  const url = '/api/workerClass'
  return axios
    .post(url, {})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

/* 研发成本 */
// 获取工作种类
export function getWorkerType (id) {
  const url = '/api/workerType'
  return axios
    .post(url, {id})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 研发成本获取项目列表
// export function getProjectList () {
//   const url = '/api/manager/project_list'
//   return axios
//     .get(url)
//     .then(res => {
//       return Promise.resolve(res.data)
//     })
// }
// 研发成本获取项目列表
export function getProjectList () {
  const url = 'api/user/projects'
  return axios
    .post(url)
    .then(res => {
      let newData = []
      for (let item of res.data.data) {
        let list = {}
        list['project_id'] = item.id
        list['project_name'] = item.name
        newData.push(list)
      }
      res.data.data = newData
      return Promise.resolve(res.data)
    })
}

// 研发成本获取会员信息
export function getProjectMembers (id, memberId, page, pageSize) {
  const url = '/api/research/manager/project_members'
  return axios
    .get(url, {
      projectId: id,
      memberClassId: memberId,
      page,
      pageSize
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 研发成本添加或编辑项目成员
// {month, userId, workTypeId, projectId, involvement, memberClassId}
export function editMember (data) {
  const url = '/api/' + data.type + '/project/edit_member'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 成本研发删除项目成员
// {month, userId, projectId, memberClassId}
export function delMember (data) {
  const url = '/api/' + data.type + '/project/del_member'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 研发成本获取项目列表
// {projectId, date}
export function getProjectUsers (data) {
  const url = '/api/project/get_users'
  return axios
    .get(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 获取历史投入度
// { projectId, memberId, date, memberClassId, workTypeId }
export function gethistoryInput (data) {
  const url = '/api/' + data.type + '/project/history'
  return axios
    .get(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 获取历史成本
// { memberClassId, workTypeId }
export function getHistoryCost (data) {
  const url = '/api/' + data.type + '/project/history_cost'
  return axios
    .get(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 获取项目成员投入度信息
// { projectId, date, memberId, memberClassId }
export function getMonthQuery (data) {
  const url = '/api/member/involvement'
  return axios
    .get(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

/* ip成本 */
// 参数: {projectid, pagesize, page}
export function getIpCost (data) {
  const url = '/api/ip/cost'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// IP成本数据接口
// 参数: { page, pagesize }
export function getIpCostList (data) {
  const url = '/api/ip/cost_list'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// IP成本添加数据接口
// 参数: { content, cost_type, project_id, time, cost_value }
export function addIpCostList (data) {
  const url = '/api/ip/add'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// IP成本编辑数据接口
// 参数: { id, content, cost_type, project_id, time, cost_value }
export function editIpCostList (data) {
  const url = '/api/ip/edit'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// IP成本删除数据接口
// 参数: { id }
export function delIpCostList (data) {
  const url = '/api/ip/delete'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

/* ip预算 */
// 获取ip预算列表合计
// {projectid, page, pagesize}
export function getIpBudgetSumList (data) {
  const url = '/api/ip/budget'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取ip预算基本信息列表
// { projectid, page, pagesize }
export function getIpBudgetbaseInfoList (data) {
  const url = '/api/ip/budget_list'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 根据不同项目获取时间
// { projectid }
export function getIpBudgetMonth (data) {
  const url = '/api/project/months'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 删除IP预算接口
// { id }
export function delIpBudget (data) {
  const url = '/api/ip/budget/delete'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 新增IP预算接口
// { content, cost_type, projectid, 2019/01 }
export function addIpBudget (data) {
  const url = '/api/ip/budget/add'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 新增IP预算接口
// { id, content, cost_type, projectid, 2019/01 }
export function editIpBudget (data) {
  const url = '/api/ip/budget/edit'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

/* 中台质量成本 */
// 获取当月项目人员投入度
// { workTypeId, date, page, pageSize, memberClassid }
export function getQuailtyInput (data) {
  const url = '/api/' + data.type + '/project/center_control'
  return axios
    .get(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取当月项目人员投入度
// { workTypeId, date, memberId, memberClassId }
export function getQuailtyAloneInput (data) {
  const url = '/api/' + data.type + '/project/center_control_detail'
  return axios
    .get(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 删除项目投入度
// { involvementId }
export function delQuailtyAloneInput (data) {
  const url = '/api/' + data.type + '/project/del_center_control_involvement'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 删除项目投入度
// { projectId }
export function getCenterControlIndex (data) {
  const url = '/api/project/center_control_index'
  return axios
    .get(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
/* 成本首页 */
// { projectId }
export function getCostIndex (data) {
  const url = '/api/index/cost'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
/* 预算首页 */
// { projectId }
export function getBudgetIndex (data) {
  const url = '/api/index/budget'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

/* 获取项目基础信息修改内容 */
// { id }
export function getProjectsUpdata (data) {
  const url = '/api/projectsUpdate'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

/* 成本人力成本投入都修改接口 */
// { month, salary,  }
export function setOutsourceUserSalary (data) {
  const url = '/api/setOutsourceUserSalary'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
