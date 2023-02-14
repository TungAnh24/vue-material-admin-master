import { LayoutAuth, LayoutDefault, LayoutChat, LayoutMedia, RouteWrapper } from '@/components/layouts'

export const publicRoute = [
  {
    path: '*',
    component: () => import('@/views/error/NotFound.vue'),
  },
  {
    path: '/auth',
    component: LayoutAuth,
    meta: {
      title: 'Login',
    },
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: {
          title: 'Login',
        },
        component: () => import('@/views/auth/Login.vue'),
      },
    ],
  },

  {
    path: '/404',
    name: '404',
    meta: {
      title: 'Not Found',
    },
    component: () => import('@/views/error/NotFound.vue'),
  },

  {
    path: '/500',
    name: '500',
    meta: {
      title: 'Server Error',
    },
    component: () => import('@/views/error/Error.vue'),
  },
]

export const protectedRoute = [
  {
    path: '/',
    component: LayoutDefault,
    meta: {
      title: 'home',
      icon: '',
    },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: 'dashboard',
          icon: 'mdi-view-dashboard',
        },
        component: () => import('@/views/Dashboard.vue'),
      },
      //room
      {
        path: '/room',
        component: RouteWrapper,
        meta: {
          title: 'Room',
          icon: 'mdi-home',
        },
        redirect: '/room/room_list',
        children: [
          {
            path: '/room/room_list',
            name: 'Room list',
            meta: {
              title: 'Room list',
              icon: 'mdi-keyboard',
            },
            component: () => import('@/views/room/Index.vue'),
          },
          {
            path: '/room/emptyroom',
            name: 'Room is empty',
            meta: {
              title: 'Room is empty',
              icon: ' mdi-package-variant-closed',
            },
            component: () => import('@/views/widgets/Social.vue'),
          },
          {
            path: '/room/roomrent',
            name: 'Room is for rent',
            meta: {
              title: 'Room is for rent',
              icon: 'mdi-hospital-building',
            },
            component: () => import('@/views/widgets/Social.vue'),
          },
        ],
      },
      //bill
      {
        path: '/bill',
        component: RouteWrapper,
        meta: {
          title: 'Bills',
          icon: 'mdi-content-paste',
        },
        redirect: '/bill/bill_list',
        children: [
          {
            path: '/bill/bill_list',
            name: 'Bill list',
            meta: {
              title: 'Bill list',
              icon: 'mdi-details',
            },
            component: () => import('@/views/bill/Index.vue'),
          },
          {
            path: '/bill/detail',
            name: 'bill detail',
            meta: {
              title: 'Bill detail',
              icon: ' mdi-details',
            },
            component: () => import('@/views/widgets/Social.vue'),
          },
        ],
      },
      //contract
      {
        path: '/contract',
        component: RouteWrapper,
        meta: {
          title: 'Contracts',
          icon: 'mdi-file-document',
        },
        redirect: '/contract/contract_list',
        children: [
          {
            path: '/contract/contract_list',
            name: 'Contract list',
            meta: {
              title: 'Contract list',
              icon: 'mdi-details',
            },
            component: () => import('@/views/contract/Index.vue'),
          },
          {
            path: '/contract/detail',
            name: 'contract detail',
            meta: {
              title: 'Contract detail',
              icon: ' mdi-details',
            },
            component: () => import('@/views/widgets/Social.vue'),
          },
        ],
      },
      // serviceManager
      {
        path: '/service_manager',
        meta: {
          title: 'Service manager',
          icon: 'mdi-calendar-check',
        },
        name: 'service manager',
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import('@/views/service/Index.vue'),
      },
      //user
      {
        path: '/usermanger',
        component: RouteWrapper,
        meta: {
          title: 'User manager',
          icon: 'mdi-account-multiple',
        },
        redirect: '/usermanager/user_list',
        children: [
          {
            path: '/usermanager/user_list',
            name: 'User list',
            meta: {
              title: 'User list',
              icon: 'mdi-details',
            },
            component: () => import('@/views/user/Index.vue'),
          },
          {
            path: '/usermanager/accounts',
            name: 'accounts',
            meta: {
              title: 'Accounts',
              icon: 'mdi-account',
            },
            component: () => import('@/views/widgets/Social.vue'),
          },
          {
            path: '/usermanager/customers',
            name: 'customer',
            meta: {
              title: 'Customer',
              icon: 'mdi-account-network',
            },
            component: () => import('@/views/customer/Index.vue'),
          },
        ],
      },
      //calendar
      {
        path: '/calendar',
        meta: {
          title: 'calendar',
          icon: 'mdi-calendar-check',
        },
        name: 'calendar',
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import('@/views/Calendar.vue'),
      },
      //kanboard
      {
        path: '/kanboard',
        meta: {
          title: 'kanboard',
          icon: 'mdi-drag-variant',
        },
        name: 'kanboard',
        component: () => import('@/views/task/KanBoard.vue'),
      },
      {
        path: '/chat',
        meta: {
          title: 'chat',
          icon: 'mdi-chat',
          isNew: true,
        },
        redirect: '/chat/messaging',
      },
      {
        path: '/media',
        meta: {
          title: 'media',
          icon: 'mdi-image',
          isNew: true,
        },
        redirect: '/media/file',
      },
      //element
      {
        path: '/element',
        component: RouteWrapper,
        meta: {
          title: 'element',
          icon: 'mdi-dots-square',
        },
        redirect: '/element/cascader',
        children: [
          {
            path: '/element/cascader',
            name: 'element.cascader',
            meta: {
              title: 'cascader',
              icon: 'mdi-alpha-c',
            },
            component: () => import('@/views/element/Cascader.vue'),
          },
        ],
      },
      //task
      {
        path: '/task',
        component: RouteWrapper,
        redirect: '/task/list',
        meta: {
          title: 'task',
          icon: 'mdi-grid',
        },
        children: [
          {
            path: '/task/list',
            name: 'task',
            meta: {
              title: 'task',
              icon: 'mdi-newspaper',
            },
            redirect: '/task/list',
            component: RouteWrapper,
            children: [
              {
                path: '/task/list',
                name: 'task.list',
                meta: {
                  title: 'task_list',
                  icon: 'mdi-calendar-account',
                },
                component: () => import('@/views/task/TaskList.vue'),
              },
            ],
          },
        ],
      },
      //widgets
      {
        path: '/widgets',
        component: RouteWrapper,
        meta: {
          title: 'widget',
          icon: 'mdi-widgets',
        },
        redirect: '/widgets/social',
        children: [
          {
            path: '/widgets/social',
            name: 'SocialWidget',
            meta: {
              title: 'social',
              icon: 'mdi-face-profile',
            },
            component: () => import('@/views/widgets/Social.vue'),
          },
          {
            path: '/widgets/statistic',
            name: 'StatisticWidget',
            meta: {
              title: 'statistic',
              icon: 'mdi-hexagon',
            },
            component: () => import('@/views/widgets/Statistic.vue'),
          },
        ],
      },
      //form
      {
        path: '/forms',
        component: RouteWrapper,
        meta: {
          title: 'form',
          icon: 'mdi-form-textbox',
        },
        redirect: '/forms/basic',
        children: [
          {
            path: '/forms/basic',
            name: 'forms.basic',
            meta: {
              title: 'basic_form',
              icon: 'mdi-alpha-b',
            },
            component: () => import('@/views/form/BasicForm.vue'),
          },
          {
            path: '/forms/stepper',
            name: 'forms.stepper',
            meta: {
              title: 'step_form',
              icon: 'mdi-alpha-s',
            },
            component: () => import('@/views/form/Steppers.vue'),
          },
        ],
      },
      //chart
      {
        path: '/chart',
        component: RouteWrapper,
        meta: {
          title: 'chart',
          icon: 'mdi-chart-line',
        },
        redirect: '/chart/echart',
        children: [
          {
            path: '/chart/echart',
            name: 'echart',
            meta: {
              title: 'echart',
              icon: 'mdi-paw',
            },
            component: () => import('@/views/chart/Echart.vue'),
          },
          {
            path: '/chart/g2',
            name: 'g2',
            meta: {
              title: 'g2',
              icon: 'mdi-alpha-g',
            },
            component: () => import('@/views/chart/G2.vue'),
          },
        ],
      },
      {
        path: '/changelog',
        name: 'changelog',
        meta: {
          title: 'changelog',
          icon: 'mdi-timeline-text',
        },
        component: () => import('@/views/Changelog.vue'),
      },
      {
        path: '/403',
        name: 'Forbidden',
        meta: {
          title: 'access_denied',
          hidden: true,
        },
        component: () => import('@/views/error/Deny.vue'),
      },
    ],
  },
  //media
  {
    path: '/media',
    meta: {
      title: 'media',
      icon: 'mdi-image',
    },
    name: 'media',
    component: LayoutMedia,
    redirect: '/media/file',
    children: [
      {
        path: '/media/file',
        name: 'media.index',
        meta: {
          title: 'media manager',
          icon: 'mdi-view',
        },
        component: () => import('@/views/media/MediaView.vue'),
      },
      {
        path: '/media/:type',
        name: 'media.type',
        meta: {
          title: 'media manager',
          icon: 'mdi-view',
        },
        props: true,
        component: () => import('@/views/media/MediaView.vue'),
      },
    ],
  },
  // chat app
  {
    path: '/chat',
    name: 'Chat',
    component: LayoutChat,
    redirect: {
      path: '/chat/messaging',
    },
    meta: {
      title: 'Chat',
      icon: 'chat_bubble',
    },
    children: [
      {
        path: '/chat/messaging/:uuid?',
        name: 'ChatMessaging',
        props: true,
        component: () => import('@/views/chat/ChatMessaging.vue'),
      },
    ],
  },
]
