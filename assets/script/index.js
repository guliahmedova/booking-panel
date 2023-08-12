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

let currentStep = 0;
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

        staffContentBody.appendChild(card);
    });

    updateContent();

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

        card.appendChild(rightSideContent);

        servicesContentBody.appendChild(card);
    });

    updateContent();

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
    console.log();
    if (validateStep()) {
        currentStep++;
        markStepAfterConfirmed(currentStep - 1);
        if (tabContent[currentStep].children[1].childElementCount) {
            updateContent();
        }else{
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

function markStepAfterConfirmed(step){
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

document.addEventListener('DOMContentLoaded', () => {
    renderContent();
}); 