// Links :: https://github.com/alura-challenges/aluratube
//https://www.alura.com.br/imersao-react/aula01-web-componentes-deploy

// Troca de codigo : 
//https://github.com/alura-challenges/aluratube/pull/1/
//files#diff-7c97c1ad17c63f34774324965f81661cea32f533a65c39ab03576069972e4d0e

// CSSResets : https://gist.github.com/
//omariosouto/dcb317de101426221c834cb6caa75a49

// Figma ? https://www.figma.com/file/
//1acrju7CLwHkSh6e7xEk9h/Aluratube?node-id=5%3A2

// Vercel :: database de examples... styled-components...
//https://github.com/vercel/next.js/blob/canary/examples/ 
//with-styled-components/next.config.js

import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import React from "react";
import { createClient } from '@supabase/supabase-js';
import { videoService } from "../src/services/videoService";

const project_url = "https://srzkxpxewblmwcbunabn.supabase.co";
const public_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyemt4cHhld2JsbXdjYnVuYWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTk2MTAsImV4cCI6MTk4NDAzNTYxMH0.Sb12VD2vh1zdt3Urvrmm8i0DrwQAgujKY0d51tvwr_g";
const supabase = createClient(project_url, public_key)


function HomePage() {

  const service = videoService();
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});     // config.playlists

 React.useEffect(() => {
  console.log("useEffect");
  service
      .getAllVideos()
        .then((dados) => {
            console.log(dados.data);
            // Forma imutavel
            const novasPlaylists = {};
            dados.data.forEach((video) => {
                if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                novasPlaylists[video.playlist] = [
                    video,
                    ...novasPlaylists[video.playlist],
                ];
            });

            setPlaylists(novasPlaylists);
        });
  }, [] );    
  // ,[] => este é um array vazio, para quando algum dado for alterado, executar esta operacao novamente, nao redenriza a tela inteira.


  //console.log(config.playlists);

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // backgroundColor: "red",
      }}>
        {/*Prop Drilling fura as aplicacoes buscando as propriedades*/ }
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
        <main style={{display: "flex", flexDirection: "column",flex: 1}}>
          <Header />
          <Timeline searchValue={valorDoFiltro} playlists={playlists}>
            Conteúdo
          </Timeline>
        </main>
      </div>

    </>
  );
}

export default HomePage

// function Menu() {
//   return (
//     <div>
//       Menu
//     </div>
//   )
// }

//cade?
const StyledBanner = styled.div`
  width: 100%;
  height: 230px;
  background-image : url(${({ bg }) => bg });
  /*background-image : url(${config.bg});*/
  background-size: cover;
  background-position: center;
  `;


const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;

    }
    .user-info {
      
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
  `;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg}/>
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2> {config.name} </h2>
          <p> {config.job} </p>

        </div>
      </section>

    </StyledHeader>
  )
}


// for=statement e forEach=retorno de expressao ==== .map
// ... significa todas as outras... propriedades no caso.
function Timeline({searchValue, ...propriedades}) {
  //console.log("Dentro do componente", propriedades.playlists);
  const playlistNames = Object.keys(propriedades.playlists);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {

        const videos = propriedades.playlists[playlistName];
        //console.log(videos);
        return (

          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
                {
                  videos.filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized)

                })
                .map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>
                      {video.title}
                    </span>
                  </a>
                )

              })}
            </div>
          </section>
        )


      })}
    </StyledTimeline>
  )
}
// usar => no lugar de function(antes de (playlistNames) )
// encurta cod e mais usado