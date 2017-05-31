const Status =require('./schema').Status;
const Administrator =require('./schema').Administrator;
const AdministratorToken =require('./schema').AdministratorToken;

import Lockr from 'lockr';

class Client {

    constructor(){
      this.client_token_name = 'Official Client Token';
      this.client_token_key = 'official client key';
      this.admin_token = AdministratorToken()['properties'];
      this.admin = Administrator()['properties'];
      this.status = Status()['properties'];

      // retrieve user token
      this.user_token = Lockr.get('user_token');

      // retrieve administrator token
      this.administrator_token = Lockr.get('administrator_token');
    }

    logout() {
      if (this.isLoggedInAsUser) {
        this.user_token = null;
        Lockr.rm('user_token');
      }
    }

    setUserToken(user_id, key, expire_in) {
      // set user_token in server
      this.user_token = {
        user_id: user_id,
        key: key,
        expire_at: new Date().getTime() / 1000 + expire_in // when the token would expire, in seconds since Jan. 1, 1970, NOT UTC time
      };

      // set user_token in database
      Lockr.set('user_token', this.user_token);
    }

    setAdministratorToken(administrator_id, key, expire_in){
      // set user_token in server
      this.administrator_token = {
        administrator_id: administrator_id,
        key: key,
        expire_at: new Date().getTime() / 1000 + expire_in // when the token would expire, in seconds since Jan. 1, 1970, NOT UTC time
      };

      // set user_token in database
      Lockr.set('administrator_token', this.administrator_token);
    }

    isLoggedInAsUser() {
      if (this.user_token)
        return true;
      else
        return false;
    }
    isLoggedInAsAdministrator() {
      if (this.administrator_token)
        return true;
      else
        return false;
    }

    setStatus(response){
      if (status > 200 ||  status < 300)
        this.status.logged_in = true;
      else
        return new Error('fail logged_in')
    }



    setAdministrator(status,response){
      let administrator = response.administrator;
      this.admin.administrator_id = administrator.administrator_id;
      this.admin.first_name=administrator.first_name;
      this.admin.last_name=administrator.last_name;
      if(administrator.administration_privileges){
        return;
      }else if(administrator.administration_privileges[0]!= null){
        administrator.administration_privileges.forEach((element)=>{
          this.admin.privileges.push(element);
        })
      }
      this.status.logged_in = true;
      console.log(JSON.stringify(this))
    }

    // setup(){
    //   if(global.getItem(this.admin.administrator_id)){
    //     var result = JSON.parse(global.getItem(this.admin.administrator_id));
    //     if(result.password && result.email){
    //       login(result.email,result.email)
    //       return true;
    //     }
    //     return false;
    //   }else{
    //     return false
    //   }
    // }

    credential(email,password){
      var temp={
        credential:{
          email: email,
          password: password
        }
      }
      return JSON.stringify(temp.credential);
    }

    logoutAdmin(){
      this.administrator_token = undefined;
      Lockr.rm('administrator_token');
    }

  }

  export default new Client();
