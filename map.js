let map;
async function initMap() {
const { Map } = await google.maps.importLibrary("maps");
map = new Map(document.getElementById("map"), {
center: { lat: 27.1833, lng:31.1667 },
zoom:12,
});
arrData.forEach(function(item){
    let marker;
    let latlng=getPoint(27.183,31.167);
    let infowindow;

    let image ;
    
    if(item.Type=="Motorcycle")
    {
        //console.log("HI");
        image="https://img.icons8.com/emoji/96/000000/motorcycle-emoji.png";
    }

    else if (item.Type=="Large Car")
    {
        image="https://img.icons8.com/color/48/suv.png"
    }

    else if (item.Type=="Private Car")
    {
    image ="https://img.icons8.com/doodle/48/old-car.png";
    }

    else 
    {
    image="https://img.icons8.com/clouds/100/small-business.png";
    }

    if(item.Type=="Store")
    {
        let AllDivs=document.createElement("div");
        item.vehicles.forEach(function(veh)
        {
            let div=document.createElement("div");
            div.classList.add("DivObj");
            let h4Name=document.createElement("h4");
            let Ptype=document.createElement("h4");
            let PCapacity=document.createElement("h4");
    
            h4Name.innerHTML= "Vehicle name   :"+ `<span class="ff">${veh.Name}</span>`;
            PCapacity.innerHTML= "Number of orders   :"+`<span class="ff">${veh.Quantity}</span>`;
            Ptype.innerHTML= "Type of orders   :"+`<span class="ff">${veh.Type}</span>`;
    
    
            div.appendChild(h4Name);
            div.appendChild(PCapacity);
            div.appendChild(Ptype);
            
            AllDivs.appendChild(div);
        })
        if(AllDivs.innerHTML=="")
        {
            let text=document.createElement("h2");
            text.classList.add("text");
            text.innerText="No vehicle to take store's orders..";
            AllDivs.prepend(text);
        }
        else 
        {
            let text=document.createElement("h2");
            text.classList.add("text");
            text.innerText="These are vehicles that received store's orders..";
            AllDivs.prepend(text);
        }

        marker = new google.maps.Marker({
            position: latlng,
            title:item.Name,
            map:map,
            icon:image,
        })

        infowindow = new google.maps.InfoWindow({
            content: `<div class="all">
            <div> <img src="${image}"></div>
            <h1 class="head">${item.Name}</h1>
            <h3>Number of initial orders:<span class="ff">${item["Total Orders"]}</span></h3>
            <h3>Number of current icy orders in the store :  <span class="ff">${item["Icy Orders"]}</span></h3>
            <h3>Number of current not icy orders in th store : <span class="ff">${item["Not Icy Orders"]}</span></h3></div>
            ` + AllDivs.outerHTML ,
        })
    }

    else if(item["Has Fridge"]=="Yes")
    {
        let AllDivs=document.createElement("div");
        item.stores.forEach(function(str)
        {
            let div=document.createElement("div");
            div.classList.add("DivObj");
            let h4Name=document.createElement("h4");
            let Ptype=document.createElement("h4");
            let PCapacity=document.createElement("h4");
    
            h4Name.innerHTML= "Store name   :"+ `<span class="ff">${str.Name}</span>`;
            PCapacity.innerHTML= "Number of oreders   :"+`<span class="ff">${str.Quantity}</span>`;
            Ptype.innerHTML= "Type of oreders   :"+`<span class="ff">${str.Type}</span>`;
    
    
            div.appendChild(h4Name);
            div.appendChild(PCapacity);
            div.appendChild(Ptype);
            
            AllDivs.appendChild(div);
        })
        if(AllDivs.innerHTML=="")
        {
            let text=document.createElement("h2");
            text.classList.add("text");
            text.innerText="No store requested this vehicle.. ";
            AllDivs.prepend(text);
        }
        else 
        {
            let text=document.createElement("h2");
            text.classList.add("text");
            text.innerText="These are stores that requested this vehicle.. ";
            AllDivs.prepend(text);
        }
        marker = new google.maps.Marker({
            position: latlng,
            title:item.Name,
            map:map,
            icon:image,
        })


        infowindow = new google.maps.InfoWindow({
            content: ` <div class="all">
            <div> <img src="${image}"></div>
            <h1 class="head">${item.Name}</h1>
            <h3>Full capacity :                   <span class="ff">${item["Full Capacity"]}</span></h3>
            <h3>Has fridge ? :                    <span class="ff">${item["Has Fridge"]}</span></h3>
            <h3>Capacity of the fridge  :         <span class="ff">${item["Fridge"]}</span></h3>

            <h3>Current not icy orders :           <span class="ff"> ${item["Current Not Icy Orders"]}</span></h3>
            <h3>Current free not icy orders :              <span class="ff">${item["Free Not Icy Orders"]}</span></h3>

            <h3>Current orders on vehicle's fridge :<span class="ff">${item["Current Orders on Vehicle'Fridge"]}</span></h3>
            <h3>Current free fridge's orders :             <span class="ff">${item["Free Fridge's Orders"]}</span></h3>
            </div>` + AllDivs.outerHTML ,
        })
    }

    else 
    {

        let AllDivs=document.createElement("div");
        item.stores.forEach(function(str)
        {
            let div=document.createElement("div");
            div.classList.add("DivObj");
            let h4Name=document.createElement("h4");
            let Ptype=document.createElement("h4");
            let PCapacity=document.createElement("h4");
    
            h4Name.innerHTML= "Store name   :"+ `<span class="ff">${str.Name}</span>`;
            PCapacity.innerHTML= "Number of oreders   :"+`<span class="ff">${str.Quantity}</span>`;
            Ptype.innerHTML= "Type of oreders   :"+`<span class="ff">${str.Type}</span>`;
    
    
            div.appendChild(h4Name);
            div.appendChild(PCapacity);
            div.appendChild(Ptype);
            
            AllDivs.appendChild(div);
        })

        if(AllDivs.innerHTML=="")
        {
            let text=document.createElement("h2");
            text.classList.add("text");
            text.innerText="No store requested this vehicle.. ";
            AllDivs.prepend(text);
        }
        else 
        {
            let text=document.createElement("h2");
            text.classList.add("text");
            text.innerText="These are stores that requested this vehicle.. ";
            AllDivs.prepend(text);
        }
        
        marker = new google.maps.Marker({
            position: latlng,
            title:item.Name,
            map:map,
            icon:image,
        })
        
        infowindow = new google.maps.InfoWindow({
            content: ` <div class=all>
            <div> <img src="${image}"></div>
            <h1 class="head">${item.Name}</h1>
            <h3>Full capacity :          <span class="ff">${item["Full Capacity"]}</span></h3>
            <h3>Has fridge ? :           <span class="ff">${item["Has Fridge"]}</span></h3>
            <h3>Current not icy orders : <span class="ff">${item["Current Not Icy Orders"]}</span></h3>
            <h3>Free not icy orders :    <span class="ff">${item["Free Not Icy Orders"]}</span></h3>
            </div`+ AllDivs.outerHTML,
        })
    }

    marker.addListener('click',function(){
        infowindow.open(map,marker);
    });
});
}


