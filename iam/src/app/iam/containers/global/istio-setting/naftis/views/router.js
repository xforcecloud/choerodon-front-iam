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

import Exception from './Exception'
import TaskTemplate from './Service/TaskTemplate'
import CreateTask from './Service/CreateTask'


const routes = [

  {
    path: '/service/taskTemplate',
    component: TaskTemplate
  },
  {
    path: '/service/createTask',
    component: CreateTask
  },
  {
    path: '/403',
    component: Exception
  },
  {
    path: '/404',
    component: Exception
  },
  {
    path: '/500',
    component: Exception
  }
]

export default routes
