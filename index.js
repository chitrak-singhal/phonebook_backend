const express = require('express')
const app = express()
app.use(express.json())

let persons= [
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

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  let currentTime=5;
  app.use('/info',(req, res,next) => {
    currentTime = new Date().toLocaleString();
    console.log(`[${currentTime}] ${req.method} ${req.url}`);
    next();
  });
  app.get('/info',(request,response)=>{
    response.send(`
        <div>
            <p>Phonebook has info for ${persons.length} peopple.</p>
            <p>${currentTime}</p>
        </div>
    `)
  })
  app.get('/info/:id',(request,response)=>{
    id = Number(request.params.id)
    console.log(id)
    const name = persons.find(name=>name.id===id)
    if(!name)
        response.status(404).end()
    response.json(name)
})
app.delete('/info/:id',(request,response)=>{
    id = Number(request.params.id)
    console.log(id)
    persons = persons.filter(name=>name.id!==id)
    response.json(persons)
})
app.delete('/info/:id',(request,response)=>{
    id = Number(request.params.id)
    console.log(id)
    persons = persons.filter(name=>name.id!==id)
    response.json(persons)
})
app.post('/api/persons', (request, response) => {
    const name = request.body
    name.id = Math.floor(Math.random()*100000)
    if (!name.name)
        return response.status(400).json({
            error:'name missing'
    })
    if (!name.number)
        return response.status(400).json({
            error:'number missing'
    })
    let p = persons.filter(n=>n.name===name.name);
    p = p.length
    if (p!==0)
        {console.log(p)
        console.log('hi')
        return response.status(400).json({
            error:'name already exits'
    })}
    persons = persons.concat(name)
    console.log(name)
    response.json(name)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})