const signUpBtn=document.querySelector('.sign-up');
console.log(signUpBtn)
const signUpForm=document.querySelector('.sign-up-form');
const signInForm=document.querySelector('.sign-in-form');
signUpBtn.addEventListener('click',()=>{
    console.log("hello")
    signUpForm.classList.add('active');
    signInForm.classList.add('disable');
})
