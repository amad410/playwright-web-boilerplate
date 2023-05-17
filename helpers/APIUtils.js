
const { request } = require('@playwright/test');

class APIUtils{

    constructor(apiContext, loginPayload, url){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
        this.url = url

    }

    async getToken()
    {
        //const loginReponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        const loginReponse = await this.apiContext.post(this.url + '/api/ecom/auth/login',
        {
            data:this.loginPayload
        });
        
        const loginObject = await loginReponse.json();
        this.token = loginObject.token;
        console.log(this.token);
        return this.token;
    }

    async createOrder(orderPayload)
    {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPayload,
            headers:{
                'Authorization' : response.token,
                'Content-Type': 'application/json'

            }
            
        });
        const orderResponsObject = await orderResponse.json();
        console.log(orderResponsObject);
        const orderId = orderResponsObject.orders[0];
        response.orderId = orderId;
        return response;
    }
    

}
module.exports = {APIUtils};