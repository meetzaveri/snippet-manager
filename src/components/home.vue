<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="">
        <b-form-group horizontal label="Search" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            
          </b-input-group>
        </b-form-group>
      </b-col>
      <!-- <b-col md="6" class="my-1">
        <b-form-group horizontal label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- none --</option>
            </b-form-select>
            <b-input-group-button>
              <b-form-select :disabled="!sortBy" v-model="sortDesc">
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>
      </b-col> -->
    </b-row>
    <!-- Main table element -->
    <b-row>
      <b-col style="padding:10px">
          
      </b-col>
    </b-row>
    <b-table show-empty
             :bordered="bordered"
             :hover="hover"
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :filter="filter"
             @filtered="onFiltered"
             class="justify-content-md-center"
    >
      
      <template slot="name" slot-scope="row">{{row.value}}</template>
      <template slot="language" slot-scope="row">{{row.value}}</template>

      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
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
    </b-table>

     <b-modal id="modalInfo" ref="modalInfo" @hide="resetModal" :body-text-variant="modalInfo.item.department" :title="modalInfo.title" ok-only>
        <!-- <pre>Title - {{ modalAddItems.title }}</pre> -->
        
        <div v-html="modalInfo.item.content"></div>
          <div slot="modal-footer" class="w-100">
            <b-row>
                <b-col class="text-center"> 
                    <!-- <b-button :disabled="disabled" variant="success" @click="addnewItem" >Save</b-button> -->
                </b-col>
            </b-row>
          </div>
      </b-modal>

  </b-container>
</template>

<script>
import API from '../api/getApi.js';
import { ApiCall } from '../api/getApi.js';
import APIDELETE,{ DeleteApiCall } from '../api/deleteApi'

export default {
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
      loading : false,
      currentPage: 1,
      totalRows: null,
      filter: null,
      bordered: true,
      hover: true,
      dummyData : [],
      modalInfo: { title: '', content: '', item : {} },
      modalAddItems: { title: 'Add new item' },
      fillItems : { phone: null, content: '', name: '', location:'', department : 'IT' },
    }
  },
created (){
  ApiCall(API.getCodes,'GET')
  .then((responsJson) => {
    console.log('Response in vue',responsJson);
    var structuredData = responsJson.map(item => {
      item.id = item._id;
      if(item.language){
        item.language=item.language
      }
      else {
        item.language = 'none'
      }
      return item;
    })
    this.$store.commit('fillData',{codeData:structuredData});
    this.items = this.$store.state.binData
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
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
      //  console.log('Response');
    },
    info (item, index,button) {
      this.modalInfo.title = `Open`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.modalInfo.item = JSON.parse(JSON.stringify(item))
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

<style>

</style>
