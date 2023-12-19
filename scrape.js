import puppeteer from "puppeteer";
async function scrapeWebsite() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = "https://vikaspedia.in/schemesall/schemes-for-farmers";

  await page.goto(url);

  const results = await page.evaluate(() => {
    const schemeElements = document.querySelectorAll(".folderfile_name");
    const descriptionElements = document.querySelectorAll("p");

    const schemes = [];

    schemeElements.forEach((schemeElement, index) => {
      const title = schemeElement.textContent.trim();
      const link = "https://vikaspedia.in" + schemeElement.getAttribute("href");
      const description = descriptionElements[index].textContent.trim();

      schemes.push({ title, description, link });
    });

    return schemes;
  });

  results.forEach((result, index) => {
    console.log(`Scheme ${index + 1}:`);
    console.log("Title:", result.title);
    console.log("Link:", result.link);
    console.log("Description:", result.description);
    console.log("------------------------");
  });

  await browser.close();
}

scrapeWebsite();
