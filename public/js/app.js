
console.log("client server is started");
fetch("http://localhost:3000/weather?address=boston").then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            console.log(data.error);
        }else{
            console.log(data);
            console.log(data.location);
            console.log(data.temp);
        }
    })
})

const weatherForm=document.querySelector('form')
const result=document.querySelector("input");
const messageone=document.querySelector("#message-1");
const messagetwo=document.querySelector("#message-2");
weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const location = result.value;
    messageone.textContent="loading";
    messagetwo.textContent="";
        fetch("http://localhost:3000/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                messageone.textContent=data.error;
            }else{
                messageone.textContent=data.location;
                messagetwo.textContent=data.temp;
            }
        })
    })
})