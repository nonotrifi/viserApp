"use strict";
// Dans une promise tout d'abord on va avoir une partie déclaration ensuite une partie utilsation
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const calcul = new Promise((resolve, reject) => {
    const result = 200 * 12;
    if (result) {
        resolve(result);
    }
    else {
        reject();
    }
});
// UTILISATION
// Ici on va venir récupérer notre promesse demarre et on va sur cette promise des methodes (then et catch)
// On va utiliser la methode then pour dire lorsque c'est bon qu'est ce que je fais; lorsque c'est bon je vais lui passer en paramètre
// une fonction de callback et cette fonction de callback va etre exécuter lorsque resolve va être exécuté; enft c'est exactement la même fonction
// resolve fait référence à cette fonction de callback () => { console.log("good") }
// catch permet de la même manière récupérer le reject
calcul.then((result) => {
    console.log("Résultat: " + result);
}).catch(() => {
    console.log("no good");
});
const newcalcul = (num1, num2) => {
    return new Promise((resolve, reject) => {
        const resultat = num1 * num2;
        if (resultat > 150) {
            resolve(resultat);
        }
        else {
            reject("Resultat trop petit");
        }
    });
};
newcalcul(14, 2).then((res) => {
    console.log('Resultat : ' + res);
}).catch((err) => {
    console.log("Oups, une erreur ..." + err);
});
// ------------------------------------------------ await async ------------------------------------ //
let funcTwo = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject({ message: 'error' });
        }, 500);
    });
};
let func = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ok");
    let text;
    try {
        text = yield funcTwo();
    }
    catch (err) {
        text = err;
    }
    return text;
});
func().then(text => console.log(text));
