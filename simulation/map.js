let vehicleArray = retrieveArrayFromSession("vehicleArray");

function retrieveArrayFromSession(Storage) {
  let storedData = JSON.parse(sessionStorage.getItem(Storage));
  return storedData;
}

const country = vehicleArray[vehicleArray.length - 1].country;
const city = vehicleArray[vehicleArray.length - 1].city;

getLngLat(country, city);

let cityCoordinates = [
  retrieveArrayFromSession("lat"),
  retrieveArrayFromSession("lng"),
];

const map = createMap(cityCoordinates);

let positionOfStores = determinePositionOfElements(
  vehicleArray[vehicleArray.length - 1].NumberOfstores,
  cityCoordinates
);

let positionOfVehicles = determinePositionOfElements(
  vehicleArray.length - 1,
  cityCoordinates
);

let RestaurantsData = SetRestaurantData(positionOfStores);
let VehiclesData = SetVehicleData(positionOfVehicles);

[RestaurantsData, VehiclesData] = dataToShow(RestaurantsData, VehiclesData);

function dataToShow(RestaurantsData, VehiclesData) {
  for (let i = 0; i < RestaurantsData.length; i++) {
    for (let j = 0; j < VehiclesData.length; j++) {
      let minimum_capacity = Math.min(
        VehiclesData[j].capacity - VehiclesData[j].current_capacitance,
        RestaurantsData[i].capacity_remaining_after_delivery
      );
      let minimum_capacity_fridge = Math.min(
        VehiclesData[j].fridge_Capacity -
          VehiclesData[j].current_fridge_capacitance,
        RestaurantsData[i].capacity_Fridge_remaining_after_delivery
      );
      RestaurantsData[i].capacity_remaining_after_delivery -= minimum_capacity;
      RestaurantsData[i].capacity_Fridge_remaining_after_delivery -=
        minimum_capacity_fridge;
      VehiclesData[j].current_capacitance += minimum_capacity;
      VehiclesData[j].current_fridge_capacitance += minimum_capacity_fridge;
      if (
        VehiclesData[j].capacity === VehiclesData[j].current_capacitance &&
        VehiclesData[j].fridge_Capacity ===
          VehiclesData[j].current_fridge_capacitance
      )
        break;
    }
  }

  return [RestaurantsData, VehiclesData];
}

function SetRestaurantData(positionOfStores) {
  let array = [];
  for (let i = 0; i < positionOfStores.length; i++) {
    let AllCapacityoOfOrdersvalue = getRandomNumber(0, 1000);
    let Capacity_Of_Orders_Need_Fridge_value = getRandomNumber(
      0,
      AllCapacityoOfOrdersvalue
    );

    let storedData = {
      lat: positionOfStores[i][0],
      lng: positionOfStores[i][1],
      image: "/img/1.png",
      All_Capacity_Of_Orders: AllCapacityoOfOrdersvalue,
      Capacity_Of_Orders_Need_Fridge: Capacity_Of_Orders_Need_Fridge_value,
      capacity_remaining_after_delivery: AllCapacityoOfOrdersvalue,
      capacity_Fridge_remaining_after_delivery:
        Capacity_Of_Orders_Need_Fridge_value,
    };
    array.push(storedData);
  }
  return array;
}

function SetVehicleData(positionOfVehicles) {
  let array = [];
  for (let i = 0; i < positionOfVehicles.length; i++) {
    let initialCapcityFridge =
      vehicleArray[i].fridge === false
        ? 0
        : getRandomNumber(0, vehicleArray[i].fridgeCapacity);
    let initialCapcity = getRandomNumber(0, vehicleArray[i].capacity);
    let iconUrl =
      vehicleArray[i].type === "Bicycles"
        ? "/img/Bicycles.png"
        : vehicleArray[i].type === "Motorcycles"
        ? "/img/Motorcycles.png"
        : vehicleArray[i].type === "Cars"
        ? "/img/Cars.png"
        : "/img/Vans.png";
    let storedData = {
      lat: positionOfVehicles[i][0],
      lng: positionOfVehicles[i][1],
      image: iconUrl,
      type: vehicleArray[i].type,
      capacity: +vehicleArray[i].capacity,
      Need_fridge: vehicleArray[i].fridge,
      fridge_Capacity: +vehicleArray[i].fridgeCapacity,
      current_capacitance: initialCapcity,
      current_fridge_capacitance: initialCapcityFridge,
      initial_capacity: initialCapcity,
      initial_fridge_capacity: initialCapcityFridge,
    };
    array.push(storedData);
  }
  return array;
}

function determinePositionOfElements(length, center) {
  let storeArray = [];
  for (let i = 0; i < length; i++) {
    let randomLatLng = getRandomLatLng(center, 0.05);
    //while (isWater(randomLatLng) === true) {
    randomLatLng = getRandomLatLng(center, 0.05);
    //}
    storeArray.push(randomLatLng);
  }
  return storeArray;
}

