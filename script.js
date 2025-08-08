/**
 * @TODO get a reference to the Firebase Database object
 */
const database = firebase.database().ref();
/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
const allMessages = document.getElementById("all-messages");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const emailInput = document.getElementById("email");
const sendButton = document.getElementById("send-btn");

const imageInputs = document.getElementById("profile");




sendButton.onclick = updateDB;
/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */

function updateDB(event) {
  event.preventDefault();

  let date = new Date();
  const dateTxt = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
  const timeTxt = date.getHours() +":" + date.getMinutes() + ":" + date.getSeconds();


  console.log(usernameInput.value);
  console.log(messageInput.value);
  console.log(dateTxt);
  console.log(timeTxt);
  console.log(imageInputs);

  // if(usernameInput.value == ""){
  //   alert("You must give me a username");
  // }
  // else if(emailInput.value == ""){
  //   alert("You must give me an email");
  // }
  // else if(messageInput.value == ""){
  //   alert("You must give me a mesage");
  // }else{
    let data = {
    "username": usernameInput.value,
    "email": emailInput.value,
    "message": messageInput.value,
    "date": dateTxt,
    "time": timeTxt,
    "image": imageInputs.value,
    };

    console.log(data);
    database.push(data);
    messageInput.value = "";

  // Prevent default refresh
  // Create data object
  // console.log the object
  // GET *PUSH* PUT DELETE
  // Write to our database
  // Reset message
  
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */
database.on("child_added", addMessageToBoard);
/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 *
 */

function addMessageToBoard(rowData) {
  let data = rowData.val();
  console.log(data);
  // Store the value of rowData inside object named 'data'
  // console.log data
  let singleMessage = makeSingleMessageHTML(data.username, data.email, data.message, data.date, data.time, data.image);
  // Create a variable named singleMessage
  // that stores function call for makeSingleMessageHTML()
  // Append the new message HTML element to allMessages
  allMessages.append(singleMessage);
}

/**
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 *
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - returns the parent div
 */

function makeSingleMessageHTML(usernameTxt, emailTxt, messageTxt, dateTxt, timeTxt, imageSRC) {
  console.log("Date:", dateTxt, "Time:", timeTxt);
  // Create Parent Div
  let parentDiv = document.createElement("div");
  parentDiv.className = "single-message";
  // Add Class name .single-message
  // Create Username P Tag
  let usernameP = document.createElement("p");
  usernameP.className = "single-message-username";
  usernameP.innerHTML = usernameTxt;

  let emailP = document.createElement("p");
  emailP.className = "single-message-email";
  emailP.innerHTML = emailTxt;

  let messageP = document.createElement("p");
  messageP.innerHTML = messageTxt;

  let dateP = document.createElement("p");
  
  dateP.className = "single-message-date";
  dateP.innerHTML = dateTxt;

  let timeP = document.createElement("p");
  timeP.className = "single-message-time";
  timeP.innerHTML = timeTxt;

  let image = document.createElement("img");
  image.className = "single-message-img";
  image.src = imageSRC;
  
  parentDiv.append(image);
  parentDiv.append(usernameP);
  parentDiv.append(emailP);
  parentDiv.append(messageP);
  parentDiv.append(dateP);
  parentDiv.append(timeP);
  
  
  // Append username
  // Create message P Tag
  // Return Parent Div
  return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 *
 * @BONUS use an arrow function
 */
