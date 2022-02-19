const historiaPomiarow = [];
let aktualneBMI = 0;
let blad = "";

function sprawdzDane() {
  blad = "";
  const wagaTresc = document.getElementById("waga").value;
  const waga = parseFloat(wagaTresc || 0);

  const wzrostTresc = document.getElementById("wzrost").value;
  const wzrost = parseFloat(wzrostTresc || 0);

  if (waga < 40 || waga > 200) {
    blad = "Waga niepoprawna";
  } else if (wzrost < 120 || wzrost > 240) {
    blad = "Wzrost niepoprawny";
  }

  if (blad === "") {
    document.getElementById("blad").innerText = "";
    policzBMI(waga, wzrost);
  } else {
    document.getElementById("blad").innerText = blad;
  }
}

function wybranoPomiar(event) {
    if (event.target.nodeName === "LI") {
        console.log(event);
        let i = 0;
        let currentNode = event.target;
        let firstNode = currentNode.parentNode.firstChild;
        while(firstNode != currentNode) {
            i++;
            currentNode = currentNode.previousSibling;
        }
        console.log(i);
        const pomiar = historiaPomiarow[i];

        document.getElementById("pobrana-waga").innerText = pomiar.waga;
        document.getElementById("pobrany-wzrost").innerText = pomiar.wzrost;
        document.getElementById("obliczone-bmi").innerText = pomiar.bmi;

        document.getElementById("wniosek").innerText = "";
        document.getElementById("blad").innerText = "";
        
    }
}
function policzBMI(waga, wzrost) {
  document.getElementById("waga").value = "";
  document.getElementById("wzrost").value = "";

  let poprzednieBMI = aktualneBMI;
  aktualneBMI = waga / (((wzrost / 100) * wzrost) / 100);

  const pomiar = {
    bmi: aktualneBMI,
    waga: waga,
    wzrost: wzrost,
    data: new Date().toLocaleString(),
  };

  historiaPomiarow.push(pomiar);

  document.getElementById("pobrana-waga").innerText = waga;
  document.getElementById("pobrany-wzrost").innerText = wzrost;
  document.getElementById("obliczone-bmi").innerText = aktualneBMI;

  if (poprzednieBMI !== 0) {
    if (aktualneBMI > poprzednieBMI) {
      document.getElementById("wniosek").innerText =
        "Aktualne BMI jest większe niż poprzednie BMI";
    }
    if (aktualneBMI < poprzednieBMI) {
      document.getElementById("wniosek").innerText =
        "Aktualne BMI jest mniejsze niż poprzednie BMI";
    }
    if (aktualneBMI === poprzednieBMI) {
      document.getElementById("wniosek").innerText =
        "Aktualne BMI jest takie same jak poprzednie BMI";
    }
  }

  const listaPomiarowHTML = document.getElementById("historia-pomiarow");
  listaPomiarowHTML.innerHTML = "";
  let sumaBMI = 0;
  for (let i = 0; i < historiaPomiarow.length; i++) {
    listaPomiarowHTML.innerHTML += `<li> Pomiar z dnia: ${historiaPomiarow[i].data}.</li>`;
    sumaBMI += historiaPomiarow[i].bmi;
  }
  const sredniaBMI = sumaBMI / historiaPomiarow.length;
  document.getElementById("srednia").innerText = sredniaBMI;
}
