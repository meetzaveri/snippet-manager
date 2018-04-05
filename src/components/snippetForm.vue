<template>
  <div style="width:600px">
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
        <b-form-input id="exampleInput2"
        class="mb-3"
                      type="text"
                      v-model="language"
                      required
                      placeholder="Enter language">
        </b-form-input>
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
import API,{ ApiCall } from '../api/getApi';
import showdown from 'showdown';

export default {
  data () {
    return {
      code : '',
      title: '',
      language : '',
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
  methods: {
    onSubmit () {
      let converter = new showdown.Converter();
      var name = this.title;
      var content = this.code;
      var language = this.language;
      var fileType = 'single';
      ApiCall(API.getCodes,'POST',{name,content,language,fileType})
      .then((response) => {
        console.log('Response',response);
        this.$toasted.show('Submitted successfully');
      })

    },
    
  }
}
</script>
