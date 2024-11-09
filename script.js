const now=new Date();
const year = now.getFullYear();
const day = now.getDate();
const month = now.toLocaleString('en-US', {month: 'short'});
const dateText =day + " " + month + " "+year;

let dni=[];

for(let i =1; i<=4;i++){
    let copy =new Date(now);
    copy.setDate(copy.getDate()+i);
    dni.push(copy);
}
const days=document.querySelectorAll(".forecastDay");

for(let i=0;i<4;i++){
    days[i].innerText= `${dni[i].getDate()} ${dni[i].toLocaleString('en-US', {month: 'short'})}`
}

const weekDay = now.toLocaleString('en-US', {weekday: 'long'});

const dayEl = document.getElementById("day");
dayEl.innerText = weekDay;

const dateEl = document.getElementById("date");
dateEl.innerText = dateText;

const tempEl =document.getElementById("temp");
const descEl =document.getElementById("description");
const iconEl =document.getElementById("icon");
const maxTempEl =document.getElementById("max");
const minTempEl =document.getElementById("min");
const feelsEl =document.getElementById("feels");
const humidityEl =document.getElementById("humidity");
const windEl =document.getElementById("wind");
const pressureEl =document.getElementById("pressure");

const placeEl =document.getElementById("city");

const cityEl = document.querySelector("input");

const arrTemp=document.querySelectorAll(".forecastTemp");
const arrDescription=document.querySelectorAll(".forecastDescription");
const arrIcon=document.querySelectorAll(".iconMini");



const changeLocationButton = document.querySelector("button");
changeLocationButton.addEventListener("click", getWeatherInfo)


const apiKey = "";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
let url;



function getWeatherInfo(){
    let city=cityEl.value
    url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;
    fetchData(assignData);
    
    url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    fetchData(forecastData);
}



async function fetchData(callback) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Location not found");
        }

        const data = await response.json();
        callback(data);
    } catch (error) {
        console.log(error.message);
    }
}


function assignData(data){
  
    placeEl.innerText=cityEl.value+", " + data.sys.country;
    
    descEl.innerText=data.weather[0].main;
    tempEl.innerText=data.main.temp.toFixed(1) + " °C";

    maxTempEl.innerText="Max temp "+ data.main.temp_max.toFixed(1) + " °C";
    minTempEl.innerText="Min temp "+ data.main.temp_min.toFixed(1) + " °C";
    feelsEl.innerText="Feels like "+ data.main.feels_like.toFixed(1) + " °C";
    humidityEl.innerText="Humidity "+ data.main.humidity + "%";
    windEl.innerText="Wind "+ data.wind.speed.toFixed(1) + " m/s";
    pressureEl.innerText="Pressure "+ data.main.pressure + " hPa";

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
   
    iconEl.style.backgroundImage = `url('${iconUrl}')`;
    iconEl.style.backgroundSize="cover"; 
}

function forecastData(data){
    let index=7;
    for(let el=0; el<arrTemp.length;el++){
        arrTemp[el].innerText=data.list[index].main.temp.toFixed(1)+ " °C";

        arrDescription[el].innerText=data.list[index].weather[0].main;

        const iconUrl = `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`;
        arrIcon[el].style.background= "#6cd6d65d"
        arrIcon[el].style.backgroundImage=`url('${iconUrl}')`;
        arrIcon[el].style.backgroundSize="cover";
        
        
        index+=8;
    }
        
    

}