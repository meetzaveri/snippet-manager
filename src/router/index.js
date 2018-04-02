import Vue from 'vue'
import Home from '../components/home.vue';
import SnippetForm from '../components/snippetForm.vue';
import CodeBook from '../components/codeBook.vue';

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
    }
];
