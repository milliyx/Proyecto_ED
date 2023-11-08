const OPTION_0 = 0;
const OPTION_1 = 1;
const OPTION_X = 2;
const OPTION_INVALIDO = -1;

class tablaDeVerdadItemView{
    constructor(num, params){
        this.id = num;
        this.params = params;
        this.option = OPTION_INVALIDO;
        this.binaryArray = intToBinario(num, params.numBits);

        this.createView();
    }

    //Muestra la tabla interactiva de minterminos
    createView(){
        this.element = document.createElement("tr");

        this.bitsLayout = [];
        this.optionNodes = [document.createElement("a"), document.createElement("a")]
        
        this.binaryArray.forEach(bit => {
            let bitText = document.createElement("td");
            $(bitText).text(bit);
            this.bitsLayout.push(bitText);
            this.element.appendChild(bitText);
        });

        this.optionNodes[0].style.display = "none";
        
        let buttonTd = document.createElement("td");

        this.optionNodes.forEach(el => {
            buttonTd.appendChild(el);
        });
        
        this.element.appendChild(buttonTd);

        $(this.optionNodes[0]).click(e => {
            this.setOption(OPTION_0);
        });

        $(this.optionNodes[1]).click(e => {
            this.setOption(OPTION_1);
        });

        this.initLayout();
    }

    setOption(index){
        this.removeInvalid();
        this.option = index;
        this.optionNodes.forEach(el => {
            $(el).removeClass("is-success");
        });
        $(this.optionNodes[index]).addClass("is-success");
    }

    //Valida que todos los botones de la tabla interactiva tengan una opcion valida
    validate(){
        return true;
    }

    //Deja seleccionar las opciones de la tabla interactiva
    removeInvalid(){
        this.optionNodes.forEach(el => {
            $(el).removeClass("is-danger");
        });
    }

    initLayout(){
        //Da formato de boton
        this.optionNodes.forEach(el => {
            $(el).addClass("radio-form-out button is-info");
        });
        
        //Nombra los botones
        $(this.optionNodes[1]).text("Agregar");
    }
}

//Genera lo restante de la tabla interactiva
class tablaDeVerdadView{
    //Genera la tabla dependiendo el numero de variables
    constructor(numBits, containerName){
        this.LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        this.numBits = numBits;
        this.maxSize = Math.pow(2, numBits);
        this.containerName = containerName;
        this.elements = [];
    }

    createHeader(){
        let html = "<thead><tr>";

        //Genera la primera columna (variables)
        for(let i = 0 ; i < this.numBits ; ++i){
            html += "<td>"+this.LETRAS[i]+"</td>";
        }

        //Muestra a la funcion (f)
        html += "<td>f</td>";
        html += "</tr></thead>";
       
        //Contenedor de la primera fila
        $(this.containerName).html(html);
    }

    //Muestra el resto de la tabla
    createView() {
        $(this.containerName).html("");
        this.elements = [];
        this.createHeader();
        for(let i = 0 ; i < this.maxSize ; ++i){
            let newEl = new tablaDeVerdadItemView(i,{
                numBits: this.numBits
            });
            this.elements.push(newEl);
            $(this.containerName).append(newEl.element);
        }
        $($("#entradas-input").parent()).removeClass("is-loading");
    }

    //Valida las opciones
    validate(){
        let valid = true;
        for (let i = 0; i < this.elements.length; i++) {
            if(!this.elements[i].validate()){
                valid = false;
            }
        }
        return valid;
    }

    //Numero de variables
    setNumBits(n){
        this.numBits = n;
        this.maxSize = Math.pow(2, n);
        this.createView();
    }
}