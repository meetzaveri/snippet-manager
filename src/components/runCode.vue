<template>
  <div style="width:600px">
    <b-form >
        <b-form-group id="exampleInputGroup1"
                    label="Code Snippet Title"
                    label-for="exampleInput1">
        <b-form-select v-model="language" >
            <option :value="null">Select Language</option>
            <optgroup label="Languages" >
                <option v-for="language in languageList" :key="language.id" :value="language.id">{{language.name}}</option>
            </optgroup>
        </b-form-select>
      </b-form-group>
      <textarea style="width:600px" rows="10" v-model="code" placeholder="Enter code snippet"></textarea>
      <b-button variant="primary" @click="onSubmit">Submit</b-button>
    </b-form>
    <div v-if="outputIsReady">
        <textarea style="width:600px" rows="10" v-model="realOutput" placeholder="Enter code snippet"></textarea>
    </div>
  </div>
</template>

<script>
import API,{ ApiCall } from '../api/getApi';

export default {
  data () {
    return {
      code : null,
      title: '',
      language : '',
      outputIsReady : false,
      realOutput : '',
      show: true,
      options : [],
      languageList : [],
      language : null,
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
        var name = this.title;
        var sourcecode = this.code;
        var langId = this.language;
        var fileType = 'single';
        if(sourcecode === null || langId === null){
            this.$toasted.show('Fill proper data');
        }
        else {
            ApiCall(API.runCode,'POST',{sourcecode,langId})
            .then((response) => {
                console.log('Response',response);
                this.$toasted.show('Submitted successfully');
                
                if(response.stderr !== null){
                    console.log('Response err',response);
                    this.outputIsReady = true;
                    this.realOutput = response.stderr;
                }
                else{
                    this.outputIsReady = true;
                    this.realOutput = response.stdout;
                }
            })
        }
    },
    
  }
}
</script>
