const { test, expect } = require('@playwright/test');
const {ScreenUtils} = require('./helpers/ScreenUtils');
//const { LoginView } = require('./views/LoginView');
const {ViewManager} = require('./views/ViewManager');
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


  test.only('Sample POM Test', async ({page}) => {
 
    const viewManager = new ViewManager(page);

    await viewManager.getLoginView().login('amad410@gmail.com', 'Amad7511');
    const loginView = viewManager.getLoginView();
    //const loginView = new LoginView(page);
    await loginView.login('amad410@gmail.com', 'Amad7511');

    screenUtils = new ScreenUtils(page);
    screenUtils.getScreenShot();
    await page.screenshot({path: './screenshots/screenshot.png'})

  });
