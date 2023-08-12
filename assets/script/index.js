/*
    1. Cardlari yaratmaq + 
    2. sonra currentstepi show ederem qalanini none +
    3. sidebara active classlari elave ederem
    4. back buttonu ilk pagede gorunmesin sonra gorunsun
    5. next buttona basanda card secilib secilmediyini yoxla
    6. eger hec bir card secilmeyibse onda warning msg ver
    7. prev datalar oldugu kimi qalmalidi
    8. her 
*/
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

const date = ["2022-03-04", "2022-03-05", "2022-03-06"];

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
console.log("currentStep: ", currentStep);

function updateStep() {
    const staffContentBody = document.getElementById('staff-content');
    const servicesContentBody = document.getElementById('services-content');

    const sidebarItems = document.querySelectorAll('.sidebar .sidebar-menu .item');
    const tabContents = document.querySelectorAll('.content .content-top .tab-content');

    const backBtn = document.getElementById('backBtn');

    console.log(sidebarItems);

    if (currentStep === 0) {
        backBtn.style.visibility = 'hidden';
    } else {
        backBtn.style.visibility = 'visible';
    };

    sidebarItems.forEach((item, index) => {
        if (index === currentStep) {
            item.classList.add('item-active');
            console.log("sidebar item index: ", index);
            tabContents[index].style.display = 'block';
        } else {
            item.classList.remove('item-active');
            tabContents[index].style.display = 'none';
        }
    });

    if (currentStep === 0) {
        staff.forEach(item => {
            const card = createCard(item);
            staffContentBody.appendChild(card);
        });
    } else if (currentStep === 1) {
        services.forEach(item => {
            const card = createCard(item);
            servicesContentBody.appendChild(card);
        });
    };
};


function createCard(cardData) {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.classList.add('card-img');
    image.src = `../assets/images/${cardData.image}`;
    image.alt = cardData.name;
    card.appendChild(image);

    const name = document.createElement('h5');
    name.classList.add('card-title');
    name.textContent = cardData.name;
    card.appendChild(name);

    const desc = document.createElement('p');
    desc.classList.add('card-desc');
    desc.textContent = cardData.price ? cardData.duration : cardData.desc;

    const cardTextContainer = document.createElement('div');
    cardTextContainer.classList.add('text-container');
    cardTextContainer.append(name, desc);

    const rightSideContent = document.createElement('div');
    rightSideContent.classList.add('right');
    rightSideContent.append(image, cardTextContainer);

    if (cardData.price) {
        const price = document.createElement('span');
        price.classList.add('price');
        price.textContent = cardData.price + '$';
        card.appendChild(price);
    };

    card.appendChild(rightSideContent);

    card.addEventListener('click', () => {
        if (cardData.price) {
            result.service_id = cardData.id;
            handleNextBtn();
        } else {
            result.staff_id = cardData.id;
            handleNextBtn();
        }
    });

    return card;
};

function showErr(text) {
    const warningMsg = document.getElementById('warningMsg');
    const warningImg = document.getElementById('warningImg');

    const textEl = document.createElement('span');
    textEl.textContent = 'Select ' + text;

    warningImg.insertAdjacentElement('afterend', textEl);
    warningMsg.style.visibility = 'visible';
};

function hideErr(){
    const warningMsg = document.getElementById('warningMsg');
    warningMsg.style.visibility = 'hidden';
};

function handleNextBtn() {
    const isCardSelected = checkSteps(currentStep);
    const warningTexts = ['staff', 'service', 'date & time'];

    if (isCardSelected) {
        hideErr();
        currentStep++;
        console.log("next button working");
        updateStep();
    } else {
        showErr(warningTexts[currentStep]);
    };
};

function checkSteps(step) {
    switch (step) {
        case 0: //staff
            console.log("result.staff_id !== null: ", result.staff_id !== null);
            return result.staff_id !== null;
        case 1: //services
            return result.service_id !== null;
        case 2: //date & time
            return result.date !== null && result.time !== null;
        case 4: //confirmation
            return result.customer.name !== '' &&
                result.customer.surname !== '' &&
                result.customer.email !== '' &&
                result.customer.phone !== '';
        default:
            return true;
    };
};

document.addEventListener('DOMContentLoaded', () => {
    updateStep();
});