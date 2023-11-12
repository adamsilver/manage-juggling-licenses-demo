//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here
addFilter('statusColour', status => {
  switch(status) {
    case 'Received':
      return 'govuk-tag--purple'
    case 'Rejected':
      return 'govuk-tag--red'
    case 'Approved':
      return 'govuk-tag--green'
  }
})
