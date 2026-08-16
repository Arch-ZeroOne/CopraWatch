import puppeteer from "puppeteer";

const getCopraPrice = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://pca.gov.ph/index.php/trade-market", {
    waitUntil: "domcontentloaded",
  });

  const copraPrices = await page.evaluate(() => {
    const latestMonths = document.querySelector("details");
    console.log(latestMonths);
  });
};

getCopraPrice();
