function updateStep() {
    const staffContentBody = document.getElementById('staff-content');
    const servicesContentBody = document.getElementById('services-content');

    const sidebarItems = document.querySelectorAll('.sidebar .sidebar-menu .item');
    const tabContents = document.querySelectorAll('.content .content-top .tab-content');

    const backBtn = document.getElementById('backBtn');

    if (currentStep === 0) {
        backBtn.style.visibility = 'hidden';
    } else {
        backBtn.style.visibility = 'visible';
    };

    sidebarItems.forEach((item, index) => {
        if (index === currentStep) {
            item.classList.add('item-active');
            tabContents[index].style.display = 'block';
        } else {
            item.classList.remove('item-active');
            tabContents[index].style.display = 'none';
        }
    });

    if (currentStep === 0 && selectedStaffId === 0) {
        staff.forEach(item => {
            const card = createCard(item);
            staffContentBody.appendChild(card);
        });
    } else if (currentStep === 1 && selectedServiceId === 0) {
        services.forEach(item => {
            const card = createCard(item);
            servicesContentBody.appendChild(card);
        });
    };
};

function createCard(cardData) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = cardData.id;

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
            selectedServiceId = cardData.id;
            handleNextBtn();
        } else {
            result.staff_id = cardData.id;
            selectedStaffId = cardData.id;
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

function hideErr() {
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
        markStepAfterConfirmed(currentStep - 1);
        updateStep();
    } else {
        showErr(warningTexts[currentStep]);
    };
};

function handlePrevBtn() {
    if (currentStep > 0) {
        currentStep--;
        updateStep();
    };
    console.log("selectedStaffId: ", selectedStaffId);
    console.log("currentStep: ", currentStep);
    console.log("Prevbtn working");
};

function checkSteps(step) {
    switch (step) {
        case 0: //staff
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

function markStepAfterConfirmed(step) {
    const confirmMark = document.getElementById(`step-${step}`);
    const item = document.getElementById(`item-${step}`);
    const number = document.getElementById(`number-${step}`);
    item.style.cursor = 'default';
    number.style.display = 'none';
    confirmMark.style.display = 'inline';
};