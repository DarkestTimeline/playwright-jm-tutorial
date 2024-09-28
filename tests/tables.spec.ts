import {test, expect} from '@playwright/test';

test('tables', async({page}) => {
    await page.goto('https://cosmocode.io/automation-practice-webtable/');

    const tableContainer =  await page.locator("xpath=//table[@id='countries']");

    const rows = await tableContainer.locator("xpath=.//tr").all();

    const countries: Country[] = [];

    console.log(rows.length);

    for(let row of rows){
        let country: Country = {
            name: await row.locator('xpath=.//td[2]').innerText(),
            capital: await row.locator('xpath=.//td[3]').innerText(),
            currency: await row.locator('xpath=.//td[4]').innerText(),
            primaryLanguage: await row.locator('xpath=.//td[5]').innerText()
        }

        countries.push(country);
    };

    /*
    for(let country of countries){
        console.log(country);
    }
    */

    const countryWhereLangPortuguese = countries.filter(country => country.primaryLanguage === 'Portuguese');
    console.log(countryWhereLangPortuguese)

    /*
    const row1 = rows.at(1);
    
    const countryName = await row1?.locator('xpath=.//td[2]').innerText();
    const countryCaptial = await row1?.locator('xpath=.//td[3]').innerText();
    const countryCurrency = await row1?.locator('xpath=.//td[4]').innerText();
  
    console.log(countryName, countryCaptial, countryCurrency);
    */
});

interface Country{
    name: string;
    capital: string;
    currency: string;
    primaryLanguage: string;
}

/*
    table = //table[@id="countries"]
    filas = //tr[]

    Check = //table[@id="countries"]//tr[2]//td[1]
    Country = //table[@id="countries"]//tr[2]//td[2]
    Capital = //table[@id="countries"]//tr[2]//td[3]
    Currency = //table[@id="countries"]//tr[2]//td[4]
    Primary Lan = //table[@id="countries"]//tr[2]//td[5]
*/