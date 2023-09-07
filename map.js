let arrData=[];
let markers=[];
let arrGeometry=[];

function StoresVehiclesData(NumberOfStores,NumberOfVehicles,Cars)
{
for(let i=0;i<NumberOfStores;i++)
{
    let hasIcy=Math.random();
    let randomValue=Math.random()*200;
    let randomValueBetween;
    if(hasIcy>0.5)
    {
    randomValueBetween=getRandomValueBetween(0,randomValue);
    }
    else{
        randomValueBetween=0;
    }
    let obj={
        Name:`Store ${i+1}`,
        market:"Store",
        vehicles:[],
        "Total Orders":Math.floor(randomValue),
        "Not Icy Orders":Math.floor(randomValue)-Math.floor(randomValueBetween),
        "Icy Orders":Math.floor(randomValueBetween),
    }
    arrData.push(obj);
}

for(let i=0;i<NumberOfVehicles;i++)
{
    let obj={
        Name:` Vehicle ${i+1}`,
        market:"Vehicle",
        Type:Cars[i].type,
        stores:[],
        "Full Capacity":Cars[i].capacity,
        "Fridge":Cars[i].fridge,
    }
    if(Cars[i].fridge!="no")
    {
        let Total_Icy_Curr=getRandomValueBetween(0,Cars[i].fridge);
        let NotIcy=Cars[i].capacity - Cars[i].fridge;
        let randomValue=getRandomValueBetween(0,NotIcy);

        obj["Current Orders on Vehicle'Fridge"]=Total_Icy_Curr;
        obj["Free Fridge's Orders"]=Cars[i].fridge-Total_Icy_Curr;

        obj["Not Fridge"]=NotIcy;
        obj["Current Not Icy Orders"]=randomValue;
        obj["Free Not Icy Orders"]=NotIcy-randomValue;
    }
    else 
    {
        let Total_Curr=getRandomValueBetween(0,Cars[i].capacity);

        obj["Current Not Icy Orders"]=Total_Curr;
        obj["Free Not Icy Orders"]=Cars[i].capacity-Total_Curr;
    }
    arrData.push(obj);
}
sessionStorage.setItem("StoresVehiclesData",JSON.stringify(arrData));

console.log(arrData);
}
StoresVehiclesData(JSON.parse(sessionStorage.counterStores),JSON.parse(sessionStorage.counterVehicles),JSON.parse(sessionStorage.Vehicles));

