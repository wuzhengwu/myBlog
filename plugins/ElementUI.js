import Vue from 'vue'
import {
    Tabs,
    TabPane,
    Table,
    TableColumn,
    Button,
    Pagination,
    Dialog,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Switch,
    Upload,
    MessageBox,
} from 'element-ui'
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$prompt = MessageBox.prompt;