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
import connectWithStore from '../../../utils/connect.js'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import 'brace/mode/yaml'
import 'brace/theme/monokai'
import { Table, Modal, handleNotificate, Icon } from '@hi-ui/hiui/es'
import { Button, Form,  Input, Select, Spin, Upload, Popover, Tooltip } from 'choerodon-ui';
import '@hi-ui/hiui/es/table/style/index.css'
import { Task } from '../../../commons/consts'
// import { setBreadCrumbs } from '../../../redux/actions/global'
import * as Actions from '../../../redux/actions/service/taskTemplate'
import './index.scss'
import custom from '../../../public/tpl/custom.png';
import { Header, Page } from 'choerodon-front-boot';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';
import { getLangFromCookie, setDefaultLanguageCookie } from '../../../commons/languages'
import { store } from '../../index'


const intlPrefix = 'global.istio-setting';

const FormItem = Form.Item

@injectIntl
class Istio extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      currentType: 'ADD',
      clusterItems: [],
      clusterId: undefined
    }

    const { intl } = this.props
    getLangFromCookie("abc")

    this.canContinue = true
    this.formTypeList = []
    for (let name in Task.varFormType) {
      this.formTypeList.push({
        name: name,
        id: Task.varFormType[name]
      })
    }

    this.addTempColumns = [
      {
        title: T('app.common.task.tb.name'),
        dataIndex: 'name',
        key: 'name',
        width: 160,
        render: (text, item, index) => {
          return this.initItem(item, item.name, 'tempName', item.tempName, index)
        }
      },
      {
        title: T('app.common.task.tb.title'),
        dataIndex: 'title',
        key: 'title',
        width: 160,
        render: (text, item, index) => {
          return this.initItem(item, item.title, 'tempTitle', item.tempTitle, index)
        }
      },
      {
        title: T('app.common.task.tb.comment'),
        dataIndex: 'comment',
        key: 'comment',
        width: 160,
        render: (text, item, index) => {
          return this.initItem(item, item.comment, 'tempComment', item.tempComment, index)
        }
      },
      {
        title: T('app.common.task.tb.formType'),
        dataIndex: 'formType',
        key: 'formType',
        width: 160,
        render: (text, item, index) => {
          return this.initItem(item, item.formType, 'tempFormType', item.tempFormType, index)
        }
      },
      {
        title: T('app.common.task.tb.dataSource'),
        dataIndex: 'datasource',
        key: 'datasource',
        width: 160,
        render: (text, item, index) => {
          return this.initItem(item, item.datasource, 'tempDataSource', item.tempDataSource, index)
        }
      },
      {
        title: T('app.common.task.tb.op'),
        dataIndex: 'opetation',
        key: 'opetation',
        width: 160,
        render: (text, item, index) => {
          if (this.state.currentType === 'WATCH') {
            return
          }
          if (item.type === 'label') {
            return (
              <div>
                <Button type='primary' appearance='line' onClick={() => {
                  let moduleList = [...this.props.moduleList]
                  moduleList[index].type = 'input'
                  this.props.setModuleListData(moduleList)
                }}>Edit</Button>&nbsp;&nbsp;
              </div>
            )
          }
          return (
            <div>
              <Button type='primary' appearance='line' onClick={() => {
                let moduleList = [...this.props.moduleList]
                const muduleItem = moduleList[index]
                this.canContinue = true
                // validate form data
                this.checkNoneData(muduleItem.tempName, 'Name is required!')
                this.checkNoneData(muduleItem.tempTitle, 'Title is required!')
                if (!this.canContinue) {
                  return
                }
                moduleList[index].type = 'label'
                moduleList[index] = this.setValueForModule(moduleList[index], true)
                this.props.setModuleListData(moduleList)
              }}>Save</Button>&nbsp;&nbsp;
              <Button type='warning' appearance='line' onClick={() => {
                let moduleList = [...this.props.moduleList]
                moduleList[index].type = 'label'
                moduleList[index] = this.setValueForModule(moduleList[index], false)
                this.props.setModuleListData(moduleList)
              }}>Cancel</Button>
            </div>
          )
        }
      }
    ]
  }


  // componentWillMount() {
  //   this.init();
  // }

  componentDidMount () {
    this.props.getServiceTemplateDataAjax()
    this.props.getCluster()
  }

  cancelEvent = () => {
    this.setState({
      showModal: false
    })
  }

  confirmEvent = () => {
    const { submitParam, moduleList } = this.props
    if (this.state.currentType === 'WATCH') {
      this.setState({
        showModal: false
      })
      return false
    }
    for (let i = 0; i < moduleList.length; i++) {
      if (moduleList[i].type === 'input') {
        handleNotificate({
          autoClose: false,
          title: 'Notification',
          message: 'please save you edit item first!',
          type: '',
          onClose: () => { }
        })
        return false
      }
    }
    let vars = []
    moduleList.length > 0 && moduleList.map((item, index) => {
      vars.push({
        comment: item.comment,
        datasource: item.datasource,
        eleType: item.formType,
        key: index,
        name: item.name,
        title: item.title,
        default: item.default
      })
    })
    submitParam.vars = vars
    this.props.commitServiceTemplateDataAjax(submitParam, () => {
      this.props.getServiceTemplateDataAjax()
      this.setState({ showModal: false })
      handleNotificate({
        autoClose: true,
        title: 'Noticfication',
        message: 'Add task success',
        type: '',
        onClose: () => { }
      })
    })
  }

  setValueForModule = (listItem, goahead) => {
    let item = { ...listItem }
    if (goahead) {
      item.name = item.tempName
      item.title = item.tempTitle
      item.comment = item.tempComment
      item.formType = item.tempFormType
      item.formTypeDesc = item.tempFormTypeDesc
      item.datasource = item.tempDataSource
      item.default = item.tempDefault
    } else {
      item.tempName = item.name
      item.tempTitle = item.title
      item.tempComment = item.comment
      item.tempFormType = item.formType
      item.tempFormTypeDesc = item.formTypeDesc
      item.tempDataSource = item.datasource
      item.tempDefault = item.default
    }
    return item
  }

  getValueFromId = (id) => {
    let name = ''
    this.formTypeList.map(item => {
      if (item.id === id) name = item.name
    })
    return name
  }

  // render item from data
  initItem = (item, value, tempKey, tempValue, index) => {
    switch (item.type) {
      case 'input':
        if (tempKey === 'tempFormType') {
          let formTypeList = JSON.parse(JSON.stringify(this.formTypeList))
          return (<Select key={index} mode='single' list={formTypeList} searchable placeholder='' value={tempValue} style={{ width: '150px' }}
            onChange={(value) => {
              if (value[0]) {
                // if form type of item is NUMBER or PERCENTAGE, change it's default value to '0'.
                if (value[0].id === Task.varFormType.NUMBER || value[0].id === Task.varFormType.PERCENTAGE) {
                  this.changeItem('tempDefault', '0', index, value[0].name)
                }
                this.changeItem(tempKey, value[0].id, index, value[0].name)
              }
            }} />)
        } else {
          if (tempKey === 'tempName') {
            return tempKey === 'tempFormType' ? item.formTypeDesc : value
          } else {
            return (<Input value={tempValue} placeholder='' style={{ margin: '4px 4px' }}
              onChange={(event) => {
                this.changeItem(tempKey, event.target.value, index)
              }} />)
          }
        }
      case 'label':
        return tempKey === 'tempFormType' ? item.formTypeDesc : value
    }
  }

  changeItem = (tempKey, value, index, desc) => {
    let moduleList = [...this.props.moduleList]
    moduleList[index][tempKey] = value
    if (tempKey === 'tempFormType') {
      moduleList[index].tempFormTypeDesc = desc
    }

    this.props.setModuleListData(moduleList)
  }

  updateParam = (value, key) => {
    this.props.setAddParamData(key, value)
  }

  // check commit param
  checkNoneData = (value, msg, type) => {
    if (!value) {
      handleNotificate({
        autoClose: true,
        title: 'Notification',
        message: msg,
        type: type,
        onClose: () => { }
      })
      this.canContinue = false
    }
  }

  watchItem = (item) => {
    let that = this
    this.props.getTemplateDetailById(item, detailitem => {
      that.setState({ currentType: 'WATCH' })
      let moduleList = []
      let info = detailitem.info
      let vars = detailitem.variables
      that.props.setAddData({
        name: info.name,
        kind: info.kind,
        brief: info.brief,
        content: info.body,
        vars: vars
      })
      vars && vars.length && vars.map(item => {
        moduleList.push({
          type: 'label',
          name: item.name,
          tempName: item.name,
          title: item.title,
          tempTitle: item.title,
          comment: item.comment,
          tempComment: item.comment,
          formType: item.eleType,
          formTypeDesc: this.getValueFromId(item.eleType) || '',
          tempFormType: item.formType,
          tempFormTypeDesc: this.getValueFromId(item.eleType) || '',
          datasource: item.datasource,
          tempDataSource: item.datasource,
          opetation: '',
          tempOpetation: '',
          default: item.default,
          tempDefault: item.default
        })
      })
      that.props.setModuleListData(moduleList)
      that.setState({ showModal: true })
      that.resetModalStyle()
    })
    
  }

  deleteItem = (item) => {
    this.props.deleteServiceTemplateDataAjax({ tplID: item.id }, () => {
      this.props.getServiceTemplateDataAjax()
      handleNotificate({
        autoClose: true,
        title: 'Noticfication',
        message: 'Delete template success',
        type: '',
        onClose: () => { }
      })
    })
  }

  // New Template Modal
  taskModule = () => {
    const { submitParam, moduleList } = this.props
    return (
      <Modal
        width={'1100px'}
        title={(this.state.currentType === 'WATCH') ? T('app.common.viewTpl') : T('app.common.newTpl')}
        show={this.state.showModal}
        backDrop
        onConfirm={this.confirmEvent}
        onCancel={this.cancelEvent}
        footers={[
          <Button key='1' type='primary' appearance='line' onClick={this.cancelEvent}>{T('app.common.cancel')}</Button>,
          <Button key='2' type='primary' onClick={this.confirmEvent}>{T('app.common.confirm')}</Button>
        ]}
      >
        <div className='task-modal-content'>
          <Form>
            <FormItem label={T('app.common.task.modalName')}>
              <Input
                value={submitParam.name}
                placeholder=''
                style={{ margin: '4px 4px' }}
                onChange={(e) => {
                  this.updateParam(e.target.value, 'name')
                }}
                required />
            </FormItem>
            <FormItem label={T('app.common.task.modalBrief')}>
              <Input
                type='textarea'
                value={submitParam.brief}
                placeholder=''
                style={{ margin: '4px 4px' }}
                onChange={(e) => {
                  this.updateParam(e.target.value, 'brief')
                }}
                required
              />
            </FormItem>
            <FormItem label={T('app.common.task.modalContent')}>
              <AceEditor
                mode='yaml'
                theme='monokai'
                name='UNIQUE_ID_OF_DIV'
                editorProps={{ $blockScrolling: true }}
                value={submitParam.content}
                onChange={(value) => {
                  this.updateParam(value, 'content')
                }}
                width='100%'
                height='330px'
                readOnly={this.state.currentType === 'WATCH'}
              />
            </FormItem>
            <FormItem label={T('app.common.task.modalVars')}>
              <div className='add-new-button'>
                {
                  this.state.currentType !== 'WATCH'
                    ? <Button type='primary' onClick={this.generateRowsCLick}>Generate rows</Button> : null
                }
              </div>
              <div className='table-add-wrap'>
                {
                  moduleList && moduleList.length
                    ? <Table columns={this.addTempColumns} data={moduleList} />
                    : null
                }
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }

  generateRowsCLick = () => {
    let moduleList = []
    let names = new Set()
    let content = this.props.submitParam.content
    if (content) {
      let arr = content.split('{{')
      arr.forEach(item => {
        if (item.indexOf('}}') !== -1) {
          let name = item.substring(0, item.indexOf('}}'))
          names.add(name)
        }
      })
    }
    names = Array.from(names)
    this.setState({ currentType: 'ADD' })
    names.forEach(item => {
      let moduleItem = {
        type: 'label',
        name: item,
        tempName: item,
        title: item,
        tempTitle: item,
        comment: item,
        tempComment: item,
        formType: 1,
        formTypeDesc: 'STRING',
        tempFormType: 1,
        tempFormTypeDesc: 'STRING',
        datasource: '',
        tempDataSource: '',
        opetation: '',
        tempOpetation: '',
        default: '',
        tempDefault: ''
      }
      moduleList.push(moduleItem)
    })
    this.props.setModuleListData(moduleList)
  }

  renderTop = () => {
    return (
      <div className='temp-top-wrap'>
        <h2>{T('app.common.currentService')}"luye's test service"</h2>
        <p>{T('app.common.tplCmt')}</p>
      </div>
    )
  }


  init = () => {
    //init and refresh all
    this.props.getCluster()
    this.props.getServiceTemplateDataAjax()
  };


  resetModalStyle = () => {
    // to fixed Bug in HIUI - Select，if HIUI fixed the bug , we can delete the code
    let modalNode = document.getElementsByClassName('hi-modal')[0]
    let scrollTop = document.documentElement.scrollTop
    modalNode.style.cssText = 'position: absolute; top: ' + scrollTop + 'px;height: 100%'
    // fixed end
  }

  // Template List
  // you can do add, watch, view, createTask and delete on template item
  renderCenter = () => {
    const { taskTemplate } = this.props
    return (
      <div className='temp-center-wrap'>
        {
          taskTemplate && taskTemplate.length ? taskTemplate.map((item, index) => {
            item.icon = item.icon ? item.icon : 'custom'
            return (
              <div className='temp-list' key={index}>
                {item.type !== 'add'
                  ? <div className='content-wrap hover-box' >
                    <div className='col-panel-title'>
                      <div className='img-container'>
                        <img className='img' src={ custom } />
                      </div>
                      {/* delete template button */}
                      <div className='delete-container' onClick={() => { this.deleteItem(item) }}>
                        <Tooltip title={T('app.common.deleteTpl')} style={{ margin: '0 10px' }}>
                          <Icon name='delete' style={{ color: '#f5222d', fontSize: '16px', cursor: 'pointer' }} />
                        </Tooltip>
                      </div>
                      <div className='temp-right'>
                        <div className='temp-panel-title'>{item.name}</div>
                        <div className='temp-panel-content'>{item.brief}</div>
                      </div>
                    </div>
                    <div className='temp-list-footer'>
                      <div className='temp-row-line' />
                      <div className='temp-list-foot'>
                        {/* view template button */}
                        <div className='temp-watch hover-font' onClick={() => {
                          this.watchItem(item)
                        }}>
                          {T('app.common.viewTpl')}
                        </div>
                        {/* create task button */}
                        <div className='temp-line' />
                        <div className='temp-create hover-font' onClick={() => {
                          let that = this
                          this.props.getTemplateDetailById(item, detailitem => {
                            that.props.history.push({ pathname: '/iam/istio-setting/createTask', query: detailitem })
                          })
                          
                        }}>
                          {T('app.common.createTask')}
                        </div>
                      </div>
                    </div>
                  </div>
                  : <div className='add-wrap hover-box' onClick={() => {
                    this.props.setAddData({
                      name: '',
                      kind: '',
                      brief: '',
                      content: '',
                      vars: []
                    })
                    this.props.setModuleListData([])
                    this.setState({
                      showModal: true,
                      currentType: 'ADD'
                    })
                    this.resetModalStyle()
                  }}>
                    <p>+ {T('app.common.newTpl')}</p>
                  </div>
                }
              </div>
            )
          }) : null
        }
      </div>
    )
  }

  handleClusterSelect = (value) => {
    this.setState({
      clusterId : value
    })
  };

  render () {
    const { intl } = this.props
    const clusterId = this.state.clusterId

    const { clusterItems = clusterItems || [] } = this.props


    
    
    return (
      <Page>
      <Header title={ <FormattedMessage id={`${intlPrefix}.header`} /> }>
        {/* <Select
          size='large'
          className='c7n-header-select cluster'
          dropdownClassName="c7n-header-env_drop"
          placeholder= "选择集群"
          value={clusterItems && clusterItems.length ? clusterId : undefined}
          disabled={clusterItems && clusterItems.length === 0}
          onChange={this.handleClusterSelect}
        >
        
          {_.map(clusterItems.slice(),  e => (
            <Option key={e.id} value={e.id}  title={e.clsuterName}>
              <Tooltip placement="right" title={e.clsuterName}>
                  <span className="c7n-ib-width_100">
                    {e.clsuterName}
                  </span>
              </Tooltip>
            </Option>))}
        
        </Select> */}
        <Button
            onClick={this.init}
            icon="refresh"
          >
            <FormattedMessage id="refresh" />
          </Button>
      </Header>  
      <div className='task-temp'>
        {this.renderCenter()}
        {this.taskModule()}
      </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  taskTemplate: state.taskTemplate.templateList,
  moduleList: state.taskTemplate.moduleList,
  submitParam: state.taskTemplate.submitParam,
  clusterItems: state.taskTemplate.clusterItems
})


export default connectWithStore(store, Istio, mapStateToProps, Actions)