import express, { Application, Request, Response } from 'express'


const PORT = process.env.PORT || 3000


// create an instance server
const app: Application = express()






// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})
  
app.get('/a', (req: Request, res: Response) => {
  res.json({
    message: 'Hello universe 🌍'
  })
})



// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot: https://localhost:${PORT}`)
})

export default app