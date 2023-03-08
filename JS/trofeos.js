  function Trofeos(){
    let trofeo_usuario = localStorage.getItem("data");
    let trofeo_usuarioJson = JSON.parse(trofeo_usuario);
    console.log(trofeo_usuarioJson)
    
    let puntaje_trofeo = trofeo_usuarioJson.puntaje;
    console.log(puntaje_trofeo)
    let item1= document.getElementById('item1');
    console.log(item1)
    
  fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Insignia/Lista`)
  .then(response => response.json())
  .then(data_trofeo => {
    console.log(data_trofeo)
    let primer_trofeo = data_trofeo.value[0];
    console.log(primer_trofeo)
    let primer_urlimage = primer_trofeo["urlfoto"];
    console.log(primer_urlimage)
      if(puntaje_trofeo>=50){
          document.getElementById('item1').src=data_trofeo.value[0].urlfoto;
          document.getElementById('item1').title=data_trofeo.value[0].descripcion;
      }
      if(puntaje_trofeo>=100){
         document.getElementById('item2').src=data_trofeo.value[1].urlfoto;
         document.getElementById('item2').title=data_trofeo.value[1].descripcion;
      }
      if(puntaje_trofeo>=150){
        document.getElementById('item3').src=data_trofeo.value[2].urlfoto;
        document.getElementById('item3').title=data_trofeo.value[2].descripcion;
      }
      if(puntaje_trofeo>=200){
        document.getElementById('item4').src=data_trofeo.value[3].urlfoto;
        document.getElementById('item4').title=data_trofeo.value[3].descripcion;
      }
  })
  .catch(error => console.error(error));
  }