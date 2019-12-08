var express = require('express')

import { MetricsHandler } from './metrics'

var path = require('path')
var app = express()
const bodyParser = require("body-parser")
const port: string = process.env.PORT || '3000'

const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')


app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded())

app.get('/metrics', (req: any, res: any) => {
  dbMet.getAll((err: Error | null, result?: any) => {
    if (err) throw err

    res.json(result)
  })
})

app.route('/metrics/:id')

  .get((req: any, res: any) => {
    dbMet.get(req.params.id, (err: Error | null, result?: any) => {
      if (err) res.json(err)


      res.json(result)
    })
  })

  .post((req: any, res: any) => {
    console.log("Post request", req.body);
    dbMet.save(req.params.id, req.body, (err: Error | null) => {
      if (err) res.json(err)
      res.json("ok")
    })
  })
  .delete((req: any, res: any) => {
    console.log("Del request", req.params.id);
    dbMet.delete(req.params.id, (err: Error | null) => {
      if (err) {
        res.json(err)
        return
      }
      res.json("Element deleted")
    })
  })

  
app.get('/', (req: any, res: any) => {
  res.write('Hello world')
  res.end()
})


app.get('/hello/:name', (req,res)=> {
  res.status(200);    
  res.type('text/html')
  res.render('hello.ejs',{name:req.params.name});
  
});

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})