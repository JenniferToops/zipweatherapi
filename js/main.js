(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const zipcode = urlParams.get('zipcode');
    console.log("onload function is working")
    document.querySelector('input').value = zipcode;
    if (zipcode) {
        getWeather()
    } 
})()

const twitterUrl = "https://twitter.com/share?url=https://zipweatherapi.netlify.app/"
const twitterMessage = "Check Your Weather"

const facebookUrl = "https://www.facebook.com/sharer/sharer.php?u=https://zipweatherapi.netlify.app"


function getWeather() {
    const zipcode = document.querySelector('input').value;
        console.log("input value = " + zipcode)
    if (/^\d{5}$/.test(zipcode)) {
        console.log("true zipcode")
        console.log(zipcode)
    document.querySelector('#fb').href = facebookUrl + "?zipcode=" + zipcode 
    document.querySelector('#mail').href = document.querySelector('#mail').href + "?zipcode=" + zipcode
    document.querySelector('#twitter').href = twitterUrl + "?zipcode=" + zipcode + "&text=" + twitterMessage

    } else {
        document.querySelector('#zip-error').innerHTML= "Please enter a valid 5-digit zip code"
        console.log("validator not working")
    }

    document.querySelector('input[type=search]').addEventListener('search', () => location.reload());

    const url = "https://www.zipwise.com/webservices/zipinfo.php?key=c27q82skwg6nunzu&zip=" + zipcode + "&format=json"
    // const url = "http://localhost:3000/"
fetch(url)
    .then(res=> res.json())
    .then(data=> {
        //console.log(data)
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











