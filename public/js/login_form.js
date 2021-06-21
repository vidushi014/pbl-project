document.querySelector('#login_btn').addEventListener('click', () => {
    document.querySelector('.wrapper').classList.add('active');
    document.querySelector('footer').style.filter="blur(7px)";
    document.querySelector('header').style.filter="blur(7px)";
    document.querySelector('.portal').style.filter="blur(7px)";
    document.querySelector('main').style.filter="blur(7px)";
    document.querySelector('.card_container').style.filter="blur(7px)";
});

document.querySelector('.close_btn').addEventListener('click', () => {
    document.querySelector('.wrapper').classList.remove('active');
    document.querySelector('footer').style.filter="blur(0px)";
    document.querySelector('header').style.filter="blur(0px)";
    document.querySelector('.portal').style.filter="blur(0px)";
    document.querySelector('main').style.filter="blur(0px)";
    document.querySelector('.card_container').style.filter="blur(0px)";
    console.log("executed22");
});

const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
    signupBtn.click();
    return false;
});

  