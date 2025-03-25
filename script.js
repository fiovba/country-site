let data;
let count = 12; 
let currentFilteredData = []; 

async function getData() {
    const res = await fetch('https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/country.json');
    data = await res.json();
    currentFilteredData = data; 
    initNavLinks();
    showCountries();
    getRandomFlags(); 
   
}

const navLinks = document.querySelectorAll("header a[id]");
const cardDiv = document.getElementById("cardDiv");
const searchInput = document.getElementById("search");
const showMoreBtn = document.getElementById("showMoreBtn");
const randomFlagsDiv = document.getElementById("randomFlags");

function initNavLinks() {
    navLinks.forEach(link => {
        link.onclick = function () {
            let region = link.id.charAt(0).toUpperCase() + link.id.slice(1);
            filterCountries(region);
        };
    });
}

function filterCountries(region) {
    count = 12;
    currentFilteredData = data.filter(country => country.region === region);
    showCountries();
}

function showCountries() {
    cardDiv.innerHTML = "";
    const slicedData = currentFilteredData.slice(0, count);
    slicedData.forEach(country => {
        cardDiv.innerHTML += `
            <div class="max-w-xs rounded-md shadow-md dark:bg-gray-50" onclick="goDetails('${country.alpha3Code}')">
                <img src="${country.flags.svg}" alt="${country.name} flag" class="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500">
                <div class="flex flex-col justify-between p-6 space-y-8">
                    <div class="space-y-2">
                        <h2 class="text-3xl font-semibold tracking-wide">${country.name}</h2>
                        <p class="dark:text-gray-800">Capital: ${country.capital}</p>
                        <p class="dark:text-gray-800">Population: ${country.population.toLocaleString()}</p>
                    </div>
                </div>
            </div>`;
    });

    showMoreBtn.style.display = currentFilteredData.length > count ? "block" : "none";
}

searchInput.addEventListener("keyup", function () {
    const searchValue = searchInput.value.toLowerCase();
    count = 12; 
    currentFilteredData = data.filter(country =>
        country.name.toLowerCase().startsWith(searchValue)
    );
    showCountries();
});


if (showMoreBtn) {
    showMoreBtn.addEventListener("click", function () {
        count += 8; 
        showCountries();
    });
}

function makeSearchVisible() {
    searchInput.classList.toggle('hidden');
}


function getRandomFlags() {
    if (!randomFlagsDiv) return;

    randomFlagsDiv.innerHTML = ""; 

    let shuffled = [...data].sort(() => 0.5 - Math.random()); 
    let randomCountries = shuffled.slice(0, 1);

    randomCountries.forEach(country => {
        randomFlagsDiv.innerHTML += `
             <div class="max-w-lg flex flex-col justify-center items-center md:flex-row gap-5" onclick="goDetails('${country.alpha3Code}')">
                <img src="${country.flags.svg}" alt="${country.name} flag" class="object-cover object-center w-[85%] rounded-t-md h-72 dark:bg-gray-500">
                <div class="flex flex-col justify-between p-6 space-y-8 ">
                    <div class="space-y-2 ">
                        <h2 class="text-3xl font-semibold tracking-wide">${country.name}</h2>
                        <p class="dark:text-gray-800">Capital: ${country.capital}</p>
                        <p class="dark:text-gray-800">Population: ${country.population.toLocaleString()}</p>
                    </div>
                </div>
            </div>`;

    });
}

function goDetails(id){
    window.location.href=`https://country-site-gamma.vercel.app/details.htm?id=${id}`
}
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');

hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('translate-y-full');  // Hides the sidebar
    sidebar.classList.toggle('-translate-y-full'); // Shows the sidebar
});


getData();
