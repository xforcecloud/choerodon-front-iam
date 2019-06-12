/**
 * Created by dongbin on 2019/5/28.
 */

import { action, computed, observable } from 'mobx';
import { axios, store } from 'choerodon-front-boot';
import querystring from 'query-string';


@store('LoadblanceStore')
class LoadblanceStore {
  @observable loadblances = [];

  @action
  setLoadBlaces(lb) {
    this.loadblances = lb;
  }

  @computed
  get getLoadBlances() {
    return this.loadblances;
  }

  /**
    * [
    *   {
    *    "id": 1,
    *    "orgId": 2,
    *    "clusterId": 7,
    *    "envCode": "4-grafana-t",
    *    "name": "test-loadblance-update",
    *   "cloudSupplierName": "aliyun"
    *   }
    * ]
   */
  list(organizationId: number) {
    // return axios.get(`http://localhost:8065/v1/loadblance/list/${organizationId}`);
    return axios.get(`x-devops/v1/loadblance/list/${organizationId}`);
  }
  
  /**
   * true
   */
  deploy(lb) {
    // return axios.post('http://localhost:8065/v1/loadblance/', JSON.stringify(lb));
    return axios.post('x-devops/v1/loadblance/', JSON.stringify(lb));
  }
  /**
   * true | false
   */
  reDeploy(id: number, lb) {
    // return axios.patch(`http://localhost:8065/v1/loadblance/${id}`, JSON.stringify(lb));
    return axios.patch(`x-devops/v1/loadblance/${id}`, JSON.stringify(lb));
  }
  /**
   * true | false
   */
  unDeploy(id: number) {
    // return axios.delete(`http://localhost:8065/v1/loadblance/${id}`);
    return axios.delete(`x-devops/v1/loadblance/${id}`);
  }

  /**
   * true | false
   */
  canUseName(name: string) {
    // return axios.get(`http://localhost:8065/v1/loadblance/check/name?name=${name}`);
    return axios.get(`x-devops/v1/loadblance/check/name?name=${name}`);
  }

  /**
   * true | false
   */
  canDeploy(orgId: number) {
    // return axios.get(`http://localhost:8065/v1/loadblance/check/limit/${orgId}`);
    return axios.get(`x-devops/v1/loadblance/check/limit/${orgId}`);
  }
  
  queryDetail(id: number) {
    // return axios.get(`http://localhost:8065/v1/loadblance/${id}`);
    return axios.get(`x-devops/v1/loadblance/${id}`);
  }

  listClusters(orgId: number) {
    return axios.post(`devops/v1/organizations/${orgId}/clusters/page_cluster`, '{"searchParam":{},"param":""}');
  }

  listEnvs(clusterId: number) {
    // return axios.get(`http://localhost:8065/v1/env/${clusterId}/list`);
    return axios.get(`x-devops/v1/env/${clusterId}/list`);
  }

  listEnvAppInstance(envCode: string) {
    // return axios.get(`http://localhost:8065/v1/app-instance/?envCode=${envCode}`);
    return axios.get(`x-devops/v1/app-instance/?envCode=${envCode}`);
  }
  /**
   * ['aliyun','aws']
   */
  listCloudSuppliers() {
    // return axios.get('http://localhost:8065/v1/loadblance/suppliers');
    return axios.get('x-devops/v1/loadblance/suppliers');
  }
}

const loadblanceStore = new LoadblanceStore();
export default loadblanceStore;
