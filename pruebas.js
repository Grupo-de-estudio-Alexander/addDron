// const divB = document.querySelector(".clase0")
// const divA = document.querySelector(".clase1")

// const a = async() => {
//     const { data } = await axios({
//         method: "GET",
//         baseURL: "https://app1tareas.herokuapp.com/",
//         url: "homework/all"
//     });
//     console.log("datos: ")
//         //console.log(data)
//         //console.log(data[1].accomplished)
//     let s
//     let n = 0;


//     data.forEach(tareas => {

//         let newDiv = document.createElement("div")
//         newDiv.setAttribute("class", "a" + n)
//         n += 1;
//         (tareas.accomplished) ? s = "<input class='inp' type='checkbox' checked=" + tareas.accomplished + " disabled> Cumplida<br> ": s = "<input type='checkbox' disabled> Por concluir<br> ";

//         divA.innerHTML += s
//             //console.log(s)
//         newDiv.textContent = n + ": " + tareas.name;

//         divB.appendChild(newDiv);
//     })

// }


// divB.addEventListener("click", (loaaa) => {
//     let arrayDeCadenas = loaaa.path[0].textContent.split(": ");
//     console.log(arrayDeCadenas[1]);
// })

// a()

let D1 = {
    "ejeX": 0,
    "ejeY": 0,
}

let a0;

const llenarplano = (a1, d2) => {
    const tabla = document.querySelector(".tablaf")
    tabla.innerHTML = ""
    let posicionY = a0 - a1[1];
    let posicionYD2 = a0 - d2[1];
    console.log(a0 + " menos " + a1 + " es " + typeof(posicionY));
    for (let j = 0; j <= parseInt(a0, 10); j++) {
        let tr = document.createElement("tr")

        for (let k = 0; k <= parseInt(a0, 10); k++) {

            let td = document.createElement("td")
                //parseInt(posicionY, 10
            if (j === (a0 - a1.ejeY) && k === parseInt(a1.ejeX, 10)) {
                //console.log(k + " valores " + j + " entro")
                td.setAttribute("class", "d1")
                td.textContent = "D1"
                    // "(" + k + "," + a1[1] + ")"

            } else {
                if (j === parseInt(posicionYD2, 10) && k === parseInt(d2[0], 10)) {
                    //console.log(k + " valores " + j + " entro")
                    td.setAttribute("class", "d2")
                    td.textContent = "D2" //"(" + k + "," + d2[1] + ")"
                } else {
                    td.setAttribute("class", "m")
                    td.textContent = "."
                }
            }
            //td.textContent = (j === parseInt(a1, 10) && k === parseInt(a2, 10)) ? "*" : "."
            tabla.appendChild(td);

        }

        tabla.appendChild(tr);
    }
}

document.querySelector(".a1").disabled = true
document.querySelector(".a2").disabled = true
document.querySelector(".a3").disabled = true
document.querySelector(".a4").disabled = true
document.querySelector(".b1").disabled = true;
document.querySelector(".b2").disabled = true;

document.querySelector(".b1").addEventListener("click", () => {
    let d1 = []
    let d2 = []
    d1.push(document.querySelector(".a1").value)
    d1.push(document.querySelector(".a2").value)
    d2.push(document.querySelector(".a3").value)
    d2.push(document.querySelector(".a4").value)
        //let d1[1] = document.querySelector(".a2").value
    console.log("  vector  " + d1)
    llenarplano(d1, d2)
})
document.querySelector(".b1").addEventListener("click", () => {
    let d1 = []
    let d2 = []
    D1.ejeX = parseInt(document.querySelector(".a1").value, 10)
    D1.ejeY = parseInt(document.querySelector(".a2").value, 10)
    console.log(D1);
    d1.push(document.querySelector(".a1").value)
    d1.push(document.querySelector(".a2").value)
    d2.push(document.querySelector(".a3").value)
    d2.push(document.querySelector(".a4").value)
        //let d1[1] = document.querySelector(".a2").value
    console.log("  vector  " + d1)
    llenarplano(D1, d2)
})
document.querySelector(".b2").addEventListener("click", () => {
    console.log("entro ")
})

document.querySelector(".b0").addEventListener("click", () => {
        a0 = document.querySelector(".a0").value
        document.querySelector(".a1").disabled = false;
        document.querySelector(".a2").disabled = false;
        document.querySelector(".a3").disabled = false;
        document.querySelector(".a4").disabled = false;
        document.querySelector(".b1").disabled = false;
        document.querySelector(".b2").disabled = false;
        llenarplano([0, 0], [0, 0])
    })
    //let s = "<td style='border: solid;  width: 4em;height: 3em; text-align: center;'>aaa</td>"

// (tareas.accomplished) ? s = "<input class='inp' type='checkbox' checked=" + tareas.accomplished + " disabled> Cumplida<br> " : s = "<input type='checkbox' disabled> Por concluir<br> ";

//tabla.innerHTML += s

//console.log("");
//await (index === 2 && k === 5) ? td.textContent = " + ": td.textContent = " . ";
// if (j === parseInt(a1, 10) && k === parseInt(a2, 10)) td.textContent = " + ";
// else td.textContent = " . ";