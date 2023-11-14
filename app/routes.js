const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const flash = require('connect-flash')
router.use(flash())

router.all('*', (req, res, next) => {
  res.locals.flash = req.flash('success')
  next()
})

require('./routes/account')(router)
require('./routes/applications')(router)
require('./routes/application--approve')(router)
require('./routes/application--reject')(router)
require('./routes/application--edit-name')(router)