/*
* In javascript the variables are declared in camelcase but I like use snake case,
* if you want you can rename them as you want and remove the rule in .eslintrc line 35
*/
const base_url = env('BASE_URL', 'http://localhost:8000');
const api_url = base_url + '/api';
//const url_fha = env('BACKEND_URL', 'https://cms.fhaproducts.com');
//const url_old_fha = 'http://50.201.177.37';
//const fha_show_lead = url_fha + '/admin/leads.php?method=GlobalSearch&globalKeyword=';
//const fha_login = url_fha + '/admin';
//const old_fha_show_lead = url_old_fha + '/admin/leads.php?method=Add&idLead=';

export default {
  base_url,
  api_url,
  token_url: base_url + '/api/login'
  //url_fha,
  //url_old_fha,
  //fha_show_lead,
  //fha_login,
  //old_fha_show_lead,
}
