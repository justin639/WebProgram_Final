// initialize global variables. Usually page state and Auth. related
let state = 0;
let auth = false;
let UID = -1;

// template for later adds
let check = '<p class="valid bold big">✔️</p>';
let warning = '<p class="warning bold"></p>'

// With the help of  https://regexper.com/ and https://highcode.tistory.com/6 I could make Regular Expressions for each
const namePattern = /^[A-Z][a-zA-Z]*$/;
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordPattern = [/[A-Z]+/, /[a-z]+/, /[0-9]+/, /\W+/];

// boolean data for each input
let firstnameValid = true;
let lastnameValid = true;
let emailValid = true;
let passwordValid = true;
let confirmPassValid = true;
let genderValid = true;

// just coding of fetching database
let emailList = $('.email');
let password = $('.password');

let Accounts = []

for( let i = 0; i < emailList.length; i++){
    Accounts.push({email: emailList[i].innerText, password: password[i].innerText});
}
console.log(Accounts);

let AccountsData = [{firstname: 'Junn', lastname: 'Ye', gender: 'female'},{firstname: 'Kim', lastname: 'Yolo', gender: 'male'}];


// function for changing state between Login(0), SignUp(1) and Message(3)
function changeState(input) {
    // if the input != current State then change in page
    if (state !== input) {
        // Login -> SignUp
        if (state === 0) {
            state = 1;
            $('#loginTitle').removeClass('selected');
            $('#signUpTitle').addClass('selected');
            $('#login').fadeOut()
            // used timeout for better view, but slower
            setTimeout(() => $('#signUp').fadeIn(), 400)
        }
        // SignUp -> Login
        else if (state === 1) {
            state = 0;
            $('#signUp').fadeOut();
            $('#signUpTitle').removeClass('selected');
            $('#loginTitle').addClass('selected');
            setTimeout(() => $('#login').fadeIn(), 400)
        }
        // Message -> SignUp or Login
        else {
            state = input;
            $('#message').fadeOut();
            // Login Page
            if (input === 0) {
                $('#signUpTitle').removeClass('selected');
                $('#loginTitle').addClass('selected');
                setTimeout(() => $('#login').fadeIn(), 400)
            }
            // SignUp Page
            else if (input === 1) {
                $('#loginTitle').removeClass('selected');
                $('#signUpTitle').addClass('selected');
                setTimeout(() => $('#signUp').fadeIn(), 400)
            }
        }
        // reset page after leaving
        setTimeout(resetPage, 400);
    }
} // end changeState

// function for resetting data
function resetPage() {

    // removing red border
    $('.invalid').removeClass('invalid');

    // removing additional dialogs
    $('p').remove('.warning');
    $('p').remove('.valid');

    // resetting input values
    $('#emailAuth').val('');
    $('#passAuth').val('');
    $('#firstName').val('')
    $('#lastName').val('')
    $('#email').val('')
    $('#password').val('')
    $('#confirmPass').val('')

    // including radio checks
    for (let i = 0; i < 2; i++) {
        $('input[name = gender]')[i].checked = false;
    }

    // resetting Auth failed message
    $('#inputMessage').text('Enter user name and password:')
    $('#inputMessage').removeClass('red');

    // resetting bool data for each input
    firstnameValid = true;
    lastnameValid = true;
    emailValid = true;
    passwordValid = true;
    confirmPassValid = true;
    genderValid = true;
} // end reset

// Rules:
// - First name: It should start with a capital letter, it should not contain any special characters or numbers
// - Last name: It should start with a capital letter, it should not contain any special characters or numbers
// - Email: Recommend to do some research about the valid email address format
// - Password: At least 6 characters, one capital letter, one lowercase letter, at least one digit, and one special character

// Can use for both first and last name
// 0: Capital Letter | 1: Number or Special Characters | 2: Valid
function checkName(name) {
    // It should start with a capital letter
    if (/^[A-Z]/.test(name)) {
        // It should not contain any special characters or numbers
        if (namePattern.test(name)) {
            return 2;
        } else {
            return 1;
        }
    } else {
        return 0;
    }
} // end checkName

// check Email: : pattern fit-> true | false
function checkEmail(email) {
    return emailPattern.test(email);
} // end checkEmail

// check Password: pattern fit-> true | false
function checkPassword(password) {
    // At least 6 characters
    if (password.length > 5) {
        let out = true;
        // at least one capital letter, one lowercase letter, one digit, and one special character
        for (let i = 0; i < 4; i++) {
            out = out && passwordPattern[i].test(password);
        }
        return out;
    } else {
        return false;
    }
} // end checkPassword

