function ajax(){
    let req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            document.getElementById('salas').innerHTML = req.responseText
        }
    }
    //pega o echo q ta no chatenviar.php
    req.open('GET', '/salas', true)
    req.send()
    //atualiza e coloca o echo a div msgs
    var objDiv = document.getElementById("salas");
    objDiv.scrollTop = objDiv.scrollHeight;
}
setInterval(function(){ajax()}, 1000)