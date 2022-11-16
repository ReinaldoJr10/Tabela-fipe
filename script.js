function Dark_Mode() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}

function topoPagina() {
  document.documentElement.scrollTop = 0;
}

const url_marcas="https://parallelum.com.br/fipe/api/v1/carros/marcas"
  
async function getapi(nomeBusca) {
    const response2 = await fetch(url_marcas);
    var marcas = await response2.json();
    var marcasInd=marcas.map(um=>{return um.codigo})    
    var dataFiltrado=[],auxJson=[]

    let requestsModelos = marcasInd.map(num => fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${num}/modelos`)) 
    
    await Promise.all(requestsModelos).then(responses => { return responses;})
            .then(responses => Promise.all(responses.map(r => r.json())))
            .then(users => users.forEach(user => {auxJson.push(user)}));

    for(var h=0;h<marcasInd.length;h++){
      for(var i=0;i<auxJson[h].modelos.length;i++){
        if(auxJson[h].modelos[i].nome.toLowerCase().includes(nomeBusca)==true){                  
          var ano="https://parallelum.com.br/fipe/api/v1/carros/marcas/".concat(marcasInd[h].concat("/modelos"))
            .concat("/").concat(auxJson[h].modelos[i].codigo).concat("/anos")
          
          const response3 = await fetch(ano);
          var anos = await response3.json();
          console.log("-")

          let requests = anos.map(name => fetch(`${ano}/${name.codigo}`));          
          Promise.all(requests).then(responses => { return responses;})
            .then(responses => Promise.all(responses.map(r => r.json())))
            .then(users => users.forEach(user => dataFiltrado.push(user)));  /**/                  
        }          
      }      
      console.log(h)
    }   
    show(dataFiltrado);
}

function chamaBusca(){
  var nomeBusca=document.getElementById("lname").value.toLowerCase()
  console.log("chamou ",nomeBusca)
  getapi(nomeBusca);
}  

function show(data) {
    let tab = 
        `<tr>
          <th>Modelo</th>
          <th>Ano</th>
          <th>Valor</th>
         </tr>`;
    for (var i=0;i<data.length;i++) {
        tab += `<tr> 
    <td>${data[i].Modelo} </td>
    <td>${data[i].AnoModelo}</td>
    <td>${data[i].Valor}</td>
         
</tr>`;
    }
    document.getElementById("employees").innerHTML = tab;
}