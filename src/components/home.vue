<template>
  
</template>

<script>
import API from '../api/getApi.js';
import { ApiCall } from '../api/getApi.js';
import APIDELETE,{ DeleteApiCall } from '../api/deleteApi'
import LgLoader from './loader_lg.vue';

export default {
  components :{
    LgLoader
  },
    data () {
    return {
      items: [],
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
  ApiCall(API.getCodes,'GET')
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
.custom-table-search-row{
   max-width: 75%;
    margin-left: 12.5%;
}
.custom-table{
    max-width: 75%;
    margin-left: 12.5%;
}
</style>
