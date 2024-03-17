// todo-card Area where it holds todo-cards
const cardArea = document.getElementById('todoCardArea');
// With the help of  https://regexper.com/ and https://cpdev.tistory.com/127 I could make Regular Expression
const imageUrlPattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
// image url for invalid image -> not invalid url form
const imageFail = 'https://www.adhesion.kr/modules/adhesion/images/noimage.jpg'
// array for todo-card values
let todos = [];

// function to add todo-card to LocalStorage and array
function addTodoCard() {
    // check for input validation
    let validation = checkForm();

    let date = Date.now();

    // check empty title, set to time
    if ($("input[name=title]").val() === '') {
        $("input[name=title]").val(date);
    }
    // if no description
    if ($("textarea[name=description]").val() === '') {
        $("input[name=title]").val("No description.");
    }

    // if all inputs are validate, set todo-card information
    if (validation === true) {

        // set todo-card info
        // push to array
        todos.push({
            id: date,
            img_url: $("input[name=img_url]").val(),
            title: $("input[name=title]").val(),
            description: $("textarea[name=description]").val()
        });

        $('#imageTime').val(date);

        // todo - add to mysql
        $('#todoForm').submit();

        console.log(todos);
        // update and render localStorage and screen
        addToLocalStorage(todos);
        // clear input form
        resetInput();
        // dismiss modal(hide)
        $('#addDialog').modal('hide');

    } else {
        alert(`${validation}`);
    }

}

// function to validate inputs
function checkForm() {
    // return value validate: true | invalidate: error message
    let error;

    // for checking each input case
    let check_url = false;

    // check empty url, add error massage
    if ($("input[name=img_url]").val() !== '') {
        // validation of url
        if (imageUrlPattern.test($("input[name=img_url]").val())) {
            check_url = true;
        } else {
            error = 'Invalid url\n'
        }
    } else {
        error = 'No image url!\n'
    }

    // if all validate return true, else return error message
    if (check_url === true) {
        return true;
    } else {
        return error;
    }
}

// function to clear all inputs(image url, title, type, description)
function resetInput() {
    $("input[name=img_url]").val('')
    $("input[name=title]").val('')
    $("textarea[name=description]").val('')
}

// function to add todos to local storage
function addToLocalStorage(todos) {
    // turn todo-card array to JSON format
    localStorage.setItem('todos', JSON.stringify(todos));
    // render based on todo-card array
    renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    // if reference exists
    if (reference) {
        // converts back to array and store it in todos array
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

// function to render given todo-card array to screen
function renderTodos(todos) {

    console.log('rendering...');
    // clear screen
    cardArea.innerHTML = '';



    // run through each item inside todo-card array
    todos.forEach(function (item) {
        // making outer container for card
        // <div class="col" data-key="`${item.id}`"> <\div>
        const temp = document.createElement('div');
        temp.setAttribute('class', 'col');
        temp.setAttribute('data-key', item.id);

        let imgList = '';

        for(let i=0;i < todos.length; i++){
            if(todos[i].id !== item.id){
                imgList += "_" +  todos[i].id;
            }
        }

        // set innerHTML of that container -> set card with each todo-card information
        // set img url, title, type, description in `${ each value }` form
        temp.innerHTML = `
            <div class="card text-center" style="width: 25rem;">
                <div class="card-header" align="right">
                    <button type="button" class="btn btn-outline-danger removeBtn" onclick="deleteTodo(${item.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             class="bi bi-trash" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd"
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
                <img src="${item.img_url}"
                     class="card-img-top card-img-background" onerror="this.src=\`${imageFail}\`" alt="img url">
                    <div class="card-body">
                        <p class="card-title fw-bold">
                            ${item.title}
                        </p>
                        <p class="card-text">${item.description}</p>
                        <a href="${item.img_url}" class="btn btn-primary round">Open Image</a>
                    </div>
            </div>
            <form id="${item.id}" action="subCard.jsp" target="subCard" hidden>
                <input id="uidIn" name="uidOut" value="<%=userID%>" hidden>
                <input type="submit" name="imgList" value="${imgList}">
            </form>
        </div>`;

        // finally add the todo-card to the todo-card Area
        cardArea.append(temp);
    });

    console.log('render done.')
}

// deletes a todo-card with specific id(data-key)
// implemented in the innerHTML code
function deleteTodo(id) {
    // filters out the todo-cards with the id(data-key) and updates the todos array
    console.log(`You are deleting card ID: ${id}`);
    todos = todos.filter(function (item) {
        // use != not !==, because here types are different. One is number and other is string
        return item.id != id;
    });

    $(`${id}`).submit();

    // update the localStorage
    addToLocalStorage(todos);

    // todo - update mysql
}

// initially get everything from localStorage
// including refresh, reopen
getFromLocalStorage();


