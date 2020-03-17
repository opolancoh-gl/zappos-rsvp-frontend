import Vue from 'vue';
import VueRouter from 'vue-router';

// auth
import SignIn from '@/components/auth/SignInPage.vue';
import PasswordRecovery from '@/components/auth/PasswordRecoveryPage.vue';
// users
import UserList from '@/components/users/UserList.vue';
import UserCreateUpdate from '@/components/users/create-update/UserCreateUpdate.vue';
import UserDetails from '@/components/users/UserDetails.vue';
// devices
import DeviceList from '@/components/devices/DeviceList.vue';
import DeviceCreateUpdate from '@/components/devices/DeviceCreateUpdate.vue';
import DeviceDetails from '@/components/devices/DeviceDetails.vue';
// events
import EventList from '@/components/events/EventList.vue';
import EventCreateUpdate from '@/components/events/create-update/EventCreateUpdate.vue';
import EventDetails from '@/components/events/details/EventDetails.vue';
import EventDetailsOverview from '@/components/events/details/EventDetailsOverview.vue';
import EventDetailsAccess from '@/components/events/details/EventDetailsAccess.vue';
import EventDetailsMessageCenter from '@/components/events/details/message-center/DetailsMessageCenter.vue';
import EventDetailsAttendees from '@/components/events/details/EventDetailsAttendees.vue';
import EventDetailsBlastCenter from '@/components/events/details/EventDetailsBlastCenter.vue';

Vue.use(VueRouter);

const routePaths = { user: '/users', device: '/devices', event: '/events' };

const routes = [
  {
    path: '/',
    name: 'Home',
    component: UserList,
  },
  // auth
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/password-recovery',
    name: 'PasswordRecovery',
    component: PasswordRecovery,
  },
  // users
  // user - list
  {
    path: `${routePaths.user}`,
    name: 'UserList',
    component: UserList,
  },
  // user - create
  {
    path: `${routePaths.user}/new`,
    name: 'UserCreate',
    component: UserCreateUpdate,
  },
  // user - details
  {
    path: `${routePaths.user}/:id(\\d+)`,
    name: 'UserDetails',
    component: UserDetails,
    props: true,
  },
  // user - update
  {
    path: `${routePaths.user}/:id(\\d+)/edit`,
    name: 'UserUpdate',
    component: UserCreateUpdate,
    props: true,
  },
  // devices
  // device - list
  {
    path: `${routePaths.device}`,
    name: 'DeviceList',
    component: DeviceList,
  },
  // device - create
  {
    path: `${routePaths.device}/new`,
    name: 'DeviceCreate',
    component: DeviceCreateUpdate,
  },
  // device - details
  {
    path: `${routePaths.device}/:id(\\d+)`,
    name: 'DeviceDetails',
    component: DeviceDetails,
    props: true,
  },
  // device - update
  {
    path: `${routePaths.device}/:id(\\d+)/edit`,
    name: 'DeviceUpdate',
    component: DeviceCreateUpdate,
    props: true,
  },
  // events
  // event - list
  {
    path: `${routePaths.event}`,
    name: 'EventList',
    component: EventList,
  },
  // event - create
  {
    path: `${routePaths.event}/new`,
    name: 'EventCreate',
    component: EventCreateUpdate,
  },
  // event - details
  {
    path: `${routePaths.event}/:id(\\d+)`,
    component: EventDetails,
    props: true,
    children: [
      {
        path: '',
        name: 'EventDetailsOverview',
        component: EventDetailsOverview,
      },
      {
        path: 'users',
        name: 'EventDetailsAccess',
        component: EventDetailsAccess,
      },
      {
        path: 'message-center',
        name: 'EventDetailsMessageCenter',
        component: EventDetailsMessageCenter,
      },
      {
        path: 'attendees',
        name: 'EventDetailsAttendees',
        component: EventDetailsAttendees,
      },
      {
        path: 'blast-center',
        name: 'EventDetailsBlastCenter',
        component: EventDetailsBlastCenter,
      },
      {
        path: 'edit',
        name: 'EventUpdate',
        component: EventCreateUpdate,
        props: true,
      },
    ],
  },
  // info
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