// fetch info and interact with DOM
// functions for each input validation check
// although functions are very similar due to difference of message, I divided all of them.
//  --> with more utilization, maybe can increase reproducibility
// most of the mechanism will be explained in the following function
// other functions will have comments about differences only
function setFirstName() {
    // get target for input, parent for adding dialogs
    let target = $('#firstName');
    let parent = $('#firstNameWrapper');

    // setting message for additional dialog
    let message = '';

    // no input -> Please enter your first name!
    if (target.val().length === 0) {
        message = 'Please enter your first name!';
    }
    // else check for pattern
    else {
        let state = checkName(target.val());

        // 0: Capital Letter | 1: Number or Special Characters | 2: Valid
        if (state === 0) {
            message = 'First name should start with capital letter!'
        } else if (state === 1) {
            message = 'First name cannot contain numbers or any special characters!'
        }
    }
    // empty message: Valid, need to compare with the before valid data(firstnameValid)
    if (message === '') {
        // if validation changed(false -> true): remove warning and red border, then add check icon
        if (firstnameValid === false) {
            // set to true
            firstnameValid = true;
            // remove warning
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            // remove red border
            target.removeClass('invalid');
            // add check icon
            parent.append(check);
        } // else ( true -> true): no change
    }
    // InValid.
    else {
        // no change (false -> false) -> change the message only
        if (firstnameValid === false) {
            // change only the message
            parent.children('.warning').text(message);
        }
        // else validation change(true -> false): remove check icon, then add warning and red border
        else {
            target.addClass('invalid');
            // remove check icon
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            // then add warning and red border
            parent.append(warning);
            parent.children('.warning').text(message);
            // set to false
            firstnameValid = false;
        }
    }
} // end setFirstName

// function for setting things for lastname
// basically same as first name setting
function setlLastName() {
    // only difference for getting the target and parent
    let target = $('#lastName');
    let parent = $('#lastNameWrapper');

    let message = '';

    if (target.val().length === 0) {
        message = 'Please enter your last name!';
    } else {
        let state = checkName(target.val());
        console.log(`State : ${state}`);
        if (state === 0) {
            message = 'Last name should start with capital letter!'
        } else if (state === 1) {
            message = 'Last name cannot contain numbers or any special characters!'
        }
    }
    if (message === '') {
        if (lastnameValid === false) {
            lastnameValid = true;
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            $('#lastName').removeClass('invalid');
            parent.append(check);
        }
    } else {
        if (lastnameValid === false) {
            parent.children('.warning').text(message);
        } else {
            target.addClass('invalid');
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            parent.append(warning);
            parent.children('.warning').text(message);
            lastnameValid = false;
        }
    }
} // end setlLastName

// function for setting things for email
// little different from first name setting
function setEmail() {
    // difference for getting the target and parent
    let target = $('#email');
    let parent = $('#emailWrapper');

    // init message is different, because there is no error state in email
    let message = 'Your email address is invalid!';

    // now have state variable for bool data of pattern checking
    let state = checkEmail(target.val());

    // if no input message changes
    if (target.val().length === 0) {
        message = 'Please enter your email!'
    }

    // Check for same email
    for (let i = 0; i < Accounts.length; i++) {
        // if same email found break
        if (Accounts[i].email === target.val()) {
            state = false;
            message = "Same email.";
            break;
        }
    }

    // Valid
    if (emailValid) {
        // change state(false -> true): same
        if (emailValid !== state) {
            target.addClass('invalid');
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            parent.append(warning);
            parent.children('.warning').text(message);
        }
    } else {
        // change state(true -> false): same
        if (emailValid !== state) {
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            target.removeClass('invalid');
            parent.append(check);
        }
        // else update message
        else {
            parent.children('.warning').text(message);
        }
    }
    // update validation
    emailValid = state;
} // end setEmail

// function for setting things for password
// same with email setting
function setPassword() {
    // difference for getting the target and parent
    let target = $('#password');
    let parent = $('#passwordWrapper');

    let message = 'Requirement: at least 6 characters, one capital letter, one lowercase letter, at least one digit, and one special character!';

    let state = checkPassword(target.val())

    if (target.val().length === 0) {
        message = 'Please enter your password!'
    }

    // Valid
    if (passwordValid) {
        // state change
        if (passwordValid !== state) {
            target.addClass('invalid');
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            parent.append(warning);
            parent.children('.warning').text(message);
        }
    }
    // InValid
    else {
        // stage change
        if (passwordValid !== state) {
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            target.removeClass('invalid');
            parent.append(check);
        } else {
            parent.children('.warning').text(message);
        }
    }
    // update validation
    passwordValid = state;
} // end setPassword

// function for setting things for confirm of password
function setConfirm() {
    // getting the target and parent
    let target = $('#confirmPass');
    let parent = $('#confirmPassWrapper');

    let message = 'Password does not match!';

    // checks state with password
    let state = (target.val() === $('#password').val());

    // if no input state must be false
    if (target.val().length === 0) {
        message = 'Please re-enter your password!'
        state = false;
    }

    // Valid
    if (confirmPassValid) {
        // State change
        if (confirmPassValid !== state) {
            target.addClass('invalid');
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            parent.append(warning);
            parent.children('.warning').text(message);
        }
    }
    // InValid
    else {
        // State change
        if (confirmPassValid !== state) {
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            target.removeClass('invalid');
            parent.append(check);
        } else {
            parent.children('.warning').text(message);
        }
    }
    confirmPassValid = state;
} // end setConfirm

