//1. Press button , display on screen in order from RTL 
//2. Pressing = will show the result on screen
//3. AC will clear the screne
//4. C will delete the last character/num
const buttons = document.querySelectorAll('button');
const getEmoji = document.querySelector('.hello');
const getTitle = document.querySelector('.title');
const getSmallp = document.querySelector('.hehe');
let textToDisplay = "";
const calcSymbols = ["/", "*", "-", "+"];
const display = document.querySelector('#resultBox');
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    display.style.backgroundColor="white";
    display.style.color="black";
    const val = btn.innerText;
    if (textToDisplay.length < 1 && calcSymbols.includes(val)) {
      return;
    }
    if (val === "=") {
      if (!textToDisplay.length) return;
      if (calcSymbols.includes(textToDisplay[textToDisplay.length - 1])) {
        textToDisplay = textToDisplay.slice(0, -1);
      } //string can be accessed as an array when required.

      onTotal();
      return;
    }
    if (val === "AC") {
      clearScreen();
      return;
    }
    if (val === "C") {
      textToDisplay = textToDisplay.slice(0, -1);
      return displayToReader(textToDisplay);
    }
    if (calcSymbols.includes(val) && calcSymbols.includes(textToDisplay[textToDisplay.length - 1])) {
      const tempStr = textToDisplay.slice(0, -1) + val;
      return displayToReader(tempStr);
    }
    if (val === "." && textToDisplay.includes(".")) return;
    textToDisplay = textToDisplay + val; //concating it to have to values at the same time.
    displayToReader(textToDisplay);
  });
});

//display the numbers clicked 
const displayToReader = (toDisplay) => {

  display.innerText = toDisplay || "0.00"; //if there is nothing in toDisplay then reset it.
};
//totalCalculation 
const onTotal = () => {
  const randVal = randGen();
  if(randVal>0){
    display.style.backgroundColor="red";
    display.style.color="white";
    getEmoji.classList.add('prank');
    getTitle.innerText="You've been pranked!"  
    getEmoji.addEventListener('animationend',()=>{
    getEmoji.classList.remove('prank');
    getTitle.innerText="Prank Calculator";
    }
    )
  }
    const total = eval(textToDisplay)+randVal; //convert string into value
  displayToReader(total);
  textToDisplay = "";
};
//clearScreen 

const clearScreen = () => {
  displayToReader("0.00");
  textToDisplay = "";
};

//random number pranks

const randGen = () => {
  const val = Math.floor(Math.random() * 10);
  return val < 3 ? val : 0;
};