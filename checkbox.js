var locked=[];
window.param = new Array();

function starcheck(ckType){
    var ckName = document.getElementsByName(ckType.name);
	var total=0;
	for(var i=0; i < ckName.length; i++){
	if (ckName[i].checked)
		total++
	}
    if (total==2) {
      locked[1]=true;
      for(var i=0; i < ckName.length; i++){

          if(!ckName[i].checked){
              ckName[i].disabled = true;
          }else{
              ckName[i].disabled = false;
          }
      } 
    }
    else {
      locked[1]=false;
      for(var i=0; i < ckName.length; i++){
        ckName[i].disabled = false;
      } 
    }    
}//disables star checkbox form after 2 are selected

function lettercheck(ckType){
    var ckName = document.getElementsByName(ckType.name);
	var total=0;
	for(var i=0; i < ckName.length; i++){
	if (ckName[i].checked)
		total++
	}
    if (total==1) {
      locked[2]=true;
      for(var i=0; i < ckName.length; i++){

          if(!ckName[i].checked){
              ckName[i].disabled = true;
          }else{
              ckName[i].disabled = false;
          }
      } 
    }
    else {
      locked[2]=false;
      for(var i=0; i < ckName.length; i++){
        ckName[i].disabled = false;
      } 
    }    
}//disables letter checkbox form after 1 is selected

function numbercheck(ckType){
  var ckName = document.getElementsByName(ckType.name);
var total=0;
for(var i=0; i < ckName.length; i++){
if (ckName[i].checked)
  total++
}
  if (total==7) {
    locked[0]=true;
    for(var i=0; i < ckName.length; i++){

        if(!ckName[i].checked){
            ckName[i].disabled = true;
        }else{
            ckName[i].disabled = false;
        }
    } 
  }
  else {
    locked[0]=false;
    for(var i=0; i < ckName.length; i++){
      ckName[i].disabled = false;
    } 
  }    
}//disables number checkbox form after 7 are selected

function submitforms(){
  var submitready=0;
  for(var i=0; i < 3; i++){
    if (locked[i]===true){
      submitready++;
    }
    if (locked[i]===false){
      submitready--;
    }
  }
  if(submitready===3){
    var numbername=document.getElementsByName("numbercheckname");
    var starname=document.getElementsByName("starcheckname");
    var lettername=document.getElementsByName("lettercheckname");
    for(var i=0; i < numbername.length; i++){
      if (numbername[i].checked){
        window.param.push(parseInt(numbername[i].value));
      }
    }
    for(var i=0; i < starname.length; i++){
      if (starname[i].checked){
        window.param.push(parseInt(starname[i].value));
      }
    }
    for(var i=0; i < lettername.length; i++){
      if (lettername[i].checked){
        window.param.push(lettername[i].value);
      }
    }
  }
}
