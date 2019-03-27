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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import connectWithStore from '../../../utils/connect.js'
import configureStore from '../../../redux/store'
import { Stepper, Panel, Input, Select, DatePicker, Icon, handleNotificate, Table, Form, Button, Alert, Counter } from '@hi-ui/hiui/es'
import '@hi-ui/hiui/es/table/style/index.css'
// import { setBreadCrumbs } from '../../../redux/actions/global'
import * as Actions from '../../../redux/actions/service/createTask'
import * as TaskTemplateActions from '../../../redux/actions/service/taskTemplate'
import { Task } from '../../../commons/consts'
import './index.scss'
import { store } from '../../index'
import _ from 'lodash'

const FormItem = Form.Item

class CreateTask extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stepList: [
        {title: T('app.common.createTaskStep1')},
        {title: T('app.common.createTaskStep2')},
        {title: T('app.common.createTaskStep3')}
      ],
      namespace: 'default',
      clusterId: 0
    }
    this.canContinue = true
    this.tempItem = ''
    this.createItem = {
      createList: []
    }
    this.submitParam = {}
  }

  componentDidMount () {
    const { location, history } = this.props
    // history param from taskTemplate item
    if (!location.query) {
      history.goBack()
    }
    this.props.setCreateTaskListData([])
    this.props.getKubeInfoAjax()
    this.tempItem = location.query
    if (this.tempItem && this.tempItem.variables && this.tempItem.variables.length) {
      this.tempItem.variables.map(item => {
        if (item.name) {
          this.createItem[item.name] = item.default
          this.submitParam.tmplID = item.tplId
          let data = []
          for (let i in item.data) {
            data.push({name: i, id: i})
          }
          this.createItem.createList.push({key: item.name, type: item.eleType, data})
        }
      })
    }

    let createItem = JSON.parse(JSON.stringify(this.createItem))
    this.props.setCreateTaskListData([createItem])
    this.props.setCurrentStepData(0)

    const crumbsItems = [
      {title: T('app.menu.service'), to: '/'},
      {title: T('app.common.createTask'), to: '/service/createTask'}
    ]
    // setBreadCrumbs(crumbsItems)
  }

  updateParam = (value, key, index) => {
    let {createTaskList} = this.props
    createTaskList[index][key] = value
    this.props.setCreateTaskListData(createTaskList)
  }

  checkNoneData = (value, msg, type) => {
    if (!value) {
      handleNotificate({
        autoClose: true,
        title: 'Notification',
        message: msg,
        type: type,
        onClose: () => {}
      })
      this.canContinue = false
    }
  }

  getColumns = (taskList) => {
    let columns = [{
      title: 'Rule',
      dataIndex: 'ruleDesc',
      key: 12,
      render: (text, row, index) => {
        return `Rule ${index + 1}`
      }
    }]

    let taskItem = taskList[0]
    // delete taskItem.createList
    for (let i in taskItem) {
      let columnsItem = {}
      if (i !== 'createList') {
        columnsItem.title = i
        columnsItem.dataIndex = i
        columnsItem.key = i
        columns.push(columnsItem)
      }
    }
    return columns
  }

  changeNamespace = (namespace) => {
    this.setState({namespace})
  }

  changeCluster = (clusterId) => {
    this.setState({clusterId})
  }

  /**
   * 【currentStep】is the step index
   *   0 === Fill in variables
   *   1 === Confirm variables
   *   2 === Completed
   */
  renderCenter = () => {
    const { createTaskList, currentStep, lastServiceItem, createStatus, clusterItems } = this.props

  
    const drop = _.map(clusterItems, function(item) {
        return {
          id: item.id,
          name: item.clsuterName
        }
    });
    

    return (
      <div className='create-center-wrap'>
        <div className='create-stepper'>
          <Stepper
            list={this.state.stepList}
            current={currentStep}
          />
        </div>
        <div className='create-task-content'>
          {
            currentStep === 2 ? null : <Panel key='namespace' title={<div className='col-panel-title'>Settings</div>}>
              <div className='create-panel-content'>
                <Form inline>
                <FormItem label='Cluster' key='clusterId-formitem'>
                    {
                    <Select
                      mode='single' list={drop}
                      searchable
                      value={this.state.clusterId} // TODO default value is not working for the first render
                      style={{margin: '4px 4px', width: '200px'}}
                      disabled={currentStep === 1}
                      onChange={(item) => {
                        if (item[0]) {
                          this.changeCluster(item[0].id)
                        }
                      }} />
                    }
                  </FormItem>
                  <FormItem label='Namespace' key='namespace-formitem'>
                    {/* <Select
                      mode='single' list={kubeinfo.namespaces}
                      searchable
                      value={'0'} // TODO default value is not working for the first render
                      style={{margin: '4px 4px', width: '200px'}}
                      disabled={currentStep === 1}
                      onChange={(item) => {
                        if (item[0]) {
                          this.changeNamespace(item[0].name)
                        }
                      }} /> */}
                      {
                       <Input 
                        disabled={currentStep === 1}
                        onChange={(e) => {
                          // if (item[0]) {
                            this.changeNamespace(e.target.value)
                          // }
                        }}/>
                      }
                  </FormItem>
                </Form>
              </div>
            </Panel>
          }
          {
            currentStep === 0 ? <div className='create-task-form'>
              {
                createTaskList && createTaskList.length ? createTaskList.map((item, index) => {
                  return (
                    <Panel key={index} title={<div className='col-panel-title'>{T('app.common.task') + ' ' + (index + 1)}</div>} footer={<div className='create-list-foot'>
                      <div className='create-delete' onClick={() => {
                        createTaskList.splice(index, 1)
                        this.props.setCreateTaskListData(createTaskList)
                      }}
                      >{T('app.common.delete')}</div>
                    </div>}>
                      <div className='create-panel-content'>
                        <Form inline>
                          {
                            item.createList.length ? item.createList.map((v, i) => {
                              let data = JSON.parse(JSON.stringify(v.data))
                              return (
                                <FormItem label={v.key + '：'} key={i}>
                                  {
                                    (v.type === Task.varFormType.STRING) && <Input
                                      value={item[v.key]}
                                      type={'text'}
                                      style={{margin: '4px 4px', width: '200px'}}
                                      onChange={(e) => {
                                        this.updateParam(e.target.value, v.key, index)
                                      }} />
                                  }
                                  {
                                    (v.type === Task.varFormType.NUMBER) && <Input
                                      value={item[v.key]}
                                      type={'amount'}
                                      style={{margin: '4px 4px', width: '200px'}}
                                      onChange={(e) => {
                                        this.updateParam(e.target.value, v.key, index)
                                      }} />
                                  }
                                  {
                                    (v.type === Task.varFormType.PERCENTAGE) && <Counter
                                      value={item[v.key]}
                                      step={10}
                                      min={'0'}
                                      max={100}
                                      onChange={(e) => {
                                        let value = e.target.value
                                        if (value < 0) value = 0
                                        this.updateParam(value, v.key, index)
                                      }} />
                                  }
                                  {
                                    v.type === Task.varFormType.SELECT && <Select
                                      mode='single' list={data}
                                      searchable
                                      value={item[v.key]}
                                      style={{margin: '4px 4px', width: '200px'}}
                                      onChange={(value) => {
                                        if (value[0]) {
                                          this.updateParam(value[0].id, v.key, index)
                                        }
                                      }} />
                                  }
                                  {
                                    v.type === Task.varFormType.DATETIME && <DatePicker
                                      value={item[v.key]}
                                      style={{margin: '4px 4px', width: '200px'}}
                                      onChange={(d) => {
                                        if (d) {
                                          this.updateParam(DatePicker.format(d, 'yyyy-MM E'), v.key, index)
                                        } else {
                                          this.updateParam(d, v.key, index)
                                        }
                                      }} />
                                  }
                                </FormItem>
                              )
                            }) : null
                          }
                        </Form>
                      </div>
                    </Panel>
                  )
                }) : null
              }
            </div> : null
          }
          {
            currentStep === 1
              ? <div className='varInfo'>
                <Alert
                  content={T('app.common.createTaskStep2Cmt')}
                  onCancel={() => { }}
                  closeable={false} />
                <div>
                  <p />
                  <div>
                    <Table columns={this.getColumns(createTaskList)} data={createTaskList} />
                  </div>
                </div>
              </div> : null
          }
          {
            currentStep === 2 && createStatus.code === 1
              ? <div className='varInfo'>
                {createStatus.code === 1 && <Icon name='check-circle-o' className='success-icon' />}
                {createStatus.code === 1 && <p className='success'>{T('app.common.success')}</p>}
                {createStatus.code === 1 && <p ><span className='success-info'>{T('app.common.waitTaskExec')}</span></p>}
                {createStatus.code === 1 && <p />}
                {createStatus.code === 1 && <div className='table-backgrand'>
                  <Table columns={this.getColumns(createTaskList)} data={createTaskList} />
                </div>}
              </div> : null
          }
          {
            currentStep === 2 && createStatus.code !== 1
              ? <div className='varInfo'>
                <Alert content='Fail, please check form and submit again.' type='error' closeable={false} />
                <div>
                  <h3>Some errors occurred while posting the form: </h3>
                  {
                    typeof createStatus.data === 'string'
                      ? <div><Icon name='close-circle-o' className='error-icon' />{createStatus.data}</div> : null
                  }
                </div>
              </div> : null
          }
        </div>
        <div className='next-step'>
          {
            currentStep === 0
              ? <Button type='primary' appearance='line' onClick={() => {
                let createItem = JSON.parse(JSON.stringify(this.createItem))
                createTaskList.push(createItem)
                this.props.setCreateTaskListData(createTaskList)
              }
              }>+ {T('app.common.newTpl')}</Button> : null
          }
        </div>
        <div className='next-step'>
          {
            currentStep === 0
              ? <Button type='primary' onClick={() => {
                if (currentStep === 0) {
                  this.canContinue = true
                  if (!createTaskList || createTaskList.length === 0) {
                    this.canContinue = false
                    this.checkNoneData('', `Please add new template!`)
                    return
                  }
                  createTaskList.map(item => {
                    for (let v in item) {
                      // TODO move validator to form element filed
                      if (!item[v] && item[v] !== 0) {
                        this.checkNoneData(item[v], `${v} must not be empty!`)
                        return
                      }
                    }
                  })
                }
                if (!this.canContinue) {
                  return
                }
                this.props.setCurrentStepData(+currentStep + 1)
              }
              }>{T('app.common.next')}</Button> : null
          }
          {
            currentStep === 1
              ? <Button style={{marginRight: 10}} type='primary' appearance='line' onClick={() => {
                this.props.setCurrentStepData(+currentStep - 1)
              }
              }>{T('app.common.previous')}</Button> : null
          }
          {
            currentStep === 1
              ? <Button type='primary' disabled = { this.state.isSubmitLoading } onClick={() => {
                let varMaps = []
                createTaskList.map((item) => {
                  delete item.createList
                  item = JSON.stringify(item)
                  varMaps.push(item)
                })

                this.setState({
                  isSubmitLoading : true
                })
               
                let dataOptions = {
                  configVal: varMaps.join("|"),
                  command: Task.command.APPLY,
                  tplId: this.submitParam.tmplID,
                  namespace: this.state.namespace,
                  //TODO
                  clusterId: this.state.clusterId
                }
                this.props.submitCreateTempAjax(dataOptions, (res) => {
                  this.props.setCreateStatusData(res)
                  this.props.setCurrentStepData(currentStep + 1)
                  this.setState({
                    isSubmitLoading : false
                  })
                })
              }
              }>{T('app.common.submit')}</Button> : null
          }
          {
            currentStep === 2
              ? <Button style={{marginRight: 10}} type='primary' appearance='line' onClick={() => {
                this.props.history.replace('/iam/istio-setting/template')
              }
              }>{T('app.common.return')}</Button> : null
          }
          {
            // currentStep === 2
            //   ? <Button
            //     style={{marginRight: 10}}
            //     type='danger'
            //     // TODO change SUCCESS comment when socketData.status is not equal Task.status.SUCCESS.
            //     disabled = { false }
            //     onClick={() => {
            //       let varMaps = []
            //       createTaskList.map((item) => {
            //         delete item.createList
            //         item = JSON.stringify(item)
            //         varMaps.push(item)
            //       })
            //       let dataOptions = {
            //         //content: socketData.prevState,
            //         command: Task.command.ROLLBACK,
            //         namespace: this.state.namespace
            //       }
            //       this.props.submitCreateTempAjax(dataOptions)
            //     }
            //     }>{T('app.common.rollback')}</Button> : null
          }
          {
            currentStep === 2
              ? <Button type='primary' onClick={() => {
                this.props.history.replace('/iam/istio-setting')
              }
              }>{T('app.common.continue')}</Button> : null
          }
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='create-task'>
        { this.renderCenter() }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentStep: state.createTask.currentStep,
  createTaskList: state.createTask.createTaskList,
  createStatus: state.createTask.createStatus,
  kubeinfo: state.taskTemplate.kubeinfo,
  clusterItems: state.taskTemplate.clusterItems
})

// export default connect(mapStateToProps, {...Actions, ...TaskTemplateActions})(CreateTask)
export default connectWithStore(store, CreateTask, mapStateToProps, {...Actions, ...TaskTemplateActions})
