import Vue from 'vue';
import VueRouter from 'vue-router';

// auth
import SignIn from '@/components/auth/SignIn.vue';
// events
import EventPage from '@/components/events/EventPage.vue';
import EventDetails from '@/components/events/details/Details.vue';
import EventDetailsOverview from '@/components/events/details/DetailsOverview.vue';
import EventDetailsAccess from '@/components/events/details/DetailsAccess.vue';
import EventDetailsMessageCenter from '@/components/events/details/message-center/DetailsMessageCenter.vue';
import EventDetailsAttendees from '@/components/events/details/DetailsAttendees.vue';
import EventDetailsBlastCenter from '@/components/events/details/DetailsBlastCenter.vue';
// users
import UserPage from '@/components/users/UserPage.vue';
import UserCreateEdit from '@/components/users/UserCreateEdit.vue';
import UserDetails from '@/components/users/UserDetails.vue';
// devices
import DevicePage from '@/components/devices/DevicePage.vue';
import DeviceCreateEdit from '@/components/devices/DeviceCreateEdit.vue';
import DeviceDetails from '@/components/devices/DeviceDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: UserPage,
  },
  // events
  {
    path: '/events',
    name: 'EventPage',
    component: EventPage,
  },
  {
    path: '/events/:id',
    component: EventDetails,
    children: [
      { path: '', component: EventDetailsOverview },
      { path: 'users', component: EventDetailsAccess },
      { path: 'message-center', component: EventDetailsMessageCenter },
      { path: 'attendees', component: EventDetailsAttendees },
      { path: 'blast-center', component: EventDetailsBlastCenter },
    ],
  },
  // users
  {
    path: '/users',
    name: 'UserPage',
    component: UserPage,
  },
  {
    path: '/users/:id',
    component: UserDetails,
  },
  {
    path: '/users/:id/edit',
    component: UserCreateEdit,
  },
  {
    path: '/users/new',
    component: UserCreateEdit,
  },
  // devices
  {
    path: '/devices',
    name: 'DevicePage',
    component: DevicePage,
  },
  {
    path: '/devices/:id',
    component: DeviceDetails,
  },
  {
    path: '/devices/:id/edit',
    component: DeviceCreateEdit,
  },
  {
    path: '/devices/new',
    component: DeviceCreateEdit,
  },
  // auth
  {
    path: '/sign_in',
    name: 'SignIn',
    component: SignIn,
  },
  //
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
