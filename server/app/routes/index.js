 const multer = require("multer");
 const storage = multer.diskStorage({
     destination: function(req, file, cb) {
         cb(null, "./assets/images/companyLogo");
     },
     filename: function(req, file, cb) {
         cb(null, Date.now() + ".png");
     }
 });
 const companylogoOption = multer({ storage: storage });
 const csvstorage = multer.diskStorage({
     destination: function(req, file, cb) {
         cb(null, "./assets/files");
     },
     filename: function(req, file, cb) {
         cb(null, Date.now() + ".csv");
     }
 });
 const csvstorageOption = multer({ storage: csvstorage });

 module.exports = (app) => {
     const user = require("../controllers/user.controller.js");
     const customer = require("../controllers/customer.controller.js");
     const customeraccount = require("../controllers/customerAccount.controller.js");
     const bills = require("../controllers/bills.controller");
     const ivr = require("../controllers/ivr.controller");
     const calllog = require("../controllers/callLog.controller");
     const upload = require("../controllers/upload.controller.js");
     const paymentController = require("../controllers/payment.controller");
     const roles = require("../controllers/roles.controller");

     app.post("/api/register", user.register);
     app.post("/api/login", user.login);
     app.get("/api/users", user.findAll);
     app.get("/api/users/:id", user.findOne);
     app.put("/api/users", user.update);
     app.delete("/api/users/:id", user.delete);
     //customer 
     app.post("/api/userregister", customer.userRegister);
     app.post("/api/userlogin", customer.userLogin);
     app.put("/api/customer/:id", customer.update);
     app.get("/api/customer", customer.getAllCustomer);
     app.get("/api/customer/:id", customer.findOne);
     app.post("/api/customer/findCustomerExists", customer.findCustomerExists);
     app.post("/api/customer/forgetpass", customer.forgotPassword);
     app.post("/api/customer/updatepass", customer.updatePassword);
     app.get("/api/verifyuser/:token", customer.verifyUser);
     //customeraccount
     app.post("/api/customeraccount/:id", customeraccount.addCustomerAccount);
     app.get("/api/customeraccount", customeraccount.getAllCustomerAccounts);
     app.get("/api/customeraccount/:id", customeraccount.getCustomerAccountById);
     app.put("/api/customeraccount/:id", customeraccount.updateCustomerAccount);
     app.delete("/api/customeraccount/:id", customeraccount.deleteCustomerAccount);
     //bills
     app.post("/api/bills", bills.create);
     app.get("/api/bills", bills.getAll);
     app.get("/api/bills/:id", bills.getById);
     app.put("/api/bills/:id", bills.update);
     app.delete("/api/bills/:id", bills.delete);
     app.get("/api/getNewBills/:id", bills.getNewBills);
     app.post("/api/bills/sendReminder", bills.sendReminder);
     //roles
     app.post("/api/roles", roles.create);
     app.get("/api/roles", roles.getAll);
     app.get("/api/roles/:id", roles.getById);
     app.put("/api/roles/", roles.update);
     app.delete("/api/roles/:id", roles.delete);
     //ivr
     app.post("/api/ivr", ivr.create);
     app.get("/api/ivr", ivr.getAll);
     app.get("/api/ivr/getByUser/:id", ivr.getByUser);
     app.get("/api/ivr/:id", ivr.getById);
     app.post("/api/ivr/filter", ivr.getFiltered);
     app.put("/api/ivr/:id", ivr.update);
     app.delete("/api/ivr/:id", ivr.delete);
     //calllog
     app.post("/api/calllog", calllog.getExecutionlist);
     app.post("/api/calllog/userinput", calllog.getUserInput);
     // payment charge
     app.post("/api/paymentSuccess", paymentController.paymentSuccess);
     app.get("/api/paymentCancel", paymentController.paymentCancel);
     app.post("/api/paypaypal", paymentController.paypalHostFeeTransaction);
     //upload
     app.post("/api/deletefile", upload.deleteFile);
     app.post("/api/upload/companyLogo", companylogoOption.array("companyLogo[]", 12), upload.uploadCompanyLogo);
     app.post("/api/upload/csv", csvstorageOption.array("csv[]", 12), upload.uploadCSV);
 };