import axios from './http'

// 项目基本信息  新增
export function addProject (data) {
  const url = 'api/projects/add'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 项目基本信息  修改
export function modifyProject (data) {
  const url = 'api/projects/edit'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 项目基本信息  删除
export function deleteProject (data) {
  const url = 'api/projects/delete'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取table列表
export function getBaseInfoList (data) {
  const url = '/api/projects'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

export function getTableStage () {
  const url = '/api/stage'
  return axios
    .post(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 获取新的阶段
// {id : 0}
export function getTableStageNew (data) {
  const url = '/api/stageNew'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取工作室群下拉数据
export function getStudioGroupList () {
  const url = '/api/studioGroup'
  return axios
    .post(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取工作室下拉数据
export function getStudioList (data) {
  const url = '/api/studio'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 游戏来源
export function getGameSourceList () {
  const url = 'api/game_source'
  return axios
    .post(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 游戏类型
export function getGameCategoryList () {
  const url = 'api/game_category'
  return axios
    .post(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 游戏品类
export function getGameTypeList () {
  const url = 'api/gameType'
  return axios
    .post(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// HC
export function getHcList (data) {
  const url = 'api/hc'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取用户项目
export async function getProjects (data) {
  const url = 'api/user/projects'
  return axios
    .post(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 获取所有人员
export async function getUserList (data) {
  const url = 'api/userList'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取工作类型
export function getworkerClass (data) {
  const url = 'api/workerClass'
  return axios
    .post(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 获取职级
export function getRank (data) {
  const url = 'api/rank'
  return axios
    .post(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 获取职级
export function getWorkerType (data) {
  const url = 'api/workerType'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// Hc预算删除
export function deleteHc (data) {
  const url = 'api/hc/del'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 新增Hc
export function addHc (data) {
  const url = 'api/hc/add'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 修改Hc
export function modifyHc (data) {
  const url = 'api/hc/edit'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 投入预算table
export function getLaborList (data) {
  const url = 'api/labor'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 新增投入预算
export function addLabor (data) {
  const url = 'api/labor/add'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 新增投入预算 -- 根据人员ID 获取 类型(class)和工种(type)
export function getUserType (data) {
  const url = 'api/user/workerType'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 修改投入预算
export function modifyLabor (data) {
  const url = 'api/labor/edit'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 删除投入预算
export function deleteLabor (data) {
  const url = 'api/labor/del'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 人力预算成本table
export function getPredictorList (data) {
  const url = 'api/predictor'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 前置发行预算
// 前置发行预算table
export function getPublishBudgetList (data) {
  // const url = './static/mock/publishBudget/publishTableLIst.json'
  const url = 'api/publish/budget_list'

  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 前置发行预算table2
export function getPublishBudgetList2 (data) {
  // const url = './static/mock/publishBudget/publishTableLIst2.json'
  const url = 'api/publish/budget'

  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 前置发行预算  -- 发行内容
export function getContent (data) {
  // const url = './static/mock/publishBudget/content.json'
  const url = 'api/publish/content'

  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 新增  --  前置发行预算
export function addPublishBudge (data) {
  // const url = './static/mock/publishBudget/add.json'
  const url = 'api/publish/budget/add'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 修改  --  前置发行预算
export function modifyPublishBudge (data) {
  // const url = './static/mock/publishBudget/modify.json'
  const url = 'api/publish/budget/edit'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 删除  --  前置发行预算
export function deletePublishBudge (data) {
  // const url = './static/mock/publishBudget/delete.json'
  const url = 'api/publish/budget/delete'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 前置发行成本
// 前置发行成本table
export function getPublishCostList (data) {
  // const url = './static/mock/publishCost/publishTableLIst.json'
  const url = 'api/publish/cost_list'

  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 前置发行成本table2
export function getPublishCostList2 (data) {
  // const url = './static/mock/publishCost/publishTableLIst2.json'
  const url = 'api/publish/cost'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 新增  --  前置发行成本
export function addPublishCost (data) {
  // const url = './static/mock/publishCost/add.json'
  const url = 'api/publish/cost/add'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 修改  --  前置发行成本
export function modifyPublishCost (data) {
  // const url = './static/mock/publishCost/modify.json'
  const url = 'api/publish/cost/edit'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 删除  --  前置发行成本
export function deletePublishCost (data) {
  // const url = './static/mock/publishCost/delete.json'
  const url = 'api/publish/cost/delete'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 外包预算
// 外包预算 - 美术
export function getArtOpt (data) {
  // const url = './static/mock/outsourcingBudget/artOpt.json'
  const url = 'api/outSource/getArtList'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 外包预算 - 音频
export function getAudioOpt (data) {
  // const url = './static/mock/outsourcingBudget/audioOpt.json'
  const url = 'api/outSource/getAudioList'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 外包预算 - 币种
export function getCurrency (data) {
  // const url = './static/mock/outsourcingBudget/currencyOpt.json'
  const url = 'api/outSource/getCurrencyList'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 外包预算 - 美术-table
export function getOutsourcingBudgetList (data) {
  // const url = './static/mock/outsourcingBudget/tableLIst.json'
  const url = 'api/outSource/artList '
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 外包预算 - 音频-table2
export function getOutsourcingBudgetList2 (data) {
  // const url = './static/mock/outsourcingBudget/tableLIst2.json'
  const url = 'api/outSource/audioList '
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 外包预算成本-table3
export function getOutsourcingBudgetList3 (data) {
  // const url = './static/mock/outsourcingBudget/tableLIst3.json'
  const url = 'api/outSource/allList'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 新增 -- 外包预算-美术
export function addArtBudget (data) {
  // const url = './static/mock/publishCost/add.json'
  const url = 'api/outSource/artAdd'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 修改 -- 外包预算-美术
export function modifyArtBudget (data) {
  // const url = './static/mock/publishCost/modify.json'
  const url = 'api/outSource/artEdit'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 删除 -- 外包预算-美术
export function deleteArtBudget (data) {
  // const url = './static/mock/publishCost/delete.json'
  const url = 'api/outSource/delete'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 新增 -- 外包预算-音频
export function addAudioBudget (data) {
  // const url = './static/mock/publishCost/add.json'
  const url = 'api/outSource/audioAdd'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 修改 --外包预算-音频
export function modifyAudioBudget (data) {
  // const url = './static/mock/publishCost/modify.json'
  const url = 'api/outSource/audioEdit'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 删除 -- 外包预算-音频
export function deleteAudioBudget (data) {
  // const url = './static/mock/publishCost/delete.json'
  const url = 'api/outSource/delete'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 外包成本
// 外包成本 - 美术-table
export function getOutsourcingCostList (data) {
  const url = 'api/outSource/art'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 外包成本 - 音频-table2
export function getOutsourcingCostList2 (data) {
  const url = 'api/outSource/audio'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 外包成本-table3
export function getOutsourcingCostList3 (data) {
  const url = 'api/outSource/totalList'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 总首页
// 总首页 - costPageOpt 下拉 成本种类
export function getCostPageList (data) {
  // const url = './static/mock/homeAll/costPageOpt.json'
  const url = 'api/index/costType'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 总首页 - 获取gr阶段 下拉
export function getGrOptList (data) {
  // const url = './static/mock/homeAll/costPageOpt.json'
  const url = 'api/project/gr'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 总首页 - 堆叠折线面积图
export function getChartCostData (data) {
  // const url = './static/mock/homeAll/chart1.json'
  const url = 'api/index/costChart'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 总首页 - baseline折线 对比图
export function getChartCompareData (data) {
  // const url = './static/mock/homeAll/chart2.json'
  const url = 'api/index/budgetChart'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 总首页 - 第一个table
export function getTableList1 (data) {
  // const url = './static/mock/pieData/pie.json'
  const url = 'api/index/costBudget'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 总首页 - 第二个table
export function getTableList2 (data) {
  const url = 'api/index/labor'
  return axios
    .post(url, {...data})
    // .get('./static/mock/homeAll/table2.json', {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取第二个table人员接口
// { groupNo, departmentId, projectId, workClass, workType }
export function getTableList2IndexUsers (data) {
  // const url = './static/mock/homeAll/table2.json'
  const url = '/api/index/users'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取第二个table人员编辑
// { id, involvement, workType, remark, workType }
export function edigTableList2Data (data) {
  // const url = './static/mock/homeAll/table2.json'
  const url = '/api/index/editInvolvement'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取第二个table人员编辑
// { groupNo, departmentId, projectId, workClass, workType, usersId, abnormal, month}
// export function exportExcle (data) {
//   // const url = './static/mock/homeAll/table2.json'
//   const url = '/api/index/export'
//   return axios
//     .get(url, {...data})
//     .then(res => {
//       return Promise.resolve(res.data)
//     })
// }

// 总首页 - 第三个table
export function getTableList3 (data) {
  // const url = './static/mock/homeAll/table3.json'
  const url = 'api/index/chartDetail'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 配置工种 获取工作室工作室组
// {studioGroups, page, pageSize, studios}
export function getProjectSearch (data) {
  const url = '/api/project/search'
  return axios
    .get(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 配置工种 工作室工作室组关闭接口
// {studioGroups, page, pageSize, studios}
export function proOpenOrClose (data) {
  const url = '/api/project/openOrClose'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 查询工种列表
// { page, pageSize }
export function getProfessionData (data) {
  const url = '/api/admin/workTypeList'
  return axios
    .get(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 查询工种列表
// { xxx, xxx }
export function getTypeList (data) {
  const url = '/api/admin/workClassList'
  return axios
    .get(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 删除工种
// { id, xxx }
export function delProfession (data) {
  const url = '/api/admin/delWorkTypeOrWorkClass'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 添加类型
// { workClassName, xxx }
export function addWorkType (data) {
  const url = '/api/admin/addWorkClass'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 添加工种
// { workTypeName, workClassId }
export function addProfession (data) {
  const url = '/api/admin/addWorkType'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 编辑工种
// { workClassId, workTypeId, workTypeName }
export function editProfession (data) {
  const url = '/api/admin/editWorkType'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 编辑工种
// { workClassIds }
export function getWorkTypeList (data) {
  const url = '/api/admin/getWorkTypeList'
  return axios
    .get(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取用户
// { studioGroups,studios,workClassIds,workTypeIds }
export function getFilterUsers (data) {
  const url = '/api/admin/filterUsers'
  return axios
    .get(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取用户人员信息列表
// { studioGroups,studios,workClassIds,workTypeIds,userIds,page, pageSize }
export function getSearchUsers (data) {
  const url = '/api/admin/searchUsers'
  return axios
    .get(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 修改人员信息
// { studioGroups,studios,workClassIds,workTypeIds,userIds }
export function editUsersInfo (data) {
  const url = '/api/admin/editUserWorkClassOrWorkType'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 人员变更模糊搜索所有部门
// { parentDepNo,keywork }
export function getsearchDepartment (data) {
  const url = '/api/admin/searchDepartment'
  return axios
    .get(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 项目属性变更获取数据
// { dep_nos,studioIds, pagesize, page }
export function getProjectsPropList (data) {
  const url = '/api/projects/list'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 项目属性变更获取数据
// { dep_nos,studioIds, pagesize, page }
export function editProjectsProp (data) {
  const url = '/api/projects/listEdit'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 项目属性变更获取数据
// { studioGroups,studios,workClassIds,workTypeIds }
export function getProjectsPropUser (data) {
  const url = '/api/admin/searchAllowUsers'
  return axios
    .get(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}
// 查看过审阶段列表
// { ..., ..., ..., ... }
export function getStateList () {
  const url = '/api/stage/list'
  return axios
    .post(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 删除过审阶段
// { id ..., ..., ... }
export function delStateListData (data) {
  const url = '/api/stage/listDelete'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 增加过审阶段
// { name, sort ..., ... }
export function addStateListData (data) {
  const url = '/api/stage/listAdd'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 修改过审阶段
// { name, sort ..., ... }
export function editStateListData (data) {
  const url = '/api/stage/listEdit'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 财务数据审核获取状态
// { projectId, ... ..., ... }
export function getFinancialReviewStatus (data) {
  const url = '/api/project/financialReviewStatus'
  return axios
    .get(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 财务数据发送邮件
// { projectId, status, receiveIds, content, }
export function postFinancialReview (data) {
  const url = '/api/project/financialReview'
  return axios
    .post(url, {...data})
    .then(res => {
      return Promise.resolve(res.data)
    })
}

/* 项目投入度获取工作室群接口 */
// { ... }
export function getProInputGroup (data) {
  const url = '/api/index/group'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

/* 项目投入度获取工作室接口 */
// { id }
export function getProInputStudio (data) {
  const url = '/api/index/studio'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 在营在妍接口
export function getBaseInfoStatus (data) {
  const url = '/api/status'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取工种
// { month, classId }
export function getTypeList2 (data) {
  const url = '/api/typeList'
  return axios
    .post(url, data)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
