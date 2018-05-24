<template>
  <div class="">
    <div class="custom-margin-class">
      <h2>Text editor preview</h2>
      <b-row class="custom-margin-class">
        <b-col cols="8">
          <quill-editor v-model="content"></quill-editor>
        </b-col>
        <b-col cols="4">
          <pre style="min-height:100px;"><code>{{content}}</code> </pre>
        </b-col>
        
      </b-row>
    </div>

    <hr>

    <div class="custom-margin-class">
    <h2> Markdown Preview </h2>
      <b-row class="custom-margin-class"> 
       <b-col cols="8">
          <b-form-group class="mb-3">
                <textarea style="width:100%;" rows="10" v-model="code" placeholder="Enter code snippet"></textarea>
              </b-form-group>
        </b-col>
        <b-col cols="4">

        <!-- If you want to highlight hardcoded source-code -->
         <pre v-highlightjs><code class="javascript"> {{code}} </code></pre>
        <pre v-highlightjs><code class="javascript">const s = new Date().toString()</code></pre>
        </b-col>
        
      </b-row>
    </div>
    
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import {rendermd} from '../utils/utils.js';

export default {
  components: {
    quillEditor
  },
  data () {
    return{
      content:null,
      code : '',
      codeOutput: '',
      kode : 'const s = new Date().toString()',
      sc : ''
    }
  },
  methods : {
    renderOut(){
      var code = this.code
      this.codeOutput = rendermd(code);
    }
  },
}

</script>

<style >
.custom-margin-class{

  margin-top: 2%;
  margin-bottom: 2%;
}

</style>
