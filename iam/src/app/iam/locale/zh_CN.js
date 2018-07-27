/*eslint-disable*/
const docServer = 'http://v0-8.choerodon.io/zh/docs';
const pageDetail = {
  // menusetting
  // home
  'global.menusetting.title': '平台"{name}"的菜单配置',
  'global.menusetting.description': '菜单是左侧导航栏。菜单配置包括您对菜单名称、图标、层级关系、顺序的配置。菜单的类型分目录和菜单两种。',
  'global.menusetting.link': `${docServer}/user-guide/system-configuration/platform/menu_configuration/`,

  'global.menusetting.create.title': '在平台"{name}"中创建目录',
  'global.menusetting.create.description': '请在下面输入目录名称、编码，选择目录图标创建目录。您创建的目录为自设目录，自设目录可以修改、删除。而平台内置的目录为预置目录，您不能创建、修改、删除预置目录。',
  'global.menusetting.create.link': `${docServer}/user-guide/system-configuration/platform/menu_configuration/`,

  'global.menusetting.modify.title': '对目录"{name}"进行修改',
  'global.menusetting.modify.description': '您可以在此修改目录名称、图标。',
  'global.menusetting.modify.link': `${docServer}/user-guide/system-configuration/platform/menu_configuration/`,

  'global.menusetting.detail.title': '查看菜单"{name}"详情',
  'global.menusetting.detail.description': '您可以在此查看菜单的名称、编码、层级、所属预置目录、权限。菜单是平台内置的，您不能创建、修改、删除菜单。',
  'global.menusetting.detail.link': `${docServer}/user-guide/system-configuration/platform/menu_configuration/`,

  // 角色标签
  'global.rolelabel.title': '平台"{name}"的角色标签',
  'global.rolelabel.description': '角色标签是在角色管理中可以与角色相关联，用于定义角色的特定逻辑的功能，需与代码开发结合。',
  'global.rolelabel.link': `${docServer}/user-guide/system-configuration/platform/rootuser/`,

  // rootuser
  'global.rootuser.title': '平台"{name}"的Root用户设置',
  'global.rootuser.description': 'Root用户能管理平台以及平台中的所有组织和项目。平台中可以有一个或多个Root用户。您可以添加和移除Root用户。',
  'global.rootuser.link': `${docServer}/user-guide/system-configuration/platform/rootuser/`,

  'global.rootuser.add.title': '在平台"{name}"中添加Root用户',
  'global.rootuser.add.description': '您可以在此添加一个或多个用户，被添加的用户为Root用户。',
  'global.rootuser.add.link': `${docServer}/user-guide/system-configuration/platform/rootuser/`,

  // 角色分配
  'global.memberrole.title': '平台"{name}"的角色分配',
  'global.memberrole.description': '角色分配是给成员分配角色。您可以通过给成员添加角色，赋予成员一组权限。您也可以移除成员的角色来控制成员的访问权限。',
  'global.memberrole.link': `${docServer}/user-guide/system-configuration/platform/role-assignment/`,

  'global.memberrole.add.title': '在平台"{name}"中添加成员角色',
  'global.memberrole.add.description': '请在下面输入一个或多个成员，然后为这些成员选择角色，以便授予他们访问权限。您可以分配多个角色。',
  'global.memberrole.add.link': `${docServer}/user-guide/system-configuration/platform/role-assignment/`,

  'global.memberrole.modify.title': '对成员"{name}"的角色进行修改',
  'global.memberrole.modify.description': '您可以在此为成员删除、添加角色。',
  'global.memberrole.modify.link': `${docServer}/user-guide/system-configuration/platform/role-assignment/`,

  //角色管理
  'global.role.title': '平台"{name}"的角色管理',
  'global.role.description': '角色是您可分配给成员的一组权限。您可以创建角色并为其添加权限，也可以复制现有角色并调整其权限。',
  'global.role.link': `${docServer}/user-guide/system-configuration/platform/role/`,

  'global.role.create.title': '在平台"{name}"中创建角色',
  'global.role.create.description': '自定义角色可让您对权限进行分组，并将其分配给您平台、组织或项目的成员。您可以手动选择权限，也可以从其他角色导入权限。',
  'global.role.create.link': `${docServer}/user-guide/system-configuration/platform/role/`,
  'global.role.create.addpermission.title': '向当前创建角色添加权限',
  'global.role.create.addpermission.description': '您可以在此修改角色名称、标签、权限。',
  'global.role.create.addpermission.link': `${docServer}/user-guide/system-configuration/platform/role/`,

  'global.role.modify.title': '对角色"{name}"进行修改',
  'global.role.modify.description': '您可以在此修改角色名称、标签、权限。',
  'global.role.modify.link': `${docServer}/user-guide/system-configuration/platform/role/`,
  'global.role.modify.addpermission.title': '向角色"{name}"添加权限',
  'global.role.modify.addpermission.description': '您可以在此为角色添加一个或多个权限。',
  'global.role.modify.addpermission.link': `${docServer}/user-guide/system-configuration/platform/role/`,

  // 微服务
  'global.microservice.title': '平台"{name}"的微服务',
  'global.microservice.description': '大型应用程序由一个或多个微服务组成。微服务可被独立部署，且为松耦合。每个微服务是专注于单一责任与功能的小型功能区块。',
  'global.microservice.link': `${docServer}/user-guide/system-configuration/microservice-management/microservice/`,

  // 配置管理
  'global.configuration.title': '平台"{name}"的配置管理',
  'global.configuration.description': '配置管理用来集中管理应用的当前环境的配置，配置修改后能够实时推送到应用端。',
  'global.configuration.link': `${docServer}/user-guide/system-configuration/microservice-management/route/`,

  'global.configuration.create.title': '在平台"{name}"中创建配置',
  'global.configuration.create.description': '一个配置属于一个微服务。请先选择一个配置对应的微服务，再选择该微服务下的已有配置为配置模版。您可自定义您的配置版本。系统将自动生成您的配置ID。',
  'global.configuration.create.link': `${docServer}/user-guide/system-configuration/microservice-management/route/`,
  'global.configuration.create.base.title': '在平台"{name}"中创建配置',
  'global.configuration.create.base.description': '您可自定义您的配置版本。系统将自动生成您的配置ID。',
  'global.configuration.create.base.link': `${docServer}/user-guide/system-configuration/microservice-management/route/`,

  'global.configuration.modify.title': '对配置"{name}"进行修改',
  'global.configuration.modify.description': '配置管理用来集中管理应用的当前环境的配置，配置修改后能够实时推送到应用端。',
  'global.configuration.modify.link': `${docServer}/user-guide/system-configuration/microservice-management/route/`,

  // 实例管理
  'global.instance.title': '平台"{name}"的实例管理',
  'global.instance.description': '实例属于一个微服务。请先选择一个微服务，查看该微服务下的实例信息。',
  'global.instance.link': `${docServer}/user-guide/system-configuration/microservice-management/instance/`,

  'global.instance.detail.title': '实例"{name}"的实例详情',
  'global.instance.detail.description': '实例属于一个微服务。您可以在此查看实例的详细信息。',
  'global.instance.detail.link': `${docServer}/user-guide/system-configuration/microservice-management/instance/`,


  // 路由管理
  'global.route.title': '平台"{name}"的路由管理',
  'global.route.description': '路由发送请求到网关会访问服务。一个服务可以分配多个路径的路由，一个路由路径只指向一个服务。',
  'global.route.link': `${docServer}/user-guide/system-configuration/microservice-management/route/`,

  'global.route.create.title': '在平台"{name}"中创建路由',
  'global.route.create.description': '请在下面输入路由名称、路径、路径对应的微服务创建路由。其中，路由名称时全平台唯一的，路由创建后不能修改路由名称。',
  'global.route.create.link': `${docServer}/user-guide/system-configuration/microservice-management/route/`,

  'global.route.modify.title': '对路由"{name}"进行修改',
  'global.route.modify.description': '您可以在此修改路由的路径、路径对应的微服务以及配置路由前缀、重试、敏感头、Helper等信息。',
  'global.route.modify.link': `${docServer}/user-guide/system-configuration/microservice-management/route/`,

  'global.route.detail.title': '查看路由"{name}"的详情',
  'global.route.detail.description': '预定义路由为平台初始化设置，您不能修改预定义路由。',
  'global.route.detail.link': `${docServer}/user-guide/system-configuration/microservice-management/route/`,

  // API测试
  'global.apitest.title': '平台"{name}"的API测试',
  'global.apitest.description': 'API属于一个微服务。请先选择一个微服务，查看该微服务下的API信息。',
  'global.apitest.link': `${docServer}/user-guide/system-configuration/api-management/api-test/`,

  'global.apitest.detail.title': 'API"{name}"的测试',
  'global.apitest.detail.description': 'API测试需要与应用程序的API进行交互，测试时通过工具调用特定的API，获取输出，并记录系统的响应',
  'global.apitest.detail.link': `${docServer}/user-guide/system-configuration/api-management/api-test/`,

  // 事务定义
  'global.saga.title': '平台"{name}"的事务定义',
  'global.saga.description': '事务定义用于维护不同微服务间的数据一致性。您可以查看每个事务定义的详情。',
  'global.saga.link': `${docServer}/user-guide/system-configuration/api-management/api-test/`,
  'global.saga.detail.title': '查看事务定义"{name}"的详情',
  'global.saga.detail.description': '您可以在此查看事务定义图、事务定义Json。',
  'global.saga.detail.link': `${docServer}/user-guide/system-configuration/api-management/api-test/`,

  // 事务实例
  'global.saga-instance.title': '平台"{name}"的事务实例',
  'global.saga-instance.description': '事务实例属于事务定义，您可以查看事务实例的运行情况并查看事务实例中每个任务的运行情况。',
  'global.saga-instance.link': `${docServer}/user-guide/system-configuration/api-management/api-test/`,
  'global.saga-instance.detail.title': '查看事务实例"{name}"的详情',
  'global.saga-instance.detail.description': '您可以在此查看事务实例所包含任务的信息。',
  'global.saga-instance.detail.link': `${docServer}/user-guide/system-configuration/api-management/api-test/`,

  // 项目管理
  'organization.project.title': '组织"{name}"的项目管理',
  'organization.project.description': '项目是最小粒度的管理层次。您可以在组织下创建项目，则创建的项目属于这个组织。',
  'organization.project.link': `${docServer}/user-guide/system-configuration/tenant/project/`,

  'organization.project.create.title': '在组织"{name}"中创建项目',
  'organization.project.create.description': '请在下面输入项目编码、项目名称创建项目。项目编码在一个组织中是唯一的，项目创建后，不能修改项目编码。',
  'organization.project.create.link': `${docServer}/user-guide/system-configuration/tenant/project/`,

  'organization.project.modify.title': '对项目"{name}"进行修改',
  'organization.project.modify.description': '您可以在此修改项目名称。',
  'organization.project.modify.link': `${docServer}/user-guide/system-configuration/tenant/project/`,

  // 组织角色分配
  'organization.memberrole.title': '组织"{name}"的角色分配',
  'organization.memberrole.description': '角色分配是给成员分配角色。您可以通过给成员添加角色，赋予成员一组权限。您也可以移除成员的角色来控制成员的访问权限。',
  'organization.memberrole.link': `${docServer}/user-guide/system-configuration/tenant/role-assignment/`,

  'organization.memberrole.add.title': '在组织"{name}"中添加成员角色',
  'organization.memberrole.add.description': '请在下面输入一个或多个成员，然后为这些成员选择角色，以便授予他们访问权限。您可以分配多个角色。',
  'organization.memberrole.add.link': `${docServer}/user-guide/system-configuration/tenant/role-assignment/`,

  'organization.memberrole.modify.title': '对成员"{name}"的角色进行修改',
  'organization.memberrole.modify.description': '您可以在此为成员删除、添加角色。',
  'organization.memberrole.modify.link': `${docServer}/user-guide/system-configuration/tenant/role-assignment/`,

  // 客户端
  'organization.client.title': '组织"{name}"的客户端',
  'organization.client.description': '用户在使用oauth2.0的客户端授权模式认证时需要指定所属的客户端，根据客户端对应的密钥，作用域，认证有效时长和重定向地址等进行认证。客户端还可用于区分微服务环境下的不同模块。',
  'organization.client.link': `${docServer}/user-guide/system-configuration/tenant/client/`,

  'organization.client.create.title': '在组织"{name}"中创建客户端',
  'organization.client.create.description': '请在下面输入客户端ID、密钥，选择授权类型。您可以选择性输入访问授权超时、授权超时、重定向地址、附加信息。',
  'organization.client.create.link': `${docServer}/user-guide/system-configuration/tenant/client/`,

  'organization.client.modify.title': '对客户端"{name}"进行修改',
  'organization.client.modify.description': '您可以在此修改客户端密钥、授权类型、访问授权超时、授权超时、重定向地址、附加信息。',
  'organization.client.modify.link': `${docServer}/user-guide/system-configuration/tenant/client/`,

  // ldap
  'organization.ldap.title': '组织"{name}"的LDAP',
  'organization.ldap.description': 'LDAP管理是对组织应用的LDAP信息设置的管理。LDAP只针对LDAP用户，LDAP用户的登录名和密码取自LDAP指向的外部系统中的数据。',
  'organization.ldap.link': `${docServer}/user-guide/system-configuration/tenant/ldap/`,

  'organization.ldap.connect.title': '测试LDAP连接',
  'organization.ldap.connect.description': '登录您的LDAP服务器需要对您的身份进行验证。请在下面输入您在LDAP服务器中的登录名和密码。',
  'organization.ldap.connect.link': `${docServer}/user-guide/system-configuration/tenant/ldap/`,

  'organization.ldap.adminconnect.title': '测试LDAP连接',
  'organization.ldap.adminconnect.description': '对您输入的LDAP信息进行测试。',
  'organization.ldap.adminconnect.link': `${docServer}/user-guide/system-configuration/tenant/ldap/`,

  'organization.ldap.sync.title': '同步用户',
  'organization.ldap.sync.description': '您可以在此将LDAP服务器中的用户信息同步到平台中。',
  'organization.ldap.sync.link': `${docServer}/user-guide/system-configuration/tenant/ldap/`,

  // 用户管理
  'organization.user.title': '组织"{name}"的用户管理',
  'organization.user.description': '用户是平台的使用者。您可以在组织下创建用户，则用户属于这个组织。',
  'organization.user.link': `${docServer}/user-guide/system-configuration/tenant/user/`,

  'organization.user.create.title': '在组织"{name}"中创建用户',
  'organization.user.create.description': '用户是全平台唯一的。您创建的用户只属于这个组织，但在平台的其他组织中能被分配角色。',
  'organization.user.create.link': `${docServer}/user-guide/system-configuration/tenant/user/`,

  'organization.user.modify.title': '对用户"{name}"进行修改',
  'organization.user.modify.description': '您可以在此修改用户名、邮箱、语言、时区。',
  'organization.user.modify.link': `${docServer}/user-guide/system-configuration/tenant/user/`,

  //项目设置
  'project.info.title': '对项目"{name}"进行项目设置',
  'project.info.description': '您可以在此修改项目名称、停用项目。',
  'project.info.link': `${docServer}/user-guide/system-configuration/project/pro_info/`,
  'project.info.disabled.title': '项目"{name}"已被停用',
  'project.info.disabled.description': '您可以在此修改项目名称、停用项目。',
  'project.info.disabled.link': `${docServer}/user-guide/system-configuration/project/pro_info/`,

  // 密码策略
  'organization.pwdpolicy.title': '组织"{name}"的密码策略',
  'organization.pwdpolicy.description': '密码策略包括密码安全策略、登录安全策略。密码安全策略是设置密码时的密码规则，登录安全策略是用户登录平台时的认证策略。选择启用并保存，策略将生效。',
  'organization.pwdpolicy.link': `${docServer}/user-guide/system-configuration/tenant/secret_policy/`,

  // 项目角色分配
  'project.memberrole.title': '项目"{name}"的角色分配',
  'project.memberrole.description': '角色分配是给成员分配角色。您可以通过给成员添加角色，赋予成员一组权限。您也可以移除成员的角色来控制成员的访问权限。',
  'project.memberrole.link': `${docServer}/user-guide/system-configuration/project/role-assignment/`,

  'project.memberrole.add.title': '在项目"{name}"中添加成员角色',
  'project.memberrole.add.description': '请在下面输入一个或多个成员，然后为这些成员选择角色，以便授予他们访问权限。您可以分配多个角色。',
  'project.memberrole.add.link': `${docServer}/user-guide/system-configuration/project/role-assignment/`,

  'project.memberrole.modify.title': '对成员"{name}"的角色进行修改',
  'project.memberrole.modify.description': '您可以在此为成员删除、添加角色。',
  'project.memberrole.modify.link': `${docServer}/user-guide/system-configuration/project/role-assignment/`,


  // 个人信息
  'user.userinfo.title': '用户"{name}"的个人信息',
  'user.userinfo.description': '您可以在此修改您的头像、用户名、邮箱、语言、时区。',
  'user.userinfo.link': `${docServer}/user-guide/system-configuration/person/information/`,
  'user.userinfo.avatar.edit.dragger.text': '点击或将图片拖到此区域上传图片',
  'user.userinfo.avatar.edit.dragger.hint': '图片支持{access}格式，且不能大于{size}',
  'user.userinfo.avatar.edit.title': '对您的头像进行修改',
  'user.userinfo.avatar.edit.text': '上传头像',
  'user.userinfo.avatar.edit.hint': '您可以在此裁剪、旋转图片，然后点击"保存" 完成头像的修改',
  'user.userinfo.avatar.edit.button': '重新上传',
  'user.userinfo.avatar.edit.preview': '头像预览',

  // 修改密码
  'user.changepwd.title': '对用户"{name}"密码进行修改',
  'user.changepwd.description': '非LDAP用户可以修改自己的登录密码。',
  'user.changepwd.link': `${docServer}/user-guide/system-configuration/person/secret_change/`,

  // 组织信息
  'user.orginfo.title': '用户"{name}"的组织信息',
  'user.orginfo.description': '用户必须且只能属于一个组织，但可以在其他组织被分配角色。本页面展示您所属的组织以及您被分配的组织角色，所属组织在列表第一行。',
  'user.orginfo.link': `${docServer}/user-guide/system-configuration/person/org-info/`,

  'user.orginfo.detail.title': '查看角色"{roleName}"的权限',
  'user.orginfo.detail.description': '您可以在此查看您在组织"{orgName}"下"{roleName}"的权限。',
  'user.orginfo.detail.link': `${docServer}/user-guide/system-configuration/person/org-info/`,

  // 项目信息
  'user.proinfo.title': '用户"{name}"的项目信息',
  'user.proinfo.description': '用户可以在不同项目的被分配角色，本页面展示您所在的项目以及项目里您的角色。',
  'user.proinfo.link': `${docServer}/user-guide/system-configuration/person/pro-info/`,

  'user.proinfo.detail.title': '查看角色"{roleName}"的权限',
  'user.proinfo.detail.description': '您可以在此查看您在项目"{proName}"下"{roleName}"的权限。',
  'user.proinfo.detail.link': `${docServer}/user-guide/system-configuration/person/pro-info/`,

};
const zh_CN = {

  'yes': '是',
  'no': '否',
  'save': '保存',
  'close': '关闭',
  'type': '类型',
  'stop': '停止',
  'restart': '重启',
  'upgrade': '升级',
  'learnmore': '了解更多',
  'signout': '安全退出',
  'select': '选择',
  'return': '返回',
  'filtertable': '过滤表',
  'ok': '确定',

  'day': '天',
  'hour': '小时',
  'minute': '分钟',
  'second': '秒',

// operation
  'operation': '操作',
  'add': '添加',
  'addnew': '新增',
  'create': '创建',
  'edit': '编辑',
  'modify': '修改',
  'delete': '删除',
  'remove': '移除',
  'confirm.delete': '确认删除',
  'cancel': '取消',
  'refresh': '刷新',
  'detail': '详情',
  'enable': '启用',
  'disable': '停用',

// status
// success
  'success': '成功',
  'operation.success': '操作成功',
  'add.success': '添加成功',
  'create.success': '创建成功',
  'modify.success': '修改成功',
  'save.success': '保存成功',
  'delete.success': '删除成功',
  'remove.success': '移除成功',
  'enable.success': '启用成功',
  'disable.success': '停用成功',
// error
  'error': '失败',
  'operation.error': '操作失败',
  'add.error': '添加失败',
  'create.error': '创建失败',
  'modify.error': '修改失败',
  'save.error': '保存失败',
  'delete.error': '删除失败',
  'remove.error': '移除失败',
  'enabled.error': '启用失败',
  'disable.error': '停用失败',

  // 统一字段
  'name': '名称',
  'code': '编码',
  'status': '状态',
  'level': '层级',
  'source': '来源',
  'type': '类型',

  //type
  'global': '全局',
  'site': '平台',
  'project': '项目',
  'organization': '组织',

  //组织管理
  'global.organization.header.title': '组织管理',
  'global.organization.create': '创建组织',
  'global.organization.title': '平台"{name}"的组织管理',
  'global.organization.description': '组织是项目的上一级。通过组织您可以管理项目、用户。您可以创建组织，创建后平台默认您是这个组织的组织管理员。',
  'global.organization.name': '组织名称',
  'global.organization.code': '组织编码',
  'global.organization.status.enabled': '启用状态',
  'global.organization.modify': '修改组织',
  'global.organization.modify.title': '对组织"{name}"进行修改',
  'global.organization.modify.description': '您可以在此修改组织名称',
  'global.organization.create.title': '在平台"{name}"中创建组织',
  'global.organization.create.description': '请在下面输入组织编码、组织名称创建组织。组织编码在全平台是唯一的，组织创建后，不能修改组织编码。',
  'global.organization.onlymsg': '组织编码已存在，请输入其他组织编码',
  'global.organization.coderequiredmsg': '请输入组织编码',
  'global.organization.codemaxmsg': '组织编码不能超过15个字符',
  'global.organization.codepatternmsg': '编码只能由小写字母、数字、"-"组成，且以小写字母开头，不能以"-"结尾',
  'global.organization.namerequiredmsg': '请输入组织名称',
  "global.organization.project.count": "项目数量",

  //  菜单配置
  'global.menusetting.header.title': '菜单配置',
  'global.menusetting.create': '创建自设目录',
  'global.menusetting.global': '平台',
  'global.menusetting.org': '组织',
  'global.menusetting.pro': '项目',
  'global.menusetting.personcenter': '个人中心',
  'global.menusetting.directory': '目录/菜单',
  'global.menusetting.icon': '图标',
  'global.menusetting.code': '编码',
  'global.menusetting.belong': '所属预设目录',
  'global.menusetting.type': '类型',
  'global.menusetting.create.org': '创建目录',
  'global.menusetting.directory.name': '目录名称',
  'global.menusetting.directory.code': '目录编码',
  'global.menusetting.icon.require': '请选择一个图标',
  'global.menusetting.directory.name.require': '请输入目录名称',
  'global.menusetting.directory.code.require': '请输入目录编码',
  'global.menusetting.directory.code.pattern': '编码只能由小写字母、数字、"-"组成，且以小写字母开头，不能以"-"结尾',
  'global.menusetting.directory.code.onlymsg': '目录编码已存在，请输入其他目录编码',
  'global.menusetting.modify.org': '修改目录',
  'global.menusetting.delete.success': '删除成功，请点击保存',
  'global.menusetting.delete.owntitle': '删除自设目录',
  'global.menusetting.delete.owncontent': '确认删除自设目录"{name}"吗?',
  'global.menusetting.delete.owncontent.hassub': '确认删除自设目录"{name}"吗?删除该目录同时将删除该目录下的其他目录。',
  'global.menusetting.create.success': '创建目录成功，请点击保存',
  'global.menusetting.modify.success': '修改目录成功，请点击保存',
  'global.menusetting.detail': '查看详情',
  'global.menusetting.menu.name': '菜单名称',
  'global.menusetting.menu.code': '菜单编码',
  'global.menusetting.menu.level': '菜单层级',
  'global.menusetting.belong.root': '所属根目录',
  'global.menusetting.menu.withoutpermission': '此菜单无对应权限',
  'global.menusetting.menu.permission': '菜单所具有权限:',
  'global.menusetting.delete.disable.tooltip': '该目录下有菜单，将菜单移空后即可删除目录',

  // 角色标签
  'global.rolelabel.header.title': '角色标签',
  'global.rolelabel.name': '编码',
  'global.rolelabel.level': '层级',
  'global.rolelabel.desc': '描述',

  // Root用户管理
  'global.rootuser.header.title': 'Root用户设置',
  'global.rootuser.remove.title': '移除Root用户',
  'global.rootuser.remove.content': '确定要移除Root用户"{name}"吗？移除后此用户将不能管理平台及所有组织、项目。',
  'global.rootuser.loginname': '登录名',
  'global.rootuser.realname': '用户名',
  'global.rootuser.status.enabled': '启用状态',
  'global.rootuser.status.locked': '安全状态',
  'global.rootuser.locked': '锁定',
  'global.rootuser.normal': '正常',
  'global.rootuser.remove.disable.tooltip': '平台至少需要一个Root用户。要移除当前的Root用户，请先添加另一个Root用户',
  'global.rootuser.add': '添加Root用户',
  'global.rootuser.user': '用户',

  // 角色管理
  'global.role.create.byselect.level': '请选择相同层级的角色!',
  'global.role.builtin.predefined': '预定义',
  'global.role.builtin.custom': '自定义',
  'global.role.create': '创建角色',
  'global.role.modify': '修改角色',
  'global.role.name': '角色名称',
  'global.role.code': '角色编码',
  'global.role.level': '角色层级',
  'global.role.label': '角色标签',
  'global.role.builtin': '角色来源',
  'global.role.status.enabled': '启用状态',
  'global.role.create.byone': '基于该角色创建',
  'global.role.header.title': '角色管理',
  'global.role.create.byselect': '基于所选角色创建',
  'global.role.getinfo.error.msg': '获取角色信息失败',
  'global.role.all.service': '所有服务',
  'global.role.all.type': '所有类型',
  'global.role.name.require.msg': '请输入角色名称',
  'global.role.add.permission': '添加权限',
  'global.role.permission.count.msg': '{count}个已分配权限',
  'global.role.permission.nothing.msg': '没有已分配权限',
  'global.role.permission.require.msg': '必须至少分配一个权限',
  'global.role.permission.code': '权限',
  'global.role.permission.desc': '描述',
  'global.role.code.exist.msg': '角色编码已存在，请输入其他角色编码',
  'global.role.name.exist.msg': '该角色名已创建',
  'global.role.modify.level.title': '修改角色层级',
  'global.role.modify.level.content': '确定要修改角色的层级吗？更换角色层级将清空您的角色编码、已选权限和已选标签。',
  'global.role.level.require.msg': '请选择角色层级',
  'global.role.code.require.msg': '请输入角色编码',
  'global.role.code.pattern.msg': '编码只能由小写字母、数字、"-"组成，且以小写字母开头，不能以"-"结尾',
  'global.role.level.nothing.msg': '请先选择角色层级',

  // 微服务管理
  'global.microservice.header.title': '微服务',
  'global.microservice.name': '名称',
  'global.microservice.instancenum': '实例数',

  // 路由管理
  'global.route.delete.title': '删除路由',
  'global.route.delete.content': '确定要删除路由"{name}"吗？',
  'global.route.name.exist.msg': '路由名称已存在，请输入其他路由名称',
  'global.route.name.number.msg': '路由名称不能包含空格且不能全为数字',
  'global.route.path.exist.msg': '路由路径已存在，请输入其他路由路径',
  'global.route.builtin.predefined': '预定义',
  'global.route.builtin.custom': '自定义',
  'global.route.create': '创建路由',
  'global.route.modify': '修改路由',
  'global.route.detail': '路由详情',
  'global.route.name.require.msg': '请输入路由名称',
  'global.route.name': '路由名称',
  'global.route.name.tip': '路由表中的唯一标识',
  'global.route.path': '路径',
  'global.route.path.require.msg': '请输入路径',
  'global.route.path.tip': '路由的跳转路由规则，路由必须配置一个可以被指定为Ant风格表达式的路径',
  'global.route.service': '对应微服务',
  'global.route.service.require.msg': '必须选择一个微服务',
  'global.route.stripprefix': '是否去除前缀',
  'global.route.stripprefix.tip': '默认情况下，请求转发时会将路由规则中的前缀去除',
  'global.route.retryable': '是否重试',
  'global.route.retryable.tip': '默认为否，如果为是，请求失败时会自动重试3次',
  'global.route.customsensitiveheaders': '是否过滤敏感头信息',
  'global.route.customsensitiveheaders.tip': '请求转发时，会将Headers中的敏感信息随HTTP转发，如果想过滤一些敏感信息，请选择是',
  'global.route.sensitiveheaders.require.msg': '请输入敏感头信息',
  'global.route.sensitiveheaders': '敏感头信息',
  'global.route.helperservice.require.msg': '请输入Helper服务名',
  'global.route.helperservice': 'Helper服务名',
  'global.route.helperservice.tip': '该路由规则对应的自定义网关处理器服务，默认为gateway-helper',
  'global.route.builtin': '路由来源',
  'global.route.header.title': '路由管理',

  // 配置管理
  'global.configuration.service': '所属微服务',
  'global.configuration.delete.title': '删除配置',
  'global.configuration.delete.content': '确定要删除配置"{name}"吗？',
  'global.configuration.id': 'ID',
  'global.configuration.version': '版本',
  'global.configuration.configid': '配置ID',
  'global.configuration.configversion': '配置版本',
  'global.configuration.publictime': '创建时间',
  'global.configuration.isdefault': '是否为默认',
  'global.configuration.create.base': '基于此配置创建',
  'global.configuration.setdefault': '设为默认配置',
  'global.configuration.header.title': '配置管理',
  'global.configuration.create': '创建配置',
  'global.configuration.modify': '修改配置',
  'global.configuration.step1.title': '选择微服务及填写配置基本信息',
  'global.configuration.step1.description': '一个配置属于一个微服务。请先选择一个配置对应的微服务，再选择该微服务下的已有配置为配置模版。您可自定义您的配置版本。系统将自动生成您的配置ID。',
  'global.configuration.step2.description': ' 您可以通过yaml文件编辑配置的详细信息。',
  'global.configuration.step2.title': '修改配置信息',
  'global.configuration.step3.create.title': '确认信息并创建',
  'global.configuration.step3.modify.title': '确认信息并修改',
  'global.configuration.service.modify.title': '修改微服务',
  'global.configuration.service.modify.content': '确认修改微服务吗？更换微服务将重新生成您的配置信息。',
  'global.configuration.template': '配置模板',
  'global.configuration.template.modify.title': '修改配置模板',
  'global.configuration.template.modify.content': '确认修改配置模板吗？更换配置模板将重新生成您的配置信息。',
  'global.configuration.service.require.msg': '请选择微服务',
  'global.configuration.template.require.msg': '请选择配置模板',
  'global.configuration.version.require.msg': '请输入配置版本',
  'global.configuration.version.pattern.msg': '版本号只能包含数字，小写字母，小数点，\'-\'',
  'global.configuration.version.only.msg': '该配置版本已存在，请输入其他配置版本',
  'global.configuration.step.next': '下一步',
  'global.configuration.step.prev': '上一步',
  'global.configuration.info': '配置信息',

  // 实例管理
  'global.instance.header.title': '实例管理',
  'global.instance.service': '所属微服务',
  'global.instance.id': 'ID',
  'global.instance.version': '版本',
  'global.instance.port': '端口号',
  'global.instance.registertime': '注册时间',
  'global.instance.instanceinfo': '实例信息',
  'global.instance.configenvInfo': '配置环境信息',
  'global.instance.instanceid': '实例ID',
  'global.instance.hostname': '主机名',
  'global.instance.ip': 'IP',
  'global.instance.instance.version': '实例版本',
  'global.instance.metadata': '元数据',
  'global.instance.name': '名字',
  'global.instance.value': '值',
  'global.instance.configinfo': '配置信息',
  'global.instance.envinfo': '环境信息',
  'global.instance.detail': '实例详情',

  // API测试
  'global.apitest.header.title': 'API测试',
  'global.apitest.service': '所属微服务',
  'global.apitest.table.name': '名称/方法',
  'global.apitest.table.path': '路径',
  'global.apitest.table.description': '描述',
  'global.apitest.interface.detail': '接口详情',
  'global.apitest.interface.test': '接口测试',
  'global.apitest.interface.info': '接口信息',
  'global.apitest.request.parameter': '请求参数',
  'global.apitest.response.data': '响应数据',
  'global.apitest.response.code': '响应码',
  'global.apitest.response.body': '响应主体',
  'global.apitest.response.headers': '响应头部',
  'global.apitest.property': '属性',
  'global.apitest.value': '值',
  'global.apitest.param.name': '参数名称',
  'global.apitest.param.desc': '参数描述',
  'global.apitest.param.type': '参数类型',
  'global.apitest.request.data.type': '请求参数类型',
  'global.apitest.request.data': '请求数据',
  'global.apitest.send': '发送',

  // 事务定义
  'global.saga.header.title': '事务定义',
  'global.saga.code': '编码',
  'global.saga.service': '所属微服务',
  'global.saga.desc': '描述',
  'global.saga.detail': '事务定义详情',
  'global.saga.img': '事务定义图',
  'global.saga.json': 'Json',
  'global.saga.task.run.title': "任务运行情况",
  'global.saga.task.code': "任务编码",
  'global.saga.task.run.status': '状态',
  'global.saga.task.seq': '序列',
  'global.saga.task.run.service-instance': '运行的微服务实例',
  'global.saga.task.max-retry': '最大重试次数',
  'global.saga.task.run.retried': '已重试次数',
  'global.saga.task.run.exception.msg': '异常信息',
  'global.saga.task.run.result.msg': '运行结果',
  'global.saga.task.detail.title': '任务详情',
  'global.saga.task.desc': '任务描述',
  'global.saga.task.timeout.time': '超时时间',
  'global.saga.task.timeout.policy': '超时策略',
  'global.saga.task.service': '所属微服务',
  'global.saga.task.input.title': '输入数据',
  'global.saga.task.output.title': '输出数据',
  'global.saga.task.unlock': '解锁',
  'global.saga.task.retry': '重试',
  'global.saga.task.retry.success': '重试成功',
  'global.saga.task.unlock.success': '解锁成功',

  // 事务实例
  'global.saga-instance.header.title': '事务实例',
  'global.saga-instance.detail': '事务实例详情',
  'global.saga-instance.view': '查看实例',
  'global.saga-instance.all': '所有实例',
  'global.saga-instance.failed': '失败实例',
  'global.saga-instance.id': 'ID',
  'global.saga-instance.status': '状态',
  'global.saga-instance.start.time': '开始时间',
  'global.saga-instance.end.time': '结束时间',
  'global.saga-instance.saga': '所属事务定义',
  'global.saga-instance.reftype': '关联业务类型',
  'global.saga-instance.refid': '关联业务ID',

  // 组织层
  // 项目管理
  'organization.project.code.exist.msg': '项目编码已存在，请输入其他项目编码',
  'organization.project.code.require.msg': '请输入项目编码',
  'organization.project.code.pattern.msg': '编码只能由小写字母、数字、"-"组成，且以小写字母开头，不能以"-"结尾',
  'organization.project.code.length.msg': '项目编码不能超过14个字符',
  'organization.project.create': '创建项目',
  'organization.project.modify': '修改项目',
  'organization.project.code': '项目编码',
  'organization.project.name': '项目名称',
  'organization.project.name.require.msg': '请输入项目名称',
  'organization.project.status.enabled': '启用状态',
  'organization.project.header.title': '项目管理',

  // 客户端
  'organization.client.header.title': '客户端',
  'organization.client.create': '创建客户端',
  'organization.client.modify': '修改客户端',
  'organization.client.delete.title': '删除客户端',
  'organization.client.delete.content': '确认删除客户端"{name}"吗?',
  'organization.client.name': '客户端名称',
  'organization.client.name.exist.msg': '客户端名称已存在，请输入其他客户端名称',
  'organization.client.name.require.msg': '请输入客户端名称',
  'organization.client.secret': '密钥',
  'organization.client.secret.require.msg': '请输入密钥',
  'organization.client.granttypes': '授权类型',
  'organization.client.granttypes.require.msg': '请选择授权类型',
  'organization.client.accesstokenvalidity': '访问授权超时',
  'organization.client.tokenvalidity': '授权超时',
  'organization.client.redirect': '重定向地址',
  'organization.client.additional': '附加信息',
  'organization.client.additional.pattern.msg': '请输入正确的json字符串',
  'organization.client.scope': '作用域',
  'organization.client.scope.pattern.msg': '作用域只能包含英文字母',
  'organization.client.scope.help.msg': '作用域为申请的授权范围。您最多可输入6个域。',
  'organization.client.autoApprove': '自动授权域',
  'organization.client.autoApprove.pattern.msg': '自动授权域只能包含英文字母',
  'organization.client.autoApprove.help.msg': '自动授权域为oauth认证后，系统自动授权而非用户手动添加的作用域。您最多可输入6个域。',

  // LDAP
  'organization.ldap.notfound.msg': '暂无LDAP相关信息',
  'organization.ldap.disable.title': '停用LDAP',
  'organization.ldap.disable.content': '确定要停用LDAP吗？停用LDAP后，之前所同步的用户将无法登录平台，且无法使用测试连接和同步用户功能。',
  'organization.ldap.connect': '测试连接',
  'organization.ldap.syncuser': '同步用户',
  'organization.ldap.hostname.tip': '运行 LDAP 的服务器主机名。例如：ldap.example.com',
  'organization.ldap.ssl.tip': '是否使用SSL会对端口号有影响',
  'organization.ldap.basedn.tip': 'LDAP目录树的最顶部的根，从根节点搜索用户。例如：cn=users,dc=example,dc=com',
  'organization.ldap.loginname.tip': '用户登录到 LDAP。例如：user@domain.name 或 cn =用户, dc =域、dc =名称',
  'organization.ldap.username.tip': '为空时系统将默认获取登录名的值',
  'organization.ldap.server.setting': '服务器设置',
  'organization.ldap.directorytype': '目录类型',
  'organization.ldap.directorytype.require.msg': '请选择目录类型',
  'organization.ldap.directorytype.mad.tip': '微软Windows Server中，负责架构中大型网络环境的集中式目录管理服务',
  'organization.ldap.directorytype.openldap.tip': '由OpenLDAP项目开发的轻量级目录访问协议（LDAP）的免费开源实现',
  'organization.ldap.serveraddress': '主机名',
  'organization.ldap.serveraddress.require.msg': '请输入主机名',
  'organization.ldap.usessl.suffix': '是否使用SSL',
  'organization.ldap.port.pattern.msg': '请输入大于零的整数',
  'organization.ldap.port': '端口号',
  'organization.ldap.basedn': '基准DN',
  'organization.ldap.admin.loginname': '管理员登录名',
  'organization.ldap.admin.password': '管理员密码',
  'organization.ldap.user.setting': '用户属性设置',
  'organization.ldap.objectclass': '用户对象类',
  'organization.ldap.objectclass.require.msg': '请输入用户对象类',
  'organization.ldap.loginname': '登录名属性',
  'organization.ldap.loginname.require.msg': '请输入登录名属性',
  'organization.ldap.email': '邮箱属性',
  'organization.ldap.email.require.msg': '请输入邮箱属性',
  'organization.ldap.realname': '用户名属性',
  'organization.ldap.phone': '手机号属性',
  'organization.ldap.saveandtest': '保存并测试',
  'organization.ldap.header.title': 'LDAP',
  'organization.ldap.sync': '同步',
  'organization.ldap.test': '测试',
  'organization.ldap.sync.loading': '正在同步中',
  'organization.ldap.sync.loading.tip': '(本次同步将会耗时较长，您可以先返回页面进行其他操作)',
  'organization.ldap.test.loading': '正在测试中',
  'organization.ldap.test.result': '测试结果',
  'organization.ldap.test.login': 'LDAP登录： ',
  'organization.ldap.test.connect': '基础连接： ',
  'organization.ldap.test.user': '用户属性校验： ',
  'organization.ldap.sync.norecord': '当前没有同步用户记录。',
  'organization.ldap.sync.lasttime': '上次同步时间',
  'organization.ldap.sync.time': '（耗时{time}），同步{count}个用户',
  'organization.ldap.name': 'LDAP登录名',
  'organization.ldap.name.require.msg': '请输入LDAP登录名',
  'organization.ldap.password': 'LDAP密码',
  'organization.ldap.password.require.msg': '请输入LDAP密码',
  'organization.ldap.address.msg': 'ldap的服务地址为空',
  'organization.ldap.address.require.msg': 'LDAP的服务地址为空，请先填写LDAP信息',

  // 密码策略
  'organization.pwdpolicy.header.title': '密码策略',
  'organization.pwdpolicy.password': '密码安全策略',
  'organization.pwdpolicy.login': '登录安全策略',
  'organization.pwdpolicy.enabled.security': '是否启用',
  'organization.pwdpolicy.enabled.captcha': '是否开启验证码',
  'organization.pwdpolicy.enabled.lock': '是否开启锁定',
  'organization.pwdpolicy.maxerror.count': '输错次数',
  'organization.pwdpolicy.enabled.password': '是否启用',
  'organization.pwdpolicy.notusername': '是否允许与登录名相同',
  'organization.pwdpolicy.originalpassword': '新用户默认密码',
  'organization.pwdpolicy.number.pattern.msg': '请输入大于或等于0的整数',
  'organization.pwdpolicy.minlength': '最小密码长度',
  'organization.pwdpolicy.maxlength': '最大密码长度',
  'organization.pwdpolicy.digitscount': '最少数字数',
  'organization.pwdpolicy.lowercasecount': '最少小写字母数',
  'organization.pwdpolicy.uppercasecount': '最少大写字母数',
  'organization.pwdpolicy.specialcharcount': '最少特殊字符数',
  'organization.pwdpolicy.notrecentcount': '最大近期密码数',
  'organization.pwdpolicy.regularexpression': '密码正则',
  'organization.pwdpolicy.locktime': '锁定时长',

  // 用户管理
  'organization.user.unlock': '解锁',
  'organization.user.unlock.success': '解锁成功',
  'organization.user.language': '语言',
  'organization.user.create': '创建用户',
  'organization.user.modify': '修改用户',
  'organization.user.loginname': '登录名',
  'organization.user.realname': '用户名',
  'organization.user.source': '认证来源',
  'organization.user.ldap': 'LDAP用户',
  'organization.user.notldap': '非LDAP用户',
  'organization.user.enabled': '启用状态',
  'organization.user.locked': '安全状态',
  'organization.user.lock': '锁定',
  'organization.user.normal': '正常',
  'organization.user.header.title': '用户管理',
  'organization.user.name.space.msg': '输入存在空格，请检查',
  'organization.user.name.samepwd.msg': '登录名不能与密码相同',
  'organization.user.name.exist.msg': '已存在该登录名，请输入其他登录名',
  'organization.user.password.unrepeat.msg': '两次密码输入不一致',
  'organization.user.email.used.msg': '该邮箱已被使用，请输入其他邮箱',
  'organization.user.addinfo.pattern.msg': '请输入json格式的数据',
  'organization.user.loginname.require.msg': '请输入登录名',
  'organization.user.realname.require.msg': '请输入用户名',
  'organization.user.email.require.msg': '请输入邮箱',
  'organization.user.email.pattern.msg': '请输入正确的邮箱',
  'organization.user.email': '邮箱',
  'organization.user.password.require.msg': '请输入密码',
  'organization.user.password': '密码',
  'organization.user.repassword': '确认密码',
  'organization.user.repassword.require.msg': '请确认密码',
  'organization.user.timezone': '时区',


  // 项目层
  // 项目信息
  'project.info.disable.title': '停用项目',
  'project.info.disable.content': '确定要停用项目"{name}"吗？停用后，您和项目下其他成员将无法进入此项目。',
  'project.info.header.title': '项目信息',
  'project.info.name': '项目名称',
  'project.info.code': '项目编码',
  'project.info.namerequiredmsg': '请输入项目名称',

  // 个人中心
  // 个人信息
  'user.userinfo.header.title': '个人信息',
  'user.userinfo.avatar.edit.file.size.limit': '图标大小不能大于{size}',
  'user.userinfo.avatar.success': '头像上传成功，请点击保存。',
  'user.userinfo.loginname': '登录名',
  'user.userinfo.name.require.msg': '请输入用户名',
  'user.userinfo.name': '用户名',
  'user.userinfo.email': '邮箱',
  'user.userinfo.email.require.msg': '请输入邮箱',
  'user.userinfo.email.pattern.msg': '请输入正确的邮箱',
  'user.userinfo.email.used.msg': '该邮箱已被使用，请输入其他邮箱',
  'user.userinfo.phone': '手机',
  'user.userinfo.language': '语言',
  'user.userinfo.language.zhcn': '简体中文',
  'user.userinfo.language.enus': 'English',
  'user.userinfo.language.require.msg': '请选择语言',
  'user.userinfo.timezone': '时区',
  'user.userinfo.timezone.est': 'America',
  'user.userinfo.timezone.ctt': '中国',
  'user.userinfo.timezone.require.msg': '请选择时区',

  // 修改密码
  'user.changepwd.twopwd.pattern.msg': '两次密码输入不一致',
  'user.changepwd.header.title': '修改密码',
  'user.changepwd.oldpassword': '原密码',
  'user.changepwd.oldpassword.require.msg': '请输入原密码',
  'user.changepwd.newpassword': '新密码',
  'user.changepwd.newpassword.require.msg': '请输入新密码',
  'user.changepwd.confirmpassword.require.msg': '请确认密码',
  'user.changepwd.confirmpassword': '确认密码',

  // 组织信息
  'user.orginfo.header.title': '组织信息',
  'user.orginfo.name': '组织/角色',
  'user.orginfo.detail.header.title': '角色权限',
  'user.orginfo.detail.table.permission': '权限',
  'user.orginfo.detail.table.description': '描述',

  // 项目信息
  'user.proinfo.header.title': '项目信息',
  'user.proinfo.name': '项目/角色',
  'user.proinfo.belongorg': '所属组织',
  'user.proinfo.detail.header.title': '角色权限',
  'user.proinfo.detail.table.permission': '权限',
  'user.proinfo.detail.table.description': '描述',



  // 角色分配
  'global.memberrole.header.title': '平台角色分配',
  'organization.memberrole.header.title': '组织角色分配',
  'project.memberrole.header.title': '项目角色分配',

  'memberrole.member': '成员',
  'memberrole.role.require.msg': '必须至少选择一个角色',
  'memberrole.role.label': '请选择一个角色',
  'memberrole.remove.select.all.content': '确认移除当前选中的成员下的所有角色?',
  'memberrole.remove.select.content': '确认移除当前选中的成员的这些角色?',
  'memberrole.remove.all.content': '确认移除成员"{name}"下的所有角色?',
  'memberrole.remove.content': '确认移除成员"{member}"的角色"{role}"?',
  'memberrole.remove.title': '移除角色',
  'memberrole.add': '添加成员角色',
  'memberrole.modify': '修改成员角色',
  'memberrole.add.other': '添加其他角色',
  'memberrole.member.disabled.tip': '该成员已停用',
  'memberrole.name': '名称',
  'memberrole.member.type': '成员类型',
  'memberrole.role': '角色',
  'memberrole.role.disabled.tip': '该角色已停用',
  'memberrole.rolemember': '角色/成员',
  'memberrole.view': '查看方式',

  //MemberLabel
  'memberlabel.member.disabled.msg': '用户已被停用，无法给此用户分配角色，请先启用此用户',
  'memberlabel.member.notexist.msg': '不存在此用户，请输入正确的登录名',
  'memberlabel.member.require.msg': '必须至少输入一个成员',

  // page
  ...pageDetail,

};
export default zh_CN;
