import VueRouter from 'vue-router';
import home from '../pages/home';
import story from '../pages/story';
import thirdApp from '../pages/thirdApp';
import baseApp from '../pages/baseApp';

const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
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
    }
  ]
});

export default router;