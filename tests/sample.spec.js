const { test, expect } = require('@playwright/test');
const {ScreenUtils} = require('../helpers/ScreenUtils');
//const { LoginView } = require('./views/LoginView');
const {ViewManager} = require('../views/ViewManager');
const logindata = JSON.parse(JSON.stringify(require('../data/login.json')));
const invalidlogindata = JSON.parse(JSON.stringify(require('../data/invalid-login.json')));
let screenUtils;

test.beforeAll( async () =>{


})

test.beforeEach( async ({page}) =>{
 
  await page.goto("/client/");

})

test('Sample Test', async ({page}) => {
 
    await expect(page).toHaveTitle('Let\'s Shop');
    screenUtils = new ScreenUtils(page);
    screenUtils.getScreenShot();
    await page.screenshot({path: './screenshots/screenshot.png'})
  });


  test('Sample POM Test with Valid Login', async ({page}) => {
 
    const viewManager = new ViewManager(page);
    const loginView = viewManager.getLoginView();
    await loginView.login(logindata.userEmail, logindata.userPassword);
    screenUtils = new ScreenUtils(page);
    screenUtils.getScreenShot();
    await page.screenshot({path: './screenshots/screenshot.png'})

  });

  for(const data of invalidlogindata)
  {
    test(`Sample POM Test with Invalid Login user ${data.userEmail}`, async ({page}) => {
 
      const viewManager = new ViewManager(page);
      const loginView = viewManager.getLoginView();
      await loginView.login(data.userEmail, data.userPassword);
  
      screenUtils = new ScreenUtils(page);
      screenUtils.getScreenShot();
      await page.screenshot({path: './screenshots/screenshot.png'})
  
    });
  }

  
