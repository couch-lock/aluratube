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
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {

  const estiloHomePage = {
    //backgroundColor: "red" 
  };

  //console.log(config.playlists);

  return (
    <>
      <CSSReset />
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // backgroundColor: "red",
      }}>
        <Menu />
        <main style={{display: "flex", flexDirection: "column",flex: 1}}>
          <Header />
          <Timeline playlists={config.playlists}>
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
  background-image : ${({bg}) => `url("${bg}")`};
  background-size: cover;
  background-position: center;
  `;


const StyledHeader = styled.div`
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;

    }
    .user-info {
      margin-top: 50px;
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
      {/*<img src="banner" />*/}
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
function Timeline(props) {
  //console.log("Dentro do componente", props.playlists);
  const playlistNames = Object.keys(props.playlists);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {

        const videos = props.playlists[playlistName];
        //console.log(videos);
        return (
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos.map((video) => {
                return (
                  <a href={video.url}>
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