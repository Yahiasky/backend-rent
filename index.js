require('dotenv').config()


// let PORT=process.env.PORT || 3500;
let express=require('express')
let app=express()
let credentials=require('./config/credentials')
const connection_MySQL=require('./MySql/connect')
const path=require('path')
const cors=require('cors')
const corsOptions=require('./config/corsOptions')
const verifyJwt=require('./verifyJWT.js')
let bodyParser=require('body-parser');
let cookieParser=require('cookie-parser')
const { PORT } = require('./data/info.js')
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//* for using request.body
app.use(bodyParser.json())
//* cors (who can access to server)

app.use(cors(corsOptions))
app.use(credentials)

//* for using cookies
app.use(cookieParser())




//=>
//*static files 
app.use('/',express.static(path.join(__dirname,'public')))
app.use('/users',express.static(path.join(__dirname,'public')))



//* routes







 app.use('/',require('./routes/root.js'))
app.use('/login',require('./routes/APIs/Login.js'))
app.use('/register',require('./routes/APIs/register.js'))
app.use('/logout',require('./routes/APIs/logout.js'))

// app.use('/AccessToken',require('./routes/APIs/AccessToken.js'))


// app.use(verifyJwt)

app.use('/users',require('./routes/APIs/users.js'))
app.use('/apartments',require('./routes/APIs/apartments.js'))
app.use('/filters',require('./routes/APIs/filters.js'))



















//* listen
app.listen(PORT,()=>console.log(`server running on port : ${PORT}`))
//*error
// app.use((err,req,res,next)=>{
//     console.log(`server log in from URL : ${req.originalUrl} `)

   
// })
