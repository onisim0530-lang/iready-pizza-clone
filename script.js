let game = {
    money: 50.00,
    day: 1,
    cheese: 10,
    menuPrice: 4.00,
    cheeseOnCurrentPizza: 0,
    dayRevenue: 0
};

function updateUI() {
    document.getElementById('hud-money').innerText = game.money.toFixed(2);
    document.getElementById('hud-day').innerText = game.day;
    document.getElementById('hud-cheese').innerText = game.cheese;
}

function buyCheese(amount, cost) {
    if (game.money >= cost) {
        game.money -= cost;
        game.cheese += amount;
        updateUI();
    } else {
        alert("Not enough cash!");
    }
}

function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

function updatePriceSlider(val) {
    game.menuPrice = parseFloat(val);
    document.getElementById('slider-val').innerText = game.menuPrice.toFixed(2);
}

function startShopDay() {
    game.dayRevenue = 0;
    game.cheeseOnCurrentPizza = 0;
    document.getElementById('pizza-cheese-count').innerText = 0;
    goToScreen('screen-shop');
    generateCustomer();
}

function generateCustomer() {
    // The exact mechanic: Customers hate high prices!
    if (game.menuPrice > 9.00) {
        document.getElementById('customer-bubble').innerText = "Grumpy Customer: '$" + game.menuPrice.toFixed(2) + " is too expensive! I'm leaving!'";
        document.getElementById('serve-btn').disabled = true;
    } else {
        document.getElementById('customer-bubble').innerText = "Customer: 'I want a pizza with 2 portions of cheese!'";
        document.getElementById('serve-btn').disabled = false;
    }
}

function addCheeseToPizza() {
    if (game.cheese > 0 && game.cheeseOnCurrentPizza < 2) {
        game.cheese--;
        game.cheeseOnCurrentPizza++;
        document.getElementById('pizza-cheese-count').innerText = game.cheeseOnCurrentPizza;
        updateUI();
    } else if (game.cheese <= 0) {
        alert("Out of cheese ingredients!");
    }
}

function servePizza() {
    if (game.cheeseOnCurrentPizza === 2) {
        game.money += game.menuPrice;
        game.dayRevenue += game.menuPrice;
        alert("Perfect! The customer paid you $" + game.menuPrice.toFixed(2));
    } else {
        alert("Wrong recipe! The customer left without paying.");
    }
    
    // End the brief day loop and show the ledger
    document.getElementById('ledger-revenue').innerText = game.dayRevenue.toFixed(2);
    document.getElementById('ledger-profit').innerText = game.dayRevenue.toFixed(2); // simplfied margin
    goToScreen('screen-ledger');
}

function nextDay() {
    game.day++;
    updateUI();
    goToScreen('screen-market');
}

// Run initial UI render
updateUI();
