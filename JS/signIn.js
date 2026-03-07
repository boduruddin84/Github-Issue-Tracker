const signInE = document.getElementById('sign-in-btn').addEventListener('click', function() {
    const username = getInput('input-username');

    const password = getInput('input-password');

    if(username === 'admin' && password === 'admin123') {
        alert('Sign In Success');
        window.location.assign("./main.html");
    }
    
})