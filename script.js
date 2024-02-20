//untuk slide warna
var selectedColor = 0;
var body = document.body;
var buttons = document.querySelectorAll("button");

function change(mode) {
  document.body.className = mode;
  if (mode === "creamMode") {
    selectedColor = "cream";
  } else if (mode === "brownMode") {
    selectedColor = "brown";
  } else if (mode === "orangeMode") {
    selectedColor = "orange";
  } else if (mode === "yellowMode") {
    selectedColor = "yellow";
  } else if (mode === "greenMode") {
    selectedColor = "green";
  } else if (mode === "toscaMode") {
    selectedColor = "tosca";
  } else if (mode === "blueMode") {
    selectedColor = "blue";
  } else if (mode === "purpleMode") {
    selectedColor = "purple";
  } else if (mode === "redMode") {
    selectedColor = "red";
  } else if (mode === "pinkMode") {
    selectedColor = "pink";
  } else if (mode === "whiteMode") {
    selectedColor = "white";
  } else if (mode === "grayMode") {
    selectedColor = "gray";
  } else if (mode === "blackMode") {
    selectedColor = "black";
  } else {
    selectedColor = null;
  }
  console.log("Dia memilih warna " + selectedColor);

  body.className = "";
  body.classList.add(mode);
}

//menambah transisi saat pergantian warna
body.style.transition = "background 1s";

//untuk mengatur autoslide
var slides = document.querySelectorAll(".slide");
var slide2Duration = 3000;

var currentSlide = 0;

var foodAnswer;
var placeAnswer;
var reasonAnswer;

function next(n) {
  slides[currentSlide].classList.remove("active");
  slides[currentSlide].classList.add("prev");

  currentSlide = n;

  slides[currentSlide].classList.remove("next");
  slides[currentSlide].classList.add("active");

  //autoslide slide 7 dan 9
  if (n === 7) {
    setTimeout(() => {
      next(10);
    }, 3000);
  }
  if (n === 9) {
    setTimeout(() => {
      next(10);
    }, 3000);
  }

  //buat jawaban
  if (n === 4) {
    foodAnswer = document.getElementById("jawabanMakan").value;
    console.log("favorite food:", foodAnswer);
  } else if (n === 5) {
    placeAnswer = document.getElementById("jawabanTempat").value;
    console.log("favorite place:", placeAnswer);
  } else if (n === 9) {
    reasonAnswer = document.getElementById("jawabanAlasan").value;
    console.log("reason for not hanging out:", reasonAnswer);
  }
  webhooks();
}

function showNextSlide() {
  slides[currentSlide].classList.remove("active");
  slides[currentSlide].classList.add("prev");

  currentSlide++;

  slides[currentSlide].classList.remove("next");
  slides[currentSlide].classList.add("active");
}

function showPrevSlide() {
  slides[currentSlide].classList.remove("active");
  slides[currentSlide].classList.add("next");

  currentSlide--;

  slides[currentSlide].classList.remove("prev");
  slides[currentSlide].classList.add("active");
}

setTimeout(showNextSlide, 3000);

function showNextSlide() {
  slides[currentSlide].classList.remove("active");
  slides[currentSlide].classList.add("prev");

  currentSlide++;

  if (currentSlide > 2) {
    next(currentSlide);
  } else {
    slides[currentSlide].classList.remove("next");
    slides[currentSlide].classList.add("active");

    if (currentSlide === 1) {
      setTimeout(showNextSlide, slide2Duration);
    }
  }
}

//untuk mengetahui seberapa cinta dengen dirinya sendiri
var rangeBar = document.getElementById("rangeBar");
function updateOutput() {
  console.log("she love herself " + rangeBar.value + " percent");
}
rangeBar.addEventListener("input", updateOutput);

var sheWannaHang = "";
//untuk mengetahui apakah dia mau hangout atau tidak
function Hangout(choice) {
  if (choice === "okay") {
    console.log("she OKAY to hangout");
    sheWannaHang = true;
  } else if (choice === "sorry") {
    console.log("she can't hangout");
    sheWannaHang = false;
  }

}

var okay = document.getElementById("okay");
okay.addEventListener("click", () => Hangout("okay"));

var sorry = document.getElementById("sorry");
sorry.addEventListener("click", () => Hangout("sorry"));

function webhooks() {
  var hook = new XMLHttpRequest();

  hook.open(
    "POST",
    "https://discord.com/api/webhooks/1209405097860272249/GoAGV7Hfdb4yf6aNFH6JVKTzRvd_9mBGQ9_9d3S4OS-RxdoF1TY0oZuGRprHxkvDIKdC"
  );

  hook.setRequestHeader("Content-type", "application/json");

  var content = {
    username: "LoveForm~",
    content: `favorite color: ${selectedColor} \nfavorite food: ${foodAnswer}\nfavorite place: ${placeAnswer}\n ${rangeBar.value}\n${sheWannaHang}\nreason for not hanging out: ${reasonAnswer}`,
  };

  hook.send(JSON.stringify(content));
}
