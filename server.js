const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--load-extension"],
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  });

  const typingPage = await browser.newPage();
  await typingPage.goto("https://10fastfingers.com/typing-test/english", {
    waitUntil: "networkidle0",
  });

  const consentDenyButton = await typingPage.$(
    "#CybotCookiebotDialogBodyButtonDecline"
  );
  consentDenyButton.click();

  const wordsHtml = await typingPage.$("#words");
  const words = await (await wordsHtml.getProperty("textContent")).jsonValue();
  const textButton = await typingPage.$("#inputfield");
  await textButton.click();

  for (const letter of words) {
    if (letter == " ") {
      await typingPage.keyboard.press("Space", { delay: 20 });
    } else {
      await typingPage.keyboard.press(letter, { delay: 5 });
    }
  }

  console.log(words);
})();
