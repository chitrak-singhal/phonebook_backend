const express = require('express')
const app = express()

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

 

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})