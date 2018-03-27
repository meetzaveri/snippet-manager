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
      <template slot="content" slot-scope="row">{{row.value}}</template>

      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" :variant="buttons.primary" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
          Open
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
        
        <div v-html="specificContent"></div>
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
import showdown from 'showdown';
var converter = new showdown.Converter();

export default {
    data () {
    return {
      items: [{name:'fe', content:'#note'},{name:'zz', content:'#hello'}],
      buttons: {primary: 'primary', danger:'danger', warning: 'warning', success: 'success' },
      fields: [
        { key: 'name', label: 'Name', sortable: true, 'class': 'text-center' },
        { key: 'content', label: 'content', sortable: true, 'class': 'text-center' },
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
  ApiCall(API.getCodes)
  .then((responsJson) => {
    console.log('Response in vue',responsJson);
    this.specificContent = responsJson[responsJson.length - 1].content;
    console.log(this.specificContent);
  })
},
computed(){
  this.items.content = converter.makeHtml(this.items.content);
  console.log(this.items.content);
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
       console.log('Response');
    },
    info (item, index,button) {
      this.modalInfo.title = `Open`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.modalInfo.item = JSON.parse(JSON.stringify(item))
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
      this.items.content = converter.makeHtml(this.items.content);
      console.log(this.items.content);
    }
}
}
</script>

<style>

</style>
