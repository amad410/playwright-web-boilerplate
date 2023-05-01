const { test, expect, request } = require('@playwright/test');
const logindata = require('./data/login.json');
const orderdata = require("./data/order.json");
const {APIUtils} = require('./helpers/APIUtils')

let response;

test.beforeAll(async()=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, logindata);
    response = await apiUtils.createOrder(orderdata);
});

test('Example API test call from test claass', async () => {

    const apiContext = await request.newContext();
    const loginReponse = await apiContext.post("/api/ecom/auth/login",
    {
        data:logindata
    });
    
    expect (loginReponse.json).not.toBeNull();
    const loginObject = await loginReponse.json();
    const token = loginObject.token;
    console.log(token);
    expect(token).not.toBeNull();

    const orderResponse = await apiContext.post("/api/ecom/order/create-order",
    {
        data:orderdata,
        headers:{
            'Authorization' : token,
            'Content-Type': 'application/json'

        }
        
    });
    const orderResponsObject = await orderResponse.json();
    console.log(orderResponsObject);
    const orderId = orderResponsObject.orders[0];
    expect(orderId).not.toBeNull();


});

test('Example API call from Helper Class to print order', async () => {
    console.log("Order ID is " + response.orderId);
    expect(response.orderId).not.toBeNull();

});