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

import { axios as chaxios } from 'choerodon-front-boot';
import axios from '../../../../commons/axios'
import { mole_url } from '../../../actions/global'


const TYPE = {
  SERVICE_TEMPLATE_LIST_DATA: 'SERVICE_TEMPLATE_LIST_DATA',
  SERVICE_KUBE_LIST_DATA: 'SERVICE_KUBE_LIST_DATA',
  SERVICE_MODULE_LIST_DATA: 'SERVICE_MODULE_LIST_DATA',
  SERVICE_ADD_PARAM_DATA: 'SERVICE_ADD_PARAM_DATA',
  SET_ADD_DATA: 'SET_ADD_DATA',
  CLUSTER_LIST_DATA: 'CLUSTER_LIST_DATA'
}

const setModuleListData = moduleList => ({
  type: TYPE.SERVICE_MODULE_LIST_DATA,
  payload: moduleList
})

const setAddParamData = (key, value) => ({
  type: TYPE.SERVICE_ADD_PARAM_DATA,
  payload: { key, value }
})

const setAddData = submitParam => ({
  type: TYPE.SET_ADD_DATA,
  payload: submitParam
})


const getServiceTemplateDataAjax = () => {
  return dispatch => {
    chaxios
      .get(`${mole_url}/template/list`)
      .then(response => {
        if (response) {
          response.push({ type: 'add' })
          dispatch({
            type: TYPE.SERVICE_TEMPLATE_LIST_DATA,
            payload: response
          })
        }
      })
  }
}

const getKubeInfoAjax = () => {
  return dispatch => {
    let ns = []
    ns.push({ id:1 , name: "abc"})
    dispatch({
              type: TYPE.SERVICE_KUBE_LIST_DATA,
              payload: {namespaces: ns}
            })
    // axios
    //   .getAjax({
    //     url: 'api/kube/info',
    //     type: 'GET',
    //     data: ''
    //   })
    //   .then(response => {
    //     if (response.code === 0) {
    //       let ns = []
    //       // if (response.data.namespaces && response.data.namespaces.length) {
    //       //   response.data.namespaces.map((item, index) => {
    //       //     ns.push({
    //       //       id: index.toString(),
    //       //       name: item
    //       //     })
    //       //   })
    //       // }
    //       ns.push({ id:1 , name: "abc"})
    //       dispatch({
    //         type: TYPE.SERVICE_KUBE_LIST_DATA,
    //         payload: {namespaces: ns}
    //       })
    //     }
    //   })
  }
}

const clusterbaseUrl = "/collector";

// const getCluster = () => {
//   return dispatch => {
//     chaxios
//       .getAjax({
//         url: `${clusterbaseUrl}/v1/collector/cluster/list`,
//         type: 'GET'
//       })
//       .then(response => {
//         if (response) {
//           dispatch({
//             type: TYPE.CLUSTER_LIST_DATA,
//             payload: response
//           })
//         }
//       })
//   }
// }


const getCluster = ()  => {
  return dispatch => {
    
    chaxios.get(`${clusterbaseUrl}/v1/collector/cluster/list`)
    .then(response => {
      if (response) {
        dispatch({
          type: TYPE.CLUSTER_LIST_DATA,
          payload: response
        })
      }
    });
  }
}

const commitServiceTemplateDataAjax = (data, fn) => {
  return dispatch => {
    axios
      .getAjax({
        url: `${mole_url}/template/create`,
        type: 'POST',
        data: {
            info: {
              name: data.name,
              brief: data.brief,
              kind: data.kind,
              body: data.content
          },
          variables: data.vars
        }
      })
      .then(response => {
        if (response.code === 1) {
          fn && fn()
        }
      })
  }
}

const deleteServiceTemplateDataAjax = (data, fn) => {
  return dispatch => {
    axios
      .getAjax({
        url: `${mole_url}/template/drop/${data.tplID}`,
        type: 'DELETE'
      })
      .then(response => {
        if (response.code === 1) {
          fn && fn()
        }
      })
  }
}

const getTemplateDetailById =  (data, fn) => {

  let { id } = data

  return dispatch => {
    axios
      .getAjax({
        url:  `${mole_url}/template/detail/${id}`,
        type: 'GET'
      })
      .then(response => {
        if (response) {
          fn && fn(response)
        }
      })
  }
}

const getTemplateDetailDataAjax = (data, fn) => {
  return dispatch => {
    axios
      .getAjax({
        url: 'api/tasktmpls',
        type: 'POST',
        data: {
          name: data.name,
          brief: data.brief,
          content: data.content,
          vars: data.vars
        }
      })
      .then(response => {
        if (response.code === 0) {
          fn && fn()
        }
      })
  }
}

export {
  getServiceTemplateDataAjax,
  commitServiceTemplateDataAjax,
  deleteServiceTemplateDataAjax,
  setAddData,
  setModuleListData,
  setAddParamData,
  getTemplateDetailDataAjax,
  getTemplateDetailById,
  getKubeInfoAjax,
  getCluster,
  TYPE
}
