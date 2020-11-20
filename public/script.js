let signUp = document.getElementsByClassName("btn btn-block btn-lg btn-primary");

function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}

signUp[0].addEventListener('click', (e)=>{
    e.preventDefault()
    let email = document.getElementsByClassName("form-control form-control-lg")[0].value;
    if(ValidateEmail(email)){
    window.location.href = `/register?email=${email}`;
    }
})

