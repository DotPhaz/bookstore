'use strict'

afterAll(() => fastify.close())

describe("Get /", () => {
  test("should return 200", async () => {
  
      const response = await fastify.inject({
          method: 'GET',
          url: '/'
      })
      expect(response.statusCode).toEqual(200)
      expect(response.json()).toHaveProperty('hello')
      expect(response.json().hello).not.toBeNull()
  })

  test("api/books should return 200", async () => {
    const response = await fastify.inject({
        method: 'GET',
        url: '/api/books'
      })
    expect(response.statusCode).toEqual(200)
    expect(response.json()).toHaveProperty('books')
    expect(response.json().books).not.toBeNull()
  })
  
  test("api/books/id should return error 500 and internal error", async () => {
    const response = await fastify.inject({
        method: 'GET',
        url: '/api/books/fake_id'
      })
    expect(response.statusCode).toEqual(500)
    expect(response.json()).toHaveProperty('error')
    expect(response.json().error).toBe("Internal Server Error")
  })
  
  test("api/books/id should return error 500 and internal error", async () => {
    const response = await fastify.inject({
        method: 'GET',
        url: '/api/books/fake_id'
      })
    expect(response.statusCode).toEqual(500)
    expect(response.json()).toHaveProperty('error')
    expect(response.json().error).toBe("Internal Server Error")
  })
})

describe("POST /api/books", () => {
  test("should add a book", async () => {
  
      const response = await fastify.inject({
          method: 'POST',
          url: '/api/books',
          body: {
              _id: 'test',
              name: "Book Test",
              author: "Author Test",
              year: 2017,
          }
      })
      expect(response.statusCode).toEqual(200)
      expect(response.json()[0]).toHaveProperty('insertedId')
      expect(response.json().inserdId).not.toBeNull()
  })

})
