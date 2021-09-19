const url = 'https://api.nasa.gov/planetary/apod?start_date=2021-09-01&end_date=2021-09-21&api_key='
const api_key = config.NASA_API_KEY

const fetchNASAData = async () => {
    try {
        const response = await fetch(`${url}${api_key}`)
        const data = await response.json()
        console.log('NASA data', data)
        displayData(data)
        
    } catch (error) {
        console.log(error)
    }
}
  

const displayData = data => {

    document.querySelector('#image-container').innerHTML = "";
    
    data.forEach(
        photo => (document.querySelector('.card-deck').innerHTML += `
            <div class="card" id="image-${photo.date}">
                <img class="card-img-top" src=${photo.hdurl} alt="Image Unavailable" style="height:55vh!important">
                <div class="card-body">
                    <h5 class="card-title">${photo.title} - ${photo.date}</h5>
                    <p class="card-text">${photo.explanation}</p>
                    <button type="button" class="btn btn-primary" id="like-button">Like</button>
                </div>
            </div>
        `)
    );

    let buttons = document.querySelectorAll(".btn")

    buttons.forEach(button => {
        button.addEventListener('click', handleLikeClick);
    })
}

const handleLikeClick = () =>{
    console.log("like button clicked");
}

fetchNASAData()
