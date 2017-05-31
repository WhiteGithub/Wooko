import client from './client';
import popup_manager from './components/popup_manager';
import Helpers from './helpers';
import I18n from './i18n';

const axios  = require('axios');
import {browserHistory} from 'react-router';
import {translate} from 'react-i18next';

class Server{
  constructor(){
    this.Cancelable = false;
    this.domain = 'https://wooko-api-development.herokuapp.com';
  }
  // this.call('get','administrators',null,null,client.setAdministrator,null,false);
  call(method_name,resource,params,body,success_callback,fail_callback,login_type='user'){
    //debug logs
    let header;
    if (login_type == 'user'){
      header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': '{"client_token":{"name":"' + client.client_token_name + '","key":"' + client.client_token_key + '"},"user_token":{"user_id":"' + client.user_token.user_id+ '","key":"' + client.user_token.key + '"}}'
      };
    } else if (login_type == 'administrator') {
      header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': '{"client_token":{"name":"' + client.client_token_name + '","key":"' + client.client_token_key + '"},"administrator_token":{"administrator_id":"' + client.administrator_token.administrator_id+ '","key":"' + client.administrator_token.key + '"}}'
      };
    } else {
      header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': '{"client_token":{"name":"'+client.client_token_name+'","key":"'+client.client_token_key+'"}}',
      }
    }
    let status;
    axios.request({
      baseURL:this.domain,
      headers: header,
      method:method_name,
      params:params,
      url:resource,
      data:body,
      validateStatus: function (status) {
        return true;
      },
      timeout: 60000
    }).then(
      // rsolve function then
          (response)=>{
            status = response.status;
            if((response.status  >= 200 && response.status <300) ||(response.status >=400 && response.status < 500)){
              if(response.data)
                return response.data;
              else
                return null;
            }else{
              var msg = "Server internal error when calling API";
              return msg;
            }
          }
    ).then(
      (responseData)=>{
        if(status >= 200 && status < 300){
          if(success_callback)
            success_callback(status, responseData)
        }else{
          this._callFailCallbacks(status, responseData, fail_callback);
        }
      }
    ).catch((error)=>{
      console.log(error)
    })
  }

  _callFailCallbacks(status, response, fail_callback) {
    if (this._preFailCallback(status, response)) {
      if (fail_callback) {
        if (fail_callback(status, response)) {
          this._postFailCallback(status, response);
        }
      }
      else {
        this._postFailCallback(status, response);
      }
    }
  }
  _preFailCallback(status, response) {
    switch (status) {
      case 400:
        // deal with invalid_user_token
        if (Helpers.includeErrorCode(response.errors, 'invalid_user_token')) {
          client.logout();
          popup_manager.open('B', 1, {
            message:I18n.t('SERVER.token_expired'),
            onTouchTap:() => {browserHistory.push('/login')}
          });
          return false;
        }
        break;
      default:
        break;
    }

    return true;
  }
  _postFailCallback(status, response) {
    popup_manager.open('A', 2, {message:I18n.t('SERVER.unexpected_error', {error:JSON.stringify(response)})});
  }

  verify_email(token_id, token_key, success_callback, fail_callback) {
    this.call('patch', 'user/verify_email', {token_id:token_id, token_key:token_key}, null, success_callback, fail_callback, false);
  }

  reset_password(password, password_confirmation, token_id, token_key, success_callback, fail_callback) {
    this.call('patch', 'user/reset_password', {token_id:token_id, token_key:token_key}, {user:{password:password, password_confirmation:password_confirmation}}, success_callback, fail_callback, false);
  }

  //=================
  //--> User
  //=================

  login(email, password, fail_callback) {
    this.call('post', 'user_tokens', null, {credential:{email:email, password:password}}, this._loginSuccessCallback, fail_callback, false);
  }
  _loginSuccessCallback(status, response) {
    client.setUserToken(response.user_token.user_id, response.user_token.key, response.user_token.expire_in);
    browserHistory.push('/');
  }

  logout() {
    this.call('delete', 'user_tokens', null, null, this._logoutSuccessCallback.bind(this));
  }
  _logoutSuccessCallback(status, response) {
    client.logout();
  }

  signup(data) {
    this.call('post', 'users', null, {user:data}, this._signupSuccessCallback, null, false);
  }
  _signupSuccessCallback(status, response) {
  }

  // get all universities
  getUniversities(success_callback) {
    this.call('get', 'universities', null, null, success_callback, null, false);
  }

  // get all programs of a university
  getPrograms(university_id, success_callback) {
    this.call('get', 'universities/'+university_id+'/programs', null, null, success_callback, null, false);
  }

  //=================
  //--> Administrator
  //=================

  loginAdmin(email, password, fail_callback){
    this.call('post', 'administrator_tokens', null, {credential:{email:email, password:password}}, this._loginAdminSuccessCallBack.bind(this), fail_callback, false);
  }
  _loginAdminSuccessCallBack(status, response) {
    client.setAdministratorToken(response.administrator_token.administrator_id, response.administrator_token.key, response.administrator_token.expire_in);
    browserHistory.push('/admin');
  }

  logoutAdmin(){
    this.call('delete', 'administrator_tokens', null, null, this._logoutAdminSuccessCallback, null, 'administrator');
  }
  _logoutAdminSuccessCallback(callback,status,response){
    client.logoutAdmin();
    browserHistory.push('/admin/login');
  }

  getFeedBacks(success_callback, fail_callback){
    this.call('get', 'feedbacks', null, null, success_callback, fail_callback, 'administrator');
  }

  getStatistics(success_callback) {
    this.call('get', 'statistics', null, null, success_callback, null, 'administrator');
  }

  getCourseAddingRequests(success_callback, fail_callback){
    this.call('get', 'course_adding_requests', null, null, success_callback, fail_callback, 'administrator');
  }

  courseAddingAccepet(id, success_callback){
    this.call('patch','course_adding_requests/'+id+'/approve',null,null,success_callback, null, 'administrator')
  }

  courseAddingDelete(id, success_callback){
    this.call('delete','course_adding_requests/'+id,null,null,success_callback, null, 'administrator')
  }
}

module.exports= new Server();
