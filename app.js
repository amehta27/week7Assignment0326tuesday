const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()
var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mustache',mustacheExpress())
// the pages are located in views directory
app.set('views','./views')
// extension will be .mustache
app.set('view engine','mustache')

let trips = [
  // {title:"Italy", image:"http:/",date_departure:"03/24/19", date_return:"04/24/19"},
  // {title:"santorini", image:"http:/",date_departure:"04/24/19", date_return:"05/10/19"},
  // {title:"switzerland", image:"http:/",date_departure:"05/10/19", date_return:"05/31/19"}
]

let users = []

app.get('/add-trip', (req, res) => {
  res.render('add-trip.mustache')
})

app.get('/trips',(req,res) => {
console.log(req.session.username)
  let userTrips = trips.filter((trip) => trip.username == req.session.username)

  res.render('trips',{tripList: userTrips, username :req.session.username})
})

app.post('/add-trip',(req,res) => {

  let tripTitle = req.body.tripTitle
  let tripImage = req.body.tripImage
  let tripDate_Departure = req.body.tripDate_Departure
  let tripDate_return = req.body.tripDate_Departure


  let trip = {title: tripTitle, image: tripImage, date_departure: tripDate_Departure, date_return: tripDate_return,
  username: req.session.username}
  trips.push(trip)

  res.redirect('/trips')
  console.log(tripTitle)
  console.log(tripImage)
})


app.post('/trip/delete',(req,res) => {
   let title = req.body.title
   trips = trips.filter(function(trip){
     return trip.title != title
   })
  res.render('trips',{tripList: trips})

})
  // let user = { name: name, age: age}
  // users.push(user)
  //
  // res.redirect('/users')

  app.get('/login',function(req,res){
     res.render("login")
  })



  app.post('/login',(req,res) => {

    let username = req.body.username
    let password = req.body.password


    let persistedUser = users.find((user) => {
      return user.userName == username && user.password == password
    })

    if(persistedUser) {
      // save username to the session
      if(req.session){
          req.session.username = persistedUser.userName
          console.log(req.session.username)
          //req.session.age = 12
          //req.session.user = { username: persistedUser.username, age: 45}
          res.redirect('/add-trip')
      }

    } else {
      //res.redirect('/login')
      res.render('login',{message: 'Invalid Credentials!!'})
    }

  })



  app.get('/register',function(req,res){
     res.render("register")
  })



  app.post("/register", (req,res) =>{
    let name = req.body.name
    let userName = req.body.userName
    let password = req.body.password

    let user = {name:name,userName:userName,password:password}
    users.push(user)
    res.redirect("/login")
  })


app.listen(3000,() => {
  console.log("Server is running...")
})








// You are in charge of creating a website for tracking trips. You will use server side pages using Mustache or
// any other server side template framework for this assignment.
//
// Your app should allow users to do the following:
//
// - Ability to add a new trip. A new trip consists of title, image, date of departure, date of return
//
// - Ability to view all the trips (A sample screenshot is shown below. Screenshot is just for demoeing purposes you can
// design your app however you want)
