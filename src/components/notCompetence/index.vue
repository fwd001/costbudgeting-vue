<template>
  <div class="errPage-container">
    <div class="row tranform50">
      <el-row>
        <el-col :span="12" style="margin-top:-20px;">
          <h1 class="text-jumbo text-ginormous">Oops!</h1>
          <h2>您没有权限</h2>
          <h6>请访问<a style="color: #409EFF; cursor:pointer;" @click="$router.push('/helpcenter')">帮助中心</a></h6>
          <ul class="list-unstyled">
            <li>或者你可以去:</li>
            <!-- <li class="link-type">
              <router-link to="/dashboard">回首页</router-link>
            </li>
            <li class="link-type"><a href="https://www.taobao.com/">随便看看</a></li> -->
            <li><a href="#" @click.prevent="dialogVisible=true">点我看看</a></li>
            <li><a href="#" @click.prevent="back">返回上一页</a></li>
          </ul>
          <!-- <el-button icon="arrow-left" @click="back" round type="primary">返回上一页</el-button> -->
        </el-col>
        <el-col :span="12">
          <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="随便看">
      <img :src="ewizardClap" class="pan-img">
    </el-dialog>
  </div>
</template>

<script>
import errGif from '@/assets/imgs/401.gif'
export default {
  name: 'Page401',
  data () {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    back () {
      if (this.$route.query.noGoBack) {
        // this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .errPage-container {
    position: relative;
    max-width: 100%;
    margin: 0 auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
      width: 100%;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 80%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .row{
      position: absolute;
      width: 50%;
      top: 50%;
      left: 50%;
      min-width: 500px;
      margin: 0 auto
    }
    .tranform50{
      transform:translate(-50%, -50%);
      -ms-transform:translate(-50%, -50%);
      -moz-transform:translate(-50%, -50%);
      -webkit-transform:translate(-50%, -50%);
      -o-transform:translate(-50%, -50%);
    }
  }
</style>
