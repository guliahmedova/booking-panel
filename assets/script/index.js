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

const note = {
    staff: "",
    service: "",
    date: "",
    start_time: "",
    end_time: "",
    price: ""
};

let currentStep = 0;
const tabContent = document.querySelectorAll('.content .content-top .tab-content');

let selectedStaffId = null;
let selectedServiceId = null;
let selectedDate = '';
let selectedTime = '';
let selectedFirstName = null;
let selectedLatName = null;
let selectedEmail = null;
let selectedPhone = null;

let isStaffRender = false;
let isServiceRender = false;

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
            selectedStaffId = item.id;
            note.staff = item.name;
        });

        staffContentBody.appendChild(card);
    });

    isStaffRender = true;

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
            selectedServiceId = item.id;
            note.service = item.name;
            note.price = item.price;
        });

        card.appendChild(rightSideContent);

        servicesContentBody.appendChild(card);
    });

    isServiceRender = true;

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
function renderNote() {
    const staff = document.getElementById("note-staff");
    const service = document.getElementById("note-service");
    const date = document.getElementById("note-date");
    const price = document.getElementById('note-price');

    staff.textContent = note.staff;
    service.textContent = note.service;
    date.textContent = `${note.date} / ${note.start_time}-${note.end_time}`;
    price.textContent = '$' + note.price;
};
function NextBtnClick() {
    const nextBtn = document.getElementById('nextBtn');
    if (validateStep() && 3 >= currentStep) {
        currentStep++;
        if (currentStep === 3) {
            nextBtn.textContent = 'Confirm Booking';
            renderNote();
            endBooking();
        };
        if (currentStep !== 0) {
            const backBtn = document.getElementById('backBtn');
            backBtn.style.visibility = 'visible';
        }
        markStepAfterConfirmed(currentStep - 1);
        if (!isStaffRender) {
            renderStaffContent();
        } else if (!isServiceRender) {
            renderServicesContent();
        }
        else {
            updateContent();
        };
    };
};
function BackBtnClick() {
    const nextBtn = document.getElementById('nextBtn');
    if (currentStep > 0) {
        currentStep--;
        if (currentStep === 2) {
            nextBtn.textContent = 'Next';
        };
        updateContent();
    };
};
function validateStep() {
    const warningMsg = document.getElementById('warningMsg');
    const warningImg = document.createElement('img');
    const warningText = document.createElement('span');
    warningImg.src = '../assets/images/warning-icon.svg';
    warningImg.alt = '';

    const modal = document.getElementById('modalContainer');

    if (currentStep === 0 && selectedStaffId === null) {
        warningText.textContent = 'Select staff';
        warningMsg.append(warningImg, warningText);
        warningMsg.style.visibility = 'visible';
    } else if (currentStep === 1 && selectedServiceId === null) {
        warningText.textContent = 'Select Service';
        warningMsg.append(warningImg, warningText);
        warningMsg.style.visibility = 'visible';
    } else if (currentStep === 2 && selectedDate === '' && selectedTime === '') {
        warningText.textContent = 'Select Date & Time';
        warningMsg.append(warningImg, warningText);
        warningMsg.style.visibility = 'visible';
    } else if (currentStep === 3 && selectedFirstName === null && selectedLatName === null && selectedEmail === null && selectedPhone === null) {
        modal.style.display = 'block';
    } else {
        warningMsg.style.visibility = 'hidden';
        modal.style.display = 'none';
        warningMsg.innerHTML = '';
        return true;
    };
};
function closeModal() {
    const modal = document.getElementById('modalContainer');
    modal.style.display = 'none';

    if (currentStep === 0) {
        window.location.reload();
    };
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

    if (currentStep === 0) {
        const backBtn = document.getElementById('backBtn');
        backBtn.style.visibility = 'hidden';
    }else{
        const backBtn = document.getElementById('backBtn');
        backBtn.style.visibility = 'viisble';
    }

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
            NextBtnClick();
        });
    });
};
function handleInputChanges() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    selectedFirstName = firstName;
    selectedLatName = lastName;
    selectedPhone = phone;
    selectedEmail = email;
};
function bookingConfirm() {
    const booking = {
        staff_id: selectedStaffId,
        service_id: selectedServiceId,
        date: selectedDate,
        time: selectedTime,
        customer: {
            name: selectedFirstName,
            surname: selectedLatName,
            email: selectedEmail,
            phone: selectedPhone
        }
    };
    console.log(booking);
};
function endBooking() {
    const nextBtn = document.getElementById('nextBtn');
    const modal = document.getElementById('modalContainer');
    const modalText = document.getElementById("modalText");
    const servicesContentBody = document.getElementById('services-content');
    const staffContentBody = document.getElementById('staff-content');

    const sidebarItems = document.querySelectorAll('.sidebar .sidebar-menu .item');
    const itemNumber = document.querySelectorAll('.sidebar .sidebar-menu .number');
    const itemImg = document.querySelectorAll('.sidebar .sidebar-menu .confirm-img');

    if (currentStep === 0) {
        const backBtn = document.getElementById('backBtn');
        backBtn.style.visibility = 'hidden';
    }

    nextBtn.addEventListener("click", () => {
        if (validateStep()) {
            bookingConfirm();
            currentStep = 0;
            modalText.textContent = 'Confirmation successfully completed!';
            modalText.style.color = '#38CF78';
            modal.style.display = 'block';
        }
        servicesContentBody.innerHTML = '';
        staffContentBody.innerHTML = '';
        nextBtn.textContent = 'Next';

        selectedStaffId = null;
        selectedServiceId = null;
        selectedDate = '';
        selectedTime = '';
        selectedFirstName = null;
        selectedLatName = null;
        selectedEmail = null;
        selectedPhone = null;

        isStaffRender = false;
        isServiceRender = false;

        console.log(currentStep);

        itemNumber.forEach(item => {
            item.style.display = 'flex';
        });

        itemImg.forEach(item => {
            item.style.display = 'none';
        });

        sidebarItems.forEach(item => {
            item.classList.remove('item-active');
        });

        renderContent();
        generateCalendar();
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
        for (let index = 0; index < activeDays.length; index++) {
            if (d.getAttribute('data-day') == activeDays[index]) {
                d.classList.add('active-day');
                d.dataset.date = date[index];
            }
        }
    };
};
function renderTime() {
    const timeContainer = document.getElementById('timeBody');
    time.map(item => {
        const timeCard = document.createElement('div');
        timeCard.classList.add('time-card');

        const startTimeSp = document.createElement('span');
        startTimeSp.textContent = item.start_time;
        timeCard.dataset.start = item.start_time;

        const endTimeSp = document.createElement('span');
        endTimeSp.textContent = item.end_time;
        timeCard.dataset.end = item.end_time;

        timeCard.addEventListener('click', () => {
            selectedTime = item.end_time;
        });

        timeCard.append(startTimeSp, endTimeSp);
        timeContainer.appendChild(timeCard);
    });
};
function handleTimeClick() {
    const timeElements = document.querySelectorAll('#timeBody .time-card');
    timeElements.forEach(item => {
        item.addEventListener('click', () => {
            timeElements.forEach(item => {
                item.classList.remove('time-card-active');
            });
            item.classList.add('time-card-active');
            const endTime = item.getAttribute('data-end');
            const startTime = item.getAttribute('data-start');
            selectedTime = endTime;
            note.start_time = startTime;
            note.end_time = endTime;
            NextBtnClick();
        });
    });
};
function handleActiveDateClick() {
    const dayElements = document.querySelectorAll('#days .day');
    const timeBox = document.getElementById('timeBody');
    const timeTitle = document.getElementById('timeTitle');
    dayElements.forEach(item => {
        item.addEventListener('click', () => {
            dayElements.forEach(item => {
                item.classList.remove('active-click');
            });
            item.classList.add('active-click');
            timeBox.style.display = 'grid';
            const slctDate = item.getAttribute('data-date');
            timeTitle.textContent = slctDate;
            selectedDate = slctDate;
            note.date = slctDate;
        });
    });
    renderTime();
    handleTimeClick();
};
getActiveDays = () => {
    for (let index = 0; index < date.length; index++) {
        const dt = new Date(date[index]);
        const element = dt.getDate();
        activeDays.push(element);
    };
};
getActiveDays();
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