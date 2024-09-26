const cityForm=document.querySelector('form');
const card=document.querySelector('.card');
const details=document.querySelector('.data');
const time=document.querySelector('.time');
const icon=document.querySelector('.icon img')

const updateUi= (data)=>{

    // const cityDets=data.cityDets;
    // const weather=data.weather;

    //newer way to do the above thing using destructures

    const {cityDets,weather}=data;
    details.innerHTML=
    `
    <div class="city">
        <h5 h5>${cityDets.EnglishName}</h5>
    </div>
    <div  class="Weather">
        ${weather.WeatherText}
    </div>
    <div class="temp">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>

    `
    if(card.classList.contains('dnone')){
        card.classList.remove('dnone')
    }

    let timeSrc=null;
    if(weather.IsDayTime){
        timeSrc="day.jpg";
       
    }
    else{
        timeSrc="night.png"
    }

    time.setAttribute("src",timeSrc);
}

const updateCity= async (city)=>{


    const cityDets=await getCity(city);
    const weather=await getWeather(cityDets.Key);


    //object shorthand notation
    return {cityDets,weather};
};

cityForm.addEventListener("submit",(e)=>{


    e.preventDefault();

    const city=cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data=>updateUi(data))
        .catch(err=>console.log(err));

    
    localStorage.setItem("city",city); 
    
});

if(localStorage.getItem("city")){
    updateCity(localStorage.getItem("city"))
        .then(data=>updateUi(data))
        .catch(err=>console.log(err));
}
