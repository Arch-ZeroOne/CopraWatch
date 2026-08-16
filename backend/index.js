import puppeteer from "puppeteer";

//Starting a new puppeteer session

const getQuotes = async () => {
  // This code right here tells the pupeeter package to open a web browser

  // Params Breakdown:
  // headless -> normally this puppeteer extension doesnt show the browser opening by default  but since we enable headless mode the process of opening a browser is shown
  // defaultViewport -> uses the original size of browser
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  //Opens a new page
  const page = await browser.newPage();

  await page.goto("http://quotes.toscrape.com/", {
    waitUntil: "domcontentloaded",
  });

  const quotes = await page.evaluate(() => {
    //Gets the parent element of our target component containing our target elements with our needed data in this case the author and the quote (text)
    const quote = document.querySelector(".quote");

    const text = quote.querySelector(".text").innerText;
    const author = quote.querySelector(".author").innerText;

    return { text, author };
  });

  console.log(quotes);

  //Closes the browser
  //   await browser.close();
};

getQuotes();
