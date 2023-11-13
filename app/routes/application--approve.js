module.exports = router => {

  router.get('/applications/:applicationId/approve', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    res.render('applications/approve/index', {
      application
    })
  })

  router.post('/applications/:applicationId/approve', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    application.status = 'Approved'
    application.approvedDate = new Date().toISOString()

    res.redirect(`/applications/${application.id}`)
  })


}