const expect = require('expect');
const request = require('supertest');

const {app} = require('./server');
var {Todo} = require('./models/todo');
var {mongoose} = require('./db/mongoose');

beforeEach((done) => {
    Todo.remove({}).then(()=> done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'To do text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end( (err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({})
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        expect(todos[0]._id).toBeDefined();
                        done();
                    })
                    .catch((e) => done(e));
            });
    });
});
