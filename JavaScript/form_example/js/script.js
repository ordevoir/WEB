let chooseBtn = document.getElementById('choose'),
    receiveBtn = document.getElementById('receive'),
    heading = document.getElementsByTagName('h2')[0],
    nameInput = document.getElementsByClassName('contactform_name')[0],
    phoneInput = document.querySelector('.contactform_phone'), // nice!
    mailInput = document.querySelectorAll('.conactform_mail')[0], // nice!
    modal = document.querySelector('.modal'),
    close = document.querySelector('.close'),
    text = document.getElementsByName('message')[0];

function hover() {
    heading.textContent = 'Да, да... все...';
}

chooseBtn.addEventListener('mousedown', hover);
chooseBtn.addEventListener('mouseup', function() {
    heading.textContent = 'Все включено!';
});

receiveBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

close.addEventListener('click', function(){
    modal.style.display = 'none';
});

nameInput.addEventListener('input', function() {
    text.value = `hello ${nameInput.value}`; 
})

console.log('hello');

let answer = prompt('Really');
console.log(answer)

for (let i = 0; i < 10; i++) { console.log(i) }

