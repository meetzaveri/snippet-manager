<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <div v-if="loading" >
      <lg-loader></lg-loader>
    </div>
    <div v-else>
      <div v-if="ifContentIsThere">
        <h2> No snippets yet created </h2>
      </div>

      <div v-else class="card-container" v-for="(item,index) in items" :key="index">
        <!-- <b-btn @click="renderMdown">Click</b-btn>
        <div v-html="mdCont"></div> -->
        <div class="custom-round-tag"></div>
        <b-card-group class="custom-card-design" deck>
            <b-card :header="item.name"
                    header-tag="header"
                    footer="Card Footer"
                    footer-tag="footer"
                    >
                <div slot="header">
                  <b-row class="custom-snippet-header-row">
                    <b-col cols="12">
                      <h3>{{item.name}}</h3>
                    </b-col>
                    <div >
                      <div class="custom-header-btns">
                        <b-btn variant="primary" @click="onEdit(item.id)"><i class="icon-pencil"></i></b-btn>
                        <b-btn variant="danger" @click="onDelete(item.id)" style="padding-top: 8px !important;padding-bottom: 3px!important;"><i class="icon-close" style="font-size:20px;"></i></b-btn>
                      </div>
                    </div>
                    
                  </b-row>
                </div>        
                <div>
                  <div v-html="item.content"></div>
                </div>
                
                <!-- <quill-editor v-model="item.content"></quill-editor> -->
                <div slot="footer">
                  <div>
                    <b-row>
                      <b-col cols="4">
                        Date created : {{item.timestamp}}
                      </b-col>
                      <b-col cols="4">
                        Language : {{item.language}}
                      </b-col>
                      <b-col cols="4">
                        Type : {{item.type}}
                      </b-col>
                    </b-row>
                  </div>
                    
                </div>
            </b-card>
            
        </b-card-group>
      </div>
    </div>

  </b-container>
</template>

<script>
import API from '../api/api.js';
import { ApiCall } from '../api/api.js';
import {rendermd} from '../utils/utils';
import APIDELETE,{ DeleteApiCall } from '../api/deleteApi'
import LgLoader from './loader_lg.vue';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components :{
    LgLoader,
    quillEditor
  },
    data () {
    return {
      items: null,
      mdCont : null,
      ifContentIsThere : false,
      content: '',
      buttons: {primary: 'primary', danger:'danger', warning: 'warning', success: 'success' },
      variants: [
        'primary'
      ],
      specificContent :'',
      inBox : null,
      loading : false,
      paginationCurrentPage : 1,
      totalPages : null,
      currentPage: 1,
      editToggle : false,
      totalRows: null,
      filter: null,
      bordered: true,
      hover: true,
      dummyData : [],
      isContentArray : false,
      modalInfo: { title: '', content: '', item : {} },
      modalAddItems: { title: 'Add new item' },
      fillItems : { phone: null, content: '', name: '', location:'', department : 'IT' },
    }
  },
created (){
  this.loading  = true;
  let token = localStorage.getItem('token');
  ApiCall(API.getCodes,'GET',{},{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
  .then((responsJson) => {
    console.log('Response in vue',responsJson);
    if(responsJson.length === 0){
      this.ifContentIsThere = true
    }
    var structuredData = responsJson.map((item,index) => {
      item.id = item._id;
      if(typeof(item.content) === "object"){
        this.isContentArray = true;
        item.type = 'codeBook';
        if(item.content.length < 5){
          item.totalPages = 20
        }
        if(item.content.length > 5  &&  item.content.length < 10){
          item.totalPages = 10
        }
      }
      else{
        item.type = 'snippet';
      }
      if(item.language){
        item.language=item.language
      }
      else {
        item.language = 'none'
      }
      return item;
    })
    this.$store.commit('fillData',{codeData:structuredData});
    this.items = this.$store.state.binData;
    this.loading  = false;
  })
  .catch((err) => {
    console.log('err=',err);
  })
},
updated(){
  this.items = this.$store.state.binData;
},
methods: {
    onEdit(id){
      this.editToggle = true;
      this.$router.push({ name: 'snippet', params: { userId: id }})
    },
    onDelete(id){
      var token = localStorage.getItem('token');
      
      DeleteApiCall(APIDELETE.deleteCodes + id,'DELETE',{id:id},{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
      .then((response) => {
        console.log('Delete Response',response);
        let newItemObj = [];
        this.items.forEach((item,index) => {
          if(item.id === id){
            
          } else {
            newItemObj.push(item);
          }
        })
        console.log('NewItemObj',newItemObj);
        this.$store.commit('updateBinData',{updatedData : newItemObj});
        this.$forceUpdate();
        this.$toasted.show('Deleted successfully');
      })
    },
    onCancelOperation(){
      this.editToggle = false;
    }
}
}
</script>

<style scoped>
h4{
    margin : 1rem 1rem ;
}
.custom-table-search-row{
   max-width: 75%;
    margin-left: 12.5%;
}
.custom-table{
    max-width: 75%;
    margin-left: 12.5%;
}

.custom-card-design{
  padding: 10px 10px;
}

.card-container {
   margin-bottom: 5em;
   padding: 30px 100px;
}
     
.card-container .custom-round-tag{
  width: 20px;
    height: 20px;
    position: absolute;
    background: rgb(0, 123, 255);
    border-radius: 50%;
}

.card-container .custom-card-design .custom-snippet-header-row{
  position: relative;
}

.card-container .custom-card-design .custom-snippet-header-row .custom-header-btns{
  position: absolute;
  top: 0;
  right: 0;
}
</style>
