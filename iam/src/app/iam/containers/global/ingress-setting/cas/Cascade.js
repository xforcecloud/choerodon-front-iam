import React, { Component, Fragment } from 'react';
import { Button, Input, Form, Tooltip, Modal, Popover, Table, Tag, Icon, Radio, Pagination, Card, Select } from 'choerodon-ui';
import { inject,observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import {stores } from 'choerodon-front-boot';
import { injectIntl, FormattedMessage } from 'react-intl';
import _ from 'lodash';
import './Cascade.scss';
import AdminClusterStore from './stores/admin/adminCluster';

const HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

const { AppState } = stores;
const FormItem = Form.Item;
const Option = Select.Option;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 100 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 26 },
  },
};


@injectIntl
@inject('AppState')
@observer
class Cascade extends Component {

  constructor(props) {
    super(props);
    const value = props.value || {};
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
 }

  componentDidMount() {
    this.loadInitData();
  }

  loadInitData() {
    const {  AppState: { getUserInfo: { id } } } = this.props;
    AdminClusterStore.loadOrganizations(id);
  }

  //选择组织
  handleSelectOrg = (id,data) => {
    AdminClusterStore.setOrgId(id);
    AdminClusterStore.loadProByOrgId(id);
  }

  //选择项目
  handleSelectPro = (id,data) => {
    AdminClusterStore.setProjId(id);
    AdminClusterStore.loadEnvData(id);
  }

  //选择环境
  handleSelectEnv = (id,data) => {
    console.log(AdminClusterStore.projId);
    AdminClusterStore.setEnvId(id);
    AdminClusterStore.setEnvCode(id);
    AdminClusterStore.loadNetData(id);

  }

  handleSelectNet = (id, data) => {
     AdminClusterStore.fillPortByNetId(id);
     AdminClusterStore.setServiceName(data.props.children);
  }

  handleSelectPort = (id, data) => {
    AdminClusterStore.setPort(id);
    console.log(AdminClusterStore.getValue);
    this.props.onChange(AdminClusterStore.getValue);
  }

  render() {
    const {
      intl: { formatMessage },
      form: { getFieldDecorator },
    } = this.props;


    let formContent = null;
    const orgData = AdminClusterStore.getOrgData;
    const proDatas = AdminClusterStore.getProDatas;
    const envData = AdminClusterStore.getEnvData;
    const netData = AdminClusterStore.getNetData;
    const portData = AdminClusterStore.getPortData;
        return(<Fragment>

            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('org', {
                rules: [{
                  required: true,
                  message: formatMessage({ id: 'required' }),
                }],
              })(<Select
                className="c7n-select_512"
                optionFilterProp="children"
                label={<FormattedMessage id="owner.org" />}
                notFoundContent={<FormattedMessage id="owner.org.none" />}
                getPopupContainer={triggerNode => triggerNode.parentNode}
                filterOption={(input, option) => option.props.children
                  .toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filter
                showSearch
                onSelect={this.handleSelectOrg.bind(this)}
              >
                {_.map(orgData, item => (<Option value={item.id} key={item.id}>
                  {item.name}
                </Option>))}
              </Select>)}
            </FormItem>

            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('pro', {
                rules: [{
                  required: true,
                  message: formatMessage({ id: 'required' }),
                }],
              })(<Select
                className="c7n-select_512"
                optionFilterProp="children"
                label={<FormattedMessage id="owner.pro" />}
                notFoundContent={<FormattedMessage id="owner.pro.none" />}
                getPopupContainer={triggerNode => triggerNode.parentNode}
                filterOption={(input, option) => option.props.children
                  .toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filter
                showSearch
                onSelect={this.handleSelectPro.bind(this)}
              >
                {_.map(proDatas, item => (<Option value={item.id} key={item.id}>
                  {item.name}
                </Option>))}
              </Select>)}
            </FormItem>

            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('env', {
                rules: [{
                  required: true,
                  message: formatMessage({ id: 'required' }),
                }],
              })(<Select
                className="c7n-select_512"
                optionFilterProp="children"
                label={<FormattedMessage id="owner.env" />}
                notFoundContent={<FormattedMessage id="owner.env.none" />}
                getPopupContainer={triggerNode => triggerNode.parentNode}
                filterOption={(input, option) => option.props.children
                  .toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filter
                showSearch
                onSelect={this.handleSelectEnv.bind(this)}
              >
                {_.map(envData, item => (<Option value={item.id} key={item.id}>
                  {item.name}
                </Option>))}
              </Select>)}
            </FormItem>

            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('net', {
                rules: [{
                  required: true,
                  message: formatMessage({ id: 'required' }),
                }],
              })(<Select
                className="c7n-select_512"
                optionFilterProp="children"
                label={<FormattedMessage id="owner.net" />}
                notFoundContent={<FormattedMessage id="owner.net.none" />}
                getPopupContainer={triggerNode => triggerNode.parentNode}
                filterOption={(input, option) => option.props.children
                  .toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filter
                showSearch
                onSelect={this.handleSelectNet.bind(this)}
              >
                {_.map(netData, item => (<Option value={item.id} key={item.id}>
                  {item.name}
                </Option>))}
              </Select>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('targetPort', {
                rules: [{
                  required: true,
                  message: formatMessage({ id: 'required' }),
                }],
              })(<Select
                className="c7n-select_512"
                optionFilterProp="children"
                label={<FormattedMessage id="owner.port" />}
                notFoundContent={<FormattedMessage id="owner.port.none" />}
                getPopupContainer={triggerNode => triggerNode.parentNode}
                filterOption={(input, option) => option.props.children
                  .toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filter
                showSearch
                onSelect={this.handleSelectPort.bind(this)}
              >
                {_.map(portData, item => (<Option value={item.port} key={item.port}>
                  {item.port}/{item.protocol}
                </Option>))}
              </Select>)}
            </FormItem>
          </Fragment>
        );
  };

}

export default Form.create({})(withRouter(injectIntl(Cascade)));
