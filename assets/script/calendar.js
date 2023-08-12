isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
};

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
};

const calendar = document.querySelector('.date');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = ["2022-03-04", "2022-03-05", "2022-03-06"];

// let activeDays = [];

// getActiveDays = () => {
//     for (let index = 0; index < date.length; index++) {
//         const dt = new Date(date[index]);
//         const element = dt.getDate();
//         activeDays.push(element);      
//     };
// };

// getActiveDays();
// console.log(activeDays[0])

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

            switch (index - firstDay.getDay() + 1) {
                case 4:
                    day.classList.add('active-day');
                    break;
                case 5:
                    day.classList.add('active-day');
                    break;
                case 6:
                    day.classList.add('active-day');
                    break;
                default:
                    break;
            }
        }
        calendarDays.appendChild(day);
    }
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
    console.log(currMonth.value);
    generateCalendar(currMonth.value, currYear.value);
};

generateCalendar(currMonth.value, currYear.value);