
var storageArray = JSON.parse(sessionStorage.getItem('storageArray'));


let country = storageArray[2];
let city = storageArray[3];
let vehicleArray = storageArray[4];


getCoordinates(country, city);


async function getCoordinates(country, city) {
   const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}+${country}&key=7e0bc5532c1141b380febb5296c3729a`
   );

   let data = await response.json();
   let { lat, lng } = data.results[0].geometry;
   sessionStorage.setItem("lat", lat);
   sessionStorage.setItem("lng", lng);
};


let coordinates = [JSON.parse(sessionStorage.getItem("lat")), JSON.parse(sessionStorage.getItem("lng"))];
let map = makeMap(coordinates);


function makeMap(coordinates) {
   let map = L.map('map').setView(coordinates, 14);
   let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   }).addTo(map);
   return map;
}


let storePositions = getPosition(storageArray[0]);
let vehiclePositions = getPosition(storageArray[1]);


function getPosition(length) {
   // generate rondom positions from stores and vehicles
   let arr = [];
   for (let i = 1; i <= length; i++) {
      let pos = [
         coordinates[0] + (Math.random() - .5) * .05,
         coordinates[1] + (Math.random() - .5) * .05
      ];
      arr.push(pos);
   }
   return arr;
}


let vehicleData = setVechicleData(vehiclePositions, vehicleArray);


function setVechicleData(vehiclePositions, vehicleArray) {
   let arr = [];
   for (let i = 0; i < vehiclePositions.length; i++) {

      //generate intial rondom capacity for each vehicle less than or equal to vehicle capacity

      let intial = rand(0, vehicleArray[i].vehicleCapacity);
      let intialFridgeCapacity = (vehicleArray[i].hasFridge == "YES") ? rand(0, Math.min(intial, vehicleArray[i].vehicleFridgeCapacity)) : 0;
      if (intialFridgeCapacity) intial -= intialFridgeCapacity;

      let vehicleData = {

         lat: vehiclePositions[i][0],
         lng: vehiclePositions[i][1],
         vehicleType: vehicleArray[i].vehicleType,
         totalVehicleCapacity: vehicleArray[i].vehicleCapacity,
         vehicleCapacity: vehicleArray[i].vehicleCapacity - vehicleArray[i].vehicleFridgeCapacity,
         hasFridge: vehicleArray[i].hasFridge,
         intialCapacity: intial,
         intialFridgeCapacity: intialFridgeCapacity,
         vehicleFridgeCapacity: vehicleArray[i].vehicleFridgeCapacity,
         currentOrder: intial,
         currentFridge: intialFridgeCapacity,
         stores: []
      }
      arr.push(vehicleData);
   }
   return arr;

}


let storeData = setStoreData(storePositions, vehicleData);



function setStoreData(storePositions, vehicleData) {
   let arr = [];
   for (let i = 0; i < storePositions.length; i++) {

      //generate rondom capacity for each store less than or equal to 1000

      let totalCapacity = rand(0, 1000),
         orderCapacity = rand(0, totalCapacity),
         remainingCapacity = rand(0, orderCapacity),
         initialRemainingCapacity = remainingCapacity,
         fridgeCapacity = (totalCapacity - orderCapacity),
         remainingFriendlyCapacity = rand(0, fridgeCapacity);
      initialremainingFriendlyCapacity = remainingFriendlyCapacity;

      for (let j = 0; j < vehicleData.length; j++) {

         if (vehicleData[j].currentOrder + vehicleData[j].currentFridge != vehicleData[j].totalVehicleCapacity) {

            let temp1 = vehicleData[j].vehicleCapacity - vehicleData[j].currentOrder;
            let temp2 = vehicleData[j].vehicleFridgeCapacity - vehicleData[j].currentFridge;
            let mini_1 = Math.min(temp1, remainingCapacity);
            let mini_2 = Math.min(temp2, remainingFriendlyCapacity);

            remainingCapacity -= mini_1;
            remainingFriendlyCapacity -= mini_2;
            vehicleData[j].currentOrder += mini_1;
            vehicleData[j].currentFridge += mini_2;

            if (mini_1 > 0 || mini_2 > 0) {
               let take = [i, mini_1, mini_2];
               vehicleData[j].stores.push(take);
            }
         }
      }

      let storeData = {
         lat: storePositions[i][0],
         lng: storePositions[i][1],
         totalCapacity: totalCapacity,
         orderCapacity: orderCapacity,
         initialRemainingCapacity: initialRemainingCapacity,
         remainingCapacity: remainingCapacity,
         fridgeCapacity: fridgeCapacity,
         initialremainingFriendlyCapacity: initialremainingFriendlyCapacity,
         remainingFriendlyCapacity: remainingFriendlyCapacity,
      }

      arr.push(storeData);

   }
   return arr;
}


function rand(x, y) {
   return Math.round(Math.random() * (y - x) + x);
}


function putMarker(storeData, vehicleData) {
   // put markerS for stores
   for (let i = 0; i < storeData.length; i++) {
      let marker = L.marker([storeData[i].lat, storeData[i].lng], {
         icon: L.icon({
            iconUrl: "/restaurant.png",
            iconSize: [50, 50]
         }),
      }).addTo(map);
      marker.bindPopup(createHtmlStores(storeData[i], i), {
         maxWidth: 1000,
      });
      marker.on("click", function () {
         marker.openPopup();
      });

   }
   // put markers for vehicles
   for (let i = 0; i < vehicleData.length; i++) {
      let image1 = (vehicleData[i].vehicleType === "Motorcycle") ? "/moto.jfif" : (vehicleData[i].vehicleType === "Bicycle") ? "/bic.jfif" : "/car.jpg";
      let image = (vehicleData[i].vehicleType === "Motorcycle") ? "/motorbike.png" : (vehicleData[i].vehicleType === "Bicycle") ? "/bicycle.png" : "/car.png";
      let marker = L.marker([vehicleData[i].lat, vehicleData[i].lng], {
         icon: L.icon({
            iconUrl: image,
            iconSize: [50, 50]
         }),
      }).addTo(map);
      marker.bindPopup(createHtmlVehicle(vehicleData[i], image1), {
         maxWidth: 1000,
      });
      marker.on("click", function () {
         marker.openPopup();
      });

   }

}


putMarker(storeData, vehicleData);


function createHtmlStores(obj, num) {
   let create = `
   <img  class="imagee" src="/store.jpg">
   <h2 style="color:black" >Restrant(${num + 1})</h2>
   <div class="row">
   <h3 style="color:#1565c0" >Total Capacity:<span style="color:black">${obj.totalCapacity} kg</h3>
   </div>
   <div class="row">
   <h3 style="color:#1565c0">The Capacity of Unfrozen Orders:<span style="color:black">${obj.orderCapacity} kg</h3>
   </div>
   <div class="row">
   <h3 style="color:#1565c0">The Capacity of Frozen Orders:<span style="color:black">${obj.fridgeCapacity} kg</h3>
   </div>
    <div class="row">
   <h3 style="color:#1565c0">The Intial Delivered Capacity of Unfrozen Orders:<span style="color:black">${obj.initialRemainingCapacity} kg</h3>
   </div>
    <div class="row">
   <h3 style="color:#1565c0">The Intial Delivered Capacity of Frozen Orders:<span style="color:black"> ${obj.initialremainingFriendlyCapacity} kg</h3>
   </div>
   <div class="row">
   <h3 style="color:#1565c0">The Remaninig Undelivered Capacity of Unfrozen Orders:<span style="color:black">${obj.remainingCapacity} kg</h3>
   </div>
    <div class="row">
   <h3 style="color:#1565c0">The Remaninig Undelivered Capacity of Frozen Orders:<span style="color:black"> ${obj.initialremainingFriendlyCapacity} kg</h3>
   </div>
   `;
   return create;
}


function createHtmlVehicle(obj, image1) {
   let create = `
   <img  class="imagee" src=${image1}>
   <h2 style="color:black">${obj.vehicleType}</h2>
   <div class="row">
   <h3 style="color:#1565c0">Total Capacity:<span style="color:black">${obj.totalVehicleCapacity} kg</h3>
   </div>
   <div class="row">
   <h3 style="color:#1565c0">The Capacity of Unfrozen Orders:<span style="color:black">${obj.vehicleCapacity} kg</h3>
   </div>
   <div class="row">
   <h3 style="color:#1565c0">Has Fridge:<span style="color:black"> ${obj.hasFridge}</h3>
   </div>
   <div class="row">
   <h3 style="color:#1565c0">The Capacity of Frozen Orders:<span style="color:black"> ${obj.vehicleFridgeCapacity} kg</h3>
   </div>
    <div class="row">
   <h3 style="color:#1565c0">The Intial Capacity of Unfrozen Orders:<span style="color:black"> ${obj.intialCapacity} kg</h3>
   </div>
    <div class="row">
   <h3 style="color:#1565c0">The Intial Capacity of Frozen Orders:<span style="color:black">${obj.intialFridgeCapacity} kg</h3>
   </div>
    <h3 style="color:#1565c0">The Current Capacity of Unfrozen Orders:<span style="color:black"> ${obj.currentOrder} kg</h3>
   </div>
    <div class="row">
   <h3 style="color:#1565c0">The Current Capacity of Frozen Orders:<span style="color:black">${obj.currentFridge} kg</h3>
   `;
   let arr = obj.stores;
   for (let i = 0; i < obj.stores.length; i++) {
      let addStores = `
      <div class="row">
      <h3 style="color:#1565c0">Resturant(${arr[i][0] + 1}):<span style="color:black">Unfrozen Orders:${arr[i][1]} kg || Frozen Orders: ${arr[i][2]}</h3>
      </div>
      `;
      create += addStores;
   }
   return create;

}


