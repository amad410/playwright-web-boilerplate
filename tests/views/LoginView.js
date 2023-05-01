const {BaseView } = require("./BaseView");

exports.LoginView = class LoginView extends BaseView{

    constructor(page){
        super(page);
        this.page = page;
        this.signInButton = this.page.locator("[value='Login']");
        this.userName = this.page.locator("#userEmail");
        this.password = this.page.locator("#userPassword");
    }

    async login(email, password){
        await this.userName.fill(email);
        await this.password.type(password);
        await this.signInButton.click();
    }

}
