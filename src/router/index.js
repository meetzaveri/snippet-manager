import Vue from 'vue'
import Home from '../components/home.vue';
import SnippetForm from '../components/snippetForm.vue';
import CodeBook from '../components/codeBook.vue';
import RunCode from '../components/runCode.vue';

export const routes =  [
    {
      path: '/',
      component: Home
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
