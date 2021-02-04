b = document.getElementById('btn');
task = document.getElementById('task')
date = document.getElementById('date')


data = {
    headers : {
        'Content-Type' : 'Application/json'
        },
    
    method : 'POST',
}

sendData = async () => {
    
    if (task.value == "" || date.value == ''){
        return alert('Enter Valid values for task and date ')
    } 

    dict = {
        task : task.value,
        Due : date.value
    }

    data.body = JSON.stringify(dict)

    res = await fetch('http://localhost:5000/addTask', data);
    a = await res.json()
    console.log(a)

}


b.addEventListener('click', async () => {

        try{
            b.style.disabled = true;
            await sendData();
            alert('Task Added Successfully')
            b.style.disabled = false;
            task.value = '';
            date.value = '';

        }catch(e){
            alert(e);
        }

});