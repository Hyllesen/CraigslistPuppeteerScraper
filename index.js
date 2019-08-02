const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const scrapingResults = [
  {
    title: "Entry Level Software Engineer - C or C++",
    datePosted: new Date("2019-07-26 12:00:00"),
    neighborhood: "(palo alto)",
    url:
      "https://sfbay.craigslist.org/pen/sof/d/palo-alto-entry-level-software-engineer/6943135190.html",
    jobDescription:
      "Major Technology company is seeking an Entry Level software Engineer. The ideal candidate will have extensive school project experience with C or C++. Under general supervision...",
    compensation: "Up to US$0.00 per year"
  }
];

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof"
  );
  const html = await page.content();
  const $ = cheerio.load(html);
  const results = $(".result-title")
    .map((index, element) => {
      const title = $(element).text();
      const url = $(element).attr("href");
      return { title, url };
    })
    .get();
  console.log(results);
}

main();
