module.exports = router => {

  router.get('/applications/:applicationId/reject', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    res.render('applications/reject/index', {
      application
    })
  })

  router.post('/applications/:applicationId/reject', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    application.status = 'Rejected'
    application.rejectedDate = new Date().toISOString()

    res.redirect(`/applications/${application.id}`)
  })


}