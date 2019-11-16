 const paypal = require("paypal-rest-sdk");
 const Bills = require("../models/bills.model");
 paypal.configure({
     "mode": process.env.PAYPALMODE,
     "client_id": process.env.PAYPALCLIENTID,
     "client_secret": process.env.PAYPALCLIENTSECRET
 });

 exports.paypalHostFeeTransaction = (req, res, next) => {
     const create_new_payment = {
         "intent": "sale",
         "payer": {
             "payment_method": "paypal"
         },
         "redirect_urls": {
             "return_url": process.env.CLIENTURL + "/paymentSuccess",
             "cancel_url": process.env.CLIENTURL + "/"
         },
         "transactions": [{
             "item_list": {
                 "items": [{
                     "name": "item",
                     "sku": "item",
                     "price": req.body.price,
                     "currency": "USD",
                     "quantity": 1
                 }]
             },
             "amount": {
                 "currency": "USD",
                 "total": req.body.price
             },
             "description": "This is the payment description."
         }]
     };
     paypal.payment.create(create_new_payment, function(error, payment) {
         if (error) {
             return next(next);
         } else {
             for (let i = 0; i < payment.links.length; i++) {
                 if (payment.links[i].rel === "approval_url")
                     return res.json({ url: payment.links[i].href });
             }
         }
     });
 };

 exports.paymentSuccess = (req, res) => {
     const payerId = req.body.PayerID;
     const paymentId = req.body.paymentId;
     const execute_payment_json = {
         "payer_id": payerId,
         "transactions": [{
             "amount": {
                 "currency": "USD",
                 "total": 1
             }
         }]
     };
     paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
         if (error) {
             throw error;
         } else {
             let transactionSucess = {
                 "transactionId": payment.id,
                 "transactionMethod": "paypal",
                 "hoster": "5b9baad226af823d4007b256",
                 "productId": payment.transactions[0].item_list.items[0].sku,
                 "paymentfor": "hosting",
                 "payment": "completed",
                 "pricing": {
                     "totalprice": payment.transactions[0].item_list.items[0].price
                 },
                 "payerInfo": payment.payer.payer_info,
                 "payeeInfo": payment.transactions[0].payee,
                 "shippingaddress": payment.transactions[0].item_list.shipping_address
             };

             Bills.findOneAndUpdate({ _id: "5d35fe1037ed984b6ccf6386" }, { paymentStatus: "paid" }, { new: true }, (err, bills) => {
                 if (err) return next(err);
                 return res.json({ "success": true, "message": "Bills Updated Successfully", bills });
             });
         }
     });
 };

 exports.paymentCancel = (req, res) => {
     res.send('payment Cancelled');
 };