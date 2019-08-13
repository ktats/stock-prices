const rp = require('request-promise');
const cheerio = require('cheerio');

const carrotParser = (str) => {
    let newStr = '';
    let content = false;
    for (let i = 0; i < str.length; i ++) {
      if (!content) {
          if (str[i] === '>') {
              content = true;
              continue;
          } else {
              continue;
          }
      } else {
          if (str[i] === '<') {
              break;
          } else {
              newStr = newStr.concat(str[i]);
          }
      }
    }
    return newStr;
}

const titleParser = (str) => {
    let newStr = ''
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '"') {
            break;
        } else {
            newStr = newStr.concat(str[i]);
        }
    }
    return newStr;
}

const descriptionParser = (str) => {
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
        // console.log(str.slice(i, i + 4));
        if (str.slice(i, i + 4) === '&#xD') {
            break;
        } else {
            newStr = newStr.concat(str[i]);
        }
    }
    return newStr;
}


module.exports.infoHandler = (req, res) => {
    // P/E, market cap, yield, EPS are the fields we're after 
    const { ticker } = req.params;
    const url = `https://www.marketwatch.com/investing/stock/${ticker}`;
    rp(url)
     .then((html) => {
         const $ = cheerio.load(html);

         const pePosition = html.indexOf('P/E Ratio');
         let peRatio = html.slice(pePosition + 75, pePosition + 80)
         if (!parseFloat(peRatio)) {
             peRatio = 'N/A';
         }

         const titlePosition = html.indexOf('"quote_company_name"');
         const title = titleParser(html.slice(titlePosition + 22, titlePosition + 100));

         const marketCapPosition = html.indexOf('Market Cap');
         const marketCap = carrotParser(html.slice(marketCapPosition + 71, marketCapPosition + 87));

         const epsPosition = html.indexOf('label">EPS<');
         const eps = carrotParser(html.slice(epsPosition + 72, epsPosition + 84));

         const yieldPosition = html.indexOf('l">Yield</s');
         const divYield = carrotParser(html.slice(yieldPosition + 70, yieldPosition + 87));


         // Index of &#xD is the end of the description string
         const descriptionPosition = html.indexOf('description__text');
         const description = descriptionParser(html.slice(descriptionPosition + 45, descriptionPosition + 2000));

         res.send({
             title,
             description,
             marketCap,
             peRatio,
             eps,
             divYield,
         });
     });
}