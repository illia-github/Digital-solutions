const navbar = document.getElementById('navbar');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');
const callbackForm = document.querySelector('.callback-form');
const loadingText = document.querySelectorAll('.loading-text');
const speed = 5;
let scrolled = false;
const $counts = $('.counts');

// Count numbers
$counts.waypoint(
  function () {
    setTimeout(() => {
      loadingText.forEach((element) => {
        const updateCount = () => {
          const target = +element.getAttribute('data-target');
          const count = +element.innerText;

          const inc = target / speed;

          if (count < target) {
            element.innerText = count + inc;
            setTimeout(updateCount, 80);
          } else {
            count.innerText = target;
          }
        };
        updateCount();
      });
    }, 300);
  },
  { offset: '90%' }
);

// Hide and show navbar 
window.onscroll = function () {
  if (window.pageYOffset > 100) {
    navbar.classList.remove('top');
    if (!scrolled) {
      navbar.style.transform =
        'translateY(-70px)'; /*so if not scrolled it goes negative 70px which is the height of navbar container */
    }
    setTimeout(function () {
      navbar.style.transform = 'translateY(0)';
      scrolled = true;
    }, 200);
  } else {
    navbar.classList.add('top');
    scrolled = false;
  }
};

// Smooth Scrolling
$('#navbar a').on('click', function (e) {
  if (this.hash !== '') {
    e.preventDefault();

    const hash = this.hash;

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 100,
      },
      800
    );
  }
});


// Submit form and add array of objects into Local storage.

class Person {
  constructor(id, name, email, phone, message) {
    this.id = id;
    this.name = name;
    this.phone = email;
    this.phone = phone;
    this.message = message;
  }
}

callbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const randomId = Math.floor(Math.random() * 1000000);

  if ((name.value, email.value, phone.value, message.value)) {
    // Instantiate person
    const person = new Person(
      randomId,
      name.value,
      email.value,
      phone.value,
      message.value
    );

    // Set to Local Storage
    setToLs(person);

    // Clear form fields
    callbackForm.reset();
  } else {
    console.log('please fill in all fields');
  }
});

function setToLs(person) {
  let people;
  // Check if there is something in local storage
  if (localStorage.getItem('people') === null) {
    people = [];
  } else {
    people = JSON.parse(localStorage.getItem('people'));
  }
  // Add to array
  people.push(person);

  // Set to Local Storage
  localStorage.setItem('people', JSON.stringify(people));
}
