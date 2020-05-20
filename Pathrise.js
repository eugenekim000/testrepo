const https = require("https");

async function getUserTransaction(uid, txnType, monthYear) {
  let startTime, endTime
  const monthInput = monthYear.substring(0,2)
  const yearInput = monthYear.substring(3)

  let dateBounds = getDate(monthInput,yearInput)
  
  const url = `https://jsonmock.hackerrank.com/api/transactions/search?userId=${uid}`;

  let dataArray = []
  let amountArray = []
  let finalArray = []

  let urls = await getUrls(url);
  
  for (let getUrl of urls){
    let array = await getData(getUrl, txnType, dateBounds)
    dataArray = dataArray.concat(array)
  }
  
  for (let data of dataArray){  
    amountArray.push(parseFloat(data.amount.substring(1).replace(/,/, '')))  
  }
  
  let averageSpending = amountArray.reduce((a, b) => a + b, 0) / amountArray.length
  let averageCheck = amountArray.map(amount => amount > averageSpending)
  console.log(dataArray)
  
  finalArray = dataArray.filter((data, index) => { if (averageCheck[index]) return data } ).map(data => data.id)
  console.log(finalArray)
      
  return urls;
}

function getDate(month,year){
    const months = {
    '01':31,
    '02':28,
    '03': 31,
    '04':30,
    '05':31,
    '06': 30,
    '07': 31,
    '08': 31,
    '09':30,
    '10':31,
    '11':30,
    '12':31
  }
    
    let monthOffset = month - 1
    
    
    let startTime = new Date(year,monthOffset,'01').getTime()
    
    
    
    let endTime = new Date(year,monthOffset,months[month]).getTime()
    
  return [startTime,endTime]
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

function getData(url, txnType, dateBounds) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", (data) => {
        body += data;
      });
      res.on("end", async () => {
   
        body = JSON.parse(body);
        let result = body.data.filter(data => data.txnType === txnType).filter(data => data.timestamp <= dateBounds[1] && data.timestamp >= dateBounds[0])
        
        console.log(body)

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
