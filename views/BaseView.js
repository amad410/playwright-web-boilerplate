import { Browser, BrowserContext, Locator, Page } from '@playwright/test';

let webContext;

export default class BaseView {


  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async waitForNetworkIdleState(){
    await this.page.waitForLoadState('networkidle');
  }

  async waitForDomLoadedState(){
    await this.page.waitForLoadState('domcontentloaded');
  }

  async switchNewTab(browser){
    const context = browser.contexts;


    const newPage = await Promise.all(

        [
            await context[1].waitForEvent('page'),
        
        ]
    );
    return newPage;
    
  }

  async switchToFrame(frame){
    const framesPage = this.page.locator(frame);
    return framesPage;
    
  }

  /**
   * Thus method can be used to inject the token value from an auth login API request into the 
   * browser context.
   * @param token 
   */
  async injectTokenToLocalSessionStorage(token) {
    this.page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    },token);
  }

  /**
   * Using the current browser under context store the session state for reuse.  This is to be used
   * to store all session data such as cookies, localStorage, etc.
   * @param browserContext 
   */

  async saveStorageState(browserContext){
    await browserContext.storageState({path: './data/state.json'});
  }

  /**
   * This will create a new browsercontect with the session storage data and then return that
   * context.
   * @param browser 
   * @returns 
   */

  async newBrowserContextWithState(browser){
    webContext = await browser.newContext({storageState: './data/state.json'});
    return webContext;
  }

  /**
   * Will return a new page under a specific context
   * @returns any
   */

  async newContextPage(){
    return await webContext.newPage();
  }


  async waitforEvent(locator, browser){
    const context = browser.contexts;


    const newPage = await Promise.all(

        [
            await context[1].waitForEvent('page'),
            await this.click(locator),
        
        ]
    );

    return newPage;
    
  }


  async waitForClickNavigation(locator){
    await Promise.all(

        [
            this.page.waitForNavigation(),
            this.click(locator),

        ]
    );
    
  }

  async closeTab(pageTab){
    await pageTab.close();
  }

  async waitForLoadedState(){
    await this.page.waitForLoadState('load');
  }

  async selectDropDown(locator, option){
    const element = this.page.locator(locator);
    element.selectOption(option);
    return element;
  }

  async selectCheckBoxBtn(locator){
    const element = this.page.locator(locator);
    element.check();
    return element;
  }

  async unSelectCheckBoxBtn(locator){
    const element = this.page.locator(locator);
    if(await element.isChecked() == true)
    {
        element.uncheck();
    }
    
    return element;
  }

  async selectFirstRadioBtn(locator){
    const element = this.page.locator(locator);
    element.first().click();
    return element;
  }

  async selectLastRadioBtn(locator){
    const element = this.page.locator(locator);
    element.last().click();
    return element;
  }

  async selectRadioBtn(){
    
  }



  async switchToWindow(){

  }

  async selectFromCalendar(){

  }

  async getAll(locator){
    const elements = await this.page.locator(locator).all();
    return elements;
  }

  async getTextContent(locator){
    const element = await this.page.locator(locator);
    return await element.textContent.toString();
  }

  async click(locator){
    const element = await this.page.locator(locator).click();
  }

  async dblClick(locator){
    const element = await this.page.locator(locator).dblclick();
  }

  async typeText(locator, value){
    const element = await this.page.locator(locator).type(value);
  }

  async fillText(locator, value){
    const element = await this.page.locator(locator).fill(value);
  }

  async count(locator){
    return await this.page.locator(locator).count();

  }

  async clear(locator){
    const element = await this.page.locator(locator).clear();
  }

  async getAllTextContents(locator){
    const element = await this.page.locator(locator);
    return await element.allTextContents();
  }

  async getAllInnerTexts(locator){
    const element = this.page.locator(locator);
    return await element.allInnerTexts();
  }

  async hover(locator) {
    const element = this.page.locator(locator);
    await element.hover();
  }

  async acceptAlertDialog() {
    this.page.on('dialog', dialog => dialog.accept);
  }

  async cancelAlertDialog() {
    this.page.on('dialog',dialog => dialog.dismiss);
  }

}  
module.exports = {BaseView};
