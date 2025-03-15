const paypal =require("paypal-rest-sdk")
paypal.configure({
  mode:"sandbox",
  client_id:"AQC7Ibn6XYirCE7Y27F9QYHKbOSABm4OH3HOVvbqBA_xi_0lJEhxT7f78TSN_EGcM9Pzd5Yv4RaBK2t9",
  client_secret:"ELI3ly7FJkF9XkVOiJWiXC9HuB1Z8RG_eFmRDFVQvsedM_cn7q8uFilUY1cKRDqqLLtmJbReGjTXcEjr",
})
module.exports=paypal;