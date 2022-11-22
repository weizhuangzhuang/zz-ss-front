<template>
  <div class="home">
    <el-button type="primary"
               @click="btnClick">按钮</el-button>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data () {
    return {

    }
  },
  methods: {
    btnClick () {
      this.getRequest("/sysuser/list").then(res => {
        if (res) {
          console.log(res);
        }
      })
    }
  }
}
</script>
