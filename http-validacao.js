const fetch = require('node-fetch');

function errorHandler(error) {
  throw new Error(error.message);
}

async function checkStatus(arrayURLs) {
  try {
    return await Promise.all(arrayURLs.map(async url => {
      const res = await fetch(url)
      return `${res.status} - ${res.statusText}`;
    }))
  } catch(error) {
    errorHandler(error);
  }
}

function generateURLArray(arrayLinks) {
  return arrayLinks.map(objectLink => Object.values(objectLink).join());
}

async function urlValidator(arrayLinks) {
  const links = generateURLArray(arrayLinks);
  const linkStatus = await checkStatus(links);
  
  return arrayLinks.map((obj, index) => ({...obj,status: linkStatus[index]}));
}

module.exports = urlValidator;