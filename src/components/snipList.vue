<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <div v-if="loading" >
      <lg-loader></lg-loader>
    </div>
    <div v-else>
      <!-- <h4> Find Snippets </h4>
      <b-row >
        <b-col md="6" class="custom-table-search-row">
          <b-form-group horizontal label="Search" class="mb-0" >
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search" />
                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row> -->
    <!-- Main table element -->
      <!-- <b-row>
        <b-col style="padding:10px">
            
        </b-col>
      </b-row>
      <b-table
                show-empty
              :bordered="bordered"
              :hover="hover"
              stacked="md"
              :items="items"
              :fields="fields"
              :current-page="currentPage"
              :filter="filter"
              @filtered="onFiltered"
              class="custom-table justify-content-md-center"
      >
      
        <template slot="name" slot-scope="row">{{row.value}}</template>
        <template slot="language" slot-scope="row">{{row.value}}</template>

        <template slot="actions" slot-scope="row">

          <b-button size="sm" :variant="buttons.primary" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
            Open
          </b-button>
          <b-button size="sm" :variant="buttons.danger" @click.stop="deleteRecord(row.item, row.index, $event.target)" class="mr-1">
            Delete
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
            </ul>
          </b-card>
        </template>
      </b-table> -->

      <div v-for="(item,index) in items" :key="index">
        <!-- <b-btn @click="renderMdown">Click</b-btn>
        <div v-html="mdCont"></div> -->
        <div class="custom-round-tag"></div>
        <b-card-group class="custom-card-design" deck>
            <b-card :header="item.name"
                    header-tag="header"
                    footer="Card Footer"
                    footer-tag="footer"
                    >
                
                <div v-html="item.content"></div>

                <div slot="footer">
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
            </b-card>
            
        </b-card-group>
      </div>
    </div>
    

     <b-modal id="modalInfo" size="lg" ref="modalInfo" @hide="resetModal" :body-text-variant="modalInfo.item.department" :title="modalInfo.title" ok-only>

        <div v-if="typeof(modalInfo.item.content) === 'object'">
          <div v-if="inBox === undefined || inBox === '' || inBox === null">
            No Content
          </div>
          <div v-else>
            <div v-html="inBox"></div>
          </div>
          <b-pagination align="center" size="md" :total-rows="100" v-model="paginationCurrentPage" :per-page="modalInfo.item.totalPages" @input="scrollLeft">
            </b-pagination>
        </div>
        <div v-else>
          <div v-html="modalInfo.item.content"></div>
        </div>
        
        
        <div slot="modal-footer" class="w-100">
          <b-row>
              <b-col class="text-center"> 
                  
              </b-col>
          </b-row>
        </div>
      </b-modal>

  
  
  </b-container>
</template>

<script>
import API from '../api/getApi.js';
import { ApiCall } from '../api/getApi.js';
import {rendermd} from '../utils/utils';
import APIDELETE,{ DeleteApiCall } from '../api/deleteApi'
import LgLoader from './loader_lg.vue';

export default {
  components :{
    LgLoader
  },
    data () {
    return {
      items: [],
      mdCont : null,
      buttons: {primary: 'primary', danger:'danger', warning: 'warning', success: 'success' },
      fields: [
        { key: 'name', label: 'Name', sortable: true, 'class': 'text-center' },
        { key: 'language', label: 'language', sortable: true, 'class': 'text-center' },
        { key: 'actions', label: 'Actions', 'class': 'text-center' }
      ],
      variants: [
        'primary'
      ],
      specificContent :'',
      inBox : null,
      loading : false,
      paginationCurrentPage : 1,
      totalPages : null,
      currentPage: 1,
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
methods: {
   resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    // renderMdown(){
    //   this.mdCont = rendermd('```var re = 32; ```');
    // },
    scrollLeft (){
      console.log('Current Page',this.paginationCurrentPage);
      var ind = this.paginationCurrentPage;
      this.inBox = this.modalInfo.item.content[ind - 1];
      console.log('Inbox',this.inBox);
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
      //  console.log('Response');
    },
    info (item, index,button) {
      this.modalInfo.title = `Open`
      this.modalInfo.content = JSON.stringify(item, null, 2);
      this.modalInfo.item = JSON.parse(JSON.stringify(item));
      this.inBox = this.modalInfo.item.content[this.paginationCurrentPage - 1];
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
      // console.log('In Info',this.modalInfo.item);
    },
    deleteRecord(item, index,button){
      console.log('Item to be deleted',item);
      DeleteApiCall(APIDELETE.deleteCodes+'/'+item.id,'DELETE',{id:item.id})
      .then((responsJson) => {
        this.$store.commit('deleteItem',{id : item.id});
        console.log(responsJson);
      })
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

.custom-round-tag{
  width: 20px;
    height: 20px;
    position: absolute;
    background: rgb(0, 123, 255);
    border-radius: 50%;
}
</style>
