const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mustache',mustacheExpress())
// the pages are located in views directory
app.set('views','./views')
// extension will be .mustache
app.set('view engine','mustache')

let trips = [
  {title:"Italy", image:"http:/",date_departure:"03/24/19", date_return:"04/24/19"},
  {title:"santorini", image:"http:/",date_departure:"04/24/19", date_return:"05/10/19"},
  {title:"switzerland", image:"http:/",date_departure:"05/10/19", date_return:"05/31/19"}
]

app.get('/add-trip', (req, res) => {
  res.render('add-trip.mustache')
})

app.get('/trips',(req,res) => {
  res.render('trips',{tripList: trips})
})

app.post('/add-trip',(req,res) => {

  let tripTitle = req.body.tripTitle
  let tripImage = req.body.tripImage
  let tripDate_Departure = req.body.tripDate_Departure
  let tripDate_return = req.body.tripDate_Departure


  let trip = {title: tripTitle, image: tripImage, date_departure: tripDate_Departure, date_return: tripDate_return}
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
