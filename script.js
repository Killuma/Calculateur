// ELEMENT INPUTS
const inputDay   = document.getElementById("inputDay");
const inputMonth = document.getElementById("inputMonth");
const inputYear  = document.getElementById("inputYear");

// ELEMENT BOUTON
const button = document.getElementById("calculateAge");

// ELEMENT RESULTAT
const resultYears   = document.getElementById("resultatYears");
const resultMonths   = document.getElementById("resultatMonths");
const resultDays    = document.getElementById("resultatDays");


// ELEMENT BOUTON
button.addEventListener("click", calculateAge);

// FONCTION CALCULATEUR D'ÂGE
function calculateAge() {
    console.log("Le bouton a été cliqué.");

    //VALEURS ENTREES PAR L'UTILISATEUR 
    const day   = parseInt(inputDay.value);
    const month = parseInt(inputMonth.value);
    const year  = parseInt(inputYear.value);

    //CONSOLE.LOG POUR VERIFIER LES VALEURS ENTREES
    console.log("Jour", day);
    console.log("Mois", month);
    console.log("Année", year);

    //ERREUR EN CAS DE NON VALIDATION DE VALEUR
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        alert("Veuillez entrer des valeurs numériques valides pour la date de naissance.");
        return;
    }

    //VERIFICATION SI LA DATE DE NAISSANCE EST DANS LE FUTUR
    const currentDate = new Date();
    const inputDate   = new Date(year, month - 1, day); 

    console.log("Date actuelle", currentDate);
    console.log("Date de naissance entrée", inputDate);

    if (inputDate > currentDate) {
        alert("La date de naissance ne peut pas être dans le futur.");
        return;
    }

    // Utilisation de la fonction performAgeCalulation pour obtenir les composants année, mois et jour
    const ageResult = performAgeCalulation(day, month, year);

    // Obtention de la date actuelle
    const currentDay   = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear  = currentDate.getFullYear();

    // Initialisation de ageInYears
    let ageInYears = 0;

    // Calcul de ageInYears
    if (currentMonth < ageResult.month || (currentMonth === ageResult.month && currentDay < ageResult.day)) {
        ageInYears--;
    }

    // Calcul de ageInMonths
    const ageInMonths = (currentYear - ageResult.year) * 12 + currentMonth - ageResult.month;

    // Calcul des jours restants jusqu'à l'anniversaire suivant
    const nextBirthday = new Date(currentYear, ageResult.month - 1, ageResult.day);
    let daysUntilNextBirthday = Math.ceil((nextBirthday - currentDate) / (1000 * 60 * 60 * 24));

    // Affichage des résultats
    resultYears.textContent  = `Years: ${ageInYears}`;
    resultMonths.textContent = `Months: ${ageInMonths}`;
    resultDays.textContent   = `Days until next birthday: ${daysUntilNextBirthday}`;
}

// Fonction pour effectuer le calcul des composants année, mois et jour
function performAgeCalulation(day, month, year) {
    const dob = new Date(year, month - 1, day); 

    return {
        year: dob.getFullYear(),
        month: dob.getMonth() + 1, 
        day: dob.getDate()
    };
}
