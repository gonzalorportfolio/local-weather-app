let units = 'imperial';//initailize the unit of measurement for open weather map API
let uOfm = 'F'; //set the unit of measurment for the page 
//
function getWeatherAndLocation(unit, fandc){
  const status = document.querySelector('.status');
  const iconElement = document.querySelector('.weather-icon');
  const degree = document.querySelector('.degree');
  const fanCel = document.querySelector('.fanCel');
  const success = (position)=>{//retruns the users location and fetch the data from the location and weather API
    console.log(position)
    const latitude = position.coords.latitude;// constant for the latitude  coordinates 
    const longitude = position.coords.longitude;//constant for the longitude coordinates 
    console.log('long:'+longitude+' lat:'+ latitude); // check the console to make sure it worked
    units = unit;
    //get the users locations and sets it on the page
    fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}X&localityLanguage=en')
    .then(res=> res.json())
    .then(data=> {
      console.log(data)
        status.textContent = data.locality+", "+data.principalSubdivision  
    })
    //get the weather using user's location and sets it on the page
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&units='+units+'&appid=b989a956b784b1493fe08339165f3739')
    .then(res=> res.json())
    .then(data=> {
      console.log(data)
        degree.textContent = Math.trunc(data.main.temp) +'°'
        fanCel.textContent=fandc
        iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`
    })
  }
  const error = () =>{// returns only if the user does not allow location service. 
    status.textContent = "unable to fulfill request";
  }
  navigator.geolocation.getCurrentPosition(success, error);//gets the user long and lat if successful or let the user know that it can if error
}
//event listener that runs the function when the page loads.
document.querySelector('.weather-icon').addEventListener('click', getWeatherAndLocation(units, uOfm));
//set the unit of mesurment to metric
document.querySelector('.toCel').onclick = function(){ getWeatherAndLocation('metric', 'C');
}//set the unit of measurment to imperial (the dark side)
document.querySelector('.toFar').onclick = function(){ getWeatherAndLocation('imperial', 'F');
}
