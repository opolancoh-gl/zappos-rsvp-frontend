import Vue from 'vue';
import VueRouter from 'vue-router';

// auth
import SignIn from '@/components/auth/SignInPage.vue';
import PasswordRecovery from '@/components/auth/PasswordRecoveryPage.vue';
import SignUp from '@/components/auth/SignUp.vue';
// users
import Accounts from '@/components/Accounts.vue';
import Organizations from '@/components/Organizations.vue';
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
import EventAccessList from '@/components/events/details/EventAccessList.vue';
import EventAccessCreateUpdate from '@/components/events/details/EventAccessCreateUpdate.vue';
import EventAccessDetails from '@/components/events/details/EventAccessDetails.vue';
import EventMessageCenterUpdate from '@/components/events/details/EventMessageCenterUpdate.vue';
import EventAttendees from '@/components/events/details/EventAttendees.vue';
import EventBlastCenter from '@/components/events/details/EventBlastCenter.vue';

import NewAttendee from '@/components/events/details/attendees/NewAttendee.vue';
import ViewAttendee from '@/components/events/details/attendees/ViewAttendee.vue';
import NewBlast from '@/components/events/details/blasts/NewBlast.vue';

import { uuidRE } from '@/utils/validation-utils';

Vue.use(VueRouter);

const routePaths = {
  user: '/users',
  accounts: '/accounts',
  organizations: '/organizations',
  device: '/devices',
  event: '/events',
};

const routes = [
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
  {
    path: '/',
    name: 'Home',
    component: UserList,
    meta: {
      auth: true,
    },
  },
  // accounts
  {
    path: `${routePaths.accounts}/:id?`,
    name: 'AccountsList',
    component: Accounts,
    meta: {
      auth: true,
    },
  },
  // organizations
  {
    path: `${routePaths.organizations}/:id?`,
    name: 'OrganizationsList',
    component: Organizations,
    meta: {
      auth: true,
    },
  },
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
      auth: true,
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
      auth: true,
    },
  },
  // device - details
  {
    path: `${routePaths.device}/:id`,
    name: 'DeviceDetails',
    component: DeviceDetails,
    meta: {
      auth: true,
    },
    props: true,
  },
  // device - update
  {
    path: `${routePaths.device}/:id/edit`,
    name: 'DeviceUpdate',
    component: DeviceCreateUpdate,
    meta: {
      auth: true,
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
      auth: true,
    },
  },
  // event - create
  {
    path: `${routePaths.event}/new`,
    name: 'EventCreate',
    component: EventCreateUpdate,
    meta: {
      auth: true,
    },
  },
  // event - details
  {
    path: `${routePaths.event}/:id(${uuidRE.source})`,
    component: EventDetails,
    props: true,
    meta: {
      auth: true,
    },
    children: [
      {
        path: '',
        name: 'EventOverview',
        component: EventOverview,
        props: true,
        meta: {
          auth: true,
        },
      },
      {
        path: 'users',
        name: 'EventAccessList',
        component: EventAccessList,
        props: true,
        meta: {
          auth: true,
        },
      },
      {
        path: 'users/new',
        name: 'EventAccessCreate',
        component: EventAccessCreateUpdate,
        props: true,
        meta: {
          auth: true,
        },
      },
      {
        path: 'users/:userId/edit',
        name: 'EventAccessUpdate',
        component: EventAccessCreateUpdate,
        props: true,
        meta: {
          auth: true,
        },
      },
      {
        path: 'users/:userId',
        name: 'EventAccessDetails',
        component: EventAccessDetails,
        props: true,
        meta: {
          auth: true,
        },
      },
      {
        path: 'message-center',
        name: 'EventMessageCenter',
        component: EventMessageCenterUpdate,
        props: true,
        meta: {
          auth: true,
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
        path: `attendees/:attendeeID(${uuidRE.source})`,
        name: 'ViewAttendee',
        component: ViewAttendee,
        meta: {
          auth: true,
        },
      },
      {
        path: `attendees/:attendeeID(${uuidRE.source})/edit`,
        name: 'EditAttendee',
        component: NewAttendee,
        meta: {
          auth: true,
        },
      },
      {
        path: 'blast-center/new',
        name: 'NewBlast',
        component: NewBlast,
        meta: {
          auth: true,
        },
      },
      {
        path: 'blast-center',
        name: 'EventBlastCenter',
        component: EventBlastCenter,
        meta: {
          auth: true,
        },
      },
      {
        path: 'edit',
        name: 'EventUpdate',
        component: EventCreateUpdate,
        meta: {
          auth: true,
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
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/About.vue'
      ),
    meta: {
      auth: true,
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
  const loggedIn = await window.$app.isLoggedIn();
  if (
    to.matched.some((record) => record.meta.auth) &&
    !loggedIn
  ) {
    return next({ path: `${SIGNIN}?next=${to.path}` });
  }
  if (!to.matched.length && !loggedIn) {
    return next({ path: SIGNIN });
  }
  if (from.query && from.query.next !== to.path) {
    return next({
      path: from.query.next,
    });
  }
  return next();
});

export default router;
