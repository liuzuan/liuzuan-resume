import React, { Component } from 'react';
import { Carousel, Icon } from 'antd';
import './style/main.less';
import bg1 from './assets/images/01.jpg';
import bg2 from './assets/images/02.jpg';
import bg3 from './assets/images/03.jpg';
import bg4 from './assets/images/07.jpg';
import bg5 from './assets/images/05.jpg';
import avatar from './assets/images/avatar.PNG';
import art1 from './assets/images/art01.jpg';
import art2 from './assets/images/art02.jpg';
import art3 from './assets/images/art03.jpg';
import art4 from './assets/images/art04.jpg';
import art5 from './assets/images/art05.jpg';
import art6 from './assets/images/art06.jpg';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const bg = [bg1, bg2, bg3, bg4, bg5];

/**
 * 模块入口
 * 
 */
class App extends Component {
  state = {
    navShow: false, // 导航显示状态
    currentId: 0, // 视窗当前显示部分，与nav.id比较来控制导航高亮显示。
    nav: [
      { id: 2, title: '关于我', left: 0, link: '#section2' },
      { id: 3, title: '求职意向', left: 0, link: '#section3' },
      { id: 4, title: '项目作品', left: 0, link: '#section4' },
      { id: 5, title: '技术掌握', left: 0, link: '#section5' },
      { id: 6, title: '我的经历', left: 0, link: '#section6' },
      { id: 7, title: '联系我', left: 0, link: '#section7' }
    ],
  }
  // 监听滚动条控制导航的显示状态
  scrollHandle = () => {
    let scrollBar = document.documentElement.scrollTop || document.body.scrollTop;
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let currentId = Math.round(scrollBar / clientHeight + 1);
    this.setState({ currentId: currentId })
    if (scrollBar >= clientHeight) {
      this.setState({ navShow: true })
    } else {
      this.setState({ navShow: false })
    }
  }

  componentDidMount () {
    window.onscroll = this.scrollHandle
  }

  render () {
    return (
      <div className="App">
        <ReactCSSTransitionGroup
          transitionName="navtoggle"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {
            this.state.navShow && <Nav data={this.state} />
          }
        </ReactCSSTransitionGroup>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
      </div>
    );
  }
}

/**
 * 导航条
 */
class Nav extends Component {
  state = {
    dropdownHeight: false,
  }
  dropdownToggle = () => {
    this.setState({ dropdownHeight: !this.state.dropdownHeight })
  }
  render () {
    let { currentId, nav } = this.props.data;
    return (
      <div className='nav' >
        <div className="content">
          <section className='left'>
            liuzuan's blogs
          </section>
          <section className='right'>
            {
              nav.map(item => {
                let { id, title, link } = item
                return <a className={currentId === id ? 'active' : ''} href={link} key={id} >{title}</a>
              })
            }
          </section>
          <section className='more' onClick={this.dropdownToggle}>
            <Icon type="bars" style={{ fontSize: 20, color: '#fff' }} />
          </section>
        </div>
              {
          <div className='dropdown' style={{ height: this.state.dropdownHeight ? 70 + 'px' : 0 }} >
            {
                nav.map(item => {
                  let { id, title, link } = item
                  return <a href={link} className={currentId === id ? 'active' : ''} key={id} >{title}</a>
                })
              }
            </div>
          }
      </div>
    )
  }
}

/**
 * 轮播部分
 */
class Section1 extends Component {
  render () {
    return (
      <div id='section1' >
        <Carousel autoplay effect='fade'>
          {
            bg.map((item, index) => {
              let libg = {
                backgroundImage: 'url(' + item + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
              return <li className='li' key={index} style={libg} />
            })
          }
        </Carousel>
        <div className='info'>
          <p>Hellow,I'm liuzuan</p>
          <p>一枚热爱coding的前端工程师</p>
          <div className='button' >
            <a href="#section2">About Me</a>
            <a href="http://github.com/liuzuan" target='blank'>My GitHub</a>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 关于我
 */
class Section2 extends Component {
  state = {}
  render () {
    return (
      <div id='section2' className='panel'>
        <div className='main' >
          <h1>关于我</h1>
          <div className='avatar' >
            <img src={avatar} alt="" />
          </div>
          <p>刘祖安，23岁，坐标北京，前端工程师一枚，热爱写代码。重度互联网用户，喜欢逛论坛。<br /></p>
          <p>无聊时喜欢各种瞎捣鼓，学习路漫漫，志同道合的朋友可以加我，一起成长。我的QQ：467209099，我的微信：lza1-1。</p>
        </div>
      </div>
    )
  }
}

/**
 * 求职意向
 */
class Section3 extends Component {

  render () {
    return (
      <div id='section3' className='backgroundPanel panel'>
        <div className='main'>
        <h1>求职意向</h1>
          <div className='container' ></div>
        </div>
      </div>
    )
  }
}

/**
 * 项目作品
 */
class Section4 extends Component {
  state = {
    artList: [
      { title: 'CNode社区', text: 'react全家桶实现移动端CNode社区', img: art1, link: 'http://liuzuann.com/react-cnode/' },
      { title: '商城购物车', text: '原生js实现购物车功能', img: art2, link: '' },
      { title: '知乎日报', text: '', img: art3, link: '' },
      { title: 'Yummy', text: '', img: art4, link: '' },
      { title: '', text: '', img: art5, link: '' },
      { title: '', text: '', img: art6, link: '' },
    ],
  }
  render () {
    return (
      <div id='section4' className='panel'>
        <div className='main'>
        <h1>项目作品</h1>
        <section className='container' >
          {
            this.state.artList.map((item, index) => {
              let { title, img, text, link } = item;
              return <div className='artBox' key={index} >
                <img src={img} alt="" />
                <a href={link} target='blank' className='coverBox'>
                    <div className='coverContent'>
                      <section>
                  <p className='title' >{title}</p>
                  <p className='text' >{text}</p>
                      </section>
                    </div>
                </a>
              </div>
            })
          }
        </section>
      </div>
      </div>
    )
  }
}

/**
 * 技术掌握
 */
class Section5 extends Component {
  render () {
    return (
      <div id="section5" className='backgroundPanel panel'>
        <div className='main'>
        <h1>技术掌握</h1>
      </div>
      </div>
    )
  }
}

/**
 * 我的经历
 */
class Section6 extends Component {
  render () {
    return (
      <div id="section6" className='panel'>
        <div className='main'>
        <h1>我的经历</h1>
      </div>
      </div>
    )
  }
}

/**
 * 联系我
 */
class Section7 extends Component {
  render () {
    return (
      <div id="section7" className='backgroundPanel panel'>
        <div className='main'>
        <h1>联系我</h1>
      </div>
      </div>
    )
  }
}


export default App;
