<template>
  <div class="">
    <quill-editor v-model="content"></quill-editor>
    <b-btn @click="onSubmit">Click</b-btn>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return{
      content:'<h1>Hi</h1>',
    }
  },
  methods : {
    onSubmit(){
      console.log('Content',this.content)
    }
  },
}

</script>

<style >


</style>