let NumberOfStores=JSON.parse(sessionStorage.NumberOfStores);
let NumberOfVehicles=JSON.parse(sessionStorage.NumberOfVehicles);
let Country=JSON.parse(sessionStorage.Country);
let City=JSON.parse(sessionStorage.City);
let Cars=JSON.parse(sessionStorage.Cars);
//console.log(NumberOfStores,NumberOfVehicles,Country,City,Cars[0]);
let arrData=[];
StoresVehiclesData();
function getPoint(lat,lng)
{
    let radius=.05;
    let min_X=lat-radius;
    let max_X=lat+radius;

    let min_Y=lng-radius;
    let max_Y=lng+radius;

    let x,y;
    
    let r=0;
    while(r<1000) {
    x =Math.random()*((max_X-min_X)+.1) + min_X;
    y=Math.random()*((max_Y-min_Y)+.1) + min_Y;;
    
    if(Math.pow((x-lat),2) + Math.pow((y-lng),2) <= Math.pow(radius,2))
    {
    return {lat:x,lng:y};
    break;
    }
    r++;
    }
}
function get()
{
    let lat=27.1833;
    let lng=31.1667;
    let radius=5;

    let min_X=lat-radius;
    let max_X=lat+radius;

    let min_Y=lng-radius;
    let max_Y=lng+radius;

    let x,y;
    //console.log(x,y);
    /*Math. floor(Math. random() * ((max-min)+1) + min); 
    Generate a random integer between two numbers min and max (the min is inclusive, and the max is exclusive). */
    let r=0;
    while(r<10) {
    x =Math.random()*((max_X-min_X)+.01) + min_X;
    y=Math.random()*((max_Y-min_Y)+.01) + min_Y;;
    //console.log(x,y);
    //console.log(Math.pow((x-lat),2),Math.pow((y-lng),2),Math.pow(radius,2));
    console.log(x,y,"hELLO");
    if(Math.pow((x-lat),2) + Math.pow((y-lng),2) <= Math.pow(radius,5))
    {
        //console.log(Math.pow((x-lat),2),Math.pow((y-lng),2),Math.pow(radius,2));
        console.log(x,y,"Done");
        console.log("***********************");
    }
    r++;
    }
}
function StoresVehiclesData()
{
for(let i=0;i<NumberOfVehicles;i++)
{
    let obj={
        Name:` Vehicle ${i+1}`,
        Type:Cars[i].type,
        stores:[],
        "Full Capacity":Cars[i].Capacity,
        "Has Fridge":Cars[i].HasFridge,
    }
    if(Cars[i].HasFridge=="Yes")
    {
        let Total_Icy_Curr=getRandomValueBetween(0,Cars[i].CapacityOfFridge);
        let NotIcy=Cars[i].Capacity-Cars[i].CapacityOfFridge;
        let randomValue=getRandomValueBetween(0,NotIcy);

        obj["Fridge"]=Cars[i].CapacityOfFridge;

        obj["Current Orders on Vehicle'Fridge"]=Total_Icy_Curr;
        obj["Free Fridge's Orders"]=Cars[i].CapacityOfFridge-Total_Icy_Curr;


        obj["Not Fridge"]=NotIcy;
        obj["Current Not Icy Orders"]=randomValue;
        obj["Free Not Icy Orders"]=NotIcy-randomValue;



    }
    else 
    {
        let Total_Curr=getRandomValueBetween(0,Cars[i].Capacity);

        obj["Current Not Icy Orders"]=Total_Curr;
        obj["Free Not Icy Orders"]=Cars[i].Capacity-Total_Curr;

    }
    //console.log(obj);
    arrData.push(obj);
}
let http = new XMLHttpRequest();
http.open('get', 'stores.json', true);
http.send();
http.onload = function(){

if(this.readyState == 4 && this.status == 200){
let DB_stores = JSON.parse(this.responseText);
for(let i=0;i<NumberOfStores;i++)
{
    let store=DB_stores[i];

    let obj={

        Name:`Store ${i+1}`,
        Type:"Store",
        vehicles:[],
        "Total Orders":store.total_orders,
        "Not Icy Orders":store.total_orders-store.icy_orders,
        "Icy Orders":store.icy_orders,
    }
    arrData.push(obj);
}
let arrDataCopy=arrData;
console.log(arrDataCopy[2]);
sessionStorage.arrDataBefore=JSON.stringify(arrData);
StoreToVehicles(arrDataCopy);
}
}
//console.log(arrData[2],"pppppppppppppp");
//console.log(arrData);
}

