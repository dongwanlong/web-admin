import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/User.vue'
import Share from '../views/Share.vue'
import Login from '../views/Login.vue'
import UserDetail from '../views/UserDetail.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'user',
    component: User
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/userdetail/:id',
    name: 'UserDetail',
    component: UserDetail
  },
  {
    path: '/share',
    name: 'share',
    component: Share,
  },{
    path: '/login',
    name: 'login',
    component: Login,
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  let userInfo = localStorage.getItem("userInfo");
  
  if(to.name=="login"){
    next();
  }else{
    if(userInfo){
      next();
    }else{
      next({ name:"login" });
    }
  }
})

export default router
