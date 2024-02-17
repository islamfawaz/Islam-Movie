
let close_open = $('#icon');
let boxwidth = $('#side-box').outerWidth();
let sideBar = $('#sideBar');
let lists = $('.lists');
let rowData = document.getElementById('rowData')
closeSideBar();
function openSideBar() {
    close_open.addClass('fa-x');
    close_open.removeClass('fa-align-justify');
    for (let i = 0; i < 5; i++) {
        lists.eq(i).animate({ top: 0 }, (i + 5) * 100)
    }
    sideBar.animate({ left: 0 }, 500)
}
function closeSideBar() {
    sideBar.animate({ left: -boxwidth }, 500)
    close_open.removeClass('fa-x');
    close_open.addClass('fa-align-justify');
    lists.animate({ top: 300 }, 500)
}

close_open.click(function () {
    if (sideBar.css('left') == '0px') {
        closeSideBar()
    }
    else {
        openSideBar();
    }
})


$(function () {
    $('#loader').fadeOut(function () {
        $('#loading').fadeOut(function () {
            $("body").css('overflow', 'auto');
            $("#loading").remove();

        })
    })
})


$(function () {
    $(document).on('mouseenter', 'figure', function () {
        $(this).find("img").animate({ scale: 1.2, rotate: "6deg" }, 500);
        $(this).find("figcaption h3").animate({ top: 0 }, 800);
        $(this).find("figcaption p").animate({ top: 0 }, 900);
        $(this).find("figcaption div").animate({ top: 0 }, 900);
        $(this).find("figcaption").animate({ opacity: 1 }, 300);
    });

    $(document).on('mouseleave', 'figure', function () {
        $(this).find("img").animate({ scale: 1, rotate: "0deg" }, 500);
        $(this).find("figcaption h3").animate(
            {
                right: 200,
            },
            500,
            function () {
                $(this).css({ top: -100, right: 0 });
            }
        );
        $(this).find("figcaption p").animate({
            right: 200,
        }, 500, function () {
            $(this).css({ top: 100, right: 0 });
        });
        $(this).find("figcaption div").animate({
            right: 200,
        }, 600, function () {
            $(this).css({ top: 100, right: 0 });
        });
        $(this).find("figcaption").animate({ opacity: 0 }, 300);
    });
})




async function getMovie() {
    let response = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    response = await response.json();
    response = new Map(response.results.map(movie => [movie.id, movie]));

    displayMovie(response);
}



