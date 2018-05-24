<template>
  <div class="">
    <b-row>
        
        <b-col cols="6" class="custom-code-part">
            <h2> Code, compile and execute </h2>
            <b-form >
                <b-form-group id="exampleInputGroup1"
                            label=""
                            label-for="exampleInput1">
                <b-form-select v-model="language" >
                    <option :value="null">Select Language</option>
                    <optgroup label="Languages" >
                        <option v-for="language in languageList" :key="language.id" :value="language.id">{{language.name}}</option>
                    </optgroup>
                </b-form-select>
            </b-form-group>
            <textarea style="width:600px" rows="10" v-model="code" placeholder="Enter code "></textarea>
            
            <br>
            <b-button variant="primary" @click="onSubmit">Run</b-button>
            </b-form>
        </b-col>

        <b-col cols="6">
            <h3>Output</h3>
            <div v-if="outputIsReady" class="mt-4">
                <textarea style="width:300px" rows="10" v-model="realOutput" :class="afterCompileClass" placeholder="Enter code snippet"></textarea>
            </div>
            <div v-else class="mt-4">
                Nothing to show here
            </div>
            <div v-show="loading">
                <lg-loader/>
            </div>
        </b-col>
    </b-row>
  </div>
</template>

<script>
import API,{ ApiCall } from '../api/api';
import LgLoader from './loader_lg.vue';

export default {
  components:{
    LgLoader
  },
  data () {
    return {
      code : null,
      afterCompileClass : 'custom',
      title: '',
      outputIsReady : false,
      realOutput : '',
      show: true,
      options : [],
      languageList : [],
      language : null,
      loading : false
    }
  },
  mounted () {
      ApiCall(API.getLanguageList,'GET')
      .then((response) => {
        this.languageList = response;
      })
  },
  methods: {
    
    onSubmit () {
        this.loading = true;
        this.outputIsReady = false;
        var name = this.title;
        var sourcecode = this.code;
        var langId = this.language;
        var fileType = 'single';
        if(sourcecode === null || langId === null){
            this.$toasted.show('Fill proper data');
            this.loading = false;
        }
        else {
            ApiCall(API.runCode,'POST',{sourcecode,langId})
            .then((response) => {
                console.log('Response',response);
                
                
                if(response.stderr !== null){
                    this.loading = false;     
                    console.log('Response err',response);
                    this.$toasted.show('Error');
                    this.outputIsReady = true;
                    this.afterCompileClass = 'custom-danger'
                    this.realOutput = response.stderr;
                }
                else{
                    this.loading = false;
                    this.outputIsReady = true;
                    this.$toasted.show('Success');
                    this.afterCompileClass = 'custom-success'
                    this.realOutput = response.stdout;
                }
            })
        }
    },
    
  }
}
</script>

<style scoped>
.custom-success{
    border : 2px solid #28a745;
}
.custom-danger{
    border : 2px solid #c82333;
}

.custom-code-part{
    border-right: 1px solid rgba(0, 0, 0, 0.1);
}
</style>

