
// add  country names  in country selsction and add city names in city selsction

function initializeCountryStateSelection(countryStateInfo) {
  let countrySelection = document.querySelector("#Country");
  let stateSelection = document.querySelector("#State");

  stateSelection.disabled = true;

  for (let country in countryStateInfo) {
    countrySelection.options[countrySelection.options.length] = new Option(
      country,
      country
    );
  }

  countrySelection.onchange = (e) => {
    stateSelection.disabled = false;
    stateSelection.length = 1;

    let selectedCountry = e.target.value;
    let states = countryStateInfo[selectedCountry];

    for (let state of states) {
      stateSelection.options[stateSelection.options.length] = new Option(
        state,
        state
      );
    }
  };
}


initializeCountryStateSelection(countryStateInfo);


function incrementValue(numberid, addVehicle) {
  var value = parseInt(document.getElementById(numberid).value);
  value++;
  document.getElementById(numberid).value = value;

  if (addVehicle) {
    // Add New Vehicle
    createNewVehicle(value);
  }
}


function decrementValue(numberid, addVehicle) {
  var value = parseInt(document.getElementById(numberid).value);
  value--;

  if (value < 0) value = 0;
  document.getElementById(numberid).value = value;

  if (addVehicle) {
    // Remove Last Vehicle
    var lastAddedVehicle = document.getElementById("child-vehicle");
    if (lastAddedVehicle.lastChild) {
      lastAddedVehicle.removeChild(lastAddedVehicle.lastChild);
    }
  }
}


function createNewVehicle(value) {
  let newVehicle = document.querySelector("#child-vehicle");

  let vehicleInformation = `
    <div class="row">
    <fieldset class="newVec">
      <legend class="info">Info of Vehicle(${value})</legend>
    <div class="row">
      <div class="col s6 m6 l3">
        <label for="cars">Type: </label>
      </div>
      <div class="col s6 m6 l3">
        <select id="cars" class="browser-default">
          <option value="Motorcycle" selected>Motorcycle</option>
          <option value="Bicycle">Bicycle</option>
          <option value="Car">Car</option>
        </select>
      </div>
      <div class="col s6 m6 l3">
        <label>Capacity: </label>
      </div>
      <div class="col s6 m6 l3 ">
        <input type="number" class="browser-default" id="capacity" min="0" value="0">
      </div>
    </div>
     <div class="row"  >
     <div class="col s6 m6 l6"></div>
      <div class="col s6 m6 l6">
        <label class='valid-cap' style="display: none" >The Capacity Must Be Positive Integer and Less Than or Equal 1000</label>
      </div>
      </div>
    <div class="row">
      <div class="col s6 m6 l6">
        <label>Does The Vehicles Accept Fridge </label>
      </div>
      <div class="col s6 m6 l6">
        <label class="container" >
          <input type="radio" for="checkmark" class="YES" onclick="checkRadio('YES','${value}')">
          <span class="checkmark"></span>YES
        </label>
        <label class="container">
          <input type="radio" for="checkmark" checked="checked" class="NO" onclick="checkRadio('NO','${value}')">
          <span class="checkmark"></span>NO
        </label>
      </div>
    </div>
    <div class="row"  >
      <div class="col s6 m6 l3">
        <label id='last' style="display:none"  >Capacity of Fridge: </label>
      </div>
      <div class="col s6 m6 l3 ">
        <input type="number" class="browser-default" id='frigde'min="0" value="0"style="display: none" >
      </div>
    </div>
    <div class="row"  >
      <div class="col s6 m6 l6">
        <label class='validate' style="display: none"> The Fridge Capacity Must Be Positive Integer and Less Than or Equal The Vehicle Capacity</label>
      </div>
      </div>
    </div>
    `;

  let tempContainer = document.createElement("div");
  tempContainer.id = value;
  tempContainer.innerHTML = vehicleInformation;
  newVehicle.appendChild(tempContainer);

}


function checkRadio(value, id) {
  let selectValue = document.getElementById(id).querySelector('.' + value);
  let otherValue = value;

  if (value == "YES") {

    otherValue = "NO";
  }
  else {
    otherValue = "YES";
    ;
  }
  selectValue.onchange = (e) => {
    selectValue.checked = true;
    if (value == "YES") {
      document.getElementById(id).querySelector('#last').style.display = "block";
      document.getElementById(id).querySelector('#frigde').style.display = "block";
    }
    else {
      document.getElementById(id).querySelector('#last').style.display = "none";
      document.getElementById(id).querySelector('#frigde').value = 0;
      document.getElementById(id).querySelector('#frigde').style.display = "none"
    }

    selectValue = document.getElementById(id).querySelector('.' + otherValue).checked = false;
  }
}


var storageArray = [];


function startSimulation() {

  let numberOFStores = document.querySelector('.Number_of_stores').value;
  let currentCountry = document.getElementById('country').value;
  let currentCity = document.getElementById('state').value;
  let numberOFvehicles = document.querySelector('.Number_of_vehicles').value;

  // ensure that the user choose a country

  if (currentCountry == "no") {
    document.querySelector('.valid-country').style.display = "block";
    document.getElementById('country').focus();
    return;
  }

  // ensure that the user choose a city

  if (currentCity == "no") {
    document.querySelector('.valid-city').style.display = "block";
    document.getElementById('state').focus();
    return;
  }

  storageArray.push(numberOFStores);
  storageArray.push(numberOFvehicles);
  storageArray.push(currentCountry);
  storageArray.push(currentCity);

  let temp = storeVehicleInformation(numberOFvehicles);

  // ensure that the fridge capacity less than or equal the vehicle capacity

  if (temp == null) return;

  storageArray.push(temp);
  sessionStorage.setItem('storageArray', JSON.stringify(storageArray));
  window.location.href = "/map.html";

}


function storeVehicleInformation(numberOFvehicles) {
  let arr = [];
  isValid = true;

  for (let i = 1; i <= numberOFvehicles; i++) {
    theVehicle = document.getElementById(i);
    let capacity_1 = theVehicle.querySelector('#capacity').value;
    let capacity_2 = theVehicle.querySelector('#frigde').value;

    // ensure  that the capacity is positive integer
    if (capacity_1 < 0) {
      theVehicle.querySelector('.valid-cap').style.display = 'block';
      theVehicle.querySelector('#capacity').value = 0;
      theVehicle.querySelector('#capacity').focus();
      isValid = false;
      break;
    }
    // ensure  that the capacity is positive inte ger and <= vehicle capacity

    else if (capacity_2 > capacity_1 || capacity_2 < 0) {
      theVehicle.querySelector('.validate').style.display = "block";
      theVehicle.querySelector('#frigde').value = 0;
      theVehicle.querySelector('#frigde').focus();
      isValid = false;
      break;
    }
    else {
      let data = {
        vehicleType: theVehicle.querySelector('#cars').value,
        vehicleCapacity: theVehicle.querySelector('#capacity').value,
        hasFridge: theVehicle.querySelector('.YES').checked == true ? "YES" : "NO",
        vehicleFridgeCapacity: theVehicle.querySelector('#frigde').value
      };
      arr.push(data);
    }
  }

  if (!isValid) {
    return null; // Return null if validation fails
  }

  return arr;

}

