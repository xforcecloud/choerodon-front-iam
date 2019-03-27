// Copyright 2018 Naftis Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const initialState = {}

const configureStore = () => {
  let enhancer = applyMiddleware(thunk)
  const store = createStore(reducers, initialState, enhancer)

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('../reducers/index.js', () => {
        store.replaceReducer(require('../reducers/index.js').default)
      })
    }
  }
  return store
}

export default configureStore
