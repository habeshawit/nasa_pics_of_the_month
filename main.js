const url = 'https://api.nasa.gov/planetary/apod?start_date=2021-09-01&end_date=2021-09-21&api_key='
const api_key = config.NASA_API_KEY

const fetchNASAData = async () => {
    try {
        const response = await fetch(`${url}${api_key}`)
        const data = await response.json()
        console.log('NASA data', data)
        displayData(data)
        listenForLikes();
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener("DOMContentLoaded", fetchNASAData)

const displayData = (data) =>{
    const images = document.querySelector("#image-container")

    const imagesArray = [];

    data.forEach(image => {
        const elemObj = createCardElements()
        const card = createImageCard(elemObj, image)
        imagesArray.push(card)
    })

    imagesArray.forEach((img) => {
        images.appendChild(img)
    })
}

const createCardElements = () => {
    const photo = document.createElement("photo")
    const img = document.createElement("img")
    const details = document.createElement('div')
    const title = document.createElement("h2")
    const date = document.createElement("h4")
    const explanation = document.createElement("p")
    const like = document.createElement("div")
    return { photo, img, date, details, title, explanation, like}

}

const createImageCard = (elemObj, image) =>{
    const {photo, img, date, details, title, explanation, like} = elemObj

    details.className = "details"
    like.classList.add("like", "like-no")
 
    title.textContent = image.title
    explanation.textContent = image.explanation
    img.src = image.hdurl
    date.textContent = image.date

    photo.appendChild(img)
    details.appendChild(title)
    details.appendChild(date)
    details.appendChild(explanation)
    photo.appendChild(details)
    photo.appendChild(like)

    return photo
}

const listenForLikes = () => {
    const likes = document.querySelectorAll(".like")

    likes.forEach(like => {
        like.addEventListener("click", (event) => {
            event.target.classList.toggle("like-no")
            event.target.classList.toggle("like-yes")
            if(event.target.classList.contains("like-yes")){
                console.log("saving to fav...");
                getFaveData(event.target)
            } else {
                console.log("removing favs ...");
                getFaveData(event.target)
            }
        })
    })
}


const getFaveData = (elem) =>{
    const parent = elem.parentElement
    const img = parent.querySelector('img').src
    const title = parent.querySelector("h2").textContent
    const explanation = parent.querySelector("p").textContent

    const favObj = {img, title, explanation}
    console.log(favObj);
}