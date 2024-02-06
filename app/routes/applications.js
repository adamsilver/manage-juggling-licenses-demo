const _ = require('lodash')
const Pagination = require('../helpers/pagination')

module.exports = router => {

  router.get('/applications', (req, res) => {
    let applications = req.session.data.applications

    let emailAddress = _.get(req.session.data.search, 'emailAddress')

    if(emailAddress) {
      applications = applications.filter(application => {
        return application.personalDetails.emailAddress.indexOf(emailAddress) > -1
      })
    }

    // ['Received', ...]
    let selectedSubjectFilters = _.get(req.session.data.filters, 'subjects')
    let selectedStatusFilters = _.get(req.session.data.filters, 'statuses')
    let selectedNumberOfBallsFilters = _.get(req.session.data.filters, 'numberOfBalls')

    let hasFilters = _.get(selectedSubjectFilters, 'length') || _.get(selectedStatusFilters, 'length') || _.get(selectedNumberOfBallsFilters, 'length')

    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(hasFilters) {
      applications = applications.filter(application => {
        let matchesSubject = true
        let matchesStatus = true
        let matchesNumberOfBalls = true

        if(_.get(selectedStatusFilters, 'length')) {
          matchesStatus = selectedStatusFilters.includes(application.status);
        }

        if(_.get(selectedNumberOfBallsFilters, 'length')) {
          matchesNumberOfBalls = selectedNumberOfBallsFilters.includes(application.experience.numberOfBalls);
        }

        return matchesStatus && matchesNumberOfBalls
      })
    }

    if(_.get(selectedSubjectFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Subject' },
        items: selectedSubjectFilters.map(label => {
          return {
            text: label,
            href: `/applications/remove-subject/${label}`
          }
        })
      })
    }

    if(_.get(selectedStatusFilters, 'length')) {
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

    if(_.get(selectedNumberOfBallsFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Number of balls' },
        items: selectedNumberOfBallsFilters.map(label => {
          return {
            text: label,
            href: `/applications/remove-numberOfBalls/${label}`
          }
        })
      })
    }

    let pageSize = 25
    let pagination = new Pagination(applications, req.query.page, pageSize)
    applications = pagination.getData()

    let selectedSubjectItems

    if(selectedSubjectFilters) {
      selectedSubjectItems = selectedSubjectFilters.map(item => {
        return {
          href: `/applications/remove-subject/${item}`,
          text: item
        }
      })
    }

    res.render('applications/index', {
      applications,
      selectedFilters,
      pagination,
      selectedSubjectItems
    })
  })

  router.get('/applications/clear-search', (req, res) => {
    _.set(req, 'session.data.search.emailAddress', '')
    res.redirect('/applications')
  })

  router.get('/applications/remove-subject/:subject', (req, res) => {
    _.set(req, 'session.data.filters.subjects', _.pull(req.session.data.filters.subjects, req.params.subject))
    res.redirect('/applications')
  })

  router.get('/applications/remove-status/:status', (req, res) => {
    _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
    res.redirect('/applications')
  })

  router.get('/applications/remove-numberOfBalls/:numberOfBalls', (req, res) => {
    _.set(req, 'session.data.filters.numberOfBalls', _.pull(req.session.data.filters.numberOfBalls, req.params.numberOfBalls))
    res.redirect('/applications')
  })

  router.get('/applications/clear-filters', (req, res) => {
    _.set(req, 'session.data.filters.statuses', null)
    _.set(req, 'session.data.filters.numberOfBalls', null)
    res.redirect('/applications')
  })

  router.get('/applications/:applicationId', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    res.render('applications/show', {
      application
    })
  })




}