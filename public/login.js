
localStorage.removeItem('token');

var loginBtn = document.getElementById('login-btn');
var resMsg = document.getElementById('login-res-msg');
var dashboardBtn = document.getElementById('dashboardBtn');
var info = document.getElementById('info');
var logindiv = document.getElementById('login');
var dashboardErr = document.getElementById('dashboard_err');

loginBtn.addEventListener('click',async () => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    try {
        const login = await axios.post('/',{
            email,password
        })  

        dashboardBtn.style.display = 'block';
        info.style.display = 'none';
        logindiv.style.display = 'none';
        resMsg.style.display = 'none';
        
        localStorage.setItem('token',login.data.token);

        document.getElementById('email').value = '';
        document.getElementById('password').value = '';

    } catch (err){
        resMsg.innerHTML = `<i class="fa-solid fa-xmark"></i>${err.response.data.msg}`;
        resMsg.style.color = '#e63946';
    }

})


dashboardBtn.addEventListener('click',async () => {
    
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get('/auth',{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        window.location.href = `https://notes-app-brq7.onrender.com/dashboard`;
    
    } catch (err){
        dashboardErr.innerHTML = `<i class="fa-solid fa-xmark dash_err"></i>${err.response.data.msg}`
    }

})