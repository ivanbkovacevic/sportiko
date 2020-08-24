const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let ime = document.createElement('span');
    let cena = document.createElement('span');
    let vrsta_plovila = document.createElement('span');
    let slobodan = document.createElement("INPUT").setAttribute("type", "checkbox");
    let cross = document.createElement('div');
 

    li.setAttribute('data-id', doc.id);
    ime.textContent = doc.data().ime;
    cena.textContent = doc.data().cena;
    vrsta_plovila.textContent = doc.data().vrsta_plovila;
    slobodan.textContent = doc.data().slobodan;
    cross.textContent = 'x';
    slobodan.value ='slobodan';
   

    li.appendChild(ime);
    li.appendChild(cena);
    li.appendChild(vrsta_plovila);
    li.appendChild(slobodan);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('plovila').doc(id).delete();
    });
}

// getting data
// db.collection('cafes').orderBy('cena').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('plovila').add({
        ime: form.ime.value,
        cena: form.cena.value,
        vrsta_plovila: form.vrsta_plovila.value,
        slobodan: form.slobodan.value,
    });
    form.ime.value = '';
    form.cena.value = '';
    form.vrsta_plovila.value = '';
});

// real-time listener
db.collection('plovila').orderBy('ime').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});

// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     ime: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     cena: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     cena: 'hong kong'
// });