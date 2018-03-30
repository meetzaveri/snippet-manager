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

      <label><b-btn id="popoverButton-sync" variant="success">Guide to Markdown</b-btn></label>
       <b-form-group class="mb-3">
         
         <textarea style="width:600px" rows="10" v-model="code" placeholder="Enter code snippet"></textarea>

       </b-form-group>
        
        <b-pagination align="center" size="md" :total-rows="100" v-model="paginationCurrentPage" :per-page="totalPages" @input="scrollLeft">
        </b-pagination>
        
        <div v-if="paginationCurrentPage === totalPages">
            <b-button variant="primary" @click="onSubmit">Submit</b-button>
        </div>
      
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
      totalPages : 10,
      title: '',
      language : '',
      paginationCurrentPage : '1',
      show: true,
      codeWarehouse : []
    }
  },
  methods: {
    scrollLeft(){
        var currentPage = this.paginationCurrentPage;
        console.log('Current Page',currentPage);
        if(currentPage === 1 ){
            if(this.codeWarehouse.length === 0){
                this.codeWarehouse.push(this.code);
                console.log('Pushed on 1',this.codeWarehouse.length);
                this.code = '';
            }
            else{
               
            }
            
        }
        if(currentPage === 2 ){
            if(this.codeWarehouse.length === 0){
                this.codeWarehouse.push(this.code);
                console.log('Pushed on 1',this.codeWarehouse.length);
                this.code = '';
            }
            else{
                 this.codeWarehouse.splice(1,1,this.code);
                 this.code = '';
            }
            
        }
        else if(currentPage > 2){
            console.log('Current Page > 2',currentPage,this.codeWarehouse.length);
            if(currentPage === (this.codeWarehouse.length + 2 )){
                console.log('Normal Behaviour',currentPage,this.codeWarehouse.length  )
                this.codeWarehouse.push(this.code);
                this.code = '';
            }
            else if(currentPage < (this.codeWarehouse.length )){
                this.code = this.codeWarehouse[currentPage + 1] ;
                this.codeWarehouse.forEach((item,index) => {
                    console.log('Into code warehouse');
                    if(currentPage === index + 1){
                        console.log('MATCHED INDEX AND CURRENT', currentPage,index + 1,this.codeWarehouse[index + 1]);
                        this.code = this.codeWarehouse[index + 1] ;
                        this.codeWarehouse.splice(index + 1,1,this.code);
                    }
                })
                
                
            }
        }
        
        console.log('Final Code Base ',this.codeWarehouse)
    },
    onSubmit () {
      let converter = new showdown.Converter();
      var name = this.title;
      var content = this.code;
      var language = this.language;
      ApiCall(API.getCodes,'POST',{name,content,language})
      .then((response) => {
        console.log('Response',response);
        this.$toasted.show('Submitted successfully');
      })

    },
    
  }
}
</script>
