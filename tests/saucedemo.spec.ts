import {test, expect} from '@playwright/test'
import { kMaxLength } from 'buffer';
import exp from 'constants';
import { loginPage } from './pageobjects/loginpage';

test('purchase an item', async({page}, testInfo) => {
    // Open page
    await page.goto('https://www.saucedemo.com');

    //Login
    /*
    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    *>
    
    //Call loginpage.ts methods
    /*
    const login = new loginPage(page);
    await login.fillUsername('standard_user');
    await login.fillPassword('secret_sauce');
    await login.clickOnLogin();
    */
    
    //Call loginpage.ts single method
    const loginpage =  new loginPage(page);
    await loginpage.loginWithCredentials('standard_user', 'secret_sauce');
    //Take screenhots
    //Method #1
    //await page.screenshot({path: 'screenshots/login.png', fullPage: true})
    //Method #2
    await testInfo.attach('login', {
        body: await page.screenshot(),
        contentType: 'image/png'
    })

    //Check that login was succesful
    await loginpage.checkSuccessfulLogin();

    //Set const with all items container
    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();
    //Set const with random item from container
    const randIndex = Math.floor(Math.random() * itemsContainer.length);
    const randItem = itemsContainer[randIndex];
    //Set const with random item name
    const expectedName = await randItem.locator('.inventory_item_name').innerText();
    console.log(`Name: ${expectedName}`);
    //Set const with random item price
    const expectedPrice = await randItem.locator('.inventory_item_price').innerText();
    console.log(`Price: ${expectedPrice}`);
    //Set const with random item price
    const expectedDesc = await randItem.locator('.inventory_item_desc').innerText();
    console.log(`Description: ${expectedDesc}`);

    //Add to cart
    await randItem.getByRole('button', {name: 'Add to cart'}).click();
    await page.locator('.shopping_cart_link').click();

    //Wait for checkout button to be visible
    expect(page.getByRole('button', {name:'Checkout'})).toBeVisible();

    //Set const with cart item name
    const actualName = await page.locator('.inventory_item_name').innerText();
    console.log(`Name: ${actualName}`);
    //Set const with cart item price
    const actualPrice = await page.locator('.inventory_item_price').innerText();
    console.log(`Price: ${actualPrice}`);
    //Set const with cart item price
    const actualdDesc = await page.locator('.inventory_item_desc').innerText();
    console.log(`Description: ${actualdDesc}`);

    //Validate expectedItem = actualItem
    expect(actualName).toEqual(expectedName);
    expect(actualdDesc).toEqual(expectedDesc);
    //Make a test fail
    //expect(actualdDesc).toEqual(expectedDesc + 'a');
    expect(actualPrice).toEqual(expectedPrice);

    //Go to checkout
    await page.getByRole('button', {name:'Checkout'}).click();

    //Fill name, last name and zip
    await page.getByRole('textbox', {name: 'First Name'}).fill('Sergio');
    await page.getByRole('textbox', {name: 'Last Name'}).fill('Vasquez');
    await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('11011');

    //Go to checkout overview
    await page.getByRole('button', {name:'Continue'}).click();

    //Go to checkout complete
    await page.getByRole('button', {name:'Finish'}).click();
    //Validate Thank You text
    expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible();
    

    await new Promise(resolve => setTimeout(resolve, 2000));

});

/*
test('navigate', async({page}) => {
    //Variables defined in PC env vars
    await page.goto(process.env.URL);
    await new Promise(resolve => setTimeout(resolve, 2000));
})
*/