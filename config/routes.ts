export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ name: '登录', path: '/user/login', component: './user/Login' }] },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
    ],
  },
  {
    path: '/edit',
    name: '编辑表格',
    routes: [
      {
        path: '/edit/render',
        name: '表格render中渲染编辑',
        component: './EditTable/TableRender',
      },
      {
        path: '/edit/pro/table',
        name: 'ProEditTable',
        component: './EditTable/ProEditTable',
      },
      {
        path: '/edit/table',
        name: '自主实现EditTable',
        component: './EditTable/EditTable',
      }
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
