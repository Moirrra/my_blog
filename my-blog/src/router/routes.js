const NavTop = ()=>import('@/components/NavTop')
const Article = ()=>import('@/components/Article')
const Sidebar = ()=>import('@/components/Sidebar')
const About = ()=>import('@/components/About')
const Detail = ()=>import('@/components/Detail')
const Login = ()=>import('@/components/Login')
const Edit = ()=>import('@/components/Edit')
const Manage = ()=>import('@/components/Manage')

export default [
  {
    path: '/',
    redirect: '/Admin/home'
  },
  {
    path: '/:username/home',
    components: {
      default: Article,
      sidebar: Sidebar,
      navtop: NavTop,
    },
  },
  {
    path: '/:username/about',
    components: {
      default: About,
      sidebar: Sidebar,
      navtop: NavTop,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/:username/detail',
    name: 'detail',
    components: {
      default: Detail,
      sidebar: Sidebar,
      navtop: NavTop,
    },
  },
  {
    path: '/:username/edit',
    name: 'edit',
    component: Edit,
  },
  {
    path: '/:username/manage',
    name: 'manage',
    components: {
      default: Manage,
      sidebar: Sidebar,
      navtop: NavTop,
    },
  },
]