const Pagination = require('../helpers/pagination')

module.exports = router => {

  router.get('/activity', (req, res) => {
    let events = []

    req.session.data.applications.forEach(application => {
      const applicationEvents = application.events.map(event => {
        return {
          application,
          event
        }
      })

      events = events.concat(applicationEvents)
    })

    // Sort
    events.sort((a, b) => {
      return new Date(b.event.date) - new Date(a.event.date)
    })

    let pagination = new Pagination(events, req.query.page)
    events = pagination.getData()

    res.render('activity/index', {
      events,
      pagination
    })
  })

}