import { action, computed, observable } from 'mobx';
import { axios, store } from 'choerodon-front-boot';
import queryString from 'query-string';

// const baseUrl = "http://localhost:8082";

const baseUrl = "/collector";

@store('TcpIngressSettingStore')
class TcpIngressSettingStore {

  @observable ingressRequestData = [];
  @observable loading = false;
  @observable submitting = false;
  @observable show;
  @observable sidebarVisible = false;
  @observable pagination = {
    current: 1,
    pageSize: 10,
    total: 0,
  };
  @observable filters = {};
  @observable sort = {};
  @observable params = [];
  @observable clusterItem = [];
  @observable tpClusterId = null;

  @action setClusterItem(clusterItem) {
    this.clusterItem = clusterItem;
  }

  @action setTpClusterId(tpClusterId) {
    this.tpClusterId = tpClusterId;
  }

  @action
  showSideBar() {
    this.sidebarVisible = true;
  }

  @action
  hideSideBar() {
    this.sidebarVisible = false;
  }

  refresh() {
    this.loadData({ current: 1, pageSize: 10 }, {}, {}, []);
  }

  @action
  removeConfig(id){
    let url = `${baseUrl}/v1/collector/task/ingress-config/${id}`;
    return axios["delete"](url).then(action((data) => {
        this.submitting = false;
        if (data.code == -1) {
          return data.message;
        } else {
          this.sidebarVisible = false;
          this.refresh();
          return "global.ingress-setting.success";
        }
    }))
    .catch(action((error) => {
      this.submitting = false;
      Choerodon.handleResponseError(error);
    }));
  }

  @computed get getClusterItem() {
    return this.clusterItem;
  }

  @computed get getClusterId() {
    return this.tpClusterId;
  }

  @action
  createRequest(values){
    const { net: { servicePath, targetPort }, port, type} = values
    let method = "post";
    let url= "${baseUrl}/v1/collector/task/add";
    const { tpClusterId } = this;
    if(!tpClusterId){
      return Promise.reject('没有选择clusterId')
    }

    let body = {
      clusterId: tpClusterId ,
      port,
      servicePath,
      targetPort,
      type
    };
    /*
    {
  "clusterId": 0,
  "port": 0,
  "servicePath": "string",
  "targetPort": 0,
  "type": "string"
}
    */
    return axios[method](url, JSON.stringify(body))
      .then(action((data) => {
        this.submitting = false;
        if (data.code == -1) {
          return data.message;
        } else {
          this.sidebarVisible = false;
          this.refresh();
          return "global.ingress-setting.success";
        }
      }))
      .catch(action((error) => {
        this.submitting = false;
        Choerodon.handleResponseError(error);
      }));
  }

  @action
  loadCluster(){
    return axios.get(`${baseUrl}/v1/collector/cluster/list`)
      .then(action((data) => {
          console.log("Content is "  + data);
          this.clusterItem = data;
          this.loading = false;
      }))
      .catch(action((error) => {
        Choerodon.handleResponseError(error);
        this.loading = false;
      }));
  }

  @action
  loadData(pagination = this.pagination, filters = this.filters, sort = this.sort, params = this.params) {
    const { columnKey, order } = sort;
    const sorter = [];
    if (columnKey) {
      sorter.push(columnKey);
      if (order === 'descend') {
        sorter.push('desc');
      }
    }
    this.loading = true;
    this.filters = filters;
    this.sort = sort;
    this.params = params;
    ///{cluster_id}/task/list
    return axios.get(`${baseUrl}/v1/collector/task/ingress-config/${this.tpClusterId}/list` )
      .then(action((data) => {

        console.log("Content is "  + data);
        this.ingressRequestData = data;
        // this.pagination = {
        //   ...pagination,
        //   total: totalElements,
        // };

        this.loading = false;
      }))
      .catch(action((error) => {
        Choerodon.handleResponseError(error);
        this.loading = false;
      }));
  }

  toggleDisable(id, enabled) {
    return axios.put(`/iam/v1/organizations/${id}/${enabled ? 'disable' : 'enable'}`)
      .then(() => this.loadData());
  }

  checkCode = value =>
    axios.post('/iam/v1/organizations/check', JSON.stringify({ code: value }));

  // @action
  // createOrUpdateOrg({ code, name, address, userId }, modify, HeaderStore) {
  //   const { show, editData: { id, code: originCode, objectVersionNumber } } = this;
  //   const isCreate = show === 'create';
  //   if (!modify && !isCreate) {
  //     return Promise.resolve('modify.success');
  //   } else {
  //     let url;
  //     let body;
  //     let message;
  //     let method;
  //     if (isCreate) {
  //       url = '/org/v1/organizations';
  //       body = {
  //         name,
  //         code,
  //       };
  //
  //       if (address) {
  //         body.address = address;
  //       }
  //
  //       if (userId) {
  //         body.userId = userId;
  //       }
  //
  //       message = 'create.success';
  //       method = 'post';
  //     } else {
  //       url = `/iam/v1/organizations/${id}`;
  //       body = {
  //         name,
  //         objectVersionNumber,
  //         code: originCode,
  //         address: address || null,
  //       };
  //       message = 'modify.success';
  //       method = 'put';
  //     }
  //     this.submitting = true;
  //     return axios[method](url, JSON.stringify(body))
  //       .then(action((data) => {
  //         this.submitting = false;
  //         if (data.failed) {
  //           return data.message;
  //         } else {
  //           this.sidebarVisible = false;
  //           if (isCreate) {
  //             this.refresh();
  //             HeaderStore.addOrg(data);
  //           } else {
  //             this.loadData();
  //             HeaderStore.updateOrg(data);
  //           }
  //           return message;
  //         }
  //       }))
  //       .catch(action((error) => {
  //         this.submitting = false;
  //         Choerodon.handleResponseError(error);
  //       }));
  //   }
  // }

  getOrgById = organizationId =>
    axios.get(`/iam/v1/organizations/${organizationId}`);

  getOrgByIdOrgLevel = organizationId =>
    axios.get(`/iam/v1/organizations/${organizationId}/org_level`);

  getRolesById = (organizationId, userId) =>
    axios.get(`/iam/v1/organizations/${organizationId}/role_members/users/${userId}`);

  // loadMyData(organizationId, userId) {
  //   axios.all([
  //     this.getOrgByIdOrgLevel(organizationId),
  //     this.getRolesById(organizationId, userId),
  //   ])
  //     .then(action(([org, roles]) => {
  //       this.myOrg = org;
  //       this.myRoles = roles;
  //     }))
  //     .catch(Choerodon.handleResponseError);
  // }

  loadOrgDetail = id => axios.get(`/iam/v1/organizations/${id}`).then((data) => {
    if (data.failed) {
      return data.message;
    } else {
      // this.setPartDetail(data);
      this.showSideBar();
    }
  }).catch(Choerodon.handleResponseError);

  loadUsers = (queryObj = { sort: 'id' }) => axios.get(`/iam/v1/all/users?${queryString.stringify(queryObj)}`);

}

const tcpIngressSettingStore = new TcpIngressSettingStore();

export default tcpIngressSettingStore;