function getRandomValueBetween(min,max)
{
    let ran=Math.random()*max;
    return Math.floor(ran);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// async function geometry(city,country) {
//     const response = await fetch(
//     `https://api.opencagedata.com/geocode/v1/json?q=${city}+${country}&key=fd1afb5ada0448678771df233951c691`);
//     const data = await response.json();

//     arrGeometry.push(data.results[0].geometry.lat);
//     arrGeometry.push(data.results[0].geometry.lng);

//     // window.sessionStorage.setItem("lat",JSON.stringify(lat));
//     // window.sessionStorage.setItem("lng",JSON.stringify(lng));
//     console.log(arrGeometry)
// }
// geometry(City,Country);

function StoreToVehicles(NumberOfStores,NumberOfVehicles)
{
    for(let store=0;store<NumberOfStores;store++)
    {
        for(let vehicle=NumberOfStores;vehicle<(NumberOfStores+NumberOfVehicles);vehicle++)
        {
            let storeObj  =arrData[store] ;
            let vehicleObj=arrData[vehicle];
            if(vehicleObj["Fridge"]!="no")
            {
                if(storeObj["Icy Orders"] > 0 && vehicleObj["Free Fridge's Orders"] > 0 )
                {
                    if(storeObj["Icy Orders"]>= vehicleObj["Free Fridge's Orders"])
                    {
                        vehicleObj["Current Orders on Vehicle'Fridge"]+=vehicleObj["Free Fridge's Orders"];
                        storeObj["Icy Orders"]=storeObj["Icy Orders"]-vehicleObj["Free Fridge's Orders"];
                        
                        let Quantity = vehicleObj["Free Fridge's Orders"];
                        let TypeOFOrders = "Icy Orders";
                        
                        let storeObject={"Name":storeObj["Name"],"Quantity": Quantity ,"Type":TypeOFOrders};
                        let vehicleObject={"Name":vehicleObj["Name"],"Quantity": Quantity ,"Type":TypeOFOrders};

                        vehicleObj.stores.push(storeObject);
                        storeObj.vehicles.push(vehicleObject);

                        vehicleObj["Free Fridge's Orders"]=0;
                    }
                    else 
                    {
                        vehicleObj["Free Fridge's Orders"]=vehicleObj["Free Fridge's Orders"]-storeObj["Icy Orders"];
                        vehicleObj["Current Orders on Vehicle'Fridge"]+=storeObj["Icy Orders"];
                        
                        let Quantity = storeObj["Icy Orders"];
                        let TypeOFOrders = "Icy Orders";
                        
                        let storeObject={"Name":storeObj["Name"],"Quantity": Quantity ,"Type":TypeOFOrders};
                        let vehicleObject={"Name":vehicleObj["Name"],"Quantity": Quantity ,"Type":TypeOFOrders};

                        vehicleObj.stores.push(storeObject);
                        storeObj.vehicles.push(vehicleObject);

                        storeObj["Icy Orders"]=0;

                    }
                }
            }
            if(storeObj["Not Icy Orders"] > 0 && vehicleObj["Free Not Icy Orders"] > 0 )
            {
                if(storeObj["Not Icy Orders"]>= vehicleObj["Free Not Icy Orders"])
                {
                    vehicleObj["Current Not Icy Orders"]+=vehicleObj["Free Not Icy Orders"];
                    storeObj["Not Icy Orders"]=storeObj["Not Icy Orders"]-vehicleObj["Free Not Icy Orders"];

                    let Quantity = vehicleObj["Free Not Icy Orders"];;
                    let TypeOFOrders = "Not Icy Orders";
                    
                    let storeObject={"Name":storeObj["Name"],"Quantity": Quantity ,"Type":TypeOFOrders};
                    let vehicleObject={"Name":vehicleObj["Name"],"Quantity": Quantity ,"Type":TypeOFOrders};

                    vehicleObj.stores.push(storeObject);
                    storeObj.vehicles.push(vehicleObject);

                    vehicleObj["Free Not Icy Orders"]=0;
                    
                }
                else 
                {
                    vehicleObj["Free Not Icy Orders"]=vehicleObj["Free Not Icy Orders"]-storeObj["Not Icy Orders"];
                    vehicleObj["Current Not Icy Orders"]+=storeObj["Not Icy Orders"];

                    let Quantity = storeObj["Not Icy Orders"];
                    let TypeOFOrders = "Not Icy Orders";
                    
                    let storeObject={"Name":storeObj["Name"],"Quantity": Quantity ,"Type":TypeOFOrders};
                    let vehicleObject={"Name":vehicleObj["Name"],"Quantity": Quantity ,"Type":TypeOFOrders};

                    vehicleObj.stores.push(storeObject);
                    storeObj.vehicles.push(vehicleObject);

                        
                    storeObj["Not Icy Orders"]=0;
                    
                }
            }
            
        }
        
    }
}
StoreToVehicles(JSON.parse(sessionStorage.counterStores),JSON.parse(sessionStorage.counterVehicles));

function getPoint(lat,lng)
{
    let radius=0.02;

    let min_X=lat-radius;
    let max_X=lat+radius;

    let min_Y=lng-radius;
    let max_Y=lng+radius;

    let x,y;
    let r=0;
    while(r<10){
        x =Math.random()*((max_X-min_X)) + min_X;
        y=Math.random()*((max_Y-min_Y)) + min_Y;;
        if(Math.pow((x-lat),2) + Math.pow((y-lng),2) <= Math.pow(radius,2))
        {
            return[x,y];
            
        }
        r++;
        }
}

function markersMap(NumberOfStores,NumberOfVehicles){
    for(let k=0 ; k<NumberOfStores+NumberOfVehicles ; k++){
        let infoStoresAndVehicles =JSON.parse(sessionStorage.StoresVehiclesData);
        if(infoStoresAndVehicles[k].market=="Vehicle" && arrData[k].market=="Vehicle"){
            let div = document.createElement("div");
            for(let i=0;i<arrData[k].stores.length;i++){
            let text;
            Object.entries(arrData[k].stores[i]).forEach(([key, value]) => {
            text=document.createTextNode(`${key} : ${value} || `);
            div.appendChild(text);
            })
            div.appendChild(document.createElement("hr"))
            }
            markers[k]=
            {
                "position":{ "lat": getPoint(27.18096,31.18368)[0], "lng":getPoint(27.18096 , 31.18368)[1] },
                "titel": infoStoresAndVehicles[k].Name
            }
            if(infoStoresAndVehicles[k].Type=="Car" && arrData[k].Type=="Car" ){
                let image = {
                    url: "https://img.icons8.com/bubbles/50/000000/car.png"
                };
                markers[k].icon=image;
                if(infoStoresAndVehicles[k].Fridge!="no")
                {
                    markers[k].info=`<div>
                    <div class="row">
                        <div class="col s12 m6 l6 responsive-img">
                        <img src="https://img.icons8.com/bubbles/50/000000/car.png" >
                        </div>
                        <div class="col s12 m6 l6" style="padding-top: 20px ;">
                        <b>Type: <span style="color:#509958;font-weight: bold;">${infoStoresAndVehicles[k].Type}</span></b>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <ul>
                                <li><p>Full Capacity :<span style="color:#509958">${infoStoresAndVehicles[k]["Full Capacity"]}</span></p></li>
                                <li><p>Not Fridge :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Not Fridge"]} <span></p></li>
                                <li><p>Current Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Current Not Icy Orders"]}</span></p></li>
                                <li><p>Free Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Free Not Icy Orders"]} <span></p></li>
                            </ul>
                        </div>
                        <div class="col s12">
                            <ul>
                                <li><p>Capacity of Fridge :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Fridge"]}</span></p></li>
                                <li><p>Current Icy Orders  :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Current Orders on Vehicle'Fridge"]} <span></p></li>
                                <li><p>Free Fridge's Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Free Fridge's Orders"]}</span></p></li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                        <b><span style="color:#D8A533">${div.innerHTML}</span></p>
                        </div>
                </div>
                    `;
                }
                else
                {
                    markers[k].info=`
                    <div>
                        <div class="row">
                            <div class="col s12 m6 l6 responsive-img">
                            <img src="https://img.icons8.com/bubbles/50/000000/car.png" >
                            </div>
                            <div class="col s12 m6 l6" style="padding-top: 20px ;">
                            <b>Type: <span style="color:#509958; font-weight: bold;">${infoStoresAndVehicles[k].Type}</span></b>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <ul>
                                    <li><p>Full Capacity :<span style="color:#509958">${infoStoresAndVehicles[k]["Full Capacity"]}</span></p></li>
                                    <li><p>Current Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Current Not Icy Orders"]}</span></p></li>
                                    <li><p>Free Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Free Not Icy Orders"]} <span></p></li>
                                </ul>
                            </div>
                            <div class="col s12">
                                <ul>
                                    <li><p>Capacity of Fridge :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Fridge"]}</span></p></li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                            <b><span style="color:#D8A533">${div.innerHTML}</span></p>
                            </div>
                    </div>
                    `;
                }
            }

            else if(infoStoresAndVehicles[k].Type=="Bicycle" && arrData[k].Type=="Bicycle")
            {
                let image = {
                    url: "https://img.icons8.com/bubbles/50/bicycle.png",
                };
                markers[k].icon=image;
                if(infoStoresAndVehicles[k].Fridge!="no")
                {
                    markers[k].info=`<div>
                    <div class="row">
                        <div class="col s12 m6 l6 responsive-img">
                        <img src="https://img.icons8.com/bubbles/50/000000/car.png" >
                        </div>
                        <div class="col s12 m6 l6" style="padding-top: 20px ;">
                        <b>Type: <span style="color:#509958;font-weight: bold;">${infoStoresAndVehicles[k].Type}</span></b>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <ul>
                                <li><p>Full Capacity :<span style="color:#509958">${infoStoresAndVehicles[k]["Full Capacity"]}</span></p></li>
                                <li><p>Not Fridge :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Not Fridge"]} <span></p></li>
                                <li><p>Current Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Current Not Icy Orders"]}</span></p></li>
                                <li><p>Free Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Free Not Icy Orders"]} <span></p></li>
                            </ul>
                        </div>
                        <div class="col s12">
                            <ul>
                                <li><p>Capacity of Fridge :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Fridge"]}</span></p></li>
                                <li><p>Current Icy Orders  :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Current Orders on Vehicle'Fridge"]} <span></p></li>
                                <li><p>Free Fridge's Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Free Fridge's Orders"]}</span></p></li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                        <b><span style="color:#D8A533">${div.innerHTML}</span></p>
                        </div>
                </div>
                    `;
                }
                else
                {
                    markers[k].info=`
                    <div>
                        <div class="row">
                            <div class="col s12 m6 l6 responsive-img">
                            <img src="https://img.icons8.com/bubbles/50/000000/car.png" >
                            </div>
                            <div class="col s12 m6 l6" style="padding-top: 20px ;">
                            <b>Type: <span style="color:#509958; font-weight: bold;">${infoStoresAndVehicles[k].Type}</span></b>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <ul>
                                    <li><p>Full Capacity :<span style="color:#509958">${infoStoresAndVehicles[k]["Full Capacity"]}</span></p></li>
                                    <li><p>Current Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Current Not Icy Orders"]}</span></p></li>
                                    <li><p>Free Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Free Not Icy Orders"]} <span></p></li>
                                </ul>
                            </div>
                            <div class="col s12">
                                <ul>
                                    <li><p>Capacity of Fridge :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Fridge"]}</span></p></li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                            <b><span style="color:#D8A533">${div.innerHTML}</span></p>
                            </div>
                    </div>
                    `;
                }
            }

            else
            {
                let image = {
                    url: "https://img.icons8.com/bubbles/50/000000/motorbike-helmet.png",
                    
                };
                markers[k].icon=image;
                if(infoStoresAndVehicles[k].Fridge!="no")
                {
                    markers[k].info=`<div>
                    <div class="row">
                        <div class="col s12 m6 l6 responsive-img">
                        <img src="https://img.icons8.com/bubbles/50/000000/car.png" >
                        </div>
                        <div class="col s12 m6 l6" style="padding-top: 20px ;">
                        <b>Type: <span style="color:#509958;font-weight: bold;">${infoStoresAndVehicles[k].Type}</span></b>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <ul>
                                <li><p>Full Capacity :<span style="color:#509958">${infoStoresAndVehicles[k]["Full Capacity"]}</span></p></li>
                                <li><p>Not Fridge :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Not Fridge"]} <span></p></li>
                                <li><p>Current Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Current Not Icy Orders"]}</span></p></li>
                                <li><p>Free Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Free Not Icy Orders"]} <span></p></li>
                            </ul>
                        </div>
                        <div class="col s12">
                            <ul>
                                <li><p>Capacity of Fridge :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Fridge"]}</span></p></li>
                                <li><p>Current Icy Orders  :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Current Orders on Vehicle'Fridge"]} <span></p></li>
                                <li><p>Free Fridge's Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Free Fridge's Orders"]}</span></p></li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                        <b><span style="color:#D8A533">${div.innerHTML}</span></p>
                        </div>
                </div>
                    `;
                }
                else
                {
                    markers[k].info=`
                    <div>
                        <div class="row">
                            <div class="col s12 m6 l6 responsive-img">
                            <img src="https://img.icons8.com/bubbles/50/000000/car.png" >
                            </div>
                            <div class="col s12 m6 l6" style="padding-top: 20px ;">
                            <b>Type: <span style="color:#509958; font-weight: bold;">${infoStoresAndVehicles[k].Type}</span></b>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <ul>
                                    <li><p>Full Capacity :<span style="color:#509958">${infoStoresAndVehicles[k]["Full Capacity"]}</span></p></li>
                                    <li><p>Current Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Current Not Icy Orders"]}</span></p></li>
                                    <li><p>Free Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Free Not Icy Orders"]} <span></p></li>
                                </ul>
                            </div>
                            <div class="col s12">
                                <ul>
                                    <li><p>Capacity of Fridge :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Fridge"]}</span></p></li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                            <b><span style="color:#D8A533">${div.innerHTML}</span></p>
                            </div>
                    </div>
                    `;
                }

            }
        }
        else if (infoStoresAndVehicles[k].market=="Store" && arrData[k].market=="Store")
        {
            let div = document.createElement("div");
            for(let j=0;j<arrData[k].vehicles.length;j++){
            let text;
            Object.entries(arrData[k].vehicles[j]).forEach(([key, value]) => {
            text=document.createTextNode(`${key} : ${value} || `);
            div.appendChild(text);
            })
            div.appendChild(document.createElement("hr"))
            }
            markers[k]=
            {
                "position":{ "lat": getPoint(27.18096,31.18368)[0], "lng":getPoint(27.18096 , 31.18368)[1] },
                "titel"   : infoStoresAndVehicles[k].Name,
                "lable"   : k+1+'',
                "info"    :`
                <div>
                    <div class="row">
                        <div class="col s12">
                            <ul>
                                <li><p>Total Orders :<span style="color:#509958">${infoStoresAndVehicles[k]["Total Orders"]}</span></p></li>
                                <li><p>Not Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Not Icy Orders"]} <span></p></li>
                                <li><p>Icy Orders :<span style="color:#509958"> ${infoStoresAndVehicles[k]["Icy Orders"]}</span></p></li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <b><span style="color:#D8A533">${div.innerHTML}</span></b>
                        </div>
                    </div>
                </div>`
            };
        }
    }
}
markersMap(JSON.parse(sessionStorage.counterStores),JSON.parse(sessionStorage.counterVehicles));

let map;
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        

        center: { lat: 27.18096, lng: 31.18368 },
        zoom: 14,
    });

    setTimeout(function(){
        if($('#map').find('.dismissButton').length == 1){
        $('#map').children('div:nth-of-type(2)').remove();
        }
    },1000);

    markers.forEach(function(loc){
        let marker
        if(loc.icon)
        {
            marker = new google.maps.Marker({
                position: loc.position,
                title:loc.titel,
                icon:loc.icon,
                map:map
            })

        }
        else
        {
            
            marker = new google.maps.Marker({
                position: loc.position,
                title:loc.titel,
                animation:google.maps.Animation.DROP,
                label:loc.lable,
                map:map
            })
        }
        let infowindow = new google.maps.InfoWindow({
            content: loc.info
        })
        marker.addListener('click',function(){
            infowindow.open(map,marker);
        });
    });
}

$(document).ready(function(){

initMap();

});
