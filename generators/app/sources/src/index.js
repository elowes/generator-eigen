import dva from 'dva'
import { createBrowserHistory } from 'history'
import homepage from './models/homepage'
import router from './router'
import 'normalize.css'
import createLoading from 'dva-loading'

let history = createBrowserHistory()

// 1. Initialize
const app = dva({
  history
})

// 2. Plugins
app.use(createLoading())

// 3. Model
app.model(homepage)

// 4. Router
app.router(router)

// 5. Start
app.start('#app')
