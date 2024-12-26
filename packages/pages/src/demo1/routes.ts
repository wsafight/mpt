import A from './A.vue';
import B from './B.vue';

export default [
  {
    path: '/',
    redirect: '/a',
  },
  {
    path: '/a',
    meta: { title: 'a' },
    component: A,
  },
  {
    path: '/b',
    meta: { title: 'b' },
    component: B,
  },
];
