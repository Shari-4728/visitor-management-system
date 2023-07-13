const menus = document.querySelectorAll('.hamburger');
const pages = document.querySelectorAll('.pages');

menus.forEach(menu => {
  menu.addEventListener('click', ()=>{
    menu.classList.toggle('active');
    
    pages.forEach(page => {
      page.classList.toggle('active');
    })
  })
});

const arrow = document.querySelector ('.arrow');
const activity_details = document.querySelector('.activity_details');

arrow.addEventListener ('click', () => {
  arrow.classList.toggle('active');
  activity_details.classList.toggle('active');
});


/**Form Action */
// $("#approve_appointment").submit(function(event){
//   event.preventDefault();

//   var unindexed_array = $(this).serializeArray();
//   var data = {}

//   $.map(unindexed_array, (n, i) => {
//       data[n['name']] = n['value'];
//     })


//   var request = {
//       "url" : `http://localhost:3000/approve/${data._id}`,
//       "method" : "PUT",
//       "data" : data
//   }

//   $.ajax(request).done(function(response){
//       alert("Appointment approved Successfully!");
//       location.pathname = '/adminAps';
//   })
// })
/**Form Action */


