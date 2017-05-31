module.exports.Status = function(){
  var temp={};
  temp['name']= 'Status';
  temp['properties']={};
  temp['properties']['logged_in']=false;
  return temp;
}

module.exports.Administrator = function(){
  var temp = {};
  temp['name']= 'Administrator';
  temp['properties']={};
  temp['properties']['administrator_id']=0;
  temp['properties']['first_name']='';
  temp['properties']['last_name']='';
  temp['properties']['privileges']=[];
  return temp;
}

module.exports.AdministratorToken= function(){
  var temp={
    name: 'AdministratorToken',
    properties: {
      administrator_id: null,
      key: '',
      expire_in:0
    }
  }
  return temp
}


module.exports.responseSchema= function(response){
  var time = new Date();
  var temp={
    status:response.status,
    data:response.data,
    date:new Date().getTime()/1000
  }
  return temp;
}
