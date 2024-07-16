
// Cibler les éléments dans HTML par leurs ID
let task = document.getElementById('task')
let add = document.querySelector('#add')
let liste = document.getElementById('liste')
let form = document.getElementById('form')

// Fonction qui récupère les données du localstorage 
// ou elle va déclarer un tableau vide
function getData() {
    let array = JSON.parse(localStorage.getItem('data')) || []
    // Retourner array comme valeur
    return array
}

// Fonction qui ajouter une nouvelle tâche
function addTask(e) {
    // fonction qui empêche la recharge de la page quand on soumet 
    // le formulaire
    e.preventDefault()
//    mettre les données du localstorage dans une variable array
    let array = getData()
    //  vérifier si l'élément existe déjà dans le tableau
    if (!array.find(el => el === task.value) && task.value !== ""){
        array.push(task.value)
        // Mettre à jour le localstorage
        localStorage.setItem('data', JSON.stringify(array))
        // Vider le champ de saisie
        task.value =""
        // Retourner le curseur vers le champ de saisie
        task.focus()
        // Appeler la méthode displayTask pour mettre l'affichage à jour
        displayTask()
    }
}
// Une fonction qui sert à afficher les données
function displayTask() {
    // On vide la liste des items
    liste.innerHTML = ""
    let array = getData()
    // Itération (parcourir) du  tableau array et 
    // appeler la fonction createElement() 
    for (let task of array) {
        createElement(task)
    }
}
// Une fonction qui a pour rôle de créer des <li> et des <button>
function createElement(tache) {
    let li = document.createElement('li')
    li.textContent = tache
    let btn = document.createElement('button')
    btn.textContent = 'Supprimer'
    li.appendChild(btn)
    btn.addEventListener('click',function(){
        deleteTask(tache)
    })
    // Lier un élément à un parent dans le DOM
    liste.appendChild(li)
}
// Fonction qui supprime un élément du tableau
function deleteTask(task) {
    let array = getData()
    // Récupérer l'indice de l'élément à supprimer avec la méthode indexOf()
    let index = array.indexOf(task)
    // Supprimer l'élément avec la méthode splice()
    array.splice(index,1)
    // mettre à jour les données
    localStorage.setItem('data', JSON.stringify(array))
    displayTask()
}
// Appeler la fonction au chargement de la page
displayTask()

// Ajouter un événement en cliquant le button
// add.addEventListener('click',ajouterTache)

// Ajouter un événement en soummetant le formulaire
form.addEventListener('submit', addTask)

