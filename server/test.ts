// Dans une promise tout d'abord on va avoir une partie déclaration ensuite une partie utilsation

// DECLARATION
/* L'objectif c'est de créer une promise afin de tester si ma voiture démarre, donc je vais venir attendre qu'elle démarre
L'intéret de cette méthode asynchrone est de pouvoir attendre avant de faire qq chose
new Promise veut dire la création d'un nouvel objet, on lui passe en paramètre une fonction de callback() => {} qui va prendre en paramétre
 deux fonctions "resolve" et "reject", qui sont deux fonction qu'on exécuter à des endoits différents
resolve est lorsque notre test de démarrage a bien fonctionner et lorsque c'est pas bon on va utiliser reject
*/


import {text} from "express";
import {Error} from "mongoose";

const calcul = new Promise((resolve:any, reject) => {
    const result = 200*12;

    if(result){
        resolve(result);
    } else {
       reject();
    }
})

// UTILISATION
// Ici on va venir récupérer notre promesse demarre et on va sur cette promise des methodes (then et catch)
// On va utiliser la methode then pour dire lorsque c'est bon qu'est ce que je fais; lorsque c'est bon je vais lui passer en paramètre
// une fonction de callback et cette fonction de callback va etre exécuter lorsque resolve va être exécuté; enft c'est exactement la même fonction
// resolve fait référence à cette fonction de callback () => { console.log("good") }


// catch permet de la même manière récupérer le reject
calcul.then((result) => {
    console.log("Résultat: "+ result)
}).catch(() => {
console.log("no good");
})



const newcalcul = (num1: number, num2: number) => {
    return new Promise((resolve,reject) => {
        const resultat = num1*num2;

        if(resultat > 150){
            resolve(resultat);
        } else {
            reject("Resultat trop petit");
        }
    })

}

newcalcul(14,2).then((res) => {
    console.log('Resultat : ' + res)
}).catch((err) => {
    console.log("Oups, une erreur ..." + err)
})



// ------------------------------------------------ await async ------------------------------------ //
let funcTwo = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject({message : 'error'})
        }, 500);
    })
}


let func = async () => {
    console.log("ok");
    let text;
    try {
        text = await funcTwo();
    } catch (err) {
        text = err;
    }
    return text
}

func().then(text => console.log(text))