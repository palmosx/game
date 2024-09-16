let score = 0;
let level = 1;
let tapPower = 1;
let upgradeCost = 100;
let energy = 100;
let maxEnergy = 100;
let energyRegenRate = 1;
let energyUpgradeCost = 500;
let upgradesCreated = 0;
const maxUpgrades = 30;

const tapCoin = document.getElementById('tap-coin');
const moneyAmountDisplay = document.getElementById('money-amount');
const levelNameDisplay = document.getElementById('level-name');
const levelIndicatorDisplay = document.getElementById('level-indicator');
const levelProgress = document.getElementById('level-progress');
const energyProgress = document.getElementById('energy-progress');
const buyUpgradeButton = document.getElementById('buy-upgrade');
const upgradeCostDisplay = document.getElementById('upgrade-cost');
const buyEnergyUpgradeButton = document.getElementById('buy-energy-upgrade');
const energyUpgradeCostDisplay = document.getElementById('energy-upgrade-cost');
const testButton = document.getElementById('test-button');

// Новые названия уровней
const levelNames = [
    "Beginner Blob",       // Level 1
    "Enthusiastic Tapper", // Level 2
    "Coin Collector",      // Level 3
    "Tapper Extraordinaire", // Level 4
    "Coin Crusader",       // Level 5
    "Tap Ninja",           // Level 6
    "Treasure Hoarder",    // Level 7
    "Golden Guru",         // Level 8
    "Coin Conqueror",      // Level 9
    "Chosen One"           // Level 10
];

// Показываем экран загрузки
window.onload = function () {
    // Устанавливаем таймер для 10 секунд
    setTimeout(() => {
        hideLoadingScreen();
    }, 10000);
};

function hideLoadingScreen() {
    // Прячем экран загрузки
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
    
    // Показываем главный экран игры
    const gameScreen = document.getElementById('game');
    gameScreen.style.display = 'block';
}
// Уровни и необходимое количество монет для их достижения
const levels = [
    10000,       // Level 1
    50000,       // Level 2
    100000,      // Level 3
    250000,      // Level 4
    500000,      // Level 5
    1000000,     // Level 6
    5000000,     // Level 7
    10000000,    // Level 8
    100000000,   // Level 9
    1000000000   // Level 10
];

const levelUpAnimation = document.createElement('div');
levelUpAnimation.id = 'level-up-animation';
levelUpAnimation.textContent = 'Level Up!';
document.body.appendChild(levelUpAnimation);

// Устанавливаем начальные значения для уровня и индикатора
levelNameDisplay.textContent = levelNames[0];
levelIndicatorDisplay.textContent = `${level}/10`;

setInterval(() => {
    if (energy < maxEnergy) {
        energy += energyRegenRate;
        if (energy > maxEnergy) energy = maxEnergy;
        updateEnergyDisplay();
    }
}, 1000);

testButton.addEventListener('click', () => {
    score += 10000;
    updateDisplay();
});

tapCoin.addEventListener('click', () => {
    if (energy > 0) {
        score += tapPower;
        energy--;
        updateDisplay();
    } else {
        tapCoin.classList.add('no-energy');
        setTimeout(() => {
            tapCoin.classList.remove('no-energy');
        }, 300);
    }
});

buyUpgradeButton.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        tapPower++;
        upgradeCost = Math.floor(upgradeCost * 4.5);
        updateDisplay();
    }
});

buyEnergyUpgradeButton.addEventListener('click', () => {
    if (score >= energyUpgradeCost) {
        score -= energyUpgradeCost;
        energyRegenRate++;
        energyUpgradeCost = Math.floor(energyUpgradeCost * 4.5);
        updateDisplay();
    }
});

function updateDisplay() {
    moneyAmountDisplay.textContent = score;
    upgradeCostDisplay.textContent = upgradeCost;
    energyUpgradeCostDisplay.textContent = energyUpgradeCost;
    updateLevel();
    updateEnergyDisplay();
}

function updateLevel() {
    if (level < levels.length && score >= levels[level - 1]) {
        level++;
        levelNameDisplay.textContent = levelNames[level - 1]; // Название текущего уровня
        levelIndicatorDisplay.textContent = `${level}/10`; // Индикатор уровня
        levelUpAnimation.style.display = 'block';
        levelUpAnimation.classList.add('show');
        setTimeout(() => {
            levelUpAnimation.style.display = 'none';
        }, 1000);

        createFallingUpgrades();
    }

    // Обновляем прогресс-бара
    const currentLevelScore = levels[level - 2] || 0;
    const nextLevelScore = levels[level - 1];
    let progress = ((score - currentLevelScore) / (nextLevelScore - currentLevelScore)) * 100;
    levelProgress.style.width = `${progress}%`;
}

function updateEnergyDisplay() {
    const energyPercentage = (energy / maxEnergy) * 100;
    energyProgress.style.width = `${energyPercentage}%`;

    if (energyPercentage < 20) {
        energyProgress.style.backgroundColor = '#ff4c4c';
    } else if (energyPercentage < 50) {
        energyProgress.style.backgroundColor = '#ffa500';
    } else {
        energyProgress.style.backgroundColor = '#76c7c0';
    }
}

// Функция для создания падающих иконок улучшений
function createFallingUpgrades() {
    const upgradeContainer = document.createElement('div');
    upgradeContainer.id = 'upgrade-container';
    document.body.appendChild(upgradeContainer);

    for (let i = 0; i < 30; i++) { 
        if (upgradesCreated >= maxUpgrades) break;

        const upgradeIcon = document.createElement('img');
        upgradeIcon.src = 'upgrade.png';
        upgradeIcon.classList.add('falling-upgrade');
        upgradeIcon.style.left = `${Math.random() * 100}%`;
        upgradeIcon.style.top = `${Math.random() * -50}px`;
        upgradeIcon.style.animationDelay = `${Math.random() * 2}s`;
        upgradeContainer.appendChild(upgradeIcon);

        upgradesCreated++;
    }

    setTimeout(() => {
        upgradeContainer.remove();
        upgradesCreated = 0;
    }, 5000); 
}