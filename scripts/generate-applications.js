const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker

const generateApplications = () => {
  return [{
    firstName: "Adam"
  }, {
    firstName: "Beth"
  }]
}

const generateApplicationsFile = (filePath) => {
  const applications = generateApplications()
  const filedata = JSON.stringify(applications, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Applications generated: ${filePath}`)
    }
  )
}

generateApplicationsFile(path.join(__dirname, '../app/data/applications.json'))