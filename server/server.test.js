const expect = require('expect');
const request = require('supertest');

const {app} = require('./server');
var {Todo} = require('./models/todo');
var {mongoose} = require('./db/mongoose');

var todos = [{text: "Todo1"}, {text: "Todo2"}];

beforeEach((done) => {
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(() => done());
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

                Todo.find({text})
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        expect(todos[0]._id).toBeDefined();
                        done();
                    })
                    .catch((e) => done(e));
            });
    });

    it('should return invalid request when trimmed text is empty', (done) => {
        var text = '  ';

        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .expect((res) => {
                expect(res.body.message).toBe('Todo validation failed: text: Path `text` (``) is shorter than the minimum allowed length (1).');
            })
            .end( (err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});

describe('GET /todos', () => {
    it('should return all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(2);
            })
            .end( (err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});
