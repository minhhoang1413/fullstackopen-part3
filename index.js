require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

const app = express()
app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())
app.use(cors())
app.use(express.static("build"))

const Person = require("./models/person")
// let persons = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]
app.get("/info", (request, response) => {
    Person.countDocuments({}).then(count=>{
        response.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`);
    })
    

})
app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })

})
app.get("/api/persons/:id", (req, res, next) => {
    // const id = Number(req.params.id);
    // const person = persons.find(person => person.id === id);
    // if(person)res.json(person)
    // else res.status(404).end()
    Person.findById(req.params.id).then(person => {
        res.json(person)
    }).catch(error => next(error))
})
app.delete("/api/persons/:id", (req, res, next) => {
    // const id = Number(req.params.id)
    // persons = persons.filter(person => person.id !== id)
    // res.status(204).end()
    Person.findByIdAndRemove(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => next(error))
})
app.post("/api/persons", (req, res,next) => {
    const body = req.body;
    //console.log(body.content);
    if (!body.name || !body.number) {
        return res.status(400).json({ error: "name or number is missing" })
    }
    // const name = body.name;
    // const findPerson = persons.find(person => person.name === name)
    // if(findPerson){
    //     return res.status(400).json({error:"name must be unique"})
    // }
    // const person = {
    //     id : Math.round(Math.random()*100),
    //     name: body.name,
    //     number: body.number
    // }
    // persons = persons.concat(person);
    // console.log(persons);
    // res.json(person)
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        res.json(savedPerson)
    }).catch(error => next(error))
})
app.put("/api/persons/:id",(req,res,next)=>{
    const body = req.body;
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(req.params.id,person,{new:true,runValidators: true})
            .then(updatedPerson => {
                res.json(updatedPerson)
            }).catch(error => next(error))
})
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } 
    if (error.name === "ValidationError") {
        return response.status(400).json({error:error.message})
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server runnung on port ${PORT}`);
})