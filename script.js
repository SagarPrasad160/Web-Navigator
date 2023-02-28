const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();

// Initialization
const backPages = new Stack();
const nextPages = new Stack();
let currentPage = 'Start Page';

// Helper Functions
function showCurrentPage(action) {
    console.log(`\n${action}`);
  console.log(`Current page = ${currentPage}`);
  console.log('Back page = ', backPages.peek());
  console.log('Next page = ', nextPages.peek());
}

function newPage(page) {
  backPages.push(currentPage);
  currentPage = page;
  while (!nextPages.isEmpty()) {
    nextPages.pop();
  }
  showCurrentPage('CURRENT: ');
}

function backPage() {
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage('BACK: ');
}

function nextPage() {
  backPages.push(currentPage);
  currentPage = nextPages.pop();
  showCurrentPage('NEXT: ');
}

let finish = false;

// User Interface
showCurrentPage('DEFAULT: ');
while (!finish) {
  let instructions = 'Enter a url';
  let showBack = false;
  let showNext = false;

  if (!backPages.isEmpty()) {
    instructions += ', B|b for back page';
    showBack = true;
  }

  if (!nextPages.isEmpty()) {
    instructions += ', N|n for next page';
    showNext = true;
  }

  instructions += ', Q|q for quit.';
  console.log(instructions);

  const answer = prompt('Where would you like to go today? ');
  const lowerCaseAnswer = answer.toLowerCase();

  if (lowerCaseAnswer === 'q') {
    // we quit the program
    finish = true;
  } else if (lowerCaseAnswer === 'b' && showBack) {
    // we navigate back a page
    backPage();
  } else if (lowerCaseAnswer === 'n' && showNext) {
    // we navigate forward a page
    nextPage();
  } else if (lowerCaseAnswer !== 'b' && lowerCaseAnswer !== 'n') {
    // we create a new page based on the url
    newPage(answer);
  } else {
    // invalid input to a non-available option
    console.log(`Cannot go ${lowerCaseAnswer} a page. Stack is empty.`);
  }
}