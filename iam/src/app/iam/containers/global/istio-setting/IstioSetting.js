import React, { Component } from 'react';
import { inject, observer, trace } from 'mobx-react';
import { runInAction } from 'mobx';
import { withRouter } from 'react-router-dom';
import { Button, Form, Icon, Input, Select, Spin, Upload, Popover, Modal, Table, Tooltip } from 'choerodon-ui';
import { axios, Content, Header, Page, Permission } from 'choerodon-front-boot';
import { FormattedMessage, injectIntl } from 'react-intl';
import classnames from 'classnames';
import MouseOverWrapper from '../../../components/mouseOverWrapper';
import './IstioSetting.scss';
import '../../../common/ConfirmModal.scss';
import _ from 'lodash';
import StatusIcon from '../../../components/StatusIcon';
import TcpIngressSettingStore from '../../../stores/global/ingress-setting';
import {JSONViewer} from 'react-json-editor-viewer';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/yaml';
import 'brace/theme/solarized_light';


const intlPrefix = 'global.istio-setting';
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
const { Sidebar } = Modal;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
// const inputWidth = 512;

@Form.create({})
@withRouter
@injectIntl
@inject('AppState', 'HeaderStore')
@observer
export default class IstioSetting extends Component {
  
  state = { visible: false, yml: "" }

  componentWillMount() {
    this.init();
  }



  init = () => {
    //init and refresh all
    const { IstioSettingStore } = this.props;
    IstioSettingStore.loadCluster();
    if(IstioSettingStore.getClusterId){
      IstioSettingStore.loadData();
    }
  };

