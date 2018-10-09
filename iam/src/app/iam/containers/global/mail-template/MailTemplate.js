/**
 * Created by chenbinjie on 2018/8/6.
 */

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Button, Select, Table, Tooltip, Modal, Form, Input, Popover, Icon,
} from 'choerodon-ui';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import {
  axios, Content, Header, Page, Permission, Action,
} from 'choerodon-front-boot';
import MailTemplateStore from '../../../stores/global/mail-template';
import Editor from '../../../components/editor';
import './MailTemplate.scss';

const intlPrefix = 'global.mailtemplate';
const { Sidebar } = Modal;
const FormItem = Form.Item;
const Option = Select.Option;

// 公用方法类
class MailTemplateType {
  constructor(context) {
    this.context = context;
    const { AppState } = this.context.props;
    this.data = AppState.currentMenuType;
    const { type, id, name } = this.data;
    let codePrefix;
    switch (type) {
      case 'organization':
        codePrefix = 'organization';
        break;
      case 'project':
        codePrefix = 'project';
        break;
      default:
        codePrefix = 'global';
    }
    this.code = `${codePrefix}.mailtemplate`;
    this.values = { name: name || 'Choerodon' };
    this.type = type;
    this.orgId = id;
  }
}

@Form.create()
@withRouter
@injectIntl
@inject('AppState')
@observer
export default class MailTemplate extends Component {
  state = this.getInitState();


  componentWillMount() {
    this.initMailTemplate();
    this.loadTemplate();
  }

  componentWillUnmount() {
    MailTemplateStore.setTemplateType([]);
  }

  getInitState() {
    return {
      editorContent: '',
      initValue: '',
      isShowSidebar: false,
      selectType: 'create',
      isSubmitting: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      sort: {
        columnKey: 'id',
        order: 'descend',
      },
      filters: {},
      params: [],
    };
  }


  formatMessage = (id, values = {}) => {
    const { intl } = this.props;
    return intl.formatMessage({
      id,
    }, values);
  };

  /**
   * 开启侧边栏
   * @param selectType selectType create/modify/baseon
   * @param record 当前行记录
   */
  handleOpen = (selectType, record = {}) => {
    this.props.form.resetFields();
    if (!MailTemplateStore.getTemplateType.length) {
      this.loadTemplateType(this.mail.type, this.mail.orgId);
    }

    if (selectType === 'create') {
      this.setState({
        editorContent: null,
        isShowSidebar: true,
        selectType,
      });
      setTimeout(() => {
        this.creatTemplateFocusInput.input.focus();
      }, 10);
    } else {
      MailTemplateStore.getTemplateDetail(record.id, this.mail.type, this.mail.orgId).then((data) => {
        if (data.failed) {
          Choerodon.prompt(data.message);
        } else {
          MailTemplateStore.setCurrentDetail(data);
          this.setState({
            editorContent: data.content,
            isShowSidebar: true,
            selectType,
          });
          if (selectType === 'baseon') {
            setTimeout(() => {
              this.creatTemplateFocusInput.input.focus();
            }, 10);
          }
        }
      });
    }
  }

  loadTemplateType = (type, orgId) => {
    MailTemplateStore.loadTemplateType(type, orgId).then((data) => {
      if (data.failed) {
        Choerodon.prompt(data.message);
      } else {
        MailTemplateStore.setTemplateType(data);
      }
    });
  }

  // 关闭侧边栏
  handleCancel = () => {
    this.setState({
      isShowSidebar: false,
    });
  }

  // 删除
  handleDelete(record) {
    const { intl } = this.props;
    Modal.confirm({
      title: intl.formatMessage({ id: `${intlPrefix}.delete.owntitle` }),
      content: intl.formatMessage({
        id: record.subMenus && record.subMenus.length
          ? `${intlPrefix}.delete.owncontent.hassub`
          : `${intlPrefix}.delete.owncontent`,
        name: record.name,
      }, {
        name: record.name,
      }),
      onOk: () => {
        MailTemplateStore.deleteMailTemplate(record.id, this.mail.type, this.mail.orgId).then((data) => {
          if (data.failed) {
            Choerodon.prompt(data.message);
          } else {
            Choerodon.prompt(intl.formatMessage({ id: `${intlPrefix}.delete.success` }));
            this.reload();
          }
        }).catch((error) => {
          if (error) {
            Choerodon.prompt('接口错误');
          }
        });
      },
    });
  }

