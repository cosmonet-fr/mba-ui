import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import MyAccountView from '../views/MyAccountView.vue'
import MyPixels from '../views/MyPixels.vue'
import MyPixelEdit from '../views/MyPixelEdit.vue'
import MySales from '../views/MySales.vue'
import MyShoppingList from '../views/MyShoppingList.vue'
import Buy from '../views/Buy.vue'
import BannerEdit from '../views/BannerEdit.vue'
import RentThis from '../views/RentThis.vue'
import MyRent from '../views/MyRent.vue'
import MyPixelEditRent from '../views/MyPixelEditRent.vue'
import Contact from '../views/Contact.vue'
import LegalNotice from '../views/LegalNotice.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView

    },
        {
      path: '/signup',
      name: 'signup',
      component: SignupView

    },
    {
      path: '/forgot-pass',
      name: 'forgot-pass',
      component: ForgotPassword

    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword

    },
    {
      path: '/my-account',
      name: 'my-account',
      component: MyAccountView

    },
    {
      path: '/my-pixels',
      name: 'my-pixels',
      component: MyPixels
    },
    {
      path: '/my-pixels/:pixelId',
      name: 'one-pixel',
      component: MyPixelEdit
    },
    {
      path: '/my-sales',
      name: 'my-sales',
      component: MySales
    },
    {
      path: '/my-shopping-list',
      name: 'my-shopping-list',
      component: MyShoppingList
    },
    {
      path: '/buy/:arrayId',
      name: 'buy',
      component: Buy

    },
    {
      path: '/banner/edit/:idBanner',
      name: 'banner-edit',
      component: BannerEdit

    },
    {
      path: '/rent/:pixelId/:price',
      name: 'rent',
      component: RentThis

    },
    {
      path: '/my-rent',
      name: 'my-rent',
      component: MyRent
    },
    {
      path: '/my-pixels/rent/:id',
      name: 'my-pixels-rent',
      component: MyPixelEditRent
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact

    },
    {
      path: '/legal',
      name: 'legal',
      component: LegalNotice
    }
  ]
})

export default router
