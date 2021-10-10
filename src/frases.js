const readline = require('readline-sync')
const puppeteer = require('puppeteer-extra')

const noticias=async function frase() {
    

    const url = `https://www.google.com/search?q=noticias&sxsrf=AOaemvKgbOAd501ZbF1_XTWUKtpsO9lERA:1632184364679&source=lnms&tbm=nws&sa=X&sqi=2&ved=2ahUKEwidtY7K6I7zAhXES_EDHZYpB0kQ_AUoAXoECAEQAw&biw=754&bih=690&dpr=0.9`
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
  
    try {
        await page.goto(url);
    } catch {
        console.log('erro recarregando....')
        page.reload()
    }

    const resultado = await page.evaluate(() => {

        const noticia = [];
        for (let i = 0; i < 9; i++) {
            noticia.push(document.querySelectorAll('.mCBkyc.JQe2Ld.nDgy9d')[i].textContent.replace('\n', " "))
        }

        return (noticia);


    })

  return resultado;
}



const frases=async function pensador() {
    
let tema=readline.question('tema:')
    const url = `https://www.pensador.com/${tema}/`
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
  
    try {
        await page.goto(url);
    } catch {
        console.log('erro recarregando....')
        page.reload()
    }

    const resultado = await page.evaluate(() => {

        const dados = [];
        for (let i = 0; i <(document.querySelectorAll('.frase.fr')).length; i++) {
            dados.push(("♫♪♩·.¸¸.·~"+document.querySelectorAll('.frase.fr')[i].textContent.replace('\n', ".")+"~ ·.·♩♪♫ "))
        }

        return (dados);


    })
console.log(resultado)
return resultado;
}


module.exports={news:noticias, frases:frases }