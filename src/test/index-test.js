const app = require('../index')
const request = require('supertest')
const {assert} = require('chai')

describe('Test API mysql', () => {
    describe('Get all request', () => {
        it('return status 200, data is not empty, , type json', async () => {
            const api = '/city'
            const response = await request(app).get(api).expect(200).expect('Content-Type', 'application/json; charset=utf-8')
            const resData = response.body
            assert.ok(resData)
        })
    })
    describe('Get city by name request', () => {
        it('request name = Ha-Noi, expect return status 200, type json', async () => {
            const api = '/city/name/Ha-Noi'
            request(app)
            .get(api)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
        it('request name = 12, expect return status 404, type json', async () => {
            const api = '/city/name/12'
            request(app)
            .get(api)
            .expect(404)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
        it('request name = quang ninh, expect return status 404, type json', async () => {
            const api = '/city/name/'
            request(app)
            .get(api)
            .expect(404)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
        it('request name = "" , expect return status 404, type json', async () => {
            const api = '/city/name/quang-ninh'
            request(app)
            .get(api)
            .expect(404)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
    })
    describe('Get city by id request', () => {
        it('request id = 2, expect return status 200, type json, name = Hà Nội', async () => {
            const api = '/city/id/2'
            const response = await request(app)
            .get(api)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')

            assert.equal(response.body.name, 'Hà Nội')
            assert.equal(response.body.zip, 1)
        })

        it('request id empty, expect return status 404, type json', async () => {
            const api = '/city/id/'
            request(app)
            .get(api)
            .expect(404)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })

        it('request id = abc, expect return status 400, type json', async () => {
            const api = '/city/id/abc'
            request(app)
            .get(api)
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
    })

    describe('Add city request', () => {
        it('request name = Long An zip = 2134345, expect return status 201, type json', async () => {
            const api = '/city/add'
            const response = await request(app)
            .post(api)
            .send({name: 'Long An', zip: 2134345})
            .expect(201)
            .expect('Content-Type', 'application/json; charset=utf-8')
            assert.ok(response.body.hasOwnProperty('id'))
            assert.equal(response.body.name, 'Long An')
            assert.equal(response.body.zip, 2134345)
        })

        it('request name = Bình Dương, zip is string, expect return status 400, type json', async () => {
            const api = '/city/add'
            request(app)
            .post(api)
            .send({name: 'Bình Dương', zip: ''})
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })

        it('request name is number, zip = 213214, expect return status 400, type json', async () => {
            const api = '/city/add'
            request(app)
            .post(api)
            .send({name: 123, zip: 213214})
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })

        it('request name empty, zip = 213214, expect return status 400, type json', async () => {
            const api = '/city/add'
            request(app)
            .post(api)
            .send({zip: 213214})
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })

        it('request name = Bình Dương, zip empty, expect return status 400, type json', async () => {
            const api = '/city/add'
            request(app)
            .post(api)
            .send({name: 'Bình Dương'})
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
    })

    describe('Update city request', () => {
        it('request id = 10 name = Cà Mau zip = 21343456, expect return status 200, type json', async () => {
            const api = '/city/update'
            request(app)
            .put(api)
            .send({id: 10, name: 'Cà Mau', zip: 21343456})
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
        it('request id empty name = Cà Mau zip = 2134345, expect return status 400, type json', async () => {
            const api = '/city/update'
            request(app)
            .put(api)
            .send({name: 'Cà Mau', zip: 2134345})
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
        it('request id invalid name = Cà Mau zip = 2134345, expect return status 400, type json', async () => {
            const api = '/city/update'
            request(app)
            .put(api)
            .send({id: 'hihi', name: 'Cà Mau', zip: 2134345})
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
        it('request id = 10 name empty zip empty, expect return status 400, type json', async () => {
            const api = '/city/update'
            await request(app)
            .put(api)
            .send({id: 10})
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
    })

    describe('delete city request', () => {
        it('request id = 15, expect return status 204, type json', async () => {
            const api = '/city/delete/15'
            request(app)
            .put(api)
            .expect(204)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
        it('request id empty, expect return status 400, type json', async () => {
            const api = '/city/delete/'
            request(app)
            .put(api)
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
        it('request id invalid, expect return status 400, type json', async () => {
            const api = '/city/delete/ahihi'
            request(app)
            .put(api)
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
        })
    })
})