async function getLngLat(country, city) {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${city}+${country}&key=f99360a47d1c436f9ca98ab562ebe9ec`
  );
  const data = await response.json();
  console.log(data);
  const { lat, lng } = data.results[0].geometry;

  sessionStorage.setItem("lat", lat);
  sessionStorage.setItem("lng", lng);
}

function createMap(cityCoordinates) {
  const map = L.map("map").setView(cityCoordinates, 14);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  return map;
}

function getRandomLatLng(center, radius) {
  let lat = center[0] + (Math.random() - 0.5) * radius;
  let lng = center[1] + (Math.random() - 0.5) * radius;
  return [lat, lng];
}

function setContentResturant(RestaurantsData) {
  let content = document.createElement("div");
  content.innerHTML = `
<div class="container">
    <div class="row">
        <img src="/img/1.png" heigth=30px>
    </div>
    <div class="row">
        <p style="font-size: 18px; color: brown; font-weight: 500;">Capacity of Order :<span style="color:black">${RestaurantsData.All_Capacity_Of_Orders}</span></p>
    </div>
    <div class="row">
        <p style="font-size: 18px; color: brown; font-weight: 500;">Capacity remaining after delivery :<span style="color:black">${RestaurantsData.capacity_remaining_after_delivery}</span></p>
    </div>
    <div class="row">
        <p style="font-size: 18px; color: brown; font-weight: 500;">Capacity of Order Need Fridge :<span style="color:black">${RestaurantsData.Capacity_Of_Orders_Need_Fridge}</span></p>
    </div>
    <div class="row">
        <p style="font-size: 18px; color: brown; font-weight: 500;">Capacity fridge remaining after delivery :<span style="color:black">${RestaurantsData.capacity_Fridge_remaining_after_delivery}</span></p>
    </div>
</div>
 `;
  return content;
}

putResturantOnMap(RestaurantsData);

function putResturantOnMap(RestaurantsData) {
  for (let i = 0; i < RestaurantsData.length; i++) {
    let marker = L.marker([RestaurantsData[i].lat, RestaurantsData[i].lng], {
      icon: L.icon({
        iconUrl: "/img/1.png",
        iconSize: [25, 25],
      }),
    }).addTo(map);
    marker.bindPopup(setContentResturant(RestaurantsData[i]), {
      maxWidth: 1000, // Set the desired maximum width in pixels
    });

    marker.on("mouseover", function () {
      marker.openPopup();
    });
  }
}

function setContentVehicle(VehiclesData) {
  let img =
    VehiclesData.type === "Bicycles"
      ? "/img/Bicycles.png"
      : VehiclesData.type === "Motorcycles"
      ? "/img/Motorcycles.png"
      : VehiclesData.type === "Cars"
      ? "/img/Cars.png"
      : "/img/Vans.png";
  let display = "block";
  if (VehiclesData.Need_fridge === false) {
    display = "none";
  }
  let content = document.createElement("div");
  content.innerHTML = `
<div class="container">
    <div class="row">
        <img class="col s3" src=${img} heigth=30px>
        <p class="col s3">${VehiclesData.type}</p>
    </div>
    <div class="row">
        <p style="font-size: 18px; color: brown; font-weight: 500;">Capacity : <span style="font-size: 15px; color: rgb(107, 106, 106); font-weight: 500;" > Full:${VehiclesData.capacity} || Current:${VehiclesData.current_capacitance} || initial:${VehiclesData.initial_capacity}</span></p>
    </div>
    <div class="row">
        <p style="font-size: 18px; color: brown; font-weight: 500;">Has fridge ?! :${VehiclesData.Need_fridge}</p>
    </div>
     <div class="row" style="display:${display}" >
<p style="font-size: 18px; color: brown; font-weight: 500;">Capacity of Fridge : <span style="font-size: 15px; color: rgb(107, 106, 106); font-weight: 500;" > Full:${VehiclesData.fridge_Capacity} || Current:${VehiclesData.current_fridge_capacitance} || initial:${VehiclesData.initial_fridge_capacity}</span></p></div>
</div>
 `;
  return content;
}

putVehiclesOnMap(VehiclesData);

function putVehiclesOnMap(VehiclesData) {
  for (let i = 0; i < VehiclesData.length; i++) {
    let iconUrl =
      vehicleArray[i].type === "Bicycles"
        ? "/img/Bicycles.png"
        : vehicleArray[i].type === "Motorcycles"
        ? "/img/Motorcycles.png"
        : vehicleArray[i].type === "Cars"
        ? "/img/Cars.png"
        : "/img/Vans.png";
    let marker = L.marker([VehiclesData[i].lat, VehiclesData[i].lng], {
      icon: L.icon({
        iconUrl: iconUrl,
        iconSize: [27, 27],
      }),
    }).addTo(map);
    marker.bindPopup(setContentVehicle(VehiclesData[i]), {
      maxWidth: 1000, // Set the desired maximum width in pixels
    });

    marker.on("mouseover", function () {
      marker.openPopup();
    });
  }
}

function getRandomNumber(a, b) {
  if (a > b) {
    [a, b] = [b, a];
  }
  const random = Math.round(Math.random() * (b - a) + a);
  return random;
}

//console.log(isWater(getRandomLatLng(cityCoordinates, 0.05)));
async function isWater(cityCoordinates) {
  const url = `https://isitwater-com.p.rapidapi.com/?latitude=${cityCoordinates[0]}&longitude=${cityCoordinates[1]}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7ed855d071mshaf708eb1e9654c9p11a002jsnae87a5706921",
      "X-RapidAPI-Host": "isitwater-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
