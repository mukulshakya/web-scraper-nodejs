const cheerio = require('cheerio');
// const axios = require('axios');
// const request = require('request');
const rp = require('request-promise');
const process = require('./process');
const fs = require('fs');

const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
  .then(function(html){
    var $ = cheerio.load(html);
    // console.log($('big > a'));
    // console.log(html);
    const wikiUrls = [];
    for (let i = 0; i < 45; i++) {
      wikiUrls.push($('big > a')[i].attribs.href);
    }
    // console.log(wikiUrls);
    // return process.getData('https://en.wikipedia.org'+wikiUrls[0]);
    return Promise.all(
        wikiUrls.map(function(url) {
          return process.getData('https://en.wikipedia.org' + url);
        })
    );
    
  })
  .then((result) => {
    console.log(result);
    fs.writeFileSync('./data.js',JSON.stringify(result));
  })
  .catch(function(err){
    console.log(`Error! ${err.name}`);
  });


// var url = "https://en.wikipedia.org/wiki/List_of_Prime_Ministers_of_India"; 

// axios.get(url).then((result)=>{
//     html = result.data;
//     var $ = cheerio.load(html);

//     $(".wikitable").each(function(i,e){
//         $(this).find('a').text();
//     });

// }).catch(e=>console.log(e));

// request("http://dataquestio.github.io/web-scraping-pages/simple.html", (error, response, html) => {
//     console.log(html)
// });
