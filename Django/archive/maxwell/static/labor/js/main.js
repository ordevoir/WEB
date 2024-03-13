console.log("ready");

const cardButtons = document.querySelector('.card-buttons')

document.addEventListener('click', event => {
    if (event.target.className == 'start'){
        let btnID = +event.target.dataset.id
        start(btnID)


    }
})

function start(btnID) {
    let dateTimeFields = {
        years : document.querySelector(`[data-id="${btnID}"] .years`),
        mounths : document.querySelector(`[data-id="${btnID}"] .mounths`),
        days : document.querySelector(`[data-id="${btnID}"] .days`),
        hours : document.querySelector(`[data-id="${btnID}"] .hours`),
        minutes : document.querySelector(`[data-id="${btnID}"] .minutes`),
        seconds : document.querySelector(`[data-id="${btnID}"] .seconds`),
    }

    let dateTimeValues = {
        years : Number(dateTimeFields.years.textContent),
        mounths : Number(dateTimeFields.mounths.textContent),
        days : Number(dateTimeFields.days.textContent),
        hours : Number(dateTimeFields.hours.textContent),
        minutes : Number(dateTimeFields.minutes.textContent),
        seconds : 0,

        decrese() {
            if (this.seconds) {
                this.seconds -= 1
            } else if (this.seconds === 0) {
                if (this.minutes) {
                    this.seconds = 59
                    this.minutes -= 1
                } else if (this.minutes === 0) {
                    this.minutes = 59
                    if (this.hours) {
                        this.hours -= 1
                    } else if (this.hours === 0) {
                        this.hours = 24
                    }
                } 
            }
        }
    }
    setInterval(() => {
        dateTimeValues.decrese()
        
        dateTimeFields.years.textContent = ((dateTimeValues.years < 10) ? "0" : "") + dateTimeValues.years
        dateTimeFields.mounths.textContent = ((dateTimeValues.mounths < 10) ? "0" : "") + dateTimeValues.mounths
        dateTimeFields.days.textContent = ((dateTimeValues.days < 10) ? "0" : "") + dateTimeValues.days
        dateTimeFields.hours.textContent = ((dateTimeValues.hours < 10) ? "0" : "") + dateTimeValues.hours
        dateTimeFields.minutes.textContent = ((dateTimeValues.minutes < 10) ? "0" : "") + dateTimeValues.minutes
        dateTimeFields.seconds.textContent = ((dateTimeValues.seconds < 10) ? "0" : "") + dateTimeValues.seconds
    }, 1000)
}





let id = 23

const button = document.querySelector(`[data-id="${23}"].card-timer`)
// выбирается html-объект с data-атрибутом id=22 и классом start