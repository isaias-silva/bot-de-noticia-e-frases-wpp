const readline = require('readline-sync')

const webdriver = require('selenium-webdriver')

const scrap = require('./src/frases')

const text=require('./src/text')

async function connect() {
    const capabilities = {
        browserName: 'firefox',
        chromeOptions: {
            mobileEmulation: {

            }
        }
    }

    const driver = await new webdriver.Builder().withCapabilities(capabilities).build()


    await driver.get("https://web.whatsapp.com/");




    setTimeout(function () {
        console.log('show time!')
        work()
    }, 20000)


    async function work() {
      console.log(text.title())
        let gruplvo = ['Ddzinha','A capitã 🌷frases e links','꧁༒🅛🅘🅛🅘🅗❤️🅩🅐🅒🅚 🅕🅡🅐🅢🅔🅢 🅞🅕🅒༒꧂']// alvos onde as mensagens serão enviadas grupos/contatos
        if (gruplvo.length != 0) {
          
          console.log(text.menu())
        
          let res = readline.question('comando?')    
            switch (res) {

                case '1':



                    for (let i in gruplvo) {
                        const groupalvo = await driver.findElement(webdriver.By.xpath(`//span[@title="${gruplvo[i]}"]`));
                        await groupalvo.click()
                        const data = new Date()
                        const dias = new Array(
                            'domingo ', 'segunda feira ', 'terça feira ', 'quarta feira ', 'quinta feira ', 'sexta feira ', 'sábado '
                        );




                        const textbar = await driver.findElement(webdriver.By.xpath(`(//div[@class="_13NKt copyable-text selectable-text"])[2]`))

                        const noticias = await scrap.news()
                        await textbar.sendKeys("<<<< ---[noticias BOT ]--- >>>>", webdriver.Key.ENTER)
                        await textbar.sendKeys("----hoje, " + dias[data.getDay()] + data.getFullYear(), webdriver.Key.ENTER)


                        for (let i in noticias) {

                            await textbar.sendKeys("*** " + noticias[i] + " ***", webdriver.Key.ENTER)
                        }
                    }
                    await work()
                    break

                case '2':

                    for (let i in gruplvo) {
                        let title = ``
                        const groupalvo = await driver.findElement(webdriver.By.xpath(`//span[@title="${gruplvo[i]}"]`));
                        await groupalvo.click()

                        const textbar = await driver.findElement(webdriver.By.xpath(`(//div[@class="_13NKt copyable-text selectable-text"])[2]`))

                        const frases = await scrap.frases()
                        await textbar.sendKeys(title , webdriver.Key.ENTER)

                        for (let i in frases) {
                            console.log(frases[i])
                            await textbar.sendKeys( frases[i], webdriver.Key.ARROW_RIGHT)
                            await textbar.sendKeys(' ',webdriver.Key.ENTER)
                        }
                    }
                    await work()
                    break
            }
        }else{
            console.log('lista de grupos vazia! adicione o nome de pelomenos 1 grupo alvo!')
        }


    }

}
connect()