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
let tableau_score = document.querySelector(".tableau_score");
let clone = document.querySelector(".clone");
let affichage2 = document.querySelector(".affichage_2")
let continu = true;
let pseudo;
let game;
let sec = 0;
let min = 0;
let heure = 0;
let count = 0;
let echec = 0;
let maison;
let maisons = ["gryffondor","serpentard","poufsouffle","serdaigle"];
let niveau;
let niveaux = ["facile","moyen","difficile"];

let joueur = {
    maison: maison,
    nom: pseudo,
}

let lancer = () => {
    if(input_pseudo.value != ""){
        pseudo = input_pseudo.value;
        input_pseudo.value = "";
        maison = maisons[parseInt(Math.random()*maisons.length)];
        niveau = document.querySelector("select").value
        affichage.classList.add("none");
        affichage2.classList.remove("none");
        document.querySelector(".maison").innerHTML = `Difficile, très difficile… Je vois beaucoup de courage et des qualités intellectuelles aussi. Il y a du talent, oh oui, et un grand désir de faire ses preuves. Alors, où vais-je te mettre ?`
        setTimeout(()=>{
            document.querySelector(".maison").innerHTML = ``
            affichage2.querySelector("img").src =  "./public/img/" + maison + ".png";
        },4000)
        affichage2.querySelector("img").src = "";
        setTimeout(()=>{
            affichage2.classList.add("none");
            jeu.classList.remove("none");
            partie()
        },6000)
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
    let les_src;
    if (niveau == "facile"){
        les_src = ["./public/img/carte_1.jpg", "./public/img/carte_1.jpg", "./public/img/carte_2.jpg" ,"./public/img/carte_2.jpg" ,"./public/img/carte_3.jpg","./public/img/carte_3.jpg"];
        cartes[0].parentElement.style = "grid-template-columns: repeat(3,1fr); gap: 4rem"
    }else if (niveau == "moyen"){
        les_src = ["./public/img/carte_1.jpg", "./public/img/carte_1.jpg", "./public/img/carte_2.jpg" ,"./public/img/carte_2.jpg" ,"./public/img/carte_3.jpg","./public/img/carte_3.jpg","./public/img/carte_4.jpg","./public/img/carte_4.jpg"];
        for(let i=0; i<2; i++){
            let div= document.createElement("div");
            let img_recto = document.createElement("img");
            let img_verso = document.createElement("img");
            div.className = "cartes supp";
            img_recto.className = "recto none";
            img_verso.className = "verso";
            div.append(img_recto,img_verso);
            cartes[0].parentElement.appendChild(div);
        }
        cartes[0].parentElement.style = "grid-template-columns: repeat(4,1fr); gap: 3rem"
    }else if (niveau == "difficile"){
        les_src = ["./public/img/carte_1.jpg", "./public/img/carte_1.jpg", "./public/img/carte_2.jpg" ,"./public/img/carte_2.jpg" ,"./public/img/carte_3.jpg","./public/img/carte_3.jpg","./public/img/carte_4.jpg","./public/img/carte_4.jpg","./public/img/carte_5.jpg","./public/img/carte_5.jpg"];
        for(let i=0; i<4; i++){
            let div= document.createElement("div");
            let img_recto = document.createElement("img");
            let img_verso = document.createElement("img");
            div.className = "cartes supp";
            img_recto.className = "recto none";
            img_verso.className = "verso";
            div.append(img_recto,img_verso);
            cartes[0].parentElement.appendChild(div);
        }
        cartes[0].parentElement.style = "grid-template-columns: repeat(5,1fr); gap: 1rem"
    }
    recto = document.querySelectorAll(".recto");
    verso = document.querySelectorAll(".verso");
    recto.forEach(element =>{
        let random = parseInt(Math.random() * les_src.length);
        element.src = les_src[random];
        les_src.splice(random,1);
    })
}
let retourner = (e)=>{
    cartes = document.querySelectorAll(".cartes");
    if (continu){
        recto.forEach(element => {
            element.parentElement.classList.remove("indice");
        })
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
                    if (document.querySelectorAll(".find").length == cartes.length){
                        score.querySelector(".question").innerHTML = `Veux-tu jouer une nouvelle partie en mode ${niveau} ${pseudo} ?`
                        if(tableau_score.querySelectorAll("h2").length > 40){
                            tableau_score.querySelectorAll("div").forEach(elements => {
                                Array.from(elements.children).forEach(element => {
                                    elements.removeChild(element)
                                })
                            })
                        }
                        let h2_1 = document.createElement("h2");
                        let h2_2 = document.createElement("h2");
                        let h2_3 = document.createElement("h2");
                        let h2_4 = document.createElement("h2");
                        h2_1.innerHTML = maison;
                        h2_2.innerHTML = pseudo;
                        h2_3.innerHTML = niveau;
                        h2_4.innerHTML = `${heure} : ${min} : ${sec}`;
                        tableau_score.querySelectorAll("div")[0].appendChild(h2_1);
                        tableau_score.querySelectorAll("div")[1].appendChild(h2_2);
                        tableau_score.querySelectorAll("div")[2].appendChild(h2_3);
                        tableau_score.querySelectorAll("div")[3].appendChild(h2_4);
                        score.classList.remove("none");
                        jeu.classList.add("none");
                        let carte_supp = document.querySelectorAll('.supp');
                        let section_cartes = document.querySelector(".section_cartes")
                        carte_supp.forEach(element =>{
                            section_cartes.removeChild(element)
                        })
                    }
                }else{
                    echec += 1
                    if (echec >= 3 && niveau != "difficile"){
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
            },1000)
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
    melange()
    clone.innerHTML = tableau_score.innerHTML
    verso.forEach(element => {
        element.src = "./public/img/" + maison + ".png";
        element.classList.remove("none");
    })
    recto.forEach(element => {
        element.classList.remove("find");
        element.classList.add("none");
    })
    verso.forEach(element => {
        element.addEventListener("click",retourner)
    })
}