import React, { Component } from 'react';
import { inject, observer, trace } from 'mobx-react';
import { runInAction } from 'mobx';
import { withRouter } from 'react-router-dom';
import { Button, Form, Icon, Input, Select, Spin, Upload, Popover, Modal, Table, Tooltip } from 'choerodon-ui';
import { axios, Content, Header, Page, Permission } from 'choerodon-front-boot';
import { FormattedMessage, injectIntl } from 'react-intl';
import classnames from 'classnames';
import MouseOverWrapper from '../../../components/mouseOverWrapper';
import './IngressSetting.scss';
import '../../../common/ConfirmModal.scss';
import _ from 'lodash';
import StatusIcon from '../../../components/StatusIcon';
import Cascade from './cas'


const intlPrefix = 'global.ingress-setting';
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
export default class IngeressSetting extends Component {
  componentWillMount() {
    this.init();
  }



  init = () => {
    //init and refresh all
    const { TcpIngressSettingStore } = this.props;
    TcpIngressSettingStore.loadCluster();
    if(TcpIngressSettingStore.getClusterId){
      TcpIngressSettingStore.loadData();
    }
  };

  create = () => {
    const { form, TcpIngressSettingStore } = this.props;
    //open the dialog
    runInAction(() => {
      TcpIngressSettingStore.show = 'create';
      TcpIngressSettingStore.showSideBar();
    });
  }

