import Vue from 'vue'
import Home from '../components/home.vue';
import SnippetForm from '../components/snippetForm.vue';
import CodeBook from '../components/codeBook.vue';
import RunCode from '../components/runCode.vue';
import SnipList from '../components/snipList.vue';

export const routes =  [
    {
      path: '/',
      redirect:'/snip-list'
    },
    {
      path: '/snip-list',
      component: SnipList
    },
    {
      path: '/new-snippet', 
      component: SnippetForm
    },
    {
      path : '/code-book',
      component : CodeBook
    },
    {
      path : '/run-code',
      component : RunCode
    }
];
