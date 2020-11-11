let userlist = document.querySelector('#userlist');
let form = document.querySelector('#addUser');

function renderUser(doc){
    let li = document.createElement('li');
    let firstname = document.createElement('span');
    let lastname = document.createElement('span');
    let password = document.createElement('span');
    let tel = document.createElement('span');
    let sex = document.createElement('span');
    let birth = document.createElement('span');
    let username = document.createElement('span');
    let email = document.createElement('span');
    let address = document.createElement('span');
    let del = document.createElement('div');
    del.className = 'del';

    li.setAttribute('data-id', doc.id);
    firstname.textContent = doc.data().firstname;
    lastname.textContent = doc.data().lastname;
    password.textContent = doc.data().password;
    tel.textContent = doc.data().tel;
    sex.textContent = doc.data().sex;
    birth.textContent = doc.data().birth;
    username.textContent = doc.data().username;
    email.textContent = doc.data().email;
    address.textContent = doc.data().address;

    del.textContent = 'x';

    li.appendChild(firstname);
    li.appendChild(lastname);
    li.appendChild(password);
    li.appendChild(tel);
    li.appendChild(sex);
    li.appendChild(birth);
    li.appendChild(username);
    li.appendChild(email);
    li.appendChild(address);
    li.appendChild(del);

    userList.appendChild(li);

    // delete data
    del.addEventListener('click', (e) =>{
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('userlist').doc(id).delete();
    });
}

//.where('city', '==', 'bankok').orderBy('name')
//db.collection('user').get().then(user => {
//    user.docs.forEach(doc => {
//        console.log(doc.data())
//        renderUser(doc);
//    })
//});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('userlist').add({
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        password: form.password.value,
        tel: form.tel.value,
        sex: form.sex.value,
        birth: form.birth.value,
        username: form.username.value,
        email: form.email.value,
        address: form.address.value
    })
    form.firstname.value = '';
    form.lastname.value = '';
    form.password.value = '';
    form.tel.value = '';
    form.sex.value = '';
    form.birth.value = '';
    form.username.value = '';
    form.email.value = '';
    form.address.value = '';
});

//real-time database
db.collection('userlist').orderBy('firstname').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        //console.log(change);
        if (change.type == 'added') {
            renderUser(change.doc);
        } else if (change.type == 'removed') {
            let li = userlist.querySelector(`[data-id=${change.doc.id}]`);
            userList.removeChild(li);
        }
    })
});

