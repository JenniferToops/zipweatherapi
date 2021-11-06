//The user will enter a zipcode. Our program will plug that information into weather API and output the city information to the DOM
//API auth key = xb5wkf52e5vcw3dz
//API with auth key = https://www.zipwise.com/webservices/zipinfo.php?key=xb5wkf52e5vcw3dz&zip=00501&format=json
//API zip code input url = "https://www.zipwise.com/webservices/zipinfo.php?key=xb5wkf52e5vcw3dz&zip="+inputVal+"&format=json"

(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const zipcode = urlParams.get('zipcode');
    console.log("got zipcode onload")
    if (zipcode) {
        document.querySelector('input').value=zipcode;
        getWeather()
    } 
})()

function getWeather() {
    const zipcode = document.querySelector('input').value;
    const zipValidator = /^\d{5}$/
    if (zipcode & zipValidator.test(zipcode)) {
    document.querySelector('#fb').href=document.querySelector('#fb').href + "?zipcode=" + zipcode 
    document.querySelector('#mail').href=document.querySelector('#mail').href + "?zipcode=" + zipcode
    document.querySelector('#twitter').href=document.querySelector('#twitter').href + "?zipcode=" + zipcode + "&text=Get your current weather"
    document.querySelector('#zip-error').innerHTML = null
    } else {
        document.querySelector('#twitter').href=document.querySelector('#twitter').href + 
        "&text=Get your current weather"
        document.querySelector('#zip-error').innerHTML= "Please enter a valid 5-digit zip code"
    }

    const url = "https://www.zipwise.com/webservices/zipinfo.php?key=xb5wkf52e5vcw3dz&zip="+zipcode+"&format=json"

fetch(url)
    .then(res=> res.json())
    .then(data=> {
        console.log(data)
                                    let city = data.results.cities[0].city
                                    let state = data.results.state
                                    console.log(city)
                                    document.querySelector('#city').innerText = city + `, ${state}`;


    fetch(`https://api.weatherapi.com/v1/current.json?key=b31bdec4dfb54793b4a200715210502&q=${city}`)
        .then(res=> res.json())
        .then(data=> {
        console.log(data)
        let lastUpdated = data.current.last_updated
        let degreesF = data.current.temp_f
        let condition = data.current.condition.text
        let latitude = data.location.lat
        let longitude = data.location.lon

        // need to figure out all the conditions, find images that match, and save them to images folder so they can render when called/fetched
        document.querySelector('img').src = `./images/${condition.toLowerCase().split(" ").join("")}.png`

        let lat = data.location.lat > 0 ? "N" : "S"
        let lon = data.location.lon > 0 ? "E" : "W"

        document.querySelector('#temp').innerHTML = `<i class="fas fa-thermometer-half"></i> ${degreesF}\u00B0` 
        document.querySelector('#condition').innerHTML = `<span id="condition-bold">${condition.toUpperCase()}</span> DAY` 
        document.querySelector('#latitude').innerText = `${Math.abs(latitude)}\u00B0 ${lat}`
        document.querySelector('#longitude').innerText = `${Math.abs(longitude)}\u00B0 ${lon}`
    })
    }
    )
    
    .catch(err=> {
        console.log(`error ${err}`)
    })
}








