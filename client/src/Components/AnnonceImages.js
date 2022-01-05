import React from 'react';
import { Carousel } from 'react-carousel-minimal';

function AnnonceImages({imageUrl}) {

    //"data" is an array will takes list of images
    const data = []

    //function stock list of images urls from imageUrl wich stocked in our database "atlas mongoDB" to the array "data"
    const fillInData = () => {
      for (let i=0; i<imageUrl.length; i++) {
        let image = `uploads/${imageUrl[i]}`;
        data.push({image});
      }
    }

    //styles of component from "material ui"
    const captionStyle = {
      fontSize: '2em',
      fontWeight: 'bold',
    }
    const slideNumberStyle = {
      fontSize: '20px',
      fontWeight: 'bold',
    }
  return (
    //component from "material ui" to show images of annonce in the Details page 
    <div className="annonce_image">
      <div style={{ textAlign: "center" }}>
        <div style={{
          padding: "0 20px"
        }}>

          {//calling this function to fill the array of images
            fillInData()
            }

          <Carousel
            data={data}
            time={10000}
            width="850px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "600px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
          
        </div>
      </div>
    </div>
  );
}

export default AnnonceImages;
