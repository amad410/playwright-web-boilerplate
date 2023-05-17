const { LoginView } = require("./LoginView")

/**
 * This is the View Mananager class, which will encapsulate all view objects and instantiate them
 * for use. 
 */

exports.ViewManager = class ViewManager{
    constructor(page){
        this.page = page;
        this.loginview = new LoginView(page);

    }

    getLoginView(){
        return this.loginview;
    }
}