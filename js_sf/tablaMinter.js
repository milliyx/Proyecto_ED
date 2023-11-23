//Operaciones para los valores de la primera tabala de minterminos.
class minterminoStruct{
    constructor(bin){
        this.bin = bin;
        this.sinComplementar = this.getSinComplementar(bin);
        this.complementados = this.getComplementados(bin);
    }

    getSinComplementar(bin){
        let newBin = [];
        for (let i = 0; i < bin.length; i++) {
            if(bin[i] == 1){
                newBin.push(OPTION_1);
            }else{
                newBin.push(OPTION_0);
            }
        }
        return newBin;
    }

    getComplementados(bin){
        let newBin = [];
        for (let i = 0; i < bin.length; i++) {
            if(bin[i] == 0){
                newBin.push(OPTION_1);
            }else{
                newBin.push(OPTION_0);
            }
        }
        return newBin;
    }

    copy(sin, com){
        this.sinComplementar = sin;
        this.complementados = com;
    }

    sonCombinables(min2){
        let newSin = [];
        let newCom = [];

        for (let i = 0; i < this.sinComplementar.length; i++) {
            if(this.sinComplementar[i] == min2.sinComplementar[i]){
                newSin.push(OPTION_0);
            }else{
                newSin.push(OPTION_1);
            }
        }

        for (let i = 0; i < this.complementados.length; i++) {
            if(this.complementados[i] == min2.complementados[i]){
                newCom.push(OPTION_0);
            }else{
                newCom.push(OPTION_1);
            }
        }
   
        return this.equals(newSin, newCom) && this.countUnos(newSin) == 1;
    }

    countUnos(arr){
        let tmp = 0;
        arr.forEach(el => {
            if(el == 1) tmp++;
        });
        return tmp;
    }

    equals(arr1,arr2){
        for (let i = 0; i < arr1.length; i++) {
            if(arr1[i] != arr2[i]) return false;
        }
        return true;
    }

    AND(min2){
        let newCom = [];

        console.log();

        for (let i = 0; i < this.complementados.length; i++) {
            if(this.bin[i] != OPTION_X){
                if(this.complementados[i] != min2.complementados[i]){
                    newCom.push(OPTION_X);
                }else{
                    newCom.push(this.sinComplementar[i]);
                }
            }else{
                newCom.push(OPTION_X);
            }
        }

        return newCom;
    }

}

//Genera la primera tabla(1's en cada numero binario)
class tablaMinterminos{ 
    constructor(mins){ 
        this.minterminos = mins;
        this.minterminosAgrup = [];
        this.createAgrup();
    }

    createView(elemName){ 
        let html = '<table class="table is-bordered">'+
                '<thead>'+
                    '<tr>'+
                        '<th>Minitérmino</th>'+
                        '<th>Representación binaria</th>'+
                        '<th>Cantidad de 1\'s</th>'+
                    '</tr>'+
                '</thead>';

        for (let i = 0; i < this.minterminosAgrup.length; i++) {
            if(this.minterminosAgrup[i].arr.length > 0){
                html += "<tr><td>";
                for (let e = 0; e < this.minterminosAgrup[i].arr.length; e++) {
                    html+= "<p>"+parseInt(this.minterminosAgrup[i].arr[e].arr.join(""), 2)+"</p>";
                }
                html += "</td>";

                html += "<td>";
                for (let e = 0; e < this.minterminosAgrup[i].arr.length; e++) {
                    html+= "<p>"+this.minterminosAgrup[i].arr[e].arr.join("")+"</p>";
                }
                html += "</td>";

                html += "<td>"+ i +"</td>";

                html += "</tr>";
            }
        }
    
        html += '</table>';
        $(elemName).html($(elemName).html()+html);
    }

    createAgrup(){
        for (let i = 0; i <= this.minterminos[0].binaryArray.length; i++) { //Para todos la cantidad de Bits disponibles
            let arrObj = {
                index : [i],
                arr : [],
            };
            for (let e = 0; e < this.minterminos.length; e++) {
                if(this.count(this.minterminos[e].binaryArray) == i){
                    arrObj.arr.push({
                        arr: this.minterminos[e].binaryArray,
                        mintId: [this.minterminos[e].id]
                    });
                }
            }
            this.minterminosAgrup.push(arrObj);
        }
        console.log(this.minterminosAgrup);
    }

    count(arr){
        let cont = 0;
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] == 1){
                cont++;
            }
        }
        return cont;
    }
}