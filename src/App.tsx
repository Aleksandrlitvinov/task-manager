import { Provider } from 'react-redux'

import { store } from '@/redux'
import { Router } from '@/router'

export const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
