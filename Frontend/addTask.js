b = document.getElementById('btn');
task = document.getElementById('task')
date = document.getElementById('date')
currentDate = new Date();

if (currentDate.getDate().toString.length == 2){
    day = currentDate.getDate()
}else {
    day = '0' + currentDate.getDate()  
}

month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
date.min = `${currentDate.getFullYear()}-${month[currentDate.getMonth()]}-${day}`
console.log(date.min)

data = {
    headers : {
        'Content-Type' : 'Application/json'
        },
    
    method : 'POST',
}

sendData = async () => {
    
     

    dict = {
        task : task.value,
        Due : date.value
    }

    data.body = JSON.stringify(dict)

    res = await fetch('http://localhost:5000/addTask', data);
    a = await res.json()
    console.log(a)

}

date.addEventListener('keydown', (event) => {
    if (event.isComposing || event.keyCode === 229){
       b.click()
    }
})

b.addEventListener('click', async () => {

        try{
            if (task.value == "" || date.value == ''){
                return window.alert('Enter Valid values for task and date ')
            }

            d = date.value.split('-')

            if(d[0] < currentDate.getFullYear() || d[1] < currentDate.getMonth()+1){
                return alert(`Please enter date later than today `)
            }else if (d[1] == currentDate.getMonth()+1 && d[2] < currentDate.getDate()+1){
                return alert(`Please enter date later than today `)
            }

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