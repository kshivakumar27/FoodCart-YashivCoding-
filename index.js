const fs=require('fs');
const http=require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
const slugify=require('slugify');
// const hello ='hello world';
// console.log(hello);

//Blocking synchronous way
// const textIn=fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);
// // const textOut=('This is what we know about avacado :\n',textIn ,'\nCreated on:', Date());
// const textOut='This is what we know about avacado :' +textIn+ '\nCreated on:' +Date();
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log(textOut);
// console.log('file written in blocking synchronous way');


//Blocking in asynchronous way
// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//     if(err) return console.log("!ERROR HHHHH ");
//     console.log(data1);
//     fs.readFile(data1,(err,data2)=>{
//         console.log('-----------------');
//         console.log(data2);
//     fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//         console.log(data3);
//         console.log('-----------------Log 2------------------');
//     fs.writeFile('./txt/final.txt',+data1+'\n'+data2,'utf-8',err=>{
//         console.log('Your file will be written');
//         console.log(err);
//         });
//     });
//     });
// });
// console.log('file will readed');


//day2 learining tille 14th vedio of 2 chapter
//////////////////////////////////////////////////////////////////////////////////////////
//SERVER


// const data=fs.readFileSync('./dev-data/data.json','utf-8');
// const dataObj=JSON.parse(data);
   
    



// const server=http.createServer((req,res)=>{
//     //console.log(req);
//     //console.log(req.url);
//     // console.log(res);
//     const pathname=req.url;

//     //overview page
//     if(pathname==='/' || pathname==='/overview'){
//         res.end('This is overview');
//     }

//     //product page
//     else if(pathname==='/product'){ 
//         res.end('This is product');
//     }

//       //API page
//     else if(pathname==='/api'){

//         //below code is working i have itried alternative 
//         // res.end('This is API');
//         // fs.readFile('./dev-data/data.json','utf-8',(err,data)=>{
//         //     // console.log(data);
//         //     if(err) return console.log("!ERROR HHHHH ");
//         //     const productData=JSON.parse(data);
//         //     console.log(productData);
//         //     res.writeHead(200,{ 'content-type' : 'application/json' });
//         //     res.end(data);
            
//         // });


//         res.writeHead(200,{ 'content-type' : 'application/json' });
//         res.end(data);

        
//     }  

//     // Not found error page
//     else{
//         res.writeHead(404,{
//             'content-type':'text/html',
//             'my-own-header':'hello-world',
//         });
//         res.end('<h1>!PAGE NOT FOUND</h1>');
//     }

//     // res.end('Hello from the server');
// });

// server.listen(8000,'127.0.0.1', ()=>
// {
//     console.log("Listen to the request on port 8080");
// });


//3rd day onwards of 15th vedio

// const replaceTemplate=(temp,product)=>{
//     let output=temp.replace(/{%PRODUCTNAME%}/g,product.productName);

//      output=output.replace(/{%IMAGE%}/g,product.image);
//      output=output.replace(/{%PRICE%}/g,product.price);
//      output=output.replace(/{%FROM%}/g,product.from);
//      output=output.replace(/{%NUTRIENTS%}/g,product.nutrients);
//      output=output.replace(/{%QUANTITY%}/g,product.quantity);
//      output=output.replace(/{%DESCRIPTION%}/g,product.description);
//      output=output.replace(/{%ID%}/g,product.id);
//      if(!product.organic) output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
//      return output;
// }
const tempoverview=fs.readFileSync('./templates/template-overview.html','utf-8');
const tempproducts=fs.readFileSync('./templates/template-product.html','utf-8');
const tempcard=fs.readFileSync('./templates/template-card.html','utf-8');

const data=fs.readFileSync('./dev-data/data.json','utf-8');
const dataObj=JSON.parse(data);
   
    
console.log(slugify('FRESH AVACADO', { lower:true}));
const slug=dataObj.map(el=>slugify(el.productName,{lower:true}));
console.log(slug);

//el means elements
const server=http.createServer((req,res)=>{
    //console.log(req);
    console.log(req.url);
    // console.log(url.parse(req.url,true));
    // console.log(res);
    // const pathname=req.url;
    const {query,pathname}= url.parse(req.url,true);
    //overview page
    if(pathname==='/' || pathname==='/overview'){
        res.writeHead(200,{ 'content-type' : 'text/html' });

        const cardsHtml= dataObj.map(el=>replaceTemplate(tempcard,el)).join('');
        // console.log(cardsHtml)
        const output=tempoverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);
        // res.end(tempoverview);
    }

    //product page
    else if(pathname==='/product'){ 
        const product=dataObj[query.id];
        res.writeHead(200,{ 'content-type' : 'text/html' });
        const output=replaceTemplate(tempproducts, product);
        // console.log(output);
        res.end(output);
    //   console.log(query);
        // res.end(tempproducts);
    }

     //product page
     else if(pathname==='/card'){ 
        res.writeHead(200,{ 'content-type' : 'text/html' });
      
        res.end(tempcard);
    }

      //API page
    else if(pathname==='/api'){

        //below code is working i have itried alternative 
        // res.end('This is API');
        // fs.readFile('./dev-data/data.json','utf-8',(err,data)=>{
        //     // console.log(data);
        //     if(err) return console.log("!ERROR HHHHH ");
        //     const productData=JSON.parse(data);
        //     console.log(productData);
        //     res.writeHead(200,{ 'content-type' : 'application/json' });
        //     res.end(data);
            
        // });


        res.writeHead(200,{ 'content-type' : 'application/json' });
        res.end(data);

        
    }  

    // Not found error page
    else{
        res.writeHead(404,{
            'content-type':'text/html',
            'my-own-header':'hello-world',
        });
        res.end('<h1>!PAGE NOT FOUND</h1>');
    }

    // res.end('Hello from the server');
});

server.listen(8000,'127.0.0.1', ()=>
{
    console.log("Listen to the request on port 8080");
});