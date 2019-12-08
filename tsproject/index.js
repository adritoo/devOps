"use strict";
//metrics
const metrics = require('./metrics.js')

///express
express = require('express')
app = express()

///path
path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// TEST //
///views
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');
app.set('port', 3000)

///GETs part
app.listen(     //port
  app.get('port'),
  () => console.log(`server listening on ${app.get('port')}`)
)
app.get('/', function (req, res) {    //menu
    res.send('Welcome in the second App : \n\n'+
    'path \'/hello\' to display the -hello name- mode.\n\n'+
    ' Path to be completed with parameter NAME :\n'+
    'it displays \'hello name\' \n'+
    'if no name : \'hello anonymous\''+
    'else : error 404')
})
app.get(    //helloanonymous page
  '/hello',
  (req, res) => res.send("hello anonymous")
)
app.get(    //hello name page
    '/hello/:name',
    (req, res) => res.render("hello.ejs" ,{name: req.params.name})
)

app.get('/metrics.json', (req, res) => {  //metrics display
  metrics.get((err, data) => {
  if(err) throw err
    res.status(200).json(data)
  })
})
