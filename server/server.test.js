const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./server');
var {Todo} = require('./models/todo');
var {mongoose} = require('./db/mongoose');

var todos = [
    {_id: new ObjectID(), text: "Todo123"}, 
    {_id: new ObjectID(), text: "Todo124"}
];

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
            .end(done);
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
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return 404 when id is invalid', (done) => {
        request(app)
            .get('/todos/adsfasdfasfafadfasfsdafadsfasf')
            .expect(404)
            .end(done);
    });
    
    it('should return 404 when id does not exist', (done) => {
        request(app)
            .get('/todos/12345')
            .expect(404)
            .end(done);
    });

    it('should return the Todo identified by id', (done) => {
        request(app)
            .get('/todos/'+todos[0]._id.toHexString())
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text);
            })
            .end(done);
    });
});

