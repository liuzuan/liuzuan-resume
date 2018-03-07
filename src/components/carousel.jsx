import React, { Component } from 'react';
import { Carousel } from 'antd';

class Main extends Component {
  state = {
    backgroung: [
      "../assets/images/01.jpg",
      "../assets/images/02.jpg",
      "../assets/images/03.jpg",
      "../assets/images/04.jpg",
      "../assets/images/05.jpg",
    ]
  }
  backgroungHandle = () => {

  }
  render() { 
    return (
      <div className='carousel' >
        <Carousel autoplay effect='fade' dots='false' >
        {
          this.state.backgroung.map((item,index) => {
            return <li className='li' key={index}><img src={item} alt=""/></li>
          })
        }
        </Carousel>
        <img className='img' src="../assets/images/06.jpg" alt=""/>
        <img className='img' src="../assets/07.jpg" alt=""/>
      </div>
    )
  }
}
 
export default Main;