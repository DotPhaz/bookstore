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
})

describe("Get /api/books", () => {
  test("api/books should return 200", async () => {
      const response = await fastify.inject({
          method: 'GET',
          url: '/api/books'
        })
      expect(response.statusCode).toEqual(200)
      expect(response.json()).toHaveProperty('books')
      // expect(response.json().hello).not.toBeNull()
  })
})
