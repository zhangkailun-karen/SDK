import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login/login'
import register from '@/views/Login/register'
import retrievePwd from '@/views/Login/retrievePwd'
import registerphone from '@/views/Login/registerphone'
import logining from '@/views/Login/logining'
import Users from '@/views/User/user'
import Gifts from '@/views/Gifts/gift'
import deposit from '@/views/Gifts/deposit'
import leftbox from '@/views/leftbox/leftbox'
import Detail from '@/views/Gifts/details'
import Recommends from '@/views/Recommends/recommend'
import Services from '@/views/Services/service'
import Edit from '@/views/User/edit'
import editPwd from '@/views/User/editPassword'
import IdCheck from '@/views/User/idCheck'
import Active from '@/views/Actives/active'
import Pay from '@/views/Pays/pay'
import gamePay from '@/views/Pays/gamePay'
// import Mes from '@/views/Actives/mes'
import Acta from '@/views/pays/acta'
import message from '@/views/User/message'
import activeDetails from '@/views/Actives/activeDetails'
import bindingmobile from '@/views/User/bindingmobile'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/logining',
      component: logining
    },
    // {
    //   path: '**',
    //   redirect: '/login'
    // },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/retrievePwd',
      name: 'retrievePwd',
      component: retrievePwd
    },
    {
      path: '/registerphone',
      name: 'registerphone',
      component: registerphone
    },
    {
      path: '/logining',
      name: 'logining',
      component: logining
    },
    {
      path: '/gamePay',
      name: 'gamePay',
      component: gamePay
    },
    // {
    //   path: '/mes',
    //   name: 'Mes',
    //   component: Mes
    // },
    {
      path: '/',
      name: 'leftbox',
      component: leftbox,
      children: [{
        path: 'user',
        name: 'User',
        component: Users
      },
      {
        path: '/details',
        name: 'Detail',
        component: Detail
      },
      {
        path: 'active',
        name: 'Active',
        component: Active
      },
      {
        path: 'activeDetails',
        name: 'ActiveDetails',
        component: activeDetails
      },
      {
        path: 'acta',
        name: 'Acta',
        component: Acta
      },
      {
        path: 'pay',
        name: 'Pay',
        component: Pay
      },
      {
        path: 'gift',
        name: 'Gift',
        component: Gifts
      },
      {
        path: 'service',
        name: 'Services',
        component: Services
      },
      {
        path: 'recommend',
        name: 'Recommend',
        component: Recommends
      },
      {
        path: 'editPwd',
        name: 'EditPwd',
        component: editPwd
      },
      {
        path: 'service',
        name: 'Services',
        component: Services
      },
      {
        path: 'deposit',
        name: 'deposit',
        component: deposit
      },
      {
        path: 'edit',
        name: 'Edit',
        component: Edit
      },
      {
        path: 'bindingmobile',
        name: 'Bindingmobile',
        component: bindingmobile
      },
      {
        path: 'idCheck',
        name: 'IdCheck',
        component: IdCheck
      },
      {
        path: '/message',
        name: 'message',
        component: message
      }
      ]
    }
  ]
})

export default router