  initMailTemplate() {
    this.mail = new MailTemplateType(this);
  }

  handleRefresh = () => {
    this.loadTemplate();
  };

  loadTemplate(paginationIn, filtersIn, sortIn, paramsIn) {
    MailTemplateStore.setLoading(true);
    this.loadTemplateType(this.mail.type, this.mail.orgId);
    const {
      pagination: paginationState,
      sort: sortState,
      filters: filtersState,
      params: paramsState,
    } = this.state;
    const pagination = paginationIn || paginationState;
    const sort = sortIn || sortState;
    const filters = filtersIn || filtersState;
    const params = paramsIn || paramsState;
    // 防止标签闪烁
    this.setState({ filters });
    MailTemplateStore.loadMailTemplate(pagination, filters, sort, params,
      this.mail.type, this.mail.orgId)
      .then((data) => {
        MailTemplateStore.setLoading(false);
        MailTemplateStore.setMailTemplate(data.content);
        this.setState({
          sort,
          filters,
          params,
          pagination: {
            current: data.number + 1,
            pageSize: data.size,
            total: data.totalElements,
          },
        });
        MailTemplateStore.setLoading(false);
      })
      .catch((error) => {
        Choerodon.handleResponseError(error);
        MailTemplateStore.setLoading(false);
      });
  }

  // 侧边栏顶部标题
  getSidebarTitle() {
    const { selectType } = this.state;
    if (selectType === 'modify') {
      return <FormattedMessage id="mailtemplate.modify" />;
    } else {
      return <FormattedMessage id="mailtemplate.create" />;
    }
  }

  // 侧边栏描述
  getHeader() {
    const { selectType } = this.state;
    const { code, values } = this.mail;
    const selectCode = `${code}.${selectType}`;
    return {
      code: selectCode,
      values,
    };
  }

  /**
   * 模板编码校验
   * @param rule 表单校验规则
   * @param value 模板编码
   * @param callback 回调函数
   */
  checkCode = (rule, value, callback) => {
    const { intl } = this.props;
    const path = this.mail.type === 'site' ? '' : `/organizations/${this.mail.orgId}`;
    axios.get(`notify/v1/notices/emails/templates/check${path}?code=${value}`).then((mes) => {
      if (mes.failed) {
        callback(intl.formatMessage({ id: 'mailtemplate.code.exist' }));
      } else {
        callback();
      }
    });
  };

  handlePageChange = (pagination, filters, sort, params) => {
    this.loadTemplate(pagination, filters, sort, params);
  };

  reload = () => {
    this.setState(this.getInitState(), () => {
      this.loadTemplate();
    });
  };

  renderBuiltIn = (isPredefined) => {
    if (isPredefined) {
      return (
        <div>
          <Icon type="settings" style={{ verticalAlign: 'text-bottom' }} />
          <FormattedMessage id="mailtemplate.predefined" />
        </div>
      );
    } else {
      return (
        <div>
          <Icon type="av_timer" style={{ verticalAlign: 'text-bottom' }} />
          <FormattedMessage id="mailtemplate.selfdefined" />
        </div>
      );
    }
  }

