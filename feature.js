const imageContainer = document.getElementById('img-container');
const loading = document.getElementById('loading');

let ready = false
imagesLoaded = 0
totalImage = 0
let photoArray = []

const client_key='CD6ET7OfhGdPhlmzUUzPE0zA2abHNQ5mYbC-ZDXn5e8'
const count=20
const api_url = `https://api.unsplash.com/photos/random?client_id=${client_key}&count=${count}`

function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoad(){
    console.log('image loaded')
    imagesLoaded ++
    if (imagesLoaded === totalImage){
        ready = true
        loading.hidden =true
        console.log("ready = ",ready)
    }
}

function display(){

    imagesLoaded = 0
    photoArray.forEach((photo) => {
        totalImage = photoArray.length
        console.log(totalImage) 
        const item = document.createElement('a');
        // console.log(item)
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');
        // console.log(img)
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);

        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
            
        });

        img.addEventListener('load',imageLoad);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotoes(){
    try{
        const response = await fetch(api_url);
        photoArray = await response.json();
        // console.log(photoArray);
        display();

    }catch(error){

    }
}

window.addEventListener('scroll', () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready = false
        getPhotoes()
         
    }
});

getPhotoes()