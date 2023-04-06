import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入路由
import router from '@/router'

// 引入仓库
import store from '@/store'

// 统一引入API的请求函数
import * as API from '@/api';

// 引入element-ui组件
import { Button, Tag, Input, MessageBox, Message, Table, TableColumn, Tooltip } from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Tag.name, Tag)
Vue.component(Input.name, Input)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Message.name, Message)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Tooltip.name, Tooltip)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
