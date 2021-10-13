
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

const app = express()
app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())
app.use(cors())
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get("/info", (request,response) =>{
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
    
})
app.get("/api/persons", (request, response) =>{
    response.json(persons)
})
app.get("/api/persons/:id", (req,res)=>{
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if(person)res.json(person)
    else res.status(404).end()
})
app.delete("/api/persons/:id", (req,res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})
app.post("/api/persons", (req,res)=>{
    const body =req.body;
    //console.log(body.content);
    if(!body.name || !body.number){
        return res.status(400).json({error:"name or number is missing"})
    }
    const name = body.name;
    const findPerson = persons.find(person => person.name === name)
    if(findPerson){
        return res.status(400).json({error:"name must be unique"})
    }
    const person = {
        id : Math.round(Math.random()*100),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person);
    console.log(persons);
    res.json(person)
})
const PORT = process.env.PORT ||3001;
app.listen(PORT, ()=>{
    console.log(`Server runnung on port ${PORT}`);
})