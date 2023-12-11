let recto = document.querySelectorAll(".recto");
let verso = document.querySelectorAll(".verso");
let cartes = document.querySelectorAll(".cartes");
let count = 0;
let continu = true;

verso.forEach(element => {
    element.src = "./public/img/verso.jpg"
})



melange()
let retourner = (e)=>{
    if (continu){
        e.target.previousElementSibling.classList.toggle("none");
        e.target.previousElementSibling.classList.toggle("test");
        e.target.classList.toggle("none");
        count += 1;
        if (count == 2){
            continu = false
            setTimeout(()=>{
                let test = document.querySelectorAll(".test");
                if (test[0].src == test[1].src){
                    test[0].parentElement.classList.toggle("none");
                    test[1].parentElement.classList.toggle("none");
                }else{
                    test[0].nextElementSibling.classList.toggle("none");
                    test[1].nextElementSibling.classList.toggle("none");
                    test[0].classList.toggle("none");
                    test[1].classList.toggle("none");
                }
                test[0].classList.remove("test");
                test[1].classList.remove("test");
                count = 0
                continu = true
            },2000)
        }
    }
}
verso.forEach(element => {
    element.addEventListener("click",retourner)
})
