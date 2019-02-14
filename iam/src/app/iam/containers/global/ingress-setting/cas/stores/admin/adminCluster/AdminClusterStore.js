import { observable, action, computed } from 'mobx';
import { axios, store } from 'choerodon-front-boot';
import _ from 'lodash';

const HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
@store('AdminClusterStore')
class AdminClusterStore {

  @observable proDatas = [];

  @observable envData = [];

  @observable netData = [];

  @observable orgData = [];

  @observable portData = [];

  @observable envCode;

  @observable orgId;

  @observable envId;

  @observable projId;

  @observable port;

  @observable serviceName;

  @action setOrgId(orgId) {
    this.orgId = orgId;
  }

  @action setServiceName(serviceName) {
    this.serviceName = serviceName;
  }

  @action setEnvCode(envId) {
    let filteredArray = _.filter(this.envData, {id: envId});
    let env;
    if(filteredArray.length){
      env = filteredArray[0];
      this.envCode = env.code;
    }
  }

  @action setPortData(portData) {
    this.portData = portData;
  }

  @action setPort(port) {
    this.port = port;
  }

  @action setEnvId(envId) {
    this.envId = envId;
  }

  @action setProjId(projId) {
    this.projId = projId;
  }

  @action setOrgData(data) {
    this.orgData = data;
  }

  @computed get getOrgData() {
    return this.orgData.slice();
  }

  @action setProDatas(data) {
    this.proDatas = data;
  }

  @computed get getProDatas() {
    return this.proDatas.slice();
  }

  @computed get getPortData() {
    return this.portData.slice();
  }


  @action setEnvData(data) {
    this.envData = data;
  }

  @computed get getEnvData() {
    return this.envData.slice();
  }

  @action setNetData(data) {
    this.netData = data;
  }

  @computed get getNetData() {
    return this.netData.slice();
  }

  @computed get getValue() {
    return { "servicePath":`${this.envCode}/${this.serviceName}`, "targetPort": this.port }
  }

  fillPortByNetId(id) {
     let filteredArray = _.filter(this.netData, {id: id});
     let net;
     if(filteredArray.length){
       net = filteredArray[0];
       this.setPortData(net.config.ports);
     }
  }

  loadOrganizations(id) {
    return axios.get(`/iam/v1/users/${id}/organizations`)
      .then((data) => {
        if (data && data.failed) {
          Choerodon.prompt(data.message);
        } else {
          this.setOrgData(data);
        }
        return data;
      });
  }

  loadProByOrgId(id) {
    return axios.get(`/iam/v1/organizations/${id}/projects`)
      .then((data) => {
        if (data && data.failed) {
          Choerodon.prompt(data.message);
        } else {
          this.setProDatas(data.content);
        }
        return data;
      });
  }

  loadEnvData(id) {
    return axios.get(`/devops/v1/projects/${id}/envs?active=true`)
      .then((data) => {
        if (data && data.failed) {
          Choerodon.prompt(data.message);
        } else {
          this.setEnvData(data);
        }
        return data;
      });
  }

  loadNetData(envId) {

    return axios.post(`/devops/v1/projects/${this.projId}/service/${this.envId}/listByEnv`)
      .then((data) => {
        if (data && data.failed) {
          Choerodon.prompt(data.message);
        } else {
          this.setNetData(data.content);
        }
        return data;
      });
  }
}

const adminClusterStore = new AdminClusterStore();
export default adminClusterStore;
