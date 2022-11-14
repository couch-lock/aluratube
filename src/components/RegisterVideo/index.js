import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from '@supabase/supabase-js';


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

const project_url = "https://srzkxpxewblmwcbunabn.supabase.co";
const public_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyemt4cHhld2JsbXdjYnVuYWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTk2MTAsImV4cCI6MTk4NDAzNTYxMH0.Sb12VD2vh1zdt3Urvrmm8i0DrwQAgujKY0d51tvwr_g";
const supabase = createClient(project_url, public_key)

// get youtube video id
// get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// function getVideoId(url) {
//     const videoId = url.split("v=")[1];
//     const ampersandPosition = videoId.indexOf("&");
//     if (ampersandPosition !== -1) {
//         return videoId.substring(0, ampersandPosition);
//     }
//     return videoId;
// }



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
    
    console.log(supabase.from("video").insert());

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

                        //contrato entre o front e back-end
                    supabase.from("vide").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "",
                    }).then((oqueveio) => {
                        console.log(oqueveio);
                     })
                     .catch((err) => {
                        console.log(err);
                     })


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