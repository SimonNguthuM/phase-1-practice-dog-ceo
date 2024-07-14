console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', () => {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(res => res.json())
        .then(data => data.message.forEach(dog => imagePrinter(dog)))

    function imagePrinter(image) {
        const imgs = document.querySelector('#dog-image-container')
        const li = document.createElement('li')
        li.classList.add('img-list')
        li.innerHTML = `<img src="${image}">`
        imgs.appendChild(li)
    }

    fetch("https://dog.ceo/api/breeds/list/all")
        .then(res => res.json())
        .then(data => {
            const breedList = Object.keys(data.message)
            breedList.forEach(breed => breedPrinter(breed))
            setupBreedFilter(breedList)
        });

    function breedPrinter(breed) {
        const breeds = document.querySelector('#dog-breeds')
        const li = document.createElement('li')
        li.classList.add('breed-list')
        li.textContent = `${breed}`
        breeds.appendChild(li)
    }

    const ul = document.querySelector('#dog-breeds')
    ul.addEventListener('click', (e) => {
        const currentColor = e.target.style.color
        if (currentColor === 'black') {
            e.target.style.color = 'red'
        } else {
            e.target.style.color = 'black'
        }
    })

    function setupBreedFilter(breedList) {
        const dropdown = document.querySelector('#breed-dropdown')
        const dogBreeds = document.querySelectorAll('.breed-list')

        dropdown.addEventListener('change', (e) => {
            const selectedLetter = e.target.value.toLowerCase()

            dogBreeds.forEach(breed => {
                const breedName = breed.textContent.toLowerCase()
                if (breedName.startsWith(selectedLetter)) {
                    breed.style.display = 'block'
                } else {
                    breed.style.display = 'none'
                }
            })
        })
    }

})