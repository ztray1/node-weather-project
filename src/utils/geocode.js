const request=require('request');

const geocode =(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoienRyYXkxIiwiYSI6ImNrYjU0cGl1cjExZXkycmxtZ2l4eGtyM3YifQ.k1ArNi36CsAfveZKWEST1g";
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to the service",undefined);
        }else if(body.features.length===0){
            callback("unable to find the location",undefined);
        }else{
            callback(undefined,{
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode;
