import Vue from 'vue'
import {
    Card,
    Menu,
    MenuItem,
    Radio,
    RadioGroup,
    Tooltip,
    Loading,
    Notification,
    Carousel,
    CarouselItem,
    Select,
    Option,
    InfiniteScroll,
    Switch,
    Form,
    FormItem,
    Input
} from "element-ui"

Vue.use(Card)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Tooltip)
Vue.use(Loading)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(InfiniteScroll)
Vue.use(Switch)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.prototype.$notify = Notification
Vue.component(CollapseTransition.name, CollapseTransition)