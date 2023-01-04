localStorage.removeItem('token');

var registerBtn = document.getElementById('register-button');
var resMsg = document.getElementById('register-res-msg');


registerBtn.addEventListener('click',async () => {
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const temp_gender = document.querySelector('input[name="gender"]:checked');

    var gender;

    if (temp_gender == null){
        gender = '';
    }else {
        gender = temp_gender.value;
    }
    

    try {
        const register = await axios.post('/register',{
            name,email,password,gender
        })
    
        resMsg.innerHTML = `<i class="fa-solid fa-check"></i>${register.data.msg}`;
        resMsg.style.color = '#55a630';

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('male').checked = false;
        document.getElementById('female').checked = false;

    } catch (err){
        resMsg.innerHTML = `<i class="fa-solid fa-xmark"></i>${err.response.data.msg}`;
        resMsg.style.color = '#e63946';
    }

    
    
    
})