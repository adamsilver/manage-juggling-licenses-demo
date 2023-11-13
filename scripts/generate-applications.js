const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker


const generateApplication = () => {
  let application = {}

  // Application ID
  application.id = "" + faker.number.int({ min: 123456, max: 999999 })

  let now = new Date().toISOString()

  application.sentDate = faker.date.recent({ days: 21 })

  application.status = faker.helpers.arrayElement([
    'Received',
    'Approved',
    'Rejected'
  ])

  if(application.status == 'Rejected') {
    application.rejectedDate = faker.date.between({
      from: application.sentDate,
      to: now
    })
  }
  if(application.status == 'Approved') {
    application.approvedDate = faker.date.between({
      from: application.sentDate,
      to: now
    })
  }

  // Personal details
  application.personalDetails = {}
  application.personalDetails.firstName = faker.person.firstName()
  application.personalDetails.lastName = faker.person.lastName()
  application.personalDetails.emailAddress = `${application.personalDetails.firstName.toLowerCase()}.${application.personalDetails.lastName.toLowerCase()}@gmail.com`
  application.personalDetails.phoneNumber = faker.helpers.replaceSymbolWithNumber('079## ### ###')
  application.personalDetails.address = {
    line1: '1 The Avenue',
    town: 'London',
    postcode: 'W9 1ST'
  }

  // Experience
  application.experience = {}
  application.experience.numberOfBalls = faker.helpers.arrayElement([
    '3 or more',
    '1 or 2'
  ])
  application.experience.trick = faker.lorem.paragraphs(2, '\n\n')

  // Evidence
  application.evidence = {}
  application.evidence.hasEvidence = faker.helpers.arrayElement([
    'Yes',
    'No'
  ])
  if(application.evidence.hasEvidence == 'Yes') {
    application.evidence.files = [{
      name: 'trick-performance.mp4',
      size: '5MB'
    }, {
      name: 'juggling-show.mp4',
      size: '32MB'
    }, {
      name: 'testimonial.mp3',
      size: '2MB'
    }]
  }

  return application
}

const generateApplications = () => {
  const applications = []

  for(let i = 0; i < 100; i++) {
    applications.push(generateApplication())
  }

  return applications
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