import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui'
// import router from '../router'
import {
  getMenuLimits,
  getProjectsUpdata
} from '@/api/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hash: location.hash,
    // 导航权限
    menuLimits: {
      // 成本预算
      costhome: {
        isShow: true,
        isEdit: true
      },
      // 项目基础页
      basicInfo: {
        isShow: true,
        isEdit: true
      },

      // 成本展开
      costfold: {
        isShow: true,
        isEdit: true
      },
      // 首页
      cost: {
        isShow: true,
        isEdit: true
      },
      // 研发成本
      research: {
        isShow: true,
        isEdit: true
      },
      // 美术成本
      art: {
        isShow: true,
        isEdit: true
      },
      // 运营成本
      operation: {
        isShow: true,
        isEdit: true
      },
      // IP成本
      ipcost: {
        isShow: true,
        isEdit: true
      },
      // 中台成本折叠
      middlecost: {
        isShow: true,
        isEdit: true
      },
      // 中台成本首页
      middleground: {
        isShow: true,
        isEdit: true
      },
      // 中台质量成本
      quality: {
        isShow: true,
        isEdit: true
      },
      // 中台产品成本
      project: {
        isShow: true,
        isEdit: true
      },
      // 中台UED成本
      ued: {
        isShow: true,
        isEdit: true
      },
      // 技术框架部
      frame: {
        isShow: true,
        isEdit: true
      },
      // 引擎部
      engine: {
        isShow: true,
        isEdit: true
      },
      // 音频部
      audio: {
        isShow: true,
        isEdit: true
      },
      // IP企划部
      iplayout: {
        isShow: true,
        isEdit: true
      },
      // 发行成本
      publishCost: {
        isShow: true,
        isEdit: true
      },
      // 外包成本
      outsourcingCost: {
        isShow: true,
        isEdit: true
      },

      // 预算页折叠
      budgetfold: {
        isShow: true,
        isEdit: true
      },
      // 预算首页
      budget: {
        isShow: true,
        isEdit: true
      },
      // 人力预算
      manpower: {
        isShow: true,
        isEdit: true
      },
      // ip预算
      ipbudget: {
        isShow: true,
        isEdit: false
      },
      // 发行预算
      publishBudget: {
        isShow: true,
        isEdit: true
      },
      // 外包预算
      outsourcingBudget: {
        isShow: true,
        isEdit: true
      },

      // 后台管理
      backManage: {
        isShow: true
      }
    }
  },
  mutations: {
    async getMenu (state, callback) {
      const res = await getMenuLimits()
      if (res.code !== -404) {
        if (res.data) {
          state.menuLimits = res.data
        } else {
          state.menuLimits = {
            // 成本预算
            costhome: {
              isShow: false,
              isEdit: false
            },
            // 项目基础页
            basicInfo: {
              isShow: false,
              isEdit: false
            },

            // 成本展开
            costfold: {
              isShow: false,
              isEdit: false
            },
            // 首页
            cost: {
              isShow: false,
              isEdit: false
            },
            // 研发成本
            research: {
              isShow: false,
              isEdit: false
            },
            // 美术成本
            art: {
              isShow: false,
              isEdit: false
            },
            // 运营成本
            operation: {
              isShow: false,
              isEdit: false
            },
            // IP成本
            ipcost: {
              isShow: false,
              isEdit: false
            },
            // 中台成本折叠
            middlecost: {
              isShow: false,
              isEdit: false
            },
            // 中台成本首页
            middleground: {
              isShow: false,
              isEdit: false
            },
            // 中台质量成本
            quality: {
              isShow: false,
              isEdit: false
            },
            // 中台产品成本
            project: {
              isShow: false,
              isEdit: false
            },
            // 中台UED成本
            ued: {
              isShow: false,
              isEdit: false
            },
            // 技术框架部
            frame: {
              isShow: true,
              isEdit: true
            },
            // 引擎部
            engine: {
              isShow: true,
              isEdit: true
            },
            // 音频部
            audio: {
              isShow: true,
              isEdit: true
            },
            // IP企划部
            iplayout: {
              isShow: true,
              isEdit: true
            },
            // 发行成本
            publishCost: {
              isShow: false,
              isEdit: false
            },
            // 外包成本
            outsourcingCost: {
              isShow: false,
              isEdit: false
            },

            // 预算页折叠
            budgetfold: {
              isShow: false,
              isEdit: false
            },
            // 预算首页
            budget: {
              isShow: false,
              isEdit: false
            },
            // 人力预算
            manpower: {
              isShow: false,
              isEdit: false
            },
            // ip预算
            ipbudget: {
              isShow: false,
              isEdit: false
            },
            // 发行预算
            publishBudget: {
              isShow: false,
              isEdit: false
            },
            // 外包预算
            outsourcingBudget: {
              isShow: false,
              isEdit: false
            },
            // 后台管理
            backManage: {
              isShow: false
            }
          }
        }
        // state.menuLimits.notfount = {isShow: true}
        // console.log(this.$route)
      }
      callback && callback()
    },
    setHash (state, params) {
      state.hash = params.val
    },
    // 获取推送提醒
    async getProjectsUpdata (state, idParams) {
      let id = []
      if (typeof idParams === 'number' || typeof idParams === 'string') {
        // console.log(typeof idParams)
        id.push(idParams)
      // eslint-disable-next-line valid-typeof
      } else if (typeof idParams === 'object') {
        id = idParams
      }
      const res = await getProjectsUpdata({id})
      // console.log(res)
      if (res.code !== -404) {
        res.data.forEach(v => {
          if (v.isShow) {
            Message({
              showClose: true,
              dangerouslyUseHTMLString: true,
              message: v.content,
              type: 'info',
              duration: 0
            })
          }
        })
      }
    }
  },
  getters: {
    permission (state) {
      // debugger
      const pageName = state.hash.slice(1)
      if (pageName in state.menuLimits) {
        return state.menuLimits[pageName].isEdit
      }
      return false
    }
  }
})

export default store
