let currentTabIndex = 0;
handleTabsClick(currentTabIndex);

function handleTabsClick(tabIndex){
    const tabCnt = document.getElementsByClassName('tab-content');
    tabCnt[tabIndex].style.display = 'block';

    if (tabIndex == 0) {
        document.getElementById('backBtn').style.display = 'none';
    }else{
        document.getElementById('backBtn').style.display = 'inline';
    }
    if (tabIndex == (tabCnt.length - 1)) {
        document.getElementById('nextBtn').innerHTML = 'Confirm Booking';
    }else{
        document.getElementById('nextBtn').innerHTML = 'Next';
    }

    //togleSidebar func here
};

function handleNextBtnClick(tabIndex){
    const tabCnt = document.getElementsByClassName('tab-content');
};

function CheckData(){
    console.log("eger card secilmeyibse warning messaji goster");
};