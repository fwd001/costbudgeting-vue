<template>
<el-container class="cb-home">
  <!-- 头部已注释 -->
  <!-- <el-header class="home-header"> -->
    <!-- 头部面包屑导航 -->
    <!--<div class="cb-breadcrumb">
       <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: router.costhome.path }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isFirstPage" :to="{ path: isSecondPage? navPath: '' }">{{ navName }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isSecondPage" :to="{ path: $route.path }">{{ secondNavName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <!-- <div class="sysName">成本预算</div>
  </el-header> -->
  <!-- 头部注释 -->
  <!-- <el-container style="height: calc(100% - 60px);"> -->
  <el-container v-if="isAdminShow" style="height: 100%;">
    <!-- 侧边栏 -->
    <el-aside id="cost-home-aside" :width="isCollapse ? '64px': '240px'" class="home-aside">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :router="true"
        :default-active="$route.path"
        style="height: 100%;"
        background-color="#444"
        text-color="rgb(191, 203, 217)"
        active-text-color="#44acf1"
        unique-opened>
        <el-menu-item v-if="menuLimits.costhome.isShow" :index="router.costhome.path">
          <i class="el-icon-news"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item v-if="menuLimits.basicInfo.isShow" :index="router.basicInfo.path">
          <i class="el-icon-tickets"></i>
          <span slot="title">项目信息</span>
        </el-menu-item>
        <el-submenu v-if="menuLimits.budgetfold.isShow" index="4">
          <template slot="title">
            <i class="iconfont icon-yusuan"></i>
            <span>预算</span>
          </template>
          <el-menu-item v-if="menuLimits.budget.isShow" :index="router.budget.path">预算首页</el-menu-item>
          <el-menu-item v-if="menuLimits.manpower.isShow" :index="router.manpower.path">人力预算</el-menu-item>
          <el-menu-item v-if="menuLimits.outsourcingBudget.isShow" :index="router.outsourcingBudget.path">美术音频外包</el-menu-item>
          <el-menu-item v-if="menuLimits.ipbudget.isShow" :index="router.ipbudget.path">IP预算</el-menu-item>
          <el-menu-item v-if="menuLimits.publishBudget.isShow" :index="router.publishBudget.path">前置发行</el-menu-item>
        </el-submenu>
        <el-submenu v-if="menuLimits.costfold.isShow" index="3">
          <template slot="title">
            <i class="iconfont icon-cost"></i>
            <span>成本</span>
          </template>
          <el-menu-item v-if="menuLimits.cost.isShow" :index="router.cost.path">成本首页</el-menu-item>
          <el-menu-item v-if="menuLimits.research.isShow" :index="router.research.path">研发人力</el-menu-item>
          <el-menu-item v-if="menuLimits.art.isShow" :index="router.art.path">美术人力</el-menu-item>
          <el-menu-item v-if="menuLimits.operation.isShow" :index="router.operation.path">运营人力</el-menu-item>
          <!-- <el-menu-item index="3-5">中台成本</el-menu-item> -->
          <el-submenu index="3-5" v-if="menuLimits.middlecost.isShow">
            <template slot="title">中台人力</template>
            <el-menu-item v-if="menuLimits.middleground.isShow" :index="router.middleground.path">中台成本首页</el-menu-item>
            <el-menu-item v-if="menuLimits.quality.isShow" :index="router.quality.path">质量管理部</el-menu-item>
            <el-menu-item v-if="menuLimits.project.isShow" :index="router.project.path">项目管理部</el-menu-item>
            <el-menu-item v-if="menuLimits.ued.isShow" :index="router.ued.path">UED</el-menu-item>
            <el-menu-item v-if="menuLimits.frame.isShow" :index="router.frame.path">技术框架部</el-menu-item>
            <el-menu-item v-if="menuLimits.engine.isShow" :index="router.engine.path">引擎部</el-menu-item>
            <el-menu-item v-if="menuLimits.audio.isShow" :index="router.audio.path">音频设计部</el-menu-item>
            <el-menu-item v-if="menuLimits.iplayout.isShow" :index="router.iplayout.path">IP企划部</el-menu-item>
          </el-submenu>
          <el-menu-item v-if="menuLimits.outsourcingCost.isShow" :index="router.outsourcingCost.path">美术音频外包</el-menu-item>
          <el-menu-item v-if="menuLimits.ipcost.isShow" :index="router.ipcost.path">IP成本</el-menu-item>
          <el-menu-item v-if="menuLimits.publishCost.isShow" :index="router.publishCost.path">前置发行</el-menu-item>
        </el-submenu>

        <el-menu-item v-if="menuLimits.backManage.isShow" index="/backManage">
          <i class="el-icon-setting"></i>
          <span slot="title">后台管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 内容区 -->
    <el-main id="cost-home-main">
      <router-view :isCollapse="isCollapse"></router-view>
    </el-main>
  </el-container>
  <!-- 站位页面 -->
  <el-container v-else>
    <el-aside width="200px" style="background: #fff; padding: 20px;">
      <div class="positionAside" style="background: rgb(245, 247, 249); height: 100%; border-radius: 6px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);"></div>
    </el-aside>
    <el-main style="background: #fff">
      <div class="positionAside" style="background: rgb(245, 247, 249);"></div>
    </el-main>
  </el-container>

  <el-radio-group size="mini" v-model="isCollapse" :class="{isCollapse: true, shrink: isCollapse}">
    <el-radio-button :label="true">收起</el-radio-button>
    <el-radio-button :label="false">展开</el-radio-button>
  </el-radio-group>
</el-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      router: {
        home: {
          path: '/',
          name: '首页',
          level: 1
        },
        costhome: {
          path: '/costhome',
          name: '首页',
          level: 1
        },
        basicInfo: {
          path: '/basicInfo',
          name: '项目基础信息',
          level: 2
        },
        cost: {
          path: '/cost',
          name: '成本',
          level: 2
        },
        research: {
          path: '/research',
          name: '研发成本',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        art: {
          path: '/art',
          name: '美术成本',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        operation: {
          path: '/operation',
          name: '运营成本',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        ipcost: {
          path: '/ipcost',
          name: 'IP成本',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        middleground: {
          path: '/middleground',
          name: '中台成本首页',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        quality: {
          path: '/quality',
          name: '质量管理成本',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        project: {
          path: '/project',
          name: '项目管理成本',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        ued: {
          path: '/ued',
          name: 'UED成本',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        frame: {
          path: '/frame',
          name: '技术框架部',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        engine: {
          path: '/engine',
          name: '引擎部',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        audio: {
          path: '/audio',
          name: '音频部',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        iplayout: {
          path: '/iplayout',
          name: 'IP企划部',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        publishCost: {
          path: '/publishCost',
          name: '发行成本',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        outsourcingCost: {
          path: '/outsourcingCost',
          name: '外包成本',
          father: '成本',
          flag: '/cost',
          level: 3
        },
        budget: {
          path: '/budget',
          name: '预算',
          level: 2
        },
        manpower: {
          path: '/manpower',
          name: '人力预算',
          father: '预算',
          flag: '/budget',
          level: 3
        },
        ipbudget: {
          path: '/ipbudget',
          name: 'IP预算',
          father: '预算',
          flag: '/budget',
          level: 3
        },
        publishBudget: {
          path: '/publishBudget',
          name: '发行预算',
          father: '预算',
          flag: '/budget',
          level: 3
        },
        outsourcingBudget: {
          path: '/outsourcingBudget',
          name: '外包预算',
          father: '预算',
          flag: '/budget',
          level: 3
        }
      },
      navName: '',
      navPath: '',
      secondNavName: '',
      isFirstPage: false,
      isSecondPage: false,
      isThirdPage: false,
      isAdminShow: false,
      isCollapse: false,
      firstResize: true
    }
  },

  computed: {
    ...mapState({menuLimits: 'menuLimits'})
  },
  created () {
    this.setIsCollapse()
    this.getMenu(() => {
      // console.log('下载好了')
      this.$nextTick(() => {
        this.isAdminShow = true
      })
    })
    window.addEventListener('resize', () => {
      if (this.firstResize) {
        this.throttle(() => {
          this.setIsCollapse()
          this.firstResize = true
        }, 300)()
      }
      this.firstResize = false
    }, false)
  },
  watch: {
    menuLimits: {
      handler (val, oldVal) {
        // console.log(this.$route.path)
        if (this.$route.path === '/') {
          // console.log(val)
          for (let k in val) {
            if (k === 'costfold' || k === 'budgetfold' || k === 'middlecost') continue
            if (val[k].isShow) {
              this.$router.push('/' + k)
              return
            }
          }
          this.$router.push('/notfount')
        } else {
          // console.log(val)
          // debugger
          if (this.$route.path.slice(1) in val && val[this.$route.path.slice(1)].isShow === false) {
            this.$router.push('/notfount')
          } else {
            this.$router.push(this.$route.path)
          }
        }
      },
      deep: true
      // immediate: true
    },
    // 监测路由，设置导航
    $route: {
      handler: function (val, oldVal) {
        // console.log(val.path)
        this.setHash({val: val.path})
        // for (let k in this.router) {
        //   if (this.router[k].path === val.path) {
        //     if (this.router[k].level === 1) {
        //       this.isFirstPage = false
        //       this.isSecondPage = false
        //       this.isThirdPage = false
        //     } else if (this.router[k].level === 2) {
        //       this.navName = this.router[k].name
        //       this.isFirstPage = true
        //       this.isSecondPage = false
        //       this.isThirdPage = false
        //     } else {
        //       // console.log(this.router[k].flag)
        //       this.navPath = this.router[k].flag
        //       this.navName = this.router[k].father
        //       this.secondNavName = this.router[k].name
        //       this.isFirstPage = true
        //       this.isSecondPage = true
        //       this.isThirdPage = false
        //     }
        //   }
        // }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapMutations(['getMenu', 'setHash']),
    // 去抖动方法
    // 设置屏幕宽度
    setIsCollapse () {
      if (document.body.clientWidth > 1366) {
        this.isCollapse = false
      } else {
        this.isCollapse = true
      }
    },
    throttle (fun, delay) {
      let timer = null
      if (timer) {
        clearTimeout(timer)
      }
      return function () {
        setTimeout(function () {
          fun()
        }, delay)
      }
    }
  }
}

</script>

<style lang="less">
.cb-home {
  height: 100%;
  position: relative;
  .iconfont {
    margin-right: 9px;
    width: 24px;
    margin-left: 2px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }

  .iconfont::before {
    // margin-right: 10px;
  }
  // 头部注释
  // padding-top: 60px;
  .isCollapse {
    position: fixed;
    top: -1px;
    left: 184px;
    z-index: 9999;
    opacity: 0.3;
    transition: all 300ms;
  }
  .isCollapse.shrink {
    left: 84px
  }
   .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
  }
  .isCollapse:hover {
    opacity: 1
  }
  .home-header {
    // background-color: #409EFF;
    background: #fff;
    position: fixed;
    width: 100%;
    z-index: 999;
    top: 0px;
    padding: 0;
    // border-bottom: 1px solid #e6e6e6;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    .cb-breadcrumb {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .sysName{
      width:240px;
      height: 100%;
      line-height: 60px;
      color:#fff;
      text-align: center;
      font-size:20px;
      background: #44acf1;
    }
  }
  .home-aside{
    transition: width 300ms;
    z-index: 1000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05)
  }
  .el-menu {
    border-right:none
  }
  .home-content {
    background-color: #eaeef1;
  }
}
.el-menu-item:hover ,.el-submenu__title:hover {
    color: #fff!important
}
.el-menu-item.is-active {
    color: #409EFF!important
}
</style>
