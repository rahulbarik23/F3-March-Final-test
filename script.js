// generate the key ---------------------------------------------------------------------------------------------
let api_key = "mSWkOWNAxeidRxpyz6f1agBWFVQx0giaLOB3mlHi";

// current date of the day----------------------------------------------------------------------------------------
const currentDate = new Date().toISOString().split("T")[0];
document.getElementById("search-input").setAttribute('currentd', `${currentDate}`);

// elements for the img Contain-----------------------------------------------------------------------------------
let currentImageContain = document.getElementById("current-image-container");
let title       =  document.createElement('h1');
let imageContain=  document.createElement('div');
    imageContain.setAttribute('id', 'img-container');
let image       =  document.createElement('img');
let image_descri=  document.createElement('h3');
let img_description =  document.createElement('p');

// function to get the image of today----------------------------------------------------------------------------
function getCurrentImageOfTheDay(){
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${currentDate}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        title.innerHTML       = "NASA picture of the Day";
        image.src             = data.hdurl;
        imageContain.appendChild(image);
        image_descri.innerHTML= data.title;
        img_description.innerHTML = data.explanation;      
        currentImageContain.append(title, imageContain, image_descri, img_description);
    })
    .catch((err) => {
        console.log(err);
    })
}

// function  take the image of the day according to date ---------------------------------------------------------------------
function getImageOfTheDay(event) {
    let date;
    if(event.target.value == "Search"){
        date = document.getElementById('search-input').value;
    } else {
        date = event.target.innerHTML;
    }

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        title.innerHTML        = `Picture on ${date}`;
        image.src              = data.hdurl;
        imageContain.appendChild(image);
        image_descri.innerHTML     = data.title;
        img_description.innerHTML  = data.explanation;      
        currentImageContain.append(title, imageContain, image_descri, img_description);
    })
    .catch((err) => {
        console.log(err);
    })
    if(event.target.value == "Search"){
        saveSearch(date);
    }
    event.preventDefault();
}

// program start 
document.getElementById('search').addEventListener('click', getImageOfTheDay);
// function calling  to current image when page loads.------------------------------------------------------
window.addEventListener('load', getCurrentImageOfTheDay);

// function to saveing the data in local storage---------------------------------------------------------------
let history = [];
function saveSearch(date){
    history.push({date: `${date}`});
    localStorage.setItem("History", JSON.stringify(history));
    addSearchToHistory();
}

// function to saveing  the data in History----------------------------------------------------------------------
function addSearchToHistory(){
    let searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = "";
    history.forEach((item) => {
        let li           = document.createElement('li');
        let anchor       = document.createElement('a');
        anchor.setAttribute('href', "#");
        anchor.innerHTML = item.date;
        li.appendChild(anchor);
        searchHistory.appendChild(li);
    });
    let searchList = document.querySelectorAll('#search-history>li>a');
    searchList.forEach((item) => {
        item.addEventListener('click', getImageOfTheDay);
    });
}

