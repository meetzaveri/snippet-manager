<template>
  <div style="width:600px">
    <b-form >
      <b-form-group id="exampleInputGroup1"
                    label="Code Snippet Title"
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
      <label> Write Code</label>
       <b-form-group class="mb-3">
         
         <textarea style="width:600px" rows="10" v-model="code"></textarea>
       </b-form-group>
    
      <b-button variant="primary" @click="onSubmit">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import API,{ ApiCall } from '../api/getApi';

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
      console.log('Into on submit');
      var name = this.title;
      var content = this.code;
      var language = this.language;
      ApiCall(API.getCodes,'POST',{name,content,language})
      .then((response) => {
        console.log('Response',response);
      })

    },
    
  }
}
</script>
