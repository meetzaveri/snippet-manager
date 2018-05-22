<template>
  <div>
    <h2> Snippet Vue {{$route.params.userId}} </h2>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  created(){
    console.log('Routes paramas',this.$route.params.userId)
  }
}
</script>

<style>

</style>
