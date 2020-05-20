const https = require("https");

async function getUserTransaction(uid, txnType, monthYear) {
  const url = `https://jsonmock.hackerrank.com/api/transactions/search?userId=${uid}`;

  let dataArray = []
  let amountArray = []

  let urls = await getUrls(url);
  
  for (let getUrl of urls){
    let array = await getData(getUrl, txnType)
    dataArray = dataArray.concat(array)
  }
  
  for (let data of dataArray){  

    amountArray.push(data.amount.substring(1))  
  }
  
  console.log(dataArray)
  return urls;
}

function getUrls(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", (data) => {
        body += data;
      });
      res.on("end", async () => {
        let array = [];
        body = await JSON.parse(body).total_pages;
        let numPages = body;
        for (let i = 1; i < numPages + 1; i++) {
          array.push(url + `&page=${i}`);
        }
        resolve(array);
      });
    });
  });
}

function getData(url, txnType) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", (data) => {
        body += data;
      });
      res.on("end", async () => {
   
        body = JSON.parse(body);
        let result = body.data.filter(data => data.txnType === txnType)
       // console.log(result)

        resolve(result);
      });
    });
  });
}

async function main() {
  let test = await getUserTransaction(4, "debit", "02-2019");
  //console.log(test, 'main')
  return test;
}

console.log(main());
