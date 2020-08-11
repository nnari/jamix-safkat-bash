const puppeteer = require('puppeteer');

exports.start = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "networkidle0"});
    let food = await page.evaluate(() => {
        let foods = [];
        const foodRows = document.querySelectorAll(".menu-item");
        for(const fr of foodRows) {
            foods.push({
                name: fr.querySelector("span.item-name").innerText,
                diets: fr.querySelector("span.menuitem-diets") == null ? null : fr.querySelector("span.menuitem-diets").innerText
            })
        }
        return foods;
    })
    await browser.close();
    show(food);
}

const show = (safkat) => {
    console.log(`Ruoka päivälle ${todayDate()}`)
    console.log("-".repeat(25));
    safkat.forEach(safka => {
        if(safka.name !== "Aterialisät")
            console.log(`${safka.name} ${safka.diets == null ? "" : `(${safka.diets})`}`);
    })
}

const todayDate = () => {
    //https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
}