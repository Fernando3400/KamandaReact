

export function formatarPreco(valor,funcaoDefinir) {
    
  let valorTextual = "" + valor;
  console.log(valorTextual.split(",")[1])
  console.log(valorTextual)
  if(valor == "R$" ){
    funcaoDefinir("R$0")
  }else if(valor.search(",") == -1){
    funcaoDefinir("R$" + valor +",00");
    return
  } else if(valorTextual.split(",")[1].length==3){
    if (valorTextual.split(",")[0].length > 4) {
      return
    }
    let p=valorTextual.split(",")[0]
    p=p.replace("R$", "")
    p=p.concat(valorTextual.split(",")[1].charAt(2))

    if(p.charAt(0)== "0"){
      p=p.charAt(1)
    }

    funcaoDefinir("R$" + p +",00");
    return
  }else if(valorTextual.split(",")[1].length==1){
    let p=valorTextual.split(",")[0]
    p=p.replace("R$", "")
    p=p.substring(0,p.length-1)
    if(p==""){
      funcaoDefinir("R$" + "0" +",00");
      return
    }

    funcaoDefinir("R$" + p +",00");
    return
  }

  valorTextual = valorTextual.replace("R$", "");
  valorTextual = valorTextual.replace(",", ".");
  valorTextual = valorTextual.replace(" ", "");
  console.log(valorTextual);

  const numero = parseFloat(valorTextual);


  funcaoDefinir("R$" + numero +",00");
}

