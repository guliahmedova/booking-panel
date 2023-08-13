const staff = [
    {
        "id": 1,
        "name": "Alex Rosetta",
        "desc": "alexyrosetta@egmail.com",
        "image": "staff-1.png",
    },
    {
        "id": 2,
        "name": "Maria July",
        "desc": "mariajuly@egmail.com",
        "image": "staff-2.png",
    }
];
const services = [
    {
        "id": 1,
        "name": "Oral hygiene",
        "image": "service-1.jpg",
        "duration": "1 hour",
        "price": 50.00,
    },
    {
        "id": 2,
        "name": "Implants",
        "image": "service-2.jpg",
        "duration": "1 hour 30 minutes",
        "price": 120.00,
    },
    {
        "id": 3,
        "name": "Check up",
        "image": "service-3.jpg",
        "duration": "1 hour 12 minutes",
        "price": 140.00,
    }
];
const time = [
    {
        "start_time": "09:00",
        "end_time": "09:30"
    },
    {
        "start_time": "09:30",
        "end_time": "10:00"
    }
];
const date = ["2022-03-04", "2022-03-05", "2022-03-06"];
const result = {
    staff_id: null,
    service_id: null,
    date: null,
    time: null,
    customer: {
        name: '',
        surname: '',
        email: '',
        phone: ''
    }
};

let currentStep = 2;
const tabContent = document.querySelectorAll('.content .content-top .tab-content');

function renderStaffContent() {
    const staffContentBody = document.getElementById('staff-content');
    staff.map(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = item.id;

        const image = document.createElement('img');
        image.classList.add('card-img');
        image.src = `../assets/images/${item.image}`;
        image.alt = item.name;
        card.appendChild(image);

        const name = document.createElement('h5');
        name.classList.add('card-title');
        name.textContent = item.name;
        card.appendChild(name);

        const desc = document.createElement('p');
        desc.classList.add('card-desc');
        desc.textContent = item.desc;

        const cardTextContainer = document.createElement('div');
        cardTextContainer.classList.add('text-container');
        cardTextContainer.append(name, desc);

        const rightSideContent = document.createElement('div');
        rightSideContent.classList.add('right');
        rightSideContent.append(image, cardTextContainer);

        card.appendChild(rightSideContent);

        card.addEventListener('click', () => {
            result.staff_id = item.id;
        });

        staffContentBody.appendChild(card);
    });

    const cards = document.querySelectorAll('#staff-content .card');
    updateContent();
    handleCardClick(cards);
    const backBtn = document.getElementById('backBtn');
    backBtn.style.visibility = 'hidden';
};

function renderServicesContent() {
    const servicesContentBody = document.getElementById('services-content');
    services.map(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = item.id;

        const image = document.createElement('img');
        image.classList.add('card-img');
        image.src = `../assets/images/${item.image}`;
        image.alt = item.name;
        card.appendChild(image);

        const name = document.createElement('h5');
        name.classList.add('card-title');
        name.textContent = item.name;
        card.appendChild(name);

        const duration = document.createElement('p');
        duration.classList.add('card-desc');
        duration.textContent = item.duration;

        const price = document.createElement('span');
        price.classList.add('price');
        price.textContent = item.price + '$';
        card.appendChild(price);

        const cardTextContainer = document.createElement('div');
        cardTextContainer.classList.add('text-container');
        cardTextContainer.append(name, duration);

        const rightSideContent = document.createElement('div');
        rightSideContent.classList.add('right');
        rightSideContent.append(image, cardTextContainer);

        card.addEventListener('click', () => {
            result.service_id = item.id;
        });

        card.appendChild(rightSideContent);

        servicesContentBody.appendChild(card);
    });

    const cards = document.querySelectorAll('#services-content .card');
    updateContent();
    handleCardClick(cards);
    const backBtn = document.getElementById('backBtn');
    backBtn.style.visibility = 'visible';
};

function renderDateAndTimeContent() {
    updateContent();
    const backBtn = document.getElementById('backBtn');
    backBtn.style.visibility = 'visible';
};

function renderConfirmationContent() {
    updateContent();
    const backBtn = document.getElementById('backBtn');
    backBtn.style.visibility = 'visible';
};

