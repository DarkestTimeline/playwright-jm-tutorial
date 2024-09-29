import { test as setup, expect } from "@playwright/test"
import { loginPage } from "./pageobjects/loginpage";

const authFile = "playwright/.auth/user.json"

setup("authenticate", async({page}) => {
    //Call loginpage.ts single method
    const loginpage =  new loginPage(page);
    await loginpage.loginWithCredentials('standard_user', 'secret_sauce');

    //Check that login was succesful
    await loginpage.checkSuccessfulLogin();

    await page.context().storageState({path: authFile});
});