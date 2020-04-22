import Vue from 'vue';
import VueRouter from 'vue-router';

// auth
import SignIn from '@/components/auth/SignInPage.vue';
import PasswordRecovery from '@/components/auth/PasswordRecoveryPage.vue';
import SignUp from '@/components/auth/SignUp.vue';
// users
import UserList from '@/components/users/UserList.vue';
import UserDetails from '@/components/users/UserDetails.vue';
import UserCreateUpdate from '@/components/users/UserCreateUpdate.vue';
// devices
import DeviceList from '@/components/devices/DeviceList.vue';
import DeviceCreateUpdate from '@/components/devices/DeviceCreateUpdate.vue';
import DeviceDetails from '@/components/devices/DeviceDetails.vue';
// events
import EventList from '@/components/events/EventList.vue';
import EventCreateUpdate from '@/components/events/EventCreateUpdate.vue';
import EventDetails from '@/components/events/details/EventDetails.vue';
import EventOverview from '@/components/events/details/EventOverview.vue';
import EventAccess from '@/components/events/details/EventAccess.vue';
import EventMessageCenter from '@/components/events/details/message-center/DetailsMessageCenter.vue';
import EventAttendees from '@/components/events/details/EventAttendees.vue';
import EventBlastCenter from '@/components/events/details/EventBlastCenter.vue';

import NewAttendee from '@/components/events/details/attendees/NewAttendee.vue';

import { uuidRE } from '@/utils/validation-utils';

Vue.use(VueRouter);

const routePaths = {
  user: '/users',
  device: '/devices',
  event: '/events',
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: UserList,
    meta: {
      auth: true,
    },
  },
  // auth
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {
      auth: false,
    },
  },
  {
    path: '/password-recovery',
    name: 'PasswordRecovery',
    component: PasswordRecovery,
    meta: {
      auth: false,
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      auth: false,
    },
  },
  {
    path: '/signout',
    name: 'SignOut',
    component: SignIn,
    meta: {
      auth: false,
    },
  },
  // users
  // user - list
  {
    path: `${routePaths.user}`,
    name: 'UserList',
    component: UserList,
    meta: {
      auth: true,
    },
  },
  // user - create
  {
    path: `${routePaths.user}/new`,
    name: 'UserCreate',
    component: UserCreateUpdate,
    meta: {
      auth: true,
    },
  },
  // user - details
  {
    path: `${routePaths.user}/:id(${uuidRE.source})`,
    name: 'UserDetails',
    component: UserDetails,
    meta: {
      auth: true,
    },
    props: true,
  },
  // user - update
  {
    path: `${routePaths.user}/:id(${uuidRE.source})/edit`,
    name: 'UserUpdate',
    component: UserCreateUpdate,
    meta: {
      auth: false,
    },
    props: true,
  },
  // devices
  // device - list
  {
    path: `${routePaths.device}`,
    name: 'DeviceList',
    component: DeviceList,
    meta: {
      auth: true,
    },
  },
  // device - create
  {
    path: `${routePaths.device}/new`,
    name: 'DeviceCreate',
    component: DeviceCreateUpdate,
    meta: {
      auth: false,
    },
  },
  // device - details
  {
    path: `${routePaths.device}/:id`,
    name: 'DeviceDetails',
    component: DeviceDetails,
    meta: {
      auth: false,
    },
    props: true,
  },
  // device - update
  {
    path: `${routePaths.device}/:id/edit`,
    name: 'DeviceUpdate',
    component: DeviceCreateUpdate,
    meta: {
      auth: false,
    },
    props: true,
  },
  // events
  // event - list
  {
    path: `${routePaths.event}`,
    name: 'EventList',
    component: EventList,
    meta: {
      auth: false,
    },
  },
  // event - create
  {
    path: `${routePaths.event}/new`,
    name: 'EventCreate',
    component: EventCreateUpdate,
    meta: {
      auth: false,
    },
  },
  // event - details
  {
    path: `${routePaths.event}/:id`,
    name: 'EventDetails',
    component: EventDetails,
    props: true,
    meta: {
      auth: false,
    },
    children: [
      {
        path: '',
        name: 'EventOverview',
        component: EventOverview,
        props: true,
        meta: {
          auth: false,
        },
      },
      {
        path: 'users',
        name: 'EventAccess',
        component: EventAccess,
        meta: {
          auth: false,
        },
      },
      {
        path: 'message-center',
        name: 'EventMessageCenter',
        component: EventMessageCenter,
        meta: {
          auth: false,
        },
      },
      {
        path: 'attendees',
        name: 'EventAttendees',
        component: EventAttendees,
        meta: {
          auth: true,
        },
      },
      {
        path: 'attendees/new',
        name: 'NewAttendee',
        component: NewAttendee,
        meta: {
          auth: true,
        },
      },
      {
        path: 'blast-center',
        name: 'EventBlastCenter',
        component: EventBlastCenter,
        meta: {
          auth: false,
        },
      },
      {
        path: 'edit',
        name: 'EventUpdate',
        component: EventCreateUpdate,
        meta: {
          auth: false,
        },
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
    meta: {
      auth: false,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const SIGNIN = '/signin';
  const reqLogin = to.meta && to.meta.auth;
  const loggedIn = await window.$app.isLoggedIn();
  if (loggedIn && to.query && to.query.next && to.query.next !== to.path) {
    return next({
      path: to.query.next,
    });
  }
  if (to.path === SIGNIN) {
    return next();
  }
  if (!reqLogin) {
    return next();
  }
  if (loggedIn && from.query && from.query.next && from.query.next !== to.path) {
    return next({
      path: from.query.next,
    });
  }
  if (!loggedIn) {
    return next({ path: `${SIGNIN}?next=${to.path}` });
  }
  return next();
});

export default router;
