import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// import 'vue-universal-modal/dist/index.css'
// import VueUniversalModal from 'vue-universal-modal'


import App from "./App.vue";
const app = createApp(App)
// app.use(VueUniversalModal, {
//     teleportTarget: '#modals'
//   })
app.mount("#app")

