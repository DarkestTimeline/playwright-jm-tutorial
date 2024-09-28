import {test, expect} from '@playwright/test'
import { loginPage } from './pageobjects/loginpage';

test('purchase an item 2', async({page}, testInfo) => {
    //Log calls from the website
    await page.on("request", req =>{
        console.log(req.url());
    })

    //Avoid calling a specific image
    //await page.route("https://www.saucedemo.com/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg", (route) => route.abort());

    //Avoid calling all images
    await page.route("**/*.{png,jpg,jpeg,svg}", (route) => route.abort());


    await page.goto('https://www.saucedemo.com');
    const loginpage =  new loginPage(page);
    await loginpage.loginWithCredentials('standard_user', 'secret_sauce');
    await loginpage.checkSuccessfulLogin();

    await new Promise(resolve => setTimeout(resolve, 2000));

});

test('interceptor test', async({page}, testInfo) => {

    //Change the response from https://demoqa.com/BookStore/v1/Books that fills the grid
    await page.route("https://demoqa.com/BookStore/v1/Books", (route) => route.fulfill({
        status: 304,
        headers: {
            'Content-Type' : 'application/json'
        },
        body: `
        {
            "books": [
                {
                    "isbn": "9781449325862",
                    "title": "Some Book or Whatever",
                    "subTitle": "A Working Introduction",
                    "author": "Richard E. Silverman",
                    "publish_date": "2020-06-04T08:48:39.000Z",
                    "publisher": "O'Reilly Media",
                    "pages": 234,
                    "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                    "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                }
            ]
        }
        `
    }));

    await page.goto('https://demoqa.com/books');

    await new Promise(resolve => setTimeout(resolve, 2000));

});