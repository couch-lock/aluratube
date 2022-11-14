import React from "react";
import { StyledRegisterVideo } from "./styles";

//writeboarding

//Custom Hook
function useForm(propsDoForm){
    const [values, setValues] = React.useState( propsDoForm.initialValues );
    
    return{
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            }); 
        },
        clearForm(){
            setValues({});
        }
    };
}


export default function RegisterVideo(){
    //botao para adicionar
    //modal lightbox
    //controlar o State
    //formulario
    //maior parte em front-end (para aparecer ou esconder coisas), é um State com booleano
/* 
    chama um js com {} utiliza-se muito Ternario(?) 
    ou Operador de Curto Circuito(&&)= "true && visivel, vai retornar formulario" 
    vai questionar se o formulario esta visivel
    
    fazer um onSubmit para o Form funcionar. 
    pegar dados vindo do state
    input do titulo e url do video
    limpar o formulario apos o submit
*/
    const formCadastro = useForm({
        initialValues: { titulo: "Titulo: ", url: "Url: " }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);
    

    return(
        <StyledRegisterVideo>

            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>

        
            {formVisivel 
            ?  (
                <form onSubmit={(evento) => {
                    evento.preventDefault();
                    console.log(formCadastro.values);

                    setFormVisivel(false);
                    formCadastro.clearForm();
                }
                
                }>
                    <div>

                        <button type="button" className="close-modal" onClick={ () => setFormVisivel(false)}>
                            X
                        </button>

                        <input 
                            placeholder="Titulo do Video: " 
                            name = "titulo"
                            values={formCadastro.values.titulo} 
                            onChange={formCadastro.handleChange}                       
                        />

                        <input 
                            placeholder="Url: " 
                            name = "url"
                            values={formCadastro.values.url} 
                            onChange={formCadastro.handleChange} 
                        />

                        <button type="submit">
                            Enviar
                        </button>

                    </div>

                </form>
            
               ):false
            }

        </StyledRegisterVideo>
    )

}