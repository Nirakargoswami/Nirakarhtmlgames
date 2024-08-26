const fs = require("fs")
const files = fs.readdirSync(__dirname)

for (const file of files) {
  if (
    file.indexOf(".") <= 2 &&
    file.indexOf(".") !== -1 &&
    file !== ".DS_Store"
  ) {
    const oldPath = __dirname + "/" + file
    const newPath = __dirname + "/" + file.slice(file.indexOf(".") + 1)
    fs.rename(oldPath, newPath, err => {
      console.log(err)
    })
    
  }
}
