const fs = require("fs")
const path = require("path")

const files = fs.readdirSync(__dirname)

for (const f of files) {
  const directoryPath = path.join(__dirname, f)
  //console.log(directoryPath)
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return "Unable to scan directory: "
    }
    //listing all files using forEach
    files.forEach(function (file) {
      if (!file.includes(".capx")) {
        console.log(`${f}/${file}/index.html`)
      }
      // Do whatever you want to do with the file
    })
  })
}
