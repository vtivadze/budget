let age = document.getElementById('age'),
    name = document.getElementById('name'),
    surname = document.getElementById('surname');

function showUser() {
    alert("Пользователь " + surname.value + " " + name.value + ", его возраст " + age.value);
}

showUser();