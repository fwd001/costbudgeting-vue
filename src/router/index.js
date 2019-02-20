import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
const Home = () => import(/* webpackChunkName: 'Home' */ '@/components/home')
const NotFount = () => import(/* webpackChunkName: 'NotFount' */ '@/components/notCompetence')
const Help = () => import(/* webpackChunkName: 'Help' */ '@/components/helpCenter')
const BackManage = () => import(/* webpackChunkName: 'BackManage' */ '@/components/backManage')
// 成本分析子组件
const BasicInfo = () => import(/* webpackChunkName: 'BasicInfo' */ '@/components/basicInfo')
const CostHome = () => import(/* webpackChunkName: 'CostHome' */ '@/components/costHome')
// 成本
const Cost = () => import(/* webpackChunkName: 'Cost' */ '@/components/costPage/cost')
const Research = () => import(/* webpackChunkName: 'Research' */ '@/components/costPage/research')
const Art = () => import(/* webpackChunkName: 'Art' */ '@/components/costPage/art')
const Operation = () => import(/* webpackChunkName: 'Operation' */ '@/components/costPage/operation')
const IpCost = () => import(/* webpackChunkName: 'IpCost' */ '@/components/costPage/ipCost')
// 发行
const PublishCost = () => import(/* webpackChunkName: 'PublishCost' */ '@/components/costPage/publish')
// 外包
const OutsourcingCost = () => import(/* webpackChunkName: 'OutsourcingCost' */ '@/components/costPage/outsourcingCost')
// 中台成本首页
const MiddleGround = () => import(/* webpackChunkName: 'MiddleGround' */ '@/components/costPage/middleground')
const Quality = () => import(/* webpackChunkName: 'Quality' */ '@/components/costPage/quality')
const Project = () => import(/* webpackChunkName: 'Project' */ '@/components/costPage/project')
const UED = () => import(/* webpackChunkName: 'UED' */ '@/components/costPage/UED')
const Frame = () => import(/* webpackChunkName: 'Frame' */ '@/components/costPage/frame')
const Engine = () => import(/* webpackChunkName: 'Engine' */ '@/components/costPage/engine')
const Audio = () => import(/* webpackChunkName: 'Audio' */ '@/components/costPage/audio')
const Iplayout = () => import(/* webpackChunkName: 'Iplayout' */ '@/components/costPage/iplayout')
// 预算
const Budget = () => import(/* webpackChunkName: 'Budget' */ '@/components/budgetPage/budget')
const Manpower = () => import(/* webpackChunkName: 'Manpower' */ '@/components/budgetPage/manpower')
const IpBudget = () => import(/* webpackChunkName: 'IpBudget' */ '@/components/budgetPage/ipBudget')
const PublishBudget = () => import(/* webpackChunkName: 'PublishBudget' */ '@/components/budgetPage/publish')
const OutsourcingBudget = () => import(/* webpackChunkName: 'OutsourcingBudget' */ '@/components/budgetPage/outsourcingBudget')

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/costhome'
    // },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        { path: '/notfount', component: NotFount },
        { path: '/helpcenter', component: Help },
        { path: '/costhome', component: CostHome },
        { path: '/basicInfo', component: BasicInfo },
        { path: '/backManage', component: BackManage },

        // 成本
        { path: '/cost', component: Cost },
        // 研发成本
        { path: '/research', component: Research },
        // 美术成本
        { path: '/art', component: Art },
        // 运营成本
        { path: '/operation', component: Operation },
        // IP成本
        { path: '/ipcost', component: IpCost },
        // 中台成本首页
        { path: '/middleground', component: MiddleGround },
        // 中台质量成本
        { path: '/quality', component: Quality },
        // 中台产品成本
        { path: '/project', component: Project },
        // 中台UED成本
        { path: '/ued', component: UED },
        // 技术框架部
        { path: '/frame', component: Frame },
        // 引擎部
        { path: '/engine', component: Engine },
        // 音频部
        { path: '/audio', component: Audio },
        // IP企划部
        { path: '/iplayout', component: Iplayout },
        // 发行成本
        { path: '/publishCost', component: PublishCost },
        // 外包成本
        { path: '/outsourcingCost', component: OutsourcingCost },

        // 预算
        { path: '/budget', component: Budget },
        // 人力预算
        { path: '/manpower', component: Manpower },
        // ip预算
        { path: '/ipbudget', component: IpBudget },
        // 发行预算
        { path: '/publishBudget', component: PublishBudget },
        // 外包预算
        { path: '/outsourcingBudget', component: OutsourcingBudget }

      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/notfount' || to.path === '/' || to.path === '/helpcenter') {
    // debugger
    return next()
  }
  const path = to.path.slice(1)
  if (store.state.menuLimits[path]) {
    if (store.state.menuLimits[path].isShow) {
      next()
    } else {
      next('/notfount')
    }
  } else {
    next()
  }
})
export default router
