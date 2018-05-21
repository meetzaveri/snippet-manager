<template>
  <div class="flex-box" >
    <b-form >
      <b-form-group id="exampleInputGroup1"
                    label=""
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
        class="mb-3"
                      type="text"
                      v-model="title"
                      placeholder="Enter name">
        </b-form-input>
        <b-form-input id="exampleInput2"
        class="mb-3"
                      type="text"
                      v-model="language"
                      placeholder="Enter language">
        </b-form-input>
        <b-form-select v-model="totalPages" >
            <option :value="null">No. of Pages</option>
            <optgroup label="Pages" >
                <option v-for="(option,id) in options" :key="id" :value="option.value">{{option.value}}</option>
            </optgroup>
        </b-form-select>
      </b-form-group>

      <label><b-btn id="popoverButton-sync" variant="success">Guide to Markdown</b-btn></label>
       <b-form-group class="mb-3">
         
         <textarea style="width:600px" rows="10" v-model="code" placeholder="Enter code snippets (Start with intro)"></textarea>
          <b-btn class="btn-custom" v-show="onEditText" variant="danger" @click="updateCodeText">Update<i style="padding-left: 3px;" class="icon-check"></i></b-btn>
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
import showdown from 'showdown';

export default {
  data () {
    return {
      code : '',
      totalPages : null,
      title: '',
      language : '',
      paginationCurrentPage : '1',
      show: true,
      codeWarehouse : [],
      onEditText : false,
      options: [
        { value: 5, text: '5 pages' },
        { value: 10, text: '10 pages' },
      ]
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
                this.onEditText = false;
            }
            else{
              this.code = this.codeWarehouse[currentPage] ;
                console.log('When 1st page is forced');
                 this.onEditText = true;
            }
            
        }
        if(currentPage === 2 ){
            if(this.codeWarehouse.length === 0){
                this.codeWarehouse.push(this.code);
                console.log('Pushed on 1',this.codeWarehouse.length);
                this.code = '';
                this.onEditText = false;
            }
            else {
                 this.code = this.codeWarehouse[currentPage] ;
                 console.log('When 2nd page is forced');
                 this.onEditText = true;
            }
        }
        else if(currentPage > 2){
            console.log('Current Page > 2',currentPage,this.codeWarehouse.length);
            if(currentPage === (this.codeWarehouse.length + 2 )){
                console.log('Normal Behaviour',currentPage,this.codeWarehouse.length  )
                this.codeWarehouse.push(this.code);
                this.code = '';
                this.onEditText = false;
            }
            else if(currentPage < (this.codeWarehouse.length )){
                this.code = this.codeWarehouse[currentPage + 1] ;
                this.codeWarehouse.forEach((item,index) => {
                    console.log('Into code warehouse');
                    if(currentPage === index + 1){
                        console.log('MATCHED INDEX AND CURRENT', currentPage,index + 1,this.codeWarehouse[index + 1]);
                        this.onEditText = true;
                        this.code = this.codeWarehouse[index + 1] ;
                        this.codeWarehouse.splice(index + 1,1,this.code);
                    }
                })
            }
        }
        
        console.log('Final Code Base ',this.codeWarehouse)
    },
    updateCodeText () {
      var currentPage = this.paginationCurrentPage;
      var code = this.code;
      this.codeWarehouse.splice(currentPage,1,code);
      console.log('Updated code warehouse ',this.codeWarehouse);
      this.onEditText = false;
      this.$toasted.show('Updated')
    },
    onSubmit () {
      let converter = new showdown.Converter();
      var name = this.title;
      var content = this.codeWarehouse;
      var language = this.language;
      var fileType = 'multiple'
      var title  = 'Title - ' + this.title;
      content.splice(0,1,title);
      console.log('Content', content)

      // ApiCall(API.getCodes,'POST',{name,content,language,fileType})
      // .then((response) => {
      //   console.log('Response',response);
      //   this.$toasted.show('Submitted successfully');
      // })

    },
    
  }
}
</script>

<style scoped>
.btn-custom{
    position: absolute;
    top: 313px;
    right: 561px;
    padding: 3px 7px;
}
</style>
