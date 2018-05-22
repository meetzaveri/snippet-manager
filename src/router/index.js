import Vue from 'vue'
import Home from '../components/home.vue';
import SnippetForm from '../components/snippetForm.vue';
import CodeBook from '../components/codeBook.vue';
import RunCode from '../components/runCode.vue';
import SnipList from '../components/snipList.vue';
import Snippet from '../components/snippet.vue';
import Login from '../pages/login.vue';
import Register from '../pages/register.vue';
import MarkdownPreview from '../components/mdpreview.vue'

export const routes =  [
    {
      path: '/',
      component: SnipList
    },
    {
      path: '/snippet/:userId',
      name : 'snippet',
      component: Snippet
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
    },
    {
      path : '/login',
      component : Login
    },
    {
      path : '/register',
      component : Register
    },
    {
      path : '/markdown-preview',
      component : MarkdownPreview
    },
];
