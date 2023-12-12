let recto = document.querySelectorAll(".recto");
let verso = document.querySelectorAll(".verso");
let cartes = document.querySelectorAll(".cartes");
let chrono = document.querySelector(".chrono");
let input_pseudo = document.querySelector("#input_pseudo");
let btn_pseudo = document.querySelector("#btn_pseudo");
let affichage = document.querySelector(".affichage");
let score = document.querySelector(".score");
let btn_yes = document.querySelector("#btn_yes");
let btn_no = document.querySelector("#btn_no");
let jeu = document.querySelector(".jeu");
let h1 = document.querySelector("h1");
let tableau_score = document.querySelector(".tableau_score");
let clone = document.querySelector(".clone");
let continu = true;
let pseudo;
let game;
let sec = 0;
let min = 0;
let heure = 0;
let count = 0;
let echec = 0;
let maison;
let maisons = ["gryffondor","serpentard","poufsouffle","serdaigle"]

let joueur = {
    nom: pseudo,
}

let lancer = () => {
    if(input_pseudo.value != ""){
        pseudo = input_pseudo.value;
        input_pseudo.value = "";
        maison = maisons[parseInt(Math.random()*maisons.length)]
        affichage.classList.add("none");
        jeu.classList.remove("none");
        partie()
    }
}
input_pseudo.addEventListener("keyup",(e)=>{
(e.key == "Enter")? lancer() : ""
})
btn_pseudo.addEventListener("click",lancer);
btn_no.addEventListener("click",()=>{
    affichage.classList.remove("none");
    score.classList.add("none");
})
btn_yes.addEventListener("click",()=>{
    partie();
    score.classList.add("none");
    jeu.classList.remove("none");
})

let melange = () => {
    let les_src = ["./public/img/carte_1.jpg", "./public/img/carte_2.jpg" ,"./public/img/carte_3.jpg","./public/img/carte_1.jpg", "./public/img/carte_2.jpg" ,"./public/img/carte_3.jpg"];
    recto.forEach(element =>{
        let random = parseInt(Math.random() * les_src.length);
        element.src = les_src[random];
        les_src.splice(random,1);
    })
}
let retourner = (e)=>{
    if (continu){
        e.target.parentElement.classList.add("animation");
        setTimeout(()=>{
            e.target.previousElementSibling.classList.remove("none");
            e.target.previousElementSibling.classList.add("test");
            e.target.classList.toggle("none");
        },500)
        count += 1;
        if (count == 2){
            continu = false
            setTimeout(()=>{
                let test = document.querySelectorAll(".test");
                if (test[0].src == test[1].src){
                    test[0].classList.add("find");
                    test[1].classList.add("find");
                    echec = 0;
                    recto.forEach(element => {
                        element.parentElement.classList.remove("indice");
                    })
                    if (document.querySelectorAll(".find").length == cartes.length){
                        score.querySelector("h1").innerHTML = `Veux-tu jouer une nouvelle parties ${pseudo} ?`
                        let h2_1 = document.createElement("h2");
                        let h2_2 = document.createElement("h2");
                        let h2_3 = document.createElement("h2");
                        h2_1.innerHTML = pseudo;
                        h2_2.innerHTML = "facile";
                        h2_3.innerHTML = `${heure} : ${min} : ${sec}`;
                        tableau_score.querySelectorAll("div")[0].appendChild(h2_1);
                        tableau_score.querySelectorAll("div")[1].appendChild(h2_2);
                        tableau_score.querySelectorAll("div")[2].appendChild(h2_3);
                        score.classList.remove("none");
                        jeu.classList.add("none");
                    }
                }else{
                    echec += 1
                    if (echec == 3){
                        recto.forEach(element => {
                            if (element.src == test[0].src){
                                element.parentElement.classList.add("indice");
                                test[0].parentElement.classList.add("indice");
                            }
                        })
                    }
                    test[0].nextElementSibling.classList.remove("none");
                    test[1].nextElementSibling.classList.remove("none");
                    test[0].classList.add("none");
                    test[1].classList.add("none");
                }
                test[0].classList.remove("test");
                test[1].classList.remove("test");
                test[0].parentElement.classList.remove("animation");
                test[1].parentElement.classList.remove("animation");
                count = 0
                continu = true
            },3000)
        }
    }
}
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
let partie = () =>{
    sec = 0;
    min = 0;
    heure = 0;
    count = 0;
    clone.innerHTML = tableau_score.innerHTML
    verso.forEach(element => {
        element.src = "./public/img/" + maison + ".png";
        element.classList.remove("none");
    })
    recto.forEach(element => {
        element.classList.remove("find");
        element.classList.add("none");
    })
    melange()
    verso.forEach(element => {
        element.addEventListener("click",retourner)
    })
}