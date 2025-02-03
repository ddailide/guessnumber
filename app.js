//funkcija1
function rand(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

let programosSkaicius = rand(1, 10);
console.log(programosSkaicius);

const inputField = document.getElementById('input-field'); // ivedimo laukelis
const confirmButton = document.getElementById('confirm-button'); // patvirtinti spejima mygtukas
const result = document.getElementById('result-main'); // rezultato mygtukas
const resultError = document.getElementById('result-error'); // rezultato mygtukas
const startButton = document.getElementById('start-button'); // start mygtukas
let resultHistory = document.getElementById('result-history');

let spejimuSkaicius = 0;
const max_spejimai = 3;

let laimetuIstorija = 0;
let pralostuIstorija = 0;




const inputValue = inputField.value; // inputValue yra ivestas zmogaus skaicius 

const correctNumbers = () => {
    const inputValue = inputField.value;

    if (inputValue === '') {
        resultError.innerHTML = '<div style="color: red;">Laukas yra tuščias!</div>';
        result.innerText = '';
        return;
    } else if (!/^\d+$/.test(inputValue)) {
        resultError.innerHTML = '<div style="color: red;">Įveskite tik skaičius!</div>';
        result.innerText = '';
        return;
    } else if (inputValue < 1 || inputValue > 10) {
        resultError.innerHTML = '<div style="color: red;">Įveskite skaičius intervale 1-10!</div>'
        result.innerText = '';
        return;
    } else {
        resultError.innerText = '';
        spejimuSkaicius++;
    }
    console.log(spejimuSkaicius);
    if (inputValue == programosSkaicius) {
        laimetuIstorija++;
        result.innerHTML = `
            <div style="display: flex; align-items: center; flex-direction: column;">
                <p>JŪS ATSPĖJOTE! Teisingas skaičius buvo: ${programosSkaicius}.</p>
                <img src="images/sveikinimai.png" alt="sveikinimai" style="width: 200px; height: 200px; padding: 20px;">
                <p>Pabandykite iš naujo spausdami mygtuką "Naujas žaidimas"</p>
            </div>
        `;
        confirmButton.disabled = true;
    } else if (spejimuSkaicius >= max_spejimai) {
        pralostuIstorija++;
        result.innerText = `Žaidimas baigtas, Jūs išnaudojote visus savo turimus bandymus. Teisingas skaičius buvo: ${programosSkaicius}. Bandykite naują žaidimą.`;
        confirmButton.disabled = true;
    } else {
        if (inputValue > programosSkaicius) {
            result.innerText = `Jūsų spėjimas didesnis, bandykite mažesnį skaičių. Liko bandymų: ${max_spejimai - spejimuSkaicius}`;
        } else if (inputValue < programosSkaicius) {
            result.innerText = `Jūsų spėjimas mažesnis, bandykite didesnį skaičių. Liko bandymų: ${max_spejimai - spejimuSkaicius}`;
        }
    }
    resultHistory.innerText = `Laimėtų žaidimų skaičius: ${laimetuIstorija}, pralaimėtų: ${pralostuIstorija}`;

}
confirmButton.addEventListener('click', correctNumbers);


const startNewGame = () => {
    programosSkaicius = rand(1, 10);
    inputField.value = '';
    result.innerText = '';
    resultError.innerText = '';
    resultError.innerHTML = `Žaidimas prasidėjo, atspėk skaičių nuo 1 iki 10. Tu turi 3 bandymus.`
    confirmButton.disabled = false;
    spejimuSkaicius = 0;
}

startButton.addEventListener('click', startNewGame);

