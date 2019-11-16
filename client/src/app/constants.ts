const  rootPath = 'http://localhost:3000/';
// const rootPath = 'http://pictuscode.eu-4.evennode.com/';
const apiPath = rootPath + 'api/';
const cuserveApiPath = 'http://cuserve.herokuapp.com';

export const constants = {
  register: apiPath + 'register/',
  login: apiPath + 'login/',
  getUsers: apiPath + 'users/',
  getSettings: apiPath + 'sitesettings/',
  getBanner: apiPath + 'banner/',
  getCustomer: apiPath + 'customer/',
  getCustomerAccount: apiPath + 'customeraccount/',
  bills: apiPath + 'bills/',
  getNewBills: apiPath + 'getNewBills/',
  getIvr: apiPath + 'ivr/',
  getPaypal: apiPath + 'paypaypal/',
  paymentSuccess: apiPath + 'paymentSuccess/',
  getCallLog: apiPath + 'calllog/',
  verifyUser: apiPath + 'verifyuser/',
  roles: apiPath + 'roles/',
  addCompany: cuserveApiPath + '/company/new',
  addIvr: cuserveApiPath + '/ivr/new',
  uploadCompanLogo: apiPath + 'upload/companyLogo/',
  uploadCsv: apiPath + 'upload/csv/',
  deleteFile: apiPath + 'deletefile/',
  companyImagePath: rootPath + 'assets/images/companyLogo/',
  androidGetCompany: cuserveApiPath + '/company/all?limit=100000',
  androidGetIvr: cuserveApiPath + '/ivr/find',
  upload: apiPath + 'assets/',
  uploadedImage: rootPath + 'assets/images/',
  userRegister: apiPath + 'userregister/',
  userLogin: apiPath + 'userlogin/',
  listCategories: apiPath + 'listcategories/',
  makePayment: apiPath + 'makePayment/'
};


