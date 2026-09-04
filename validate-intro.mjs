import puppeteer from "file:///C:/Users/Anshif/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js"

const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"]
})
const page = await browser.newPage()
page.on("pageerror", (error) => console.error("PAGE ERROR", error.stack || error.message))
page.on("console", (message) => console.error("PAGE LOG", message.text()))
await page.setViewport({ width: 1440, height: 1000 })
await page.bringToFront()
await page.goto("http://localhost:4173/", { waitUntil: "domcontentloaded" })

const readState = () => page.evaluate(() => {
    const intro = document.querySelector(".fm-local-intro")
    const lens = intro?.querySelector(".fm-lens")
    return {
        intro: Boolean(intro),
        classes: intro?.className || "",
        lens: lens ? {
            x: lens.style.getPropertyValue("--fm-lens-x"),
            y: lens.style.getPropertyValue("--fm-lens-y")
        } : null
    }
})

const samples = [{ at: 0, ...(await readState()) }]
for (const delay of [250, 250, 250, 250, 500, 500]) {
    await new Promise((resolve) => setTimeout(resolve, delay))
    samples.push({ at: samples.at(-1).at + delay, ...(await readState()) })
}

console.log(JSON.stringify(samples, null, 2))
await browser.close()
