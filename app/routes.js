//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

require('./routes/account')(router)
require('./routes/applications')(router)
require('./routes/application--approve')(router)
require('./routes/application--reject')(router)