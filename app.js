const http = require("http");
const server = http.createServer((req, res)=>{
    // res.end('Hello World');
    const method = req.method;
    // console.log(method)
    if(method === 'POST'){
        res.writeHead(200,{'Content-Type':'application/json'})
        // res.end("success");
        let response = JSON.stringify({
            success:true,
            messssage :"thank you for comming"
        })
        res.end(response)
    }else{
        res.writeHead(405,{'Content-Type':'application/json'})
        // res.end("success");
        let response = JSON.stringify({
            success:true,
            messssage :"method not allow"
        })
        res.end(response)
    }
});
server.listen(8001);