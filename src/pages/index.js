import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import BackgroundSlider from "gatsby-image-background-slider"

const ImageDescription = ({label}) => <div style={{color: "white", transition: 'opacity 4s',fontFamily: "Special Elite", position: "absolute", bottom:20, left:20, fontSize:"40pt",  filter: "drop-shadow(1px 1px 1px #000)"}}>{label}</div>

const ImagePage = () => {
  const queryResult = useStaticQuery(graphql`
    query {
      backgrounds: allFile (filter: {sourceInstanceName: {eq: "backgrounds"}}, sort: { fields: [absolutePath] }){      
          nodes{

              relativePath
              colors {
                ...GatsbyImageColors
              }
              childImageSharp {
                  fluid(maxWidth: 4000, quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp_noBase64
                  } 
              fields {
                exif {
                  raw {
                    image {
                      ImageDescription
                    }
                  }
                }
              }
              }
          }      
      }
  }
`)
console.log(JSON.stringify(queryResult.backgrounds.nodes.map(node => node.childImageSharp.fluid)))

  return <>
    {/* <BackgroundSlider
    images={queryResult.backgrounds.nodes.map(node => node.childImageSharp.fluid.srcWebp)}
    duration={10} 
    transition={2}> */}
    <BackgroundSlider 
      query={queryResult}
      initDelay={2}
      transition={0}
      duration={8}      
      style={{
        objectFit: "contain",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        transition: 'opacity 1s'
      }}
      objectFit="contain"
      imgStyle={{objectFit: `contain`}}
    >
      {queryResult.backgrounds.nodes.map(node => { 
        const desc = node.childImageSharp.fields?.exif?.raw?.image?.ImageDescription || ''
        return <>
            <div
              style={{
                background: node.colors?.darkMuted || "#0f0e0e",
                width: "100%", height: "100%",       
                backgroundSize: "cover", 
                position: "absolute", top: 0, zIndex: -11
              }}
            ></div>
          <ImageDescription label={desc}/>
        </>
      })}
     </BackgroundSlider>


    {/* <Dim z={-11} dim={1}/> */}
  </>
}

export default ImagePage
