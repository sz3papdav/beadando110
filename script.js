let jelenlegiOldal = 1;
let elemekOldalankent = 20;
let utolsoOldal = false;

function adatokBetoltese(oldal) {
    fetch(`https://jsonplaceholder.typicode.com/todos?_page=${oldal}&_limit=${elemekOldalankent}`)
        .then(valasz => valasz.json())
        .then(adatok => {
            if (adatok.length > 0) {
                adatokMegjelenitese(adatok);
            } else {
                utolsoOldal = true;
            }
        })
        .catch(hiba => console.log(hiba));
} 

function adatokMegjelenitese(adatok) {
    console.log(adatok);
    let tabla = '<table>';
    tabla += '<tr><td>Felhasználó</td><td>Sorszám</td><td>Leírás</td></tr>';
    adatok.forEach(elem => {
        tabla += `<tr>
        <td>${elem.userId}</td>
        <td>${elem.id}</td>
        <td>${elem.title}</td>
        </tr>`;
    });
    tabla += '</table>';
    document.getElementById('tartalom').innerHTML = tabla;
}

document.getElementById("elozoBtn").addEventListener("click", () => {
    if (jelenlegiOldal > 1) {
        jelenlegiOldal--;
        utolsoOldal = false;
        adatokBetoltese(jelenlegiOldal);
    }
});

document.getElementById("kovetkezoBtn").addEventListener("click", () => {
    if (!utolsoOldal) {
        jelenlegiOldal++;
        adatokBetoltese(jelenlegiOldal);
    }
});

function valasztottElemekMegvaltoztatasa() {
    elemekOldalankent = parseInt(document.getElementById("elemekOldalankent").value);
    jelenlegiOldal = 1;
    utolsoOldal = false;
    adatokBetoltese(jelenlegiOldal);
}

window.onload = () => adatokBetoltese(jelenlegiOldal);