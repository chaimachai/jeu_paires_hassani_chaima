let recto = document.querySelectorAll(".recto");
let verso = document.querySelectorAll(".verso");
let cartes = document.querySelectorAll(".cartes");
let chrono = document.querySelector(".chrono");
let input_pseudo = document.querySelector("#input_pseudo");
let btn_pseudo = document.querySelector("#btn_pseudo");
let affichage = document.querySelector(".affichage");
let jeu = document.querySelector(".jeu");
let h1 = document.querySelector("h1");

let count = 0;
let continu = true;
let sec = 0;
let min = 0;
let heure = 0;
let pseudo;

let lancer = () => {
    pseudo = input_pseudo.value
    affichage.classList.add("none");
    jeu.classList.remove("none");
}
input_pseudo.addEventListener("keyup",(e)=>{
(e.key == "Enter")? lancer() : ""
})
btn_pseudo.addEventListener("click",lancer)

let joueur = {
    nom: pseudo,
    victoires: 0,
    defaites: 0,
    total: 0
}

verso.forEach(element => {
    element.src = "./public/img/gryffindor.png"
})

setInterval(()=>{
    sec++
    if (sec == 60){
        sec = 0;
        min++
    }
    if(min == 60){
        min = 0;
        heure++
    }
    (heure == 0)? chrono.innerHTML = `${min} : ${sec}` : chrono.innerHTML = `${heure} : ${min} : ${sec}`
},1000)

let melange = () => {
    let les_src = ["./public/img/carte_1.jpg", "./public/img/carte_2.jpg" ,"./public/img/carte_3.jpg","./public/img/carte_1.jpg", "./public/img/carte_2.jpg" ,"./public/img/carte_3.jpg"];
    recto.forEach(element =>{
        let random = parseInt(Math.random() * les_src.length);
        element.src = les_src[random];
        les_src.splice(random,1);
    })
}

melange()
let retourner = (e)=>{
    if (continu){
        e.target.previousElementSibling.classList.remove("none");
        e.target.previousElementSibling.classList.add("test");
        e.target.classList.toggle("none");
        count += 1;
        if (count == 2){
            continu = false
            setTimeout(()=>{
                let test = document.querySelectorAll(".test");
                if (test[0].src == test[1].src){
                    test[0].classList.add("find");
                    test[1].classList.add("find");
                }else{
                    test[0].nextElementSibling.classList.remove("none");
                    test[1].nextElementSibling.classList.remove("none");
                    test[0].classList.add("none");
                    test[1].classList.add("none");
                }
                test[0].classList.remove("test");
                test[1].classList.remove("test");
                count = 0
                continu = true
            },1000)
        }
    }
}
verso.forEach(element => {
    element.addEventListener("click",retourner)
})
