const _ = require('lodash')

module.exports = router => {

  router.get('/applications', (req, res) => {
    let applications = req.session.data.applications

    // ['Received', ...]
    let selectedStatusFilters = _.get(req.session.data.filters, 'statuses')

    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(_.get(selectedStatusFilters, 'length')) {
      applications = applications.filter(application => {
        let matchesStatus = true

        matchesStatus = selectedStatusFilters.includes(application.status);

        return matchesStatus
      })

      selectedFilters.categories.push({
        heading: { text: 'Status' },
        items: selectedStatusFilters.map(label => {
          return {
            text: label,
            href: `/applications/remove-status/${label}`
          }
        })
      })
    }

    res.render('applications/index', {
      applications,
      selectedFilters
    })
  })

  router.get('/applications/remove-status/:status', (req, res) => {
    _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
    res.redirect('/applications')
  })

  router.get('/applications/:applicationId', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    res.render('applications/show', {
      application
    })
  })




}