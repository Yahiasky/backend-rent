let bcrypt=require('bcrypt')
let c1
let c=async()=> { c1=await bcrypt.hash('yahia',10)
 console.log(c1)}
c()