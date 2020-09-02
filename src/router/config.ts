import { RouteType } from './data.d'
import Welcome from '@/pages/Welcome'
import PanelOne from '@/pages/panel/CompOne'
import PanelTwo from '@/pages/panel/CompTwo'

const routes: RouteType[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: Welcome,
    routes: [
      {
        path: '/p1',
        name: 'panel1',
        component: PanelOne,
      },
      {
        path: '/p2',
        name: 'panel2',
        component: PanelTwo,
      },
    ],
  },
]

export { routes }