  renderSidebarContent() {
    const { intl } = this.props;
    const { selectType } = this.state;
    const { getFieldDecorator } = this.props.form;
    const header = this.getHeader();
    const inputWidth = 512;
    let type;
    if (selectType === 'create') {
      type = MailTemplateStore.getTemplateType[0];
    } else {
      type = MailTemplateStore.getCurrentDetail.type;
    }
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
      <Content
        className="sidebar-content"
        {...header}
      >
        <Form>
          <FormItem
            {...formItemLayout}
          >
            {getFieldDecorator('code', {
              rules: [{
                required: true,
                whitespace: true,
                message: this.formatMessage('mailtemplate.code.required'),
              }, {
                validator: this.checkCode,
              }],
              validateTrigger: 'onBlur',
              validateFirst: true,
              initialValue: selectType === 'modify' ? MailTemplateStore.getCurrentDetail.code : undefined,
            })(
              <Input ref={(e) => { this.creatTemplateFocusInput = e; }} autoComplete="off" style={{ width: inputWidth }} label={<FormattedMessage id="mailtemplate.code" />} disabled={selectType === 'modify'} />,
            )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                whitespace: true,
                message: this.formatMessage('mailtemplate.name.required'),
              }],
              initialValue: selectType === 'modify' ? MailTemplateStore.getCurrentDetail.name : undefined,
            })(
              <Input autoComplete="off" style={{ width: inputWidth }} label={<FormattedMessage id="mailtemplate.name" />} disabled={selectType === 'modify'} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
          >
            {getFieldDecorator('type', {
              rules: [{
                required: true,
                message: this.formatMessage('mailtemplate.type.required'),
              }],
              initialValue: selectType !== 'create' ? MailTemplateStore.getCurrentDetail.type : undefined,
            })(
              <Select
                getPopupContainer={() => document.getElementsByClassName('page-content')[0]}
                label={<FormattedMessage id="mailtemplate.type" />}
                style={{ width: inputWidth }}
                disabled={selectType !== 'create'}
              >
                {
                  MailTemplateStore.getTemplateType && MailTemplateStore.getTemplateType.map(({ name, id, code }) => (
                    <Option key={id} value={code}>{name}</Option>
                  ))
                }
              </Select>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
          >
            {
              getFieldDecorator('title', {
                rules: [{
                  required: true,
                  whitespace: true,
                  message: this.formatMessage('mailtemplate.title.required'),
                }],
                initialValue: selectType === 'create' ? undefined : MailTemplateStore.getCurrentDetail.title,
              })(
                <Input autoComplete="off" style={{ width: inputWidth }} maxLength={241} label={<FormattedMessage id="mailtemplate.title" />} />,
              )
            }

          </FormItem>
          <div style={{ marginBottom: '8px' }}>
            <div>
              <span className="c7n-mailcontent-label">{intl.formatMessage({ id: 'mailtemplate.mail.content' })}</span>
            </div>
            <Editor
              style={{ height: 320, width: '100%' }}
              value={this.state.editorContent}
              onChange={(value) => {
                this.setState({ editorContent: value });
              }}
            />
          </div>
        </Form>
      </Content>
    );
  }

  getPermission() {
    const { AppState } = this.props;
    const { type } = AppState.currentMenuType;
    let createService = ['notify-service.email-template-site.create'];
    let modifyService = ['notify-service.email-template-site.update'];
    let deleteService = ['notify-service.email-template-site.delete'];
    if (type === 'organization') {
      createService = ['notify-service.email-template-org.create'];
      modifyService = ['notify-service.email-template-org.update'];
      deleteService = ['notify-service.email-template-org.delete'];
    }
    return {
      createService,
      modifyService,
      deleteService,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { intl } = this.props;
    const { selectType } = this.state;
    const { type, orgId } = this.mail;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          isSubmitting: true,
        });
        let body;
        if (selectType !== 'modify') {
          body = {
            ...values,
            content: this.state.editorContent,
            isPredefined: true,
          };
          MailTemplateStore.createTemplate(body, type, orgId).then((data) => {
            if (data.failed) {
              Choerodon.prompt(data.message);
            } else {
              Choerodon.prompt(intl.formatMessage({ id: 'create.success' }));
              this.setState({
                isShowSidebar: false,
              });
              this.reload();
            }
            this.setState({
              isSubmitting: false,
            });
          }).catch((error) => {
            Choerodon.handleResponseError(error);
            this.setState({
              isSubmitting: false,
            });
          });
        } else {
          body = {
            ...values,
            content: this.state.editorContent,
            id: MailTemplateStore.getCurrentDetail.id,
            isPredefined: MailTemplateStore.getCurrentDetail.isPredefined,
            objectVersionNumber: MailTemplateStore.getCurrentDetail.objectVersionNumber,
          };
          MailTemplateStore.updateTemplateDetail(MailTemplateStore.getCurrentDetail.id, body, type, orgId).then((data) => {
            if (data.failed) {
              Choerodon.prompt(data.message);
            } else {
              Choerodon.prompt(intl.formatMessage({ id: 'save.success' }));
              MailTemplateStore.setCurrentDetail(data);
              this.loadTemplate();
              this.setState({
                isShowSidebar: false,
              });
            }
            this.setState({
              isSubmitting: false,
            });
          }).catch((error) => {
            Choerodon.handleResponseError(error);
            this.setState({
              isSubmitting: false,
            });
          });
        }
      }
    });
  }

  render() {
    const { intl } = this.props;
    const { AppState } = this.props;
    const { type } = AppState.currentMenuType;
    const { createService, modifyService, deleteService } = this.getPermission();
    const {
      sort: { columnKey, order }, filters, pagination, loading,
      params, isShowSidebar, isSubmitting, selectType,
    } = this.state;
    const okText = selectType === 'modify' ? this.formatMessage('save') : this.formatMessage('create');
    const mailTemplateData = MailTemplateStore.getMailTemplate();
    const columns = [{
      dataIndex: 'id',
      key: 'id',
      hidden: true,
      sorter: true,
      sortOrder: columnKey === 'id' && order,
    }, {
      title: <FormattedMessage id={`${intlPrefix}.table.name`} />,
      dataIndex: 'name',
      key: 'name',
      width: 350,
      filters: [],
      sortOrder: columnKey === 'name' && order,
      filteredValue: filters.name || [],
    }, {
      title: <FormattedMessage id={`${intlPrefix}.table.code`} />,
      dataIndex: 'code',
      key: 'code',
      width: 438,
      filters: [],
      filteredValue: filters.code || [],
    }, {
      title: <FormattedMessage id={`${intlPrefix}.table.mailtype`} />,
      dataIndex: 'type',
      key: 'type',
      width: 475,
      /* TODO: 这里后端查询type值没返回结果 GET /v1/notices/emails/templates */
      // filters: MailTemplateStore.getTemplateType.map(({ name }) => ({ text: name, value: name })),
      // sorter: true,
      // sortOrder: columnKey === 'type' && order,
      // filteredValue: filters.type || [],
    },
    {
      title: <FormattedMessage id={`${intlPrefix}.table.fromtype`} />,
      dataIndex: 'isPredefined',
      key: 'isPredefined',
      render: isPredefined => this.renderBuiltIn(isPredefined),
      filteredValue: filters.isPredefined || [],
      filters: [{
        text: intl.formatMessage({ id: 'mailtemplate.predefined' }),
        value: true,
      }, {
        text: intl.formatMessage({ id: 'mailtemplate.selfdefined' }),
        value: false,
      }],
      width: 475,
    },
    {
      title: '',
      width: '100px',
      key: 'action',
      align: 'right',
      render: (text, record) => {
        const actionsDatas = [{
          service: createService,
          type,
          icon: '',
          text: intl.formatMessage({ id: 'baseon' }),
          action: this.handleOpen.bind(this, 'baseon', record),
        }, {
          service: modifyService,
          type,
          icon: '',
          text: intl.formatMessage({ id: 'modify' }),
          action: this.handleOpen.bind(this, 'modify', record),
        }];
          // 根据来源类型判断
        if (!record.isPredefined) {
          actionsDatas.push({
            service: deleteService,
            type,
            icon: '',
            text: intl.formatMessage({ id: 'delete' }),
            action: this.handleDelete.bind(this, record),
          });
        }
        return <Action data={actionsDatas} />;
      },
    }];

    return (
      <Page
        service={[
          'notify-service.email-template-site.pageSite',
          'notify-service.email-template-org.pageOrganization',
          'notify-service.email-template-site.create',
          'notify-service.email-template-org.create',
          'notify-service.email-template-site.update',
          'notify-service.email-template-org.update',
          'notify-service.email-template-site.delete',
          'notify-service.email-template-org.delete',
        ]}
      >
        <Header
          title={<FormattedMessage id={`${this.mail.code}.header.title`} />}
        >
          <Permission service={createService}>
            <Button
              icon="playlist_add"
              onClick={this.handleOpen.bind(this, 'create')}
            >
              <FormattedMessage id="mailtemplate.create" />
            </Button>
          </Permission>
          <Button
            onClick={this.handleRefresh}
            icon="refresh"
          >
            <FormattedMessage id="refresh" />
          </Button>
        </Header>
        <Content
          code={this.mail.code}
          values={{ name: `${this.mail.values.name || 'Choerodon'}` }}
        >

          <Table
            loading={MailTemplateStore.loading}
            columns={columns}
            dataSource={mailTemplateData}
            pagination={pagination}
            filters={params}
            onChange={this.handlePageChange}
            rowKey="id"
            filterBarPlaceholder={intl.formatMessage({ id: 'filtertable' })}
          />
          <Sidebar
            title={this.getSidebarTitle()}
            visible={isShowSidebar}
            onOk={this.handleSubmit}
            onCancel={this.handleCancel}
            okText={okText}
            cancelText={<FormattedMessage id="cancel" />}
            confirmLoading={isSubmitting}
          >
            {this.renderSidebarContent()}
          </Sidebar>

        </Content>

      </Page>
    );
  }
}