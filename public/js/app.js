const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Searching for ' + location
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
       
        response.json().then((data) => {
            messageOne.textContent = 'Weather in ' + data.location

            if(data.error){
                messageTwo.textContent = data.error.message
            }else{
                messageTwo.textContent = data.forecast.now + '. ' + data.forecast.today
            }
        })
    })

})