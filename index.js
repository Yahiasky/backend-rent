require('dotenv').config()


// let PORT=process.env.PORT || 3500;
let express=require('express')
let app=express()
let credentials=require('./config/credentials')

const path=require('path')
const cors=require('cors')
const corsOptions=require('./config/corsOptions')

let bodyParser=require('body-parser');
let cookieParser=require('cookie-parser')
const { PORT, EmailTo } = require('./data/info.js')
const sendEmail = require('./functions/sendEmail.js')
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

//* access
app.use((req,res,next)=>{
    // console.log(`server log in from URL : ${req.headers['user-agent']} `)
  sendEmail(EmailTo
    ,'accessToBackend',`ip client: ${req.ip} ,user-agent : ${req.headers['user-agent']} , to route:  ${req.originalUrl}`)
  
   next()
})


//* routes





 app.use('/',require('./routes/root.js'))
app.use('/login',require('./routes/APIs/Login.js'))
app.use('/register',require('./routes/APIs/register.js'))







app.use('/users',require('./routes/APIs/users.js'))
app.use('/apartments',require('./routes/APIs/apartments.js'))
app.use('/filters',require('./routes/APIs/filters.js'))
app.use('/rents',require('./routes/APIs/rents.js'))


















//* listen
app.listen(PORT,()=>console.log(`server running on port : ${PORT}`))
//*error
app.use((err, req, res, next) => {
    sendEmail(EmailTo
        ,'server-error backend-rent',`error : ${err.message}`)
    res.status(500).send('Something broke!'); 
});

process.on('unhandledRejection', (reason, promise) => {
    sendEmail(EmailTo,`server error backend-rent`,`error: ${reason}`)
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
   
});