function NextBtnClick() {
    if (validateStep()) {
        currentStep++;
        markStepAfterConfirmed(currentStep - 1);
        if (tabContent[currentStep].children[1].childElementCount) {
            updateContent();
        } else {
            renderContent();
        }
    };
};

function BackBtnClick() {
    if (currentStep > 0) {
        currentStep--;
        updateContent();
    };
};

function validateStep() {
    return true;
};

function markStepAfterConfirmed(step) {
    const confirmMark = document.getElementById(`step-${step}`);
    const item = document.getElementById(`item-${step}`);
    const number = document.getElementById(`number-${step}`);
    item.style.cursor = 'default';
    number.style.display = 'none';
    confirmMark.style.display = 'inline';
};

function renderContent() {
    switch (currentStep) {
        case 0:
            renderStaffContent();
            break;
        case 1:
            renderServicesContent();
            break;
        case 2:
            renderDateAndTimeContent();
            break;
        case 3:
            renderConfirmationContent();
            break;
        default:
            break;
    }
};

function updateContent() {
    const sidebarItems = document.querySelectorAll('.sidebar .sidebar-menu .item');
    const confirmMark = document.getElementById(`step-${currentStep}`);
    const number = document.getElementById(`number-${currentStep}`);

    sidebarItems.forEach((item, index) => {
        if (index === currentStep) {
            item.classList.add('item-active');
            tabContent[index].style.display = 'block';
            confirmMark.style.display = 'none';
            number.style.display = 'flex';
        } else {
            item.classList.remove('item-active');
            tabContent[index].style.display = 'none';
        }
    });
};

function handleCardClick(datas) {
    datas.forEach(item => {
        item.addEventListener('click', () => {
            datas.forEach(item => {
                item.classList.remove('card-active');
            });

            item.classList.add('card-active');
        });
    });
};



//CALENDAR
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
};

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
};

const calendar = document.querySelector('.date');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let activeDays = [];

function addActiveClassToActiveDates() {
    const dayElements = document.querySelectorAll('#days .day');
    for (const d of dayElements) {
        for (const activeD of activeDays) {
            if (d.getAttribute('data-day') == activeD) {
                d.classList.add('active-day');
            }
        }
    };
};

function handleActiveDateClick(){
    const dayElements = document.querySelectorAll('#days .day');
    dayElements.forEach(item => {
        item.addEventListener('click', () => {
            dayElements.forEach(item => {
                item.classList.remove('active-click');
            });
            item.classList.add('active-click');
        });
    });
};

getActiveDays = () => {
    for (let index = 0; index < date.length; index++) {
        const dt = new Date(date[index]);
        const element = dt.getDate();
        activeDays.push(element);
    };
};
getActiveDays();

console.log(activeDays);

generateCalendar = (month, year) => {
    const calendarDays = document.getElementById('days');
    calendarDays.innerHTML = '';
    const calendarHeader = document.querySelector('.calendar-header');
    const daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let currentDate = new Date();
    if (!month) month = currentDate.getMonth();
    if (!year) year = currentDate.getFullYear();

    calendarHeader.innerHTML = `${months[month]} 2023`;

    let firstDay = new Date(month, year, 1);

    for (let index = 0; index <= daysOfMonth[month] + firstDay.getDay() - 1; index++) {
        let day = document.createElement('span');
        if (index >= firstDay.getDay()) {
            day.classList.add('day');
            day.innerHTML = index - firstDay.getDay() + 1;
            day.dataset.day = index - firstDay.getDay() + 1;
        }
        calendarDays.appendChild(day);
    };
    addActiveClassToActiveDates();
    handleActiveDateClick();
};

let currDate = new Date();
let currMonth = {
    value: currDate.getMonth()
};
let currYear = {
    value: currDate.getFullYear()
};

document.querySelector('#date-prev-btn').onclick = () => {
    --currMonth.value;
    generateCalendar(currMonth.value, currYear.value);
};
document.querySelector('#date-next-btn').onclick = () => {
    ++currMonth.value;
    generateCalendar(currMonth.value, currYear.value);
};

generateCalendar(currMonth.value, currYear.value);
//CALENDAR



document.addEventListener('DOMContentLoaded', () => {
    renderContent();
    addActiveClassToActiveDates();
}); 