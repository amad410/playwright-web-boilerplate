
const { request } = require('@playwright/test');

let page;

class ScreenUtils{


    constructor(page){
        this.page = page;

    }
    async getScreenShot(){
        await this.page.screenshot({path: './screenshots/screenshot.png'})
      }

      async getElementScreenShot(locator){
        await this.page.locator(locator).screenshot({path: './screenshots/screenshot.png'})
      }

   

}
module.exports = {ScreenUtils};