function getRandomValueBetween(min,max)
{
    let ran=Math.random()*max;
    return Math.floor(ran);
}
function StoreToVehicles(arrDataCopy)
{
    //let SessionArray=JSON.parse(sessionStorage.SessionArray);
    let arrData=arrDataCopy;
    console.log(arrData[3]);
    for(let store=NumberOfVehicles;store<(NumberOfStores+NumberOfVehicles);store++)
    {
        console.log(arrData[3].Name,":::::::",store);
        let storeObj=arrData[store];
        //sessionStorage["StoreBefore"+store]=JSON.stringify(storeObj);
        //console.log(storeObj);

        for(let vehicle=0;vehicle<NumberOfVehicles;vehicle++)
        {
            let vehicleObj=arrData[vehicle];
            //console.log(vehicleObj);
            //sessionStorage["VOF"+store+"Before*"+(vehicle-NumberOfStores)]=JSON.stringify(vehicleObj);
            if(vehicleObj["Has Fridge"]=="Yes")
            {
                if(storeObj["Icy Orders"] > 0 && vehicleObj["Free Fridge's Orders"] > 0 )
                {
                    let Quantity=0;
                    TypeOFOrders="Icy";
                    if(storeObj["Icy Orders"]>= vehicleObj["Free Fridge's Orders"])
                    {
                        Quantity=vehicleObj["Free Fridge's Orders"];
                        vehicleObj["Current Orders on Vehicle'Fridge"]+=vehicleObj["Free Fridge's Orders"];
                        storeObj["Icy Orders"]=storeObj["Icy Orders"]-vehicleObj["Free Fridge's Orders"];
                        vehicleObj["Free Fridge's Orders"]=0;
                    }
                    else 
                    {
                        Quantity=storeObj["Icy Orders"];
                        vehicleObj["Free Fridge's Orders"]
                        vehicleObj["Free Fridge's Orders"]=vehicleObj["Free Fridge's Orders"]-storeObj["Icy Orders"];
                        vehicleObj["Current Orders on Vehicle'Fridge"]+=storeObj["Icy Orders"];
                        storeObj["Icy Orders"]=0;
                    }

                    let storeObject={Name:storeObj["Name"],Quantity,Type:TypeOFOrders};
                    let vehicleObject={Name:vehicleObj["Name"],Quantity,Type:TypeOFOrders};

                    vehicleObj.stores.push(storeObject);
                    storeObj.vehicles.push(vehicleObject);
                }
            }

           // console.log(storeObj["Not Icy Orders"]);
         //   console.log(vehicleObj["Free Not Icy Orders"]);

            if(storeObj["Not Icy Orders"]> 0 && vehicleObj["Free Not Icy Orders"]> 0 )
            {
                let Quantity=0;
                let TypeOFOrders=" Not Icy";
                if(storeObj["Not Icy Orders"]>= vehicleObj["Free Not Icy Orders"])
                {
                    Quantity=vehicleObj["Free Not Icy Orders"];
                    vehicleObj["Current Not Icy Orders"]+=vehicleObj["Free Not Icy Orders"];
                    storeObj["Not Icy Orders"]=storeObj["Not Icy Orders"]-vehicleObj["Free Not Icy Orders"];
                    vehicleObj["Free Not Icy Orders"]=0;
                }
                else 
                {
                    Quantity=storeObj["Not Icy Orders"];
                    vehicleObj["Free Not Icy Orders"]=vehicleObj["Free Not Icy Orders"]-storeObj["Not Icy Orders"];
                    vehicleObj["Current Not Icy Orders"]+=storeObj["Not Icy Orders"];
                    storeObj["Not Icy Orders"]=0;
                }

                let storeObject={Name:storeObj["Name"],Quantity,Type:TypeOFOrders};
                let vehicleObject={Name:vehicleObj["Name"],Quantity,Type:TypeOFOrders};

                vehicleObj.stores.push(storeObject);
                storeObj.vehicles.push(vehicleObject);
            }
            //console.log(vehicleObj);
           // vehicleObj=SessionArray[vehicle];
            //sessionStorage["VOF"+store+"After"+ (vehicle-NumberOfStores)]=JSON.stringify(vehicleObj);
            //copyVehicleObj=Object.assign(arrData[vehicle]);
            //console.log(copyVehicleObj);
        }
        //console.log(storeObj);
        //sessionStorage["StoreAfter"+store]=JSON.stringify(storeObj);
 
    }
    sessionStorage.arrDataAfter=JSON.stringify(arrData);
    // sessionStorage.arrData=JSON.stringify(arrData);
  //  PutStoresAndVehiclesOnMap();
}
initMap();
