//validate ip adress
function ValidateIPaddress(ipaddress) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  return false;
}
async function getIp() {
  let res = await fetch(`https://edns.ip-api.com/json`);
  let data = await res.json();
  let {
    dns: { geo, ip },
  } = data;
  document.getElementById(`gretings`).innerHTML = `Welcome ${ip}`;
  TakeInputandtrackclient(ip);
}
/* 5c621fd3882740b8eb60ccae4ae9c462
 */

/* http://api.ipstack.com/134.201.250.155?access_key=5c621fd3882740b8eb60ccae4ae9c462 */

async function TakeInputandtrackclient(ip) {
  let res = await fetch(
    `http://api.ipstack.com/${ip}?access_key=5c621fd3882740b8eb60ccae4ae9c462`
  );
  let data = await res.json();

  let { latitude, longitude } = data;
  handelmap(longitude, latitude);
  appendIpInfo(data);
  //console.log(data);
}

function handelmap(lang, lat) {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic291dmlrMTExIiwiYSI6ImNrdDVvdnAxMjBha3cycG45dnJkZjN5cmMifQ.X4I2z1BVyAGPLPS95ZXHNQ";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [lang, lat], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
}

function handleUserInput() {
  let input = document.getElementById(`input`).value;
  if (ValidateIPaddress(input)) {
    TakeInputandtrackclient(input);
  } else {
    alert(`Please enter a valid ip`);
  }
}

function appendIpInfo(data) {
  let {
    city,
    region_name,
    continent_name,
    country_name,
    longitude,
    continent_code,
    latitude,
    location: { calling_code, capital, country_flag, country_flag_emoji },
  } = data;

  let cty = document.getElementById(`city`);
  cty.innerHTML = `<strong style="color:red">City:</strong> ${city}`;

  let cntryname = document.getElementById(`country_name`);
  cntryname.innerHTML = `<strong style="color:red">Country Name:</strong> ${country_name}`;

  let contrntname = document.getElementById(`continent_name`);
  contrntname.innerHTML = `<strong style="color:red">Continent Name:</strong> ${continent_name}`;
  let cpnt = document.getElementById(`capital`);
  cpnt.innerHTML = `<strong style="color:red">Capital</strong> ${capital}`;

  let emji = document.getElementById(`country_flag_emoji`);
  emji.innerHTML = country_flag_emoji;

  let lat = document.getElementById(`latitude`);
  lat.innerHTML = `<strong style="color:red">Latitude</strong> ${latitude}`;

  let long = document.getElementById(`longitude`);
  long.innerHTML = `<strong style="color:red">Longitude</strong> ${longitude}`;

  let region = document.getElementById(`region_name`);
  region.innerHTML = `<strong style="color:red">Region Name</strong> ${region_name}`;

  let contod = document.getElementById(`continent_code`);
  contod.innerHTML = `<strong style="color:red">Continent Code</strong> ${continent_code}`;;
}
