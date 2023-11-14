const _ = require('lodash')

module.exports = router => {

  router.get('/applications/:applicationId/edit-name', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    let firstName = _.get(req, 'session.data.editName.firstName') || application.personalDetails.firstName
    let lastName = _.get(req, 'session.data.editName.lastName')  || application.personalDetails.lastName

    res.render('applications/edit-name/index', {
      application,
      firstName,
      lastName
    })
  })

  router.post('/applications/:applicationId/edit-name', (req, res) => {
    res.redirect(`/applications/${req.params.applicationId}/edit-name/check`)
  })

  router.get('/applications/:applicationId/edit-name/check', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    res.render('applications/edit-name/check', {
      application
    })
  })

  router.post('/applications/:applicationId/edit-name/check', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    // Update the application
    application.personalDetails.firstName = req.session.data.editName.firstName
    application.personalDetails.lastName = req.session.data.editName.lastName

    // Clear temporary form data
    delete req.session.data.editName

    req.flash('success', 'Applicant name updated')

    res.redirect(`/applications/${req.params.applicationId}`)

  })


}