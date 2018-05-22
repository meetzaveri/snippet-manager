<template>
  <div class="flex-box" >
    <b-form >
      <b-form-group id="exampleInputGroup1"
                    label="Code Snippet"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
        class="mb-3"
                      type="text"
                      v-model="title"
                      required
                      placeholder="Enter name">
        </b-form-input>

        <b-form-select v-model="language" >
            <option :value="null">Select Language</option>
            <optgroup label="Languages" >
                <option v-for="language in languageList" :key="language.id" :value="language.id">{{language.name}}</option>
            </optgroup>
        </b-form-select>

      </b-form-group>
      <label><b-btn id="popoverButton-sync" variant="success">Guide to Markdown</b-btn></label>
       <b-form-group class="mb-3">
         
         <textarea style="width:600px" rows="10" v-model="code" placeholder="Enter code snippet"></textarea>
       </b-form-group>
    
      <b-button variant="primary" @click="onSubmit">Submit</b-button>
    </b-form>
    <b-popover target="popoverButton-sync" title="Guide">
      <div class="mb-3">
        Using `(single backtick) or ```(triple backtick) You can call out code or a command within a sentence with single backticks. The text within the backticks will not be formatted.
          <br/>For example - ```var foo = bar;```
      </div>
      <div class="mb-3">
        Use # for h1 tag, ## for h2 and ### for h3
      </div>
       <a href="https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax#headings">More Help</a>
    </b-popover>
  </div>
</template>

<script>
import API,{ ApiCall } from '../api/api';
import showdown from 'showdown';
import moment from 'moment'

export default {
  data () {
    return {
      code : '',
      title: '',
      languageList : [],
      language : null,
      form: {
        email: '',
        title: '',
        food: null,
        checked: [],
        code : ''
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn'
      ],
      show: true
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
      let converter = new showdown.Converter();
      var name = this.title;
      var content = this.code;
      var list = this.languageList;
      var languageId = this.language;
      var language = null;
      list.find((item,index)=>{
        if(index === languageId){
          language = item.name;
          console.log(language)
        }
        
      })
      
      var fileType = 'single';
      var token = localStorage.getItem('token');
      ApiCall(API.getCodes,'POST',{name,content,language,fileType},{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
      .then((response) => {
        console.log('Response',response);
        this.$toasted.show('Submitted successfully');
      })

    },
    
  }
}
</script>

<style>

</style>

