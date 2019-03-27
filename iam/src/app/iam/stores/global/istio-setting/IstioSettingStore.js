import { action, computed, observable } from 'mobx';
import { axios, store } from 'choerodon-front-boot';
import queryString from 'query-string';

const baseUrl = "http://mole.xcloud.xforceplus.com";

const clusterbaseUrl = "/collector";

@store('IstioSettingStore')
class IsitoSettingStore {

  @observable ingressRequestData = [];
  @observable loading = false;
  @observable submitting = false;
  @observable show;
  @observable sidebarVisible = false;
  @observable pagination = {
    current: 1,
    pageSize: 500,
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
    // let url = `${baseUrl}/v1/collector/task/ingress-config/${id}`;

    let url = `${baseUrl}/istio/drop/${id}`;
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
    let url= `${baseUrl}/v1/collector/task/add`;
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
          return "global.istio-setting.success";
        }
      }))
      .catch(action((error) => {
        this.submitting = false;
        Choerodon.handleResponseError(error);
      }));
  }

  @action
  loadCluster(){
    return axios.get(`${clusterbaseUrl}/v1/collector/cluster/list`)
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
    const url = `${baseUrl}/v1/collector/task/ingress-config/${this.tpClusterId}/list`
    ///{cluster_id}/task/list
    return axios.get(`${baseUrl}/istio/list?clusterId=${this.tpClusterId}`)
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


  loadUsers = (queryObj = { sort: 'id' }) => axios.get(`/iam/v1/all/users?${queryString.stringify(queryObj)}`);

}

const istioSettingStore = new IsitoSettingStore();

export default istioSettingStore;
