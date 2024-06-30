const {By, Builder, Browser} = require('selenium-webdriver');

(async function firstTest() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('http://localhost:3000/test/media');

    let elements = await driver.findElements(By.tagName('h3'));
    for (let e of elements) {
      console.log(await e.getText());
    }

    let element = await driver.findElement(By.tagName('img'));
    console.log(await element.getAttribute('src'));

  } catch (e) {
    console.log('error', e)
  } finally {
    await driver.quit();
  }
}())