import puppeteer from "puppeteer";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get("/", async (req, res) => {
  const prices = await getPrices();

  res.send(prices);
});

app.listen(port, () => {
  console.log("Port is running in port:", port);
});
//Starting a new puppeteer session
const getPrices = async () => {
  // This code right here tells the pupeeter package to open a web browser

  // Params Breakdown:
  // headless -> normally this puppeteer extension doesnt show the browser opening by default  but since we enable headless mode the process of opening a browser is shown
  // defaultViewport -> uses the original size of browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  //Opens a new page
  const page = await browser.newPage();

  await page.goto(
    "https://www.selinawamucii.com/insights/prices/philippines/copra/",
    {
      waitUntil: "domcontentloaded",
    },
  );

  const prices = await page.evaluate(() => {
    //Gets the parent element of our target component containing our target elements with our needed data in this case the author and the quote (text)
    const quote = document.querySelector(".sw-rd-hl-main");

    // const text = quote.querySelector(".text").innerText;
    // const author = quote.querySelector(".author").innerText;

    const us = quote.querySelector(".sw-rd-hl-price").innerText;
    const ph = quote.querySelector(".sw-rd-hl-local").innerText;
    return { us, ph };
  });
  await browser.close();
  return prices;
};