function generateStars(rating) {
    let maxRating = 10;
    const filledStar = math.floor(rating / 2)
    const emptyStars = Math.floor((maxRating - rating) / 2);
    let starsHTML = '';
    for (let i = 0; i < filledStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    return starsHTML;
}




async function getMovie() {
    let response = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    response = await response.json();
    displayMovie(response.results);
}


function generateStars(rating) {
    const maxRating = 10;
    const filledStars = Math.floor(rating / 2);
    let starsHTML = '';
    for (let i = 0; i < filledStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>'; // Filled star icon
    }
    return starsHTML;
}

function displayMovie(movies) {
    let cartona = '';
    movies.forEach(movie => {
        const rating = movie.vote_average.toFixed(1);
        const title = movie.title || movie.name;
        cartona += `<div class="col-md-4">
                    <figure>
                      <img class="w-100" src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${title}">
                      <figcaption>
                        <h3>${title}</h3>
                        <p>${movie.overview}</p>
                        <p>Release Date: ${movie.release_date}</p>
                        <div class="stars">${generateStars(rating)}</div>
                        <h3 class="rating text-white fs-6 my-2">${rating}</h3>
                      </figcaption>
                    </figure>
                  </div>`;
    });
    document.getElementById('rowData').innerHTML = cartona;
}

getMovie();

async function getNowPlaying() {
    let response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    response = await response.json();
    response = new Map(response.results.map(movie => [movie.id, movie]));
    displayNowPlay(response)
}

function displayNowPlay(movies) {
    let cartona = '';
    movies.forEach(movie => {
        const rating = movie.vote_average.toFixed(1);
        const title = movie.title || movie.name;
        cartona += `<div class="col-md-4">
                      <figure>
                        <img class="w-100" src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${title}">
                        <figcaption>
                          <h3>${title}</h3>
                          <p>${movie.overview}</p>
                          <p>Release Date: ${movie.release_date}</p>
                          <div class="stars">${generateStars(rating)}</div>
                          <h3 class="rating text-white fs-6 my-2">${rating}</h3>
                        </figcaption>
                      </figure>
                    </div>`;
    });
    rowData.innerHTML = cartona;
}

async function popular() {
    let response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    response = await response.json();
    response = new Map(response.results.map(movie => [movie.id, movie]));
    displayPopular(response);
}
function displayPopular(movies) {
    movies.forEach(movie => {
        const rating = movie.vote_average.toFixed(1);
        const title = movie.title || movie.name;
        cartona += `<div class="col-md-4">
                      <figure>
                        <img class="w-100" src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${title}">
                        <figcaption>
                          <h3>${title}</h3>
                          <p>${movie.overview}</p>
                          <p>Release Date: ${movie.release_date}</p>
                          <div class="stars">${generateStars(rating)}</div>
                          <h3 class="rating text-white fs-6 my-2">${rating}</h3>
                        </figcaption>
                      </figure>
                    </div>`;
    });
    rowData.innerHTML = cartona;
}



async function topRated() {
    let response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    response = await response.json();
    response = new Map(response.results.map(movie => [movie.id, movie]));
    displayTopRated(response);
}
function displayTopRated(movies) {
    let cartona = '';
    movies.forEach(movie => {
        const rating = movie.vote_average.toFixed(1);
        const title = movie.title || movie.name;
        cartona += `<div class="col-md-4">
                      <figure>
                        <img class="w-100" src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${title}">
                        <figcaption>
                          <h3>${title}</h3>
                          <p>${movie.overview}</p>
                          <p>Release Date: ${movie.release_date}</p>
                          <div class="stars">${generateStars(rating)}</div>
                          <h3 class="rating text-white fs-6 my-2">${rating}</h3>
                        </figcaption>
                      </figure>
                    </div>`;
    });
    rowData.innerHTML = cartona;
}



async function upComing() {
    let response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    response = await response.json();
    response = new Map(response.results.map(movie => [movie.id, movie]));
    displayUpComing(response);
}
function displayUpComing(movies) {
    let cartona = '';
    movies.forEach(movie => {
        const rating = movie.vote_average.toFixed(1);
        const title = movie.title || movie.name;
        cartona += `<div class="col-md-4">
                      <figure>
                        <img class="w-100" src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${title}">
                        <figcaption>
                          <h3>${title}</h3>
                          <p>${movie.overview}</p>
                          <p>Release Date: ${movie.release_date}</p>
                          <div class="stars">${generateStars(rating)}</div>
                          <h3 class="rating text-white fs-6 my-2">${rating}</h3>
                        </figcaption>
                      </figure>
                    </div>`;
    });
    rowData.innerHTML = cartona;
}


let searchInput = document.getElementById('search');

searchInput.addEventListener('input', function(event) {
    const searchTerm = event.target.value.trim(); 
    if (searchTerm.length > 0) {
        searchMovies(searchTerm); 
    } else {
        getMovie(); 
    }
});

async function searchMovies(query) {
    try {
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${query}`);
        response = await response.json();
        displayMovie(response.results); 
    } catch (error) {
        console.error('Error searching movies:', error);
    }
}





$(window).scroll(function () {
    if ($(window).scrollTop() > 200) {
        $('#btnUp').fadeIn(500);
    }
    else {
        $('#btnUp').fadeOut(500);

    }

})
$(function () {
    $('#btnUp').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 2000);
    });
})

lists.click(function () {
    $('html,body').animate({ scrollTop: 0 }, 2000);
});


$(".contactlist").click(function () {
    $('html,body').animate({ scrollTop: 10000 }, 3000);
});

function inputValidation() {
    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && rePasswordValidation()) {
        $('#sbmt').prop("disabled", false);
    } else {
        $('#sbmt').prop("disabled", true);
    }
}



    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })


let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;


let unclickable = document.querySelector("#submitBtn");
const len = 200;


let sbtn=$("#submitBtn");
function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
           
           
            sbtn.css('background-color','red')
            sbtn.addClass('shake-horizontal')

      
            
        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
            sbtn.css('background-color','red')
            sbtn.addClass('shake-horizontal')

      
        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
            sbtn.css('background-color','red')
            sbtn.addClass('shake-horizontal')

      
        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
            sbtn.css('background-color','red')
            sbtn.addClass('shake-horizontal')

      
        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
            sbtn.css('background-color','red')
            sbtn.addClass('shake-horizontal')

      
        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
            sbtn.css('background-color','red')
            sbtn.addClass('shake-horizontal')
        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
            sbtn.removeClass('disabled')

        } else {
            sbtn.addClass('disabled')
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

