
import React, { Component } from 'react';
import { Button, Form, Input, InputNumber, Modal, Table, Tooltip, Select, Icon } from 'choerodon-ui';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Content, Header, Page, Permission, stores } from 'choerodon-front-boot';
import { injectIntl, FormattedMessage } from 'react-intl';
import './Loadblance.scss';
import { string } from 'prop-types';
import MouseOverWrapper from '../../../components/mouseOverWrapper';
import StatusTag from '../../../components/statusTag';

const { HeaderStore } = stores;
const FormItem = Form.Item;
const ORGANIZATION_TYPE = 'organization';
const PROJECT_TYPE = 'project';
const { Sidebar } = Modal;
const { Option } = Select;
const { TextArea } = Input;
const intlPrefix = 'organization.loadblance';

@Form.create({})
@withRouter
@injectIntl
@inject('AppState')
@observer
export default class Loadblance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      sidebar: false,
      submitting: false,
      loadBlances: [],
      clusters: [],
      envs: [],
      instances: [],
      suppliers: [],
      detailData: {},
      detailPorts: [],
    };
    // this.editFocusInput = React.createRef();
    // this.createFocusInput = React.createRef();
  }


  componentWillMount() {
  }

  componentDidMount() {
    this.loadClusters();
    this.loadLoadBlances();
    this.loadCloudSuppliers();
  }

  loadClusters() {
    const { AppState, LoadblanceStore } = this.props;
    const organizationId = AppState.currentMenuType.id;
    LoadblanceStore.listClusters(organizationId).then((data) => {
      this.setState({
        clusters: data.content,
      });
    }).catch(error => Choerodon.handleResponseError(error));
  }

  loadLoadBlances() {
    const { AppState, LoadblanceStore } = this.props;
    const organizationId = AppState.currentMenuType.id;

    LoadblanceStore.list(organizationId).then((data) => {
      this.setState({
        loadBlances: data,
      });
    }).catch((error) => {
      Choerodon.handleResponseError(error);
    });
  }

  loadCloudSuppliers() {
    const { AppState, LoadblanceStore } = this.props;
    LoadblanceStore.listCloudSuppliers().then((data) => {
      this.setState({
        suppliers: data,
      });
    }).catch((error) => {
      Choerodon.handleResponseError(error);
    });
  }

  handleopenTab = (record, operation) => {
    const { intl, AppState, form, LoadblanceStore } = this.props;
    const organizationId = AppState.currentMenuType.id;
    form.resetFields();
    if (operation === 'edit') {
      LoadblanceStore.queryDetail(record.id).then((data) => {
        let id = 0;
        data.ports.map((p) => {
          p.id = id;
          id += 1;
          return p;
        });

        this.setState({
          sidebar: true,
          operation,
          detailData: data,
          detailPorts: data.ports,
        });
      }).catch((error) => {
        Choerodon.handleResponseError(error);
      });
    } else {
      LoadblanceStore.canDeploy(organizationId).then((result) => {
        if (result) {
          this.setState({
            sidebar: true,
            operation,
            detailPorts: [{}],
          });
        } else {
          Choerodon.prompt(intl.formatMessage({ id: 'organization.loadblance.limit' }));
        }
      }).catch((error) => {
        Choerodon.handleResponseError(error);
      });
    }
  }

  // 关闭修改栏.
  handleTabClose = () => {
    this.setState({
      sidebar: false,
      submitting: false,
      detailData: {},
      detailPorts: [],
    });
  }

  handleDeletePort = (needDeletePort) => {
    if (this.state.detailPorts.length > 1) {
      const newPorts = this.state.detailPorts.filter((p) => {
        if (p.id === needDeletePort.id) {
          return false;
        } else {
          return true;
        }
      });

      this.setState({
        detailPorts: newPorts,
      });
    }
  }

  handleAddPort = () => {
    let newPorts = this.state.detailPorts;
    if (!newPorts) {
      newPorts = [];
    }
    newPorts.push({
      id: newPorts.length,
      name: null,
      port: null,
      protocol: null,
      targetPort: null,
      httpsCertificateId: null,
    });

    this.setState({
      detailPorts: newPorts,
    });
  }

  handleDelete = (record) => {
    const { intl, LoadblanceStore } = this.props;
    LoadblanceStore.unDeploy(record.id).then((status) => {
      Choerodon.prompt(intl.formatMessage({ id: 'delete.success' }));
      this.loadLoadBlances();
    }).catch((error) => {
      Choerodon.handleResponseError(error);
    });
  }

  // 选中某个集群.
  handleSelectCluster = (selectClusterId) => {
    const { intl, LoadblanceStore } = this.props;
    LoadblanceStore.listEnvs(selectClusterId).then((data) => {
      this.setState({
        envs: data,
      });
    }).catch((error) => {
      Choerodon.handleResponseError(error);
    });
  }

  handleSelectEnv = (selectEnvCode) => {
    if (selectEnvCode === 'kube-system') {
      this.setState({
        instances: [],
      });
    } else {
      const { intl, LoadblanceStore } = this.props;
      LoadblanceStore.listEnvAppInstance(selectEnvCode).then((data) => {
        this.setState({
          instances: data,
        });
      }).catch((error) => {
        Choerodon.handleResponseError(error);
      });
    }
  }

  handleSubmit = (e) => {
    const { validateFieldsAndScroll } = this.props.form;
    const { AppState, intl, LoadblanceStore } = this.props;
    const { operation, detailData, detailPorts } = this.state;

    const organizationId = AppState.currentMenuType.id;

    let sumbitLoadBalance;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        sumbitLoadBalance = {
          id: operation === 'create' ? null : detailData.id,
          orgId: organizationId,
          clusterId: values.clusterId,
          envCode: values.envCode,
          appId: values.appId,
          name: values.name,
          cloudSupplierName: values.cloudSupplierName,
          cloudSlbFlag: values.cloudSlbFlag,
          ports: [],
        };

        // 处理端口
        detailPorts.map((p) => {
          sumbitLoadBalance.ports.push(
            {
              name: values[`${p.id}-portName`],
              port: values[`${p.id}-port`],
              protocol: values[`${p.id}-protocol`],
              targetPort: values[`${p.id}-targetPort`],
              httpsCertificateId: values[`${p.id}-httpsCertificateId`],
            },
          );
          return p;
        });
      }
    });

    if (typeof (sumbitLoadBalance) !== 'undefined') {
      if (operation === 'create') {
        LoadblanceStore.deploy(sumbitLoadBalance).then((result) => {
          if (result) {
            Choerodon.prompt(intl.formatMessage({ id: 'create.success' }));

            this.setState({
              sidebar: false,
              submitting: false,
            });
          } else {
            Choerodon.prompt(intl.formatMessage({ id: 'save.error' }));
          }
        }).catch((error) => {
          Choerodon.handleResponseError(error);
          Choerodon.prompt(intl.formatMessage({ id: 'save.error' }));
        });
      } else {
        LoadblanceStore.reDeploy(sumbitLoadBalance.id, sumbitLoadBalance).then((result) => {
          if (result) {
            Choerodon.prompt(intl.formatMessage({ id: 'modify.success' }));

            this.setState({
              sidebar: false,
              submitting: false,
            });
          } else {
            Choerodon.prompt(this.props.intl.formatMessage({ id: 'save.error' }));
          }
        }).catch((error) => {
          Choerodon.handleResponseError(error);
          Choerodon.prompt(this.props.intl.formatMessage({ id: 'save.error' }));
        });
      }
    }
  }

  handleVerifyCanUseName = (rule, value, callback) => {
    const { intl, LoadblanceStore } = this.props;
    const { operation } = this.state;

    if (operation !== 'create') {
      callback();
    } else {
      LoadblanceStore.canUseName(value).then((result) => {
        if (result) {
          callback();
        } else {
          callback(intl.formatMessage({ id: 'organization.loadblance.name.reject' }));
        }
      }).catch((error) => {
        Choerodon.handleResponseError(error);
      });
    }
  }

  renderSideTitle() {
    if (this.state.operation === 'create') {
      return <FormattedMessage id={`${intlPrefix}.create`} />;
    } else {
      return <FormattedMessage id={`${intlPrefix}.modify`} />;
    }
  }

  renderSidebarContent() {
    const { intl, LoadblanceStore, form } = this.props;
    const { getFieldDecorator } = form;
    const { operation, clusters, envs, instances, suppliers, detailData, detailPorts } = this.state;
    const inputWidth = 512;
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

    return (
      <Content className="sidebar-content">
        <Form layout="vertical" className="rightForm">

          <FormItem {...formItemLayout}>
            {getFieldDecorator('clusterId', {
              rules: [
                {
                  required: true,
                  message: intl.formatMessage({ id: 'required' }),
                },
              ],
              initialValue: operation === 'create' ? null : detailData.clusterId,
            })(
              <Select
                style={{ width: inputWidth }}
                allowClear={false}
                onSelect={this.handleSelectCluster}
                label={<FormattedMessage id="organization.loadblance.clusterId" />}
                disabled={operation !== 'create'}
              >
                {clusters.map((c) => {
                  if (operation === 'create') {
                    return <Option key={c.id} value={c.id}>{c.name}  ({c.id})</Option>;
                  } else {
                    return c.id === detailData.clusterId ? <Option key={c.id} value={c.id}>{c.name}  ({c.id})</Option> : null;
                  }
                })}
              </Select>)}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('envCode', {
              rules: [
                {
                  required: true,
                  message: intl.formatMessage({ id: 'required' }),
                },
              ],
              initialValue: operation === 'create' ? null : detailData.envCode,
            })(
              <Select
                style={{ width: inputWidth }}
                allowClear={false}
                onSelect={this.handleSelectEnv}
                label={<FormattedMessage id="organization.loadblance.envCode" />}
                disabled={operation !== 'create'}
              >
                <Option key="kube-system" value="kube-system">kube-system</Option>
                {envs.map(e => <Option key={e.code} value={e.code}>{e.name}  ({e.code})</Option>)}
              </Select>)}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('appId', {
              rules: [
                {
                  required: true,
                  message: intl.formatMessage({ id: 'required' }),
                },
              ],
              initialValue: operation === 'create' ? null : detailData.appId,
            })(
              <Select
                style={{ width: inputWidth }}
                allowClear={false}
                label={<FormattedMessage id="organization.loadblance.appId" />}
                disabled={operation !== 'create'}
              >
                <Option key="0" value="0">忽略</Option>
                {instances.map(e => <Option key={e.id} value={e.id}>{e.code}</Option>)}
              </Select>)}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: intl.formatMessage({ id: `${intlPrefix}.name.require.msg` }),
                }, {
                  validator: this.handleVerifyCanUseName,
                  message: intl.formatMessage({ id: 'organization.loadblance.name.reject' }),

                }, {
                  max: 20,
                  message: intl.formatMessage({ id: 'organization.loadblance.name.max.size' }),
                },
              ],
              initialValue: operation === 'create' ? null : detailData.name,
            })(
              <Input
                autoComplete="off"
                label={<FormattedMessage id="organization.loadblance.name" />}
                style={{ width: inputWidth }}
                ref={(e) => { this.editFocusInput = e; }}
                maxLength={32}
                showLengthInfo={false}
                disabled={operation !== 'create'}
              />,
            )}
          </FormItem>

          <FormItem {...formItemLayout}>
            {getFieldDecorator('cloudSupplierName', {
              rules: [
                {
                  required: true,
                  message: intl.formatMessage({ id: 'required' }),
                },
              ],
              initialValue: operation === 'create' ? null : detailData.cloudSupplierName,
            })(
              <Select
                style={{ width: inputWidth }}
                allowClear={false}
                label={<FormattedMessage id="organization.loadblance.cloudSupplierName" />}
                disabled={operation !== 'create'}
              >
                {suppliers.map(e => <Option key={e} value={e}><FormattedMessage id={e} /></Option>)}
              </Select>)}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('cloudSlbFlag', {
              rules: [{
                required: true,
                whitespace: true,
                message: intl.formatMessage({ id: 'required' }),
              }],
              initialValue: operation === 'create' ? undefined : detailData.cloudSlbFlag,
            })(
              <Input
                autoComplete="off"
                label={<FormattedMessage id="organization.loadblance.cloudSlbFlag" />}
                style={{ width: inputWidth }}
                maxLength={32}
                showLengthInfo={false}
              />,
            )}
          </FormItem>
          {
            detailPorts && detailPorts.map((p, index) => {
              const divId = `${p.id}-panel`;
              return (<div id={divId} className="c7n-creation-panel">
                <p><FormattedMessage id="organization.loadblance.ports" />:</p>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator(`${p.id}-portName`, {
                    rules: [{
                    }],
                    initialValue: p.name,
                  })(
                    <Input
                      autoComplete="off"
                      label={<FormattedMessage id="organization.loadblance.port.name" />}
                      style={{ width: 300 }}
                      maxLength={32}
                      showLengthInfo={false}
                      disabled
                    />,
                  )}
                </FormItem>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator(`${p.id}-port`, {
                    rules: [{
                      required: true,
                      message: intl.formatMessage({ id: 'required' }),
                    }],
                    initialValue: p.port,
                  })(
                    <InputNumber
                      autoComplete="off"
                      label={<FormattedMessage id="organization.loadblance.port.port" />}
                      min={0}
                      max={65535}
                      style={{ width: 300 }}
                      maxLength={32}
                      showLengthInfo={false}
                    />,
                  )}
                </FormItem>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator(`${p.id}-protocol`, {
                    rules: [{
                      required: true,
                      message: intl.formatMessage({ id: 'required' }),
                    }],
                    initialValue: p.protocol,
                  })(
                    <Select
                      allowClear={false}
                      label={<FormattedMessage id="organization.loadblance.port.protocol" />}
                    >
                      <Option key="HTTP" value="HTTP">HTTP</Option>
                      <Option key="HTTPS" value="HTTPS">HTTPS</Option>
                      <Option key="TCP" value="TCP">TCP</Option>
                      <Option key="UDP" value="UDP">UDP</Option>
                    </Select>)}
                </FormItem>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator(`${p.id}-targetPort`, {
                    rules: [{
                      whitespace: true,
                      required: true,
                      message: intl.formatMessage({ id: 'required' }),
                    }],
                    initialValue: p.targetPort,
                  })(
                    <Input
                      autoComplete="off"
                      label={<FormattedMessage id="organization.loadblance.port.targetPort" />}
                      style={{ width: 300 }}
                      maxLength={32}
                      showLengthInfo={false}
                    />,
                  )}
                </FormItem>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator(`${p.id}-httpsCertificateId`, {
                    rules: [{
                      whitespace: true,
                      required: this.state.httpCretIdRequired,
                      message: intl.formatMessage({ id: 'required' }),
                    }],
                    initialValue: p.httpsCertificateId,
                  })(
                    <Input
                      autoComplete="off"
                      label={<FormattedMessage id="organization.loadblance.port.https.cert.id" />}
                      style={{ width: 300 }}
                      maxLength={32}
                      showLengthInfo={false}
                    />,
                  )}
                </FormItem>
                <Button type="dashed" size="small" onClick={this.handleDeletePort.bind(this, p)}>删除此端口</Button>
              </div>);
            })
          }
          <Button type="dashed" size="large" onClick={this.handleAddPort.bind(this)}>+</Button>

        </Form>
      </Content>
    );
  }

  render() {
    const { LoadblanceStore, AppState, intl } = this.props;
    const menuType = AppState.currentMenuType;
    const orgId = menuType.id;
    const orgname = menuType.name;
    const { filters, operation, loadBlances } = this.state;
    const type = menuType.type;

    const columns = [{
      title: <FormattedMessage id="name" />,
      dataIndex: 'name',
      key: 'name',
      filters: [],
      filteredValue: filters.name || [],
      width: '20%',
      render: text => (
        <MouseOverWrapper text={text} width={0.2}>
          {text}
        </MouseOverWrapper>
      ),
    }, {
      title: <FormattedMessage id="organization.loadblance.clusterId" />,
      dataIndex: 'clusterId',
      filters: [],
      filteredValue: filters.clusterId || [],
      key: 'clusterId',
      width: '10%',
      render: text => (
        <MouseOverWrapper text={text} width={0.2}>
          {text}
        </MouseOverWrapper>
      ),
    }, {
      title: <FormattedMessage id="organization.loadblance.envCode" />,
      dataIndex: 'envCode',
      filters: [],
      filteredValue: filters.envCode || [],
      key: 'envCode',
      width: '20%',
      render: text => (
        <MouseOverWrapper text={text} width={0.2}>
          {text}
        </MouseOverWrapper>
      ),
    }, {
      title: <FormattedMessage id="organization.loadblance.cloudSupplierName" />,
      dataIndex: 'cloudSupplierName',
      filters: [],
      filteredValue: filters.cloudSupplierName || [],
      key: 'cloudSupplierName',
      width: '10%',
      render: text => (
        <MouseOverWrapper text={text} width={0.2}>
          {intl.formatMessage({ id: `cloud.supplier.${text}` })}
        </MouseOverWrapper>
      ),
    }, {
      title: <FormattedMessage id="organization.loadblance.cloudSlbFlag" />,
      dataIndex: 'cloudSlbFlag',
      filters: [],
      filteredValue: filters.cloudSlbFlag || [],
      key: 'cloudSlbFlag',
      width: '20%',
      render: text => (
        <MouseOverWrapper text={text} width={0.2}>
          {text}
        </MouseOverWrapper>
      ),
    }, {
      title: <FormattedMessage id="organization.loadblance.deployStatus" />,
      dataIndex: 'deployStatus',
      filters: [],
      filteredValue: filters.deployStatus || [],
      key: 'deployStatus',
      width: '10%',
      render: text => (
        <StatusTag mode="icon" colorCode={text === 'WAITING' ? 'RUNNING' : (text === 'SUCCESS' ? 'FINISHED' : 'FAILED')} />
      ),
    }, {
      title: '',
      key: 'action',
      width: '100px',
      align: 'right',
      render: (text, record) => (
        <div>
          <Tooltip
            title={<FormattedMessage id="modify" />}
            placement="bottom"
          >
            <Button
              shape="circle"
              size="small"
              onClick={this.handleopenTab.bind(this, record, 'edit')}
              icon="mode_edit"
            />
          </Tooltip>
          <Tooltip
            title={<FormattedMessage id={'delete'} />}
            placement="bottom"
          >
            <Button
              shape="circle"
              size="small"
              onClick={this.handleDelete.bind(this, record)}
              icon="remove_circle_outline"
            />
          </Tooltip>
        </div>
      ),
    }];


    return (
      <Page>
        <Header title={<FormattedMessage id={`${intlPrefix}.header.title`} />}>
          <Button
            onClick={this.handleopenTab.bind(this, null, 'create')}
            icon="playlist_add"
          >
            <FormattedMessage id={`${intlPrefix}.create`} />
          </Button>
          <Button
            icon="refresh"
            onClick={() => {
              this.setState({
                filters: {},
              }, () => {
                this.loadLoadBlances();
              });
            }}
          >
            <FormattedMessage id="refresh" />
          </Button>
        </Header>
        <Content code={intlPrefix}>
          <Table
            columns={columns}
            dataSource={loadBlances}
            rowKey={record => record.id}
            filters={this.state.filters.params}
          />
          <Sidebar
            title={this.renderSideTitle()}
            visible={this.state.sidebar}
            onCancel={this.handleTabClose.bind(this)}
            onOk={this.handleSubmit.bind(this)}
            okText={<FormattedMessage id={operation === 'create' ? 'create' : 'save'} />}
            cancelText={<FormattedMessage id="cancel" />}
            confirmLoading={this.state.submitting}
            className="c7n-iam-project-sidebar"
          >
            {operation && this.renderSidebarContent()}
          </Sidebar>
        </Content>
      </Page>
    );
  }
}
