

const routes = require('../routes/routes')



test("should return {hello: 'world'}", () => {
    const response = routes.inject({
        method: 'GET',
        url: '/'
      })
    expect(response.statusCode).toBe(200)
    console.log('status code: ', response.statusCode)
    console.log('body: ', response.body)
})