  renderStatus(record) {
    const { servicePath, status, expectStatus, resMsg } = record;
    console.log("ServicePath" + servicePath);
    console.log("Status" + status)
    const statusStr = status == expectStatus ? '1' : status == "failed" ? '-1' : '0'


    return (<StatusIcon
      name=""
      status={statusStr || ''}
      error={resMsg || ''}
    />);
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { form, intl, HeaderStore, AppState } = this.props;
  //   if (TcpIngressSettingStore.show !== 'detail') {
  //     form.validateFields((err, values, modify) => {
  //       Object.keys(values).forEach((key) => {
  //         // 去除form提交的数据中的全部前后空格
  //         if (typeof values[key] === 'string') values[key] = values[key].trim();
  //         console.log("Item:" + values[key]);
  //       });
  //       if (!err) {
  //         TcpIngressSettingStore.createRequest(values, HeaderStore)
  //           .then((message) => {
  //             TcpIngressSettingStore.hideSideBar();
  //             Choerodon.prompt(intl.formatMessage({ id: message }));
  //           });
  //       }
  //     });
  //   } else {
  //     TcpIngressSettingStore.hideSideBar();
  //   }
  // };


  handleDisable = (data) => {
    const { form, IstioSettingStore } = this.props;

    IstioSettingStore.removeConfig(data.id)
    .then((message) => {
      IstioSettingStore.refresh();
      Choerodon.prompt(intl.formatMessage({ id: message }));
    });;

  };

  handleDelete = (data) => {
    const { form, IstioSettingStore } = this.props;

    IstioSettingStore.removeConfig(data.id)
    .then((message) => {
      IstioSettingStore.refresh();
      Choerodon.prompt(intl.formatMessage({ id: message }));
    });;

  };

  showEditor = (data) => {
    this.setState({
      visible: true,
      yml: data.resBody
    });
  }


  handleClusterSelect = (value) => {
    const { IstioSettingStore } = this.props;
    IstioSettingStore.setTpClusterId(value);
    IstioSettingStore.loadData()
  };

  getTableColumns(){
    const { IstioSettingStore } = this.props;
    const { sort: { columnKey, order }, filters } = IstioSettingStore
    const { intl } = this.props;
    return [{
        title: <FormattedMessage id="tplId" />,
        dataIndex: 'tplId',
        key: 'tplId',
        filters: [],
        width: '150',
        render: text => (
          <MouseOverWrapper text={text} width={0.3}>
            {text}
          </MouseOverWrapper>
        ),
        sortOrder: columnKey === 'tplId' && order,
        filteredValue: filters.port || []
      },{
        title: <FormattedMessage id="kind" />,
        dataIndex: 'kind',
        key: 'kind',
        filters: [],
        sortOrder: columnKey === 'kind' && order,
        filteredValue: filters.servicePath || [],
        width: '150',
        render: text => (
          <MouseOverWrapper text={text} width={0.3}>
            {text}
          </MouseOverWrapper>
        ),
      },{
          title: <FormattedMessage id="namespace" />,
          dataIndex: 'namespace',
          key: 'namespace',
          filters: [],
          width: '150',
          render: text => (
            <MouseOverWrapper text={text} width={0.3}>
              {text}
            </MouseOverWrapper>
          ),
          sortOrder: columnKey === 'namespace' && order,
          filteredValue: filters.port || []
        },
        {
          title: <FormattedMessage id="configVal" />,
          dataIndex: 'configVal',
          key: 'configVal',
          filters: [],
          width: '35%',
          render: text => (
           
              <JSONViewer data={JSON.parse(text)} collapsible/>
           
          ),
          sortOrder: columnKey === 'configVal' && order,
          filteredValue: filters.port || []
        },
        {
          title: <FormattedMessage id="createTime" />,
          dataIndex: 'createTime',
          key: 'creteTime',
          filters: [],
          width: '150',
          render: text => (
           
              <div>{text}</div>
           
          ),
          sortOrder: columnKey === 'createTime' && order,
          filteredValue: filters.port || []
        },
        {
          title: <FormattedMessage id="modifyTime" />,
          dataIndex: 'modifyTime',
          key: 'modifyTime',
          filters: [],
          width: '150',
          render: text => (
           
              <div>{text}</div>
           
          ),
          sortOrder: columnKey === 'modifyTime' && order,
          filteredValue: filters.port || []
        }
        ,{
          title: '',
          width: 50,
          key: 'show',
          align: 'right',
          render: (text, record) => {
              
              return (
                <div className="operation">
                  <Button
                        size="small"
                        // icon="remove_circle_outline"
                        // shape="circle"
                        type="primary"
                        onClick={this.showEditor.bind(this, record)}
                      >显示资源文件</Button>
                </div>
              )
          },
        }
        ,{
        title: '',
        width: 50,
        key: 'action',
        align: 'right',
        render: (text, record) => {
          if(record.status == record.expectStatus){
          return (
            <div className="operation">
              <Button
                size="small"
                icon="check_circle"
                shape="circle"
              />
            </div>
        )
        }else{
          return (this.renderStatus(record));
        }
      },
      }, {
        title: '',
        width: 50,
        key: 'remove',
        align: 'right',
        render: (text, record) => {
         if(record.status != record.expectStatus){
          return (<Button
            size="small"
            icon="remove_circle_outline"
            shape="circle"
            onClick={this.handleDelete.bind(this, record)}
          />)
        }
      },
      }
    ];
  }

  checkPort = (rule, value, callback, type) => {
    const { intl, form } = this.props;
    const { getFieldValue } = form;
    const p = /^[1-9]\d*$/;
    if (value) {
      if (p.test(value) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 65535) {
        callback();
      } else {
        callback(intl.formatMessage({ id: 'global.ingress-setting.port.check.failed' }));
      }
    } else {
      callback();
    }
  };

  loadData(pagination, filters, sort, params) {
    const { IstioSettingStore } = this.props;
    IstioSettingStore.loadData(cpagination, filters, sort, params);
  }

  handlePageChange = (pagination, filters, sorter, params) => {
    this.loadData(pagination, filters, sorter, params);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      yml: ""
    });
  }

  render(){
    const {
      intl,
      AppState,
      IstioSettingStore: {
        params, loading, pagination, sidebarVisible, submitting, show, ingressRequestData
      }
    } = this.props;

    const { IstioSettingStore } = this.props;


    //const { TcpIngressSettingStore } =  this.props;

    const clusterId = IstioSettingStore.getClusterId;
    const clusterItem = IstioSettingStore.getClusterItem;

    _.map(clusterItem.slice(), e => console.log(e))

    return(
      <Page>
        <Header title={ <FormattedMessage id={'global.istio-setting.task'} /> }>
          <Select
            size='large'
            className='c7n-header-select cluster'
            dropdownClassName="c7n-header-env_drop"
            placeholder={intl.formatMessage({ id: 'global.ingress-setting.noCluster' })}
            value={clusterItem && clusterItem.length ? clusterId : undefined}
            disabled={clusterItem && clusterItem.length === 0}
            onChange={this.handleClusterSelect}
          >
            {_.map(clusterItem.slice(),  e => (
              <Option key={e.id} value={e.id}  title={e.clsuterName}>
                <Tooltip placement="right" title={e.clsuterName}>
                    <span className="c7n-ib-width_100">
                      {e.clsuterName}
                    </span>
                </Tooltip>
              </Option>))}
          </Select>
          <Button
            onClick={this.init}
            icon="refresh"
          >
            <FormattedMessage id="refresh" />
          </Button>
        </Header>
        <Content code={'global.istio-setting.task'}>
          <Table
            columns={this.getTableColumns()}
            dataSource= {ingressRequestData.slice()}
            pagination={pagination}
            onChange={this.handlePageChange}
            filters={params.slice()}
            loading={loading}
            rowKey="id"
            filterBarPlaceholder={intl.formatMessage({ id: 'filtertable' })}
          />

        </Content>
        <Modal
          title="查看资源内容"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
            <AceEditor
                mode='yaml'
                theme='solarized_light'
                name='UNIQUE_ID_OF_DIV'
                editorProps={{ $blockScrolling: true }}
                value={this.state.yml}
                width='100%'
                height='330px'
                readOnly={ true }
              />
        </Modal>
      </Page>
    );
  }


}
