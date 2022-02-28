const fs = require('fs');

const linkExtractor = function(text){
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const results = [];
  let tmp;
  while((tmp = regex.exec(text)) !== null) {
    results.push({ [tmp[1]]: tmp[2] })
  }
  return results.length === 0 ? `No links were found on the specified file.` : results;
}

const errorHandler = function (error) {
  throw new Error(error.code, `No file were found on the specified path.`);
}

const catchText = async function (filePath) {
  const encoding = 'utf-8';
  try {
    const text = await fs.promises.readFile(filePath, encoding)
    return linkExtractor(text);
  } catch(error) {
    errorHandler(error);
  }
}

module.exports = catchText;