// each setEmailAuth and setPassAuth are same with setEmail and setPassword
// function for setting things for email of auth
function setEmailAuth() {
    let target = $('#emailAuth');
    let parent = $('#emailAuthWrapper');

    let message = 'Your email address is invalid!';

    let state = checkEmail(target.val());

    if (target.val().length === 0) {
        message = 'Please enter your email!'
    }

    if (emailValid) {
        if (emailValid !== state) {
            target.addClass('invalid');
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            parent.append(warning);
            parent.children('.warning').text(message);

        }
    } else {
        if (emailValid !== state) {
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            target.removeClass('invalid');
            parent.append(check);
        }
    }
    emailValid = state;
} // end setEmailAuth

// function for setting things for password of auth
function setPassAuth() {
    let target = $('#passAuth');
    let parent = $('#passAuthWrapper');

    let message = 'Requirement: at least 6 characters, one capital letter, one lowercase letter, at least one digit, and one special character!';

    let state = checkPassword(target.val())

    if (target.val().length === 0) {
        message = 'Please enter your password!'
    }

    if (passwordValid) {
        if (passwordValid !== state) {
            target.addClass('invalid');
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            parent.append(warning);
            parent.children('.warning').text(message);
        }
    } else {
        if (passwordValid !== state) {
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            target.removeClass('invalid');
            parent.append(check);
        } else {
            parent.children('.warning').text(message);
        }
    }
    passwordValid = state;
} // end setPassAuth

// function for setting things for radio input data
function setGender() {
    // no need for target, get only parent
    let parent = $('#genderWrapper');

    // initial message
    let message = 'Please select your gender!';

    // state check with input value of checked on
    // if not checked -> undefined -> InValid
    let state = ($('input:radio:checked').val() !== undefined);

    // Valid
    if (genderValid) {
        // state change
        if (genderValid !== state) {
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            parent.append(warning);
            parent.children('.warning').text(message);
        }
    }
    // InValid
    else {
        // state change
        if (genderValid !== state) {
            if (parent.children().length !== 1) {
                parent.children('p').remove();
            }
            parent.append(check);
        }
    }
    // set state
    genderValid = state;
} // end setGender

// Auth: check account and get UID of input email and password
function Auth() {
    let currentEmail = $('#emailAuth').val();
    let currentPassword = $('#passAuth').val();

    for (let i = 0; i < Accounts.length; i++) {
        // if UID found break
        if (Accounts[i].email === currentEmail) {
            UID = i;
            break;
        }
    }
    // if UID found and password match -> auth success
    if (UID !== -1 && Accounts[UID].password === currentPassword) {
        auth = true;
    }
} // end Auth

// the functions are linked to each action that triggers it to operate
$(document).ready(function () {

    // used click and keyup input for typing and clicking
    // set of linking functions for each input
    $('#emailAuth').on('keyup click', function () {
        setEmailAuth();
    });
    $('#passAuth').on('keyup click', function () {
        setPassAuth();
    });
    $('#firstName').on('keyup click', function () {
        setFirstName();
    });
    $('#lastName').on('keyup click', function () {
        setlLastName();
    });
    $('#email').on('keyup click', function () {
        setEmail();
    });
    $('#password').on('keyup click', function () {
        setPassword();
    });
    $('#confirmPass').on('keyup click', function () {
        setConfirm();
    });
    // gender input type is radio so only click event linked
    $('input:radio').on('click', function () {
        setGender();
    });

    // function for SignUp button
    $('#signUpBtn').on('click', function () {
        // check all validation
        setFirstName();
        setlLastName();
        setEmail();
        setPassword();
        setConfirm();
        setGender();
        // if all validate, start sign in
        if (firstnameValid && lastnameValid && emailValid && passwordValid && confirmPassValid && genderValid) {

            // register Account and Account Data

            Accounts.push({email: $('#email').val(), password: $('#password').val()});
            AccountsData.push({firstname: $('#firstName').val(),
                lastname: $('#lastName').val(),
                gender: $('input:radio:checked').val()});

            console.log(Accounts);
            console.log(AccountsData);

            // Set to mysql
            $('#singInForm').submit();
            // Set finish

            // Page change to message page
            $('#signUp').fadeOut();
            $('#taskMessage').text('You are signed up.');
            setTimeout(() => $('#message').fadeIn(), 400)
            state = 3;
        }
    }); // end SignUp

    // function for Login button
    $('#logInBtn').on('click', function () {
        // check all auth input validation
        setEmailAuth();
        setPassAuth();
        // if all validate, go for auth
        if (emailValid && passwordValid) {
            // check for auth
            Auth();
            // if auth is success -> go to message page with all page hidden
            if (auth) {
                // $('#login').fadeOut();
                // $('.row').fadeOut();
                state = 0;
                $('#loginForm').submit();
                resetPage();
                // $('#login').fadeIn();
                // $('.row').fadeIn();
            }
            // auth failed -> put error message on the login page
            else {
                $('#inputMessage').text('Credential do not match!')
                $('#inputMessage').addClass('red');
            }
        }
    }); // end Login
})

