<template>
  <div class="helpCenter">
    <el-row>
      <el-col :span="6">
        <div class="grid-left">
          <img src="@/assets/imgs/picture.png" alt="图片">
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-right">
          <el-row class="">
            <el-col :span="24">权限开通申请，RTX咨询：陈勇、琉璃</el-col>
          </el-row>
          <el-row class="mt20">
            <el-col :span="24">操作流程图：</el-col>
          </el-row>
          <!-- 第三行 -->
          <el-row class="mt20">
            <el-col :span="4">
              <el-row class="title">来新项目了</el-row>
              <el-row><img src="@/assets/imgs/picture.png" alt="图片"></el-row>
            </el-col>
            <el-col :span="20">
              <el-col :span="4">
                <h3>立项</h3>
                <p>建个项目基础信息表</p>
              </el-col>
              <el-col :span="3" class="iconset"><i class="iconfont icon-iconset0416"></i></el-col>
              <el-col :span="4">
                <h3>做项目预算啦</h3>
                <p>预估下人员投入、外包、IP等预算</p>
              </el-col>
              <el-col :span="3" class="iconset"><i class="iconfont icon-iconset0416"></i></el-col>
              <el-col :span="4">
                <h3>做项目成本啦</h3>
                <p>确认人员投入度、确认外包、IP成本值没有问题</p>
              </el-col>
              <el-col :span="2" class="iconset"><i class="iconfont icon-iconset0416"></i></el-col>
              <el-col :span="4">
                <h3>执行跑批</h3>
                <p>人员成本出来啦，大佬过目。</p>
              </el-col>
            </el-col>
          </el-row>
          <!-- 第四行 -->
          <el-row class="mt20">
            <el-col :span="4">
              <el-row class="title">月度结算了</el-row>
              <el-row><img src="@/assets/imgs/picture.png" alt="图片"></el-row>
            </el-col>
            <el-col :span="20">
              <el-col :span="4">
                <h3>项目要变更</h3>
                <p>更新项目信息表</p>
              </el-col>
              <el-col :span="3" class="iconset"><i class="iconfont icon-iconset0416"></i></el-col>
              <el-col :span="4">
                <h3>预算要调整</h3>
                <p>各类预算投入调整</p>
              </el-col>
              <el-col :span="3" class="iconset"><i class="iconfont icon-iconset0416"></i></el-col>
              <el-col :span="4">
                <h3>成本要调整啦</h3>
                <p>更改，确认调整后无问题</p>
              </el-col>
              <el-col :span="2" class="iconset"><i class="iconfont icon-iconset0416"></i></el-col>
              <el-col :span="4">
                <h3>执行跑批</h3>
                <p>人员成本出来啦，大佬过目。</p>
              </el-col>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
  .helpCenter {
    &>div {
      padding-top: 3%;
    }
    .iconfont {
      font-size: 30px;
      color: #409EFF;
      font-weight: 700;
    }

    .grid-right {
      font-size: 14px;
      .title {
        font-weight: 700;
        margin-bottom: 10px;
      }
      img {
        width: 100px;
      }
      h3 {
        font-size: 16px;
      }
      p {
        font-size: 14px;
      }
    }
    .iconset {
      text-align: center;
      line-height: 100px;
    }
  }
</style>
