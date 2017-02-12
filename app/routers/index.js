import VueRouter from 'vue-router';
import home from '../pages/home';
import story from '../pages/story';
import thirdApp from '../pages/thirdApp';
import baseApp from '../pages/baseApp';
import login from '../pages/login';
import signin from '../pages/signin';

const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/home',
      component: home,
      children: [
        {
          path: 'story',
          component: story
        },
        {
          path: 'thirdApp',
          component: thirdApp
        },
        {
          path: 'baseApp',
          component: baseApp
        }
      ]
    },
    {
      name: 'login',
      path: '/',
      component: login,
    },
    {
      name: 'signin',
      path: '/signin',
      component: signin
    }
  ]
});

export default router;