  renderStatus(record) {
    const { servicePath, status } = record;
    console.log("ServicePath" + servicePath);
    console.log("Status" + status)
    const statusStr = status + ''
    return (<StatusIcon
      name=""
      status={statusStr || ''}
      error={statusStr || ''}
    />);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, intl, TcpIngressSettingStore, HeaderStore, AppState } = this.props;
    if (TcpIngressSettingStore.show !== 'detail') {
      form.validateFields((err, values, modify) => {
        Object.keys(values).forEach((key) => {
          // 去除form提交的数据中的全部前后空格
          if (typeof values[key] === 'string') values[key] = values[key].trim();
          console.log("Item:" + values[key]);
        });
        if (!err) {
          TcpIngressSettingStore.createRequest(values, HeaderStore)
            .then((message) => {
              TcpIngressSettingStore.hideSideBar();
              Choerodon.prompt(intl.formatMessage({ id: message }));
            });
        }
      });
    } else {
      TcpIngressSettingStore.hideSideBar();
    }
  };


  handleDisable = (data) => {
    const { form, TcpIngressSettingStore } = this.props;

    TcpIngressSettingStore.removeConfig(data.id)
    .then((message) => {
      TcpIngressSettingStore.refresh();
      Choerodon.prompt(intl.formatMessage({ id: message }));
    });;

  };


  handleClusterSelect = (value) => {
    const { TcpIngressSettingStore } = this.props;
    TcpIngressSettingStore.setTpClusterId(value);
    TcpIngressSettingStore.loadData();
  };

  getTableColumns(){
    const { intl, TcpIngressSettingStore: { sort: { columnKey, order }, filters } } = this.props;
    return [{
        title: <FormattedMessage id="port" />,
        dataIndex: 'port',
        key: 'port',
        filters: [],
        width: '35%',
        render: text => (
          <MouseOverWrapper text={text} width={0.3}>
            {text}
          </MouseOverWrapper>
        ),
        sortOrder: columnKey === 'port' && order,
        filteredValue: filters.port || []
      },{
        title: <FormattedMessage id="servicePath" />,
        dataIndex: 'servicePath',
        key: 'servicePath',
        filters: [],
        sortOrder: columnKey === 'servicePath' && order,
        filteredValue: filters.servicePath || [],
        width: '20%',
        render: text => (
          <MouseOverWrapper text={text} width={0.3}>
            {text}
          </MouseOverWrapper>
        ),
      },{
          title: <FormattedMessage id="targetPort" />,
          dataIndex: 'targetPort',
          key: 'targetPort',
          filters: [],
          width: '35%',
          render: text => (
            <MouseOverWrapper text={text} width={0.3}>
              {text}
            </MouseOverWrapper>
          ),
          sortOrder: columnKey === 'targetPort' && order,
          filteredValue: filters.port || []
        },{
        title: '',
        width: 150,
        key: 'action',
        align: 'right',
        render: (text, record) => {
          if(record.status != 0){
          return (
            <div className="operation">
                <Tooltip
                  title={<FormattedMessage id="disable"/>}
                  placement="bottom"
                >
                  <Button
                    size="small"
                    icon="remove_circle_outline"
                    shape="circle"
                    onClick={this.handleDisable.bind(this, record)}
                  />
                </Tooltip>
            </div>
        )
        }else{
          return (this.renderStatus(record));
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

  handlePageChange = (pagination, filters, sorter, params) => {
    this.loadOrganizations(pagination, filters, sorter, params);
  };

  handleCancelFun = () => {
    const { TcpIngressSettingStore } = this.props;
    TcpIngressSettingStore.hideSideBar();
  };

  handleServiceSelected = (service) => {

  }

  renderSidebarContent() {
    const { intl } = this.props;
    const { getFieldValue, validateFields, getFieldDecorator, setFieldsValue } = this.props.form;

    return (
      <Content
        className="c7n-network-create sidebar-content"
        code={'global.ingress-setting.create'}
      >
        <Form>
          <div className = "network-panel-title" >
            <Icon type="instance_outline" />
            <FormattedMessage id="global.ingress-setting.target" />
          </div>
          <div className="network-panel">
            <FormItem
              {...formItemLayout}
            >
            {getFieldDecorator(`net`, {
              rules: [{
                required: true,
                message: intl.formatMessage({ id: 'global.ingress-setting.servicePath.required' }),
              }],
            })(
              <Cascade/>)}
            </FormItem>
          </div>

          <div className = "network-panel-title" >
            <Icon type="instance_outline" />
            <FormattedMessage id="global.ingress-setting.targetPort" />
          </div>
          <div className="network-panel">
            <FormItem
              {...formItemLayout}
            >
            {getFieldDecorator(`port`, {
              rules: [{
                required: true,
                message: intl.formatMessage({ id: 'global.ingress-setting.port.required' }),
              }, {
                validator: (rule, value, callback) => this.checkPort(rule, value, callback, 'port'),
              }],
            })(
              <Input label={<FormattedMessage id="global.ingress-setting.port" />}
                autoComplete="off"
                // style={{ width: inputWidth }}
                maxLength={5}
                showLengthInfo={false}/>
            )}

            </FormItem>
            <FormItem>
              {getFieldDecorator(`type`, {
                rules: [{
                  required: true,
                  message: intl.formatMessage({ id: 'global.ingress-setting.type.required' }),
                }]
              })(
                <Select label={<FormattedMessage id="global.ingress-setting.type" />}
                  autoComplete="off"
                  // style={{ width: inputWidth }}
                  maxLength={5}
                  showLengthInfo={false}>
                   <Option value="TCP">TCP</Option>
                   <Option value="UDP">UDP</Option>
                </Select>
              )}
            </FormItem>
          </div>
        </Form>
      </Content>
    );
  }

  render(){
    const {
      intl, TcpIngressSettingStore: {
        params, loading, pagination, sidebarVisible, submitting, show, ingressRequestData
      },
      AppState,
    } = this.props;

    const { TcpIngressSettingStore } =  this.props;

    const clusterId = TcpIngressSettingStore.getClusterId;
    const clusterItem = TcpIngressSettingStore.getClusterItem;

    console.log(clusterItem);

    console.log(ingressRequestData);

    _.map(clusterItem.slice(), e => console.log(e))

    return(
      <Page>
        <Header title={ <FormattedMessage id={`${intlPrefix}.header`} /> }>
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
            onClick={this.create}
            icon="add"
          >
            <FormattedMessage id="add" />
          </Button>
          <Button
            onClick={this.init}
            icon="refresh"
          >
            <FormattedMessage id="refresh" />
          </Button>
        </Header>
        <Content code={intlPrefix}>
          <Table
            columns={this.getTableColumns()}
            dataSource={ingressRequestData.slice()}
            pagination={pagination}
            onChange={this.handlePageChange}
            filters={params.slice()}
            loading={loading}
            rowKey="id"
            filterBarPlaceholder={intl.formatMessage({ id: 'filtertable' })}
          />
          <Sidebar
            title={<FormattedMessage id={`${intlPrefix}.header`} />}
            visible={sidebarVisible}
            onOk={this.handleSubmit}
            onCancel={this.handleCancelFun}
            okCancel={show !== 'detail'}
            okText={<FormattedMessage id="create" />}
            cancelText={<FormattedMessage id="cancel" />}
            confirmLoading={submitting}
            className={classnames({ 'c7n-iam-organization-sidebar': show === 'create' })}
          >
            {this.renderSidebarContent() }
          </Sidebar>
        </Content>
      </Page>
    );
  }


}
