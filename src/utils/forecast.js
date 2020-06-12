const request=require('request');
const forecast =(latitude,longitude,callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&%20exclude=hourly,daily&appid=a08285679350ed7ba9c3e40b7464fe40';

    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to the service",undefined);
        }else if(body.cod==="400"){
            callback("unable to find the location",undefined);
        }else{
            console.log(body);
            callback(undefined,"The weather of this city is "+body.current.weather[0].description+". The temperature of this city is "+(body.current.temp/32).toFixed(2)+" degree.");
        }
    })
}

module.exports=forecast;