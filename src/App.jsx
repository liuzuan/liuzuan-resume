import React, { Component } from "react";
import { Carousel, Icon, Timeline } from "antd";
import "./style/main.less";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { bg1, bg2, bg3, bg4, bg5, avatar, art1, art2, art3, art4, art5, art6 } from "./tool.js";
// import Section7 from "./pages/message";
const bg = [bg1, bg2, bg3, bg4, bg5];

/**
 * 模块入口
 */
class App extends Component {
    state = {
        navShow: false, // 导航显示状态
        currentId: 0, // 视窗当前显示部分，与nav.id比较来控制导航高亮显示。
        nav: [
            { id: 2, title: "关于我", left: 0, link: "section2" },
            { id: 3, title: "求职意向", left: 0, link: "section3" },
            { id: 4, title: "项目作品", left: 0, link: "section4" },
            { id: 5, title: "技术掌握", left: 0, link: "section5" },
            { id: 6, title: "我的经历", left: 0, link: "section6" },
            { id: 7, title: "联系我", left: 0, link: "section7" }
        ]
    };
    // 监听滚动条
    scrollHandle = () => {
        let scrollBar = document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

        // 控制导航条的显示与隐藏
        let currentId = Math.round(scrollBar / clientHeight + 0.9);
        this.setState({ currentId: currentId });
        if (scrollBar >= clientHeight) {
            this.setState({ navShow: true });
        } else {
            this.setState({ navShow: false });
        }

        // 元素进入视窗添加淡入过渡效果
        let panel = document.getElementsByClassName("panel");
        for (let i of panel) {
            let offsetDom = i.offsetTop;
            let offsetWin = offsetDom - scrollBar;
            if (offsetWin <= clientHeight * 0.4 && offsetWin > -clientHeight * 0.6) {
                let h1 = i.getElementsByTagName("h1")[0];
                let main = i.getElementsByClassName("main")[0];
                h1.className = "newh1";
                main.classList.add("fadeIn");
            }
        }

        // 背景图片随滚动偏移效果
        let backgroundPanel = document.getElementsByClassName("backgroundPanel");
        for (let i of backgroundPanel) {
            let panel_scroll = document.documentElement.scrollTop || document.body.scrollTop;
            let panel_dom = i.offsetTop;
            let panel_win = panel_dom - panel_scroll;
            if (-i.offsetHeight < panel_win && panel_win < clientHeight) {
                i.style.backgroundPositionY = 50 / clientHeight * panel_win + "px";
            }
        }
    };

    componentDidMount() {
        window.onscroll = this.scrollHandle;
    }

    render() {
        return (
            <div className="App">
                <ReactCSSTransitionGroup
                    transitionName="navtoggle"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {this.state.navShow && <Nav data={this.state} />}
                </ReactCSSTransitionGroup>
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Section6 />
                {/* <Section7 /> */}
            </div>
        );
    }
}

/**
 * 导航条
 */
class Nav extends Component {
    state = {
        dropdownShow: false
    };

    // navClick = (to) => {
    //   let curScrollBar = document.documentElement.scrollTop || document.body.scrollTop;
    //   let nextOffsetDom = document.getElementById(to).offsetTop;
    //   let distance = nextOffsetDom - curScrollBar;
    //   let buchang = 40;
    //   let time = 10;
    //   if (distance > buchang) {
    //     console.log(1)
    //     setTimeout(() => {
    //       window.scrollTo(0, curScrollBar + buchang);
    //     }, time);
    //     // this.navClick(to);
    //   } else {
    //     window.scrollTo(0, curScrollBar + distance);
    //   }
    // }

    dropdownToggle = () => {
        this.setState({ dropdownShow: !this.state.dropdownShow });
    };
    render() {
        let { currentId, nav } = this.props.data;
        return (
            <div className="nav">
                <div className="content">
                    <section className="left">LZA</section>
                    <section className="right">
                        {nav.map(item => {
                            let { id, title, link } = item;
                            return (
                                <a
                                    href={`#${link}`}
                                    className={currentId === id ? "active navLink" : "navLink"}
                                    key={id}>
                                    {title}
                                </a>
                            );
                        })}
                    </section>
                    <section className="more" onClick={this.dropdownToggle}>
                        <Icon type="bars" style={{ fontSize: 30, color: "#fff" }} />
                    </section>
                </div>
                {
                    <div className="dropdown" style={{ height: this.state.dropdownShow ? 70 + "px" : 0 }}>
                        {nav.map(item => {
                            let { id, title, link } = item;
                            return (
                                <a
                                    href={`#${link}`}
                                    className={currentId === id ? "active navLink" : "navLink"}
                                    key={id}>
                                    {title}
                                </a>
                            );
                        })}
                    </div>
                }
            </div>
        );
    }
}

/**
 * 轮播部分
 */
class Section1 extends Component {
    render() {
        return (
            <div id="section1">
                <Carousel autoplay effect="fade">
                    {bg.map((item, index) => {
                        let libg = {
                            backgroundImage: "url(" + item + ")",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        };
                        return <li className="li" key={index} style={libg} />;
                    })}
                </Carousel>
                <div className="info">
                    <p className="p1">hellow,i'm liuzuan</p>
                    <p className="p2">一枚热爱coding的前端工程师</p>
                    <div className="button">
                        <a href="#section2">About Me</a>
                        <a href="http://github.com/liuzuan" target="blank">
                            My GitHub
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 关于我
 */
class Section2 extends Component {
    state = {};
    render() {
        return (
            <div id="section2" className="panel">
                <div className="content">
                    <h1>关于我</h1>
                    <div className="main">
                        <div className="avatar">
                            <img src={avatar} alt="" />
                        </div>
                        <p>
                            刘祖安，23岁，坐标北京，前端工程师一枚，热爱写代码。重度互联网用户，喜欢逛论坛。<br />
                        </p>
                        <p>
                            无聊时喜欢各种瞎捣鼓，学习路漫漫，志同道合的朋友可以加我，一起成长。我的QQ：467209099，我的微信：lza1-1。
                            <a
                                target="blank"
                                href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=C2difnF_amVLfWJ7JXp6JWhkZg">
                                <img
                                    src="http://rescdn.qqmail.com/zh_CN/htmledition/images/function/qm_open/ico_mailme_01.png"
                                    alt="mail"
                                />
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 求职意向
 */
class Section3 extends Component {
    state = {
        joblist: ["pc端", "移动Web", "微信小程序", "SPA"]
    };
    render() {
        return (
            <div id="section3" className="backgroundPanel panel">
                <div className="content">
                    <h1>求职意向</h1>
                    <div className="main">
                        {this.state.joblist.map((title, index) => (
                            <div key={index} className="cell">
                                {title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 项目作品
 */
class Section4 extends Component {
    state = {
        artList: [
            {
                title: "CNode社区",
                text: "react全家桶实现移动端CNode社区",
                img: art1,
                link: "http://liuzuann.com/react-cnode"
            },
            {
                title: "轮播插件",
                text: "jQuery实现3D轮播插件",
                img: art2,
                link: "http://liuzuann.com/jQuery-3D-slider"
            },
            { title: "知乎日报", text: "", img: art3, link: "" },
            {
                title: "数据监测平台",
                text: "利用Ajax技术完成扫描二维码从而实现登录、注册",
                img: art4,
                link: "http://admonitor.travel-x.cc"
            },
            {
                title: "Note",
                text: "我的个人笔记",
                img: art5,
                link: "http://liuzuann.com/note"
            },
            {
                title: "Travel",
                text: "完成首页城市数据相关页面的数据展示",
                img: art6,
                link: "http://datamine.travel-x.cc"
            }
        ]
    };
    render() {
        return (
            <div id="section4" className="panel">
                <div className="content">
                    <h1>项目作品</h1>
                    <section className="main">
                        {this.state.artList.map((item, index) => {
                            let { title, img, text, link } = item;
                            return (
                                <div className="artBox" key={index}>
                                    <img src={img} alt="" />
                                    <a href={link} target="blank" className="coverBox">
                                        <div className="coverContent">
                                            <section>
                                                <p className="title">{title}</p>
                                                <p className="text">{text}</p>
                                            </section>
                                        </div>
                                    </a>
                                </div>
                            );
                        })}
                    </section>
                </div>
            </div>
        );
    }
}

/**
 * 技术掌握
 */
class Section5 extends Component {
    state = {
        progress: [
            { titile: "HTML", percent: 90 },
            { titile: "CSS", percent: 90 },
            { titile: "javaScript", percent: 85 },
            { titile: "Nodejs", percent: 85 },
            { titile: "Vue、React", percent: 70 },
            { titile: "PHP", percent: 10 },
            { titile: "Nginx", percent: 10 },
            { titile: "Mysql", percent: 10 }
        ]
    };
    render() {
        return (
            <div id="section5" className="backgroundPanel panel">
                <div className="content">
                    <h1>技术掌握</h1>
                    <div className="main">
                        <section className="container">
                            {this.state.progress.map((item, index) => {
                                // let { percent } = item
                                return (
                                    // <Progress key={index} percent={percent} type="circle" />
                                    <div key={index} />
                                );
                            })}
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 我的经历
 */
class Section6 extends Component {
    render() {
        return (
            <div id="section6" className="panel">
                <div className="content">
                    <h1>我的经历</h1>
                    <div className="main">
                        <section className="container">
                            <Timeline>
                                <Timeline.Item color="orange">
                                    2018.4始 &nbsp;&nbsp;<ins>北京美丽屋资产管理有限公司</ins>
                                </Timeline.Item>
                                <Timeline.Item color="orange">
                                    2016.8-2018.2 &nbsp;&nbsp;<ins>北京融创普达传媒有限公司</ins>
                                </Timeline.Item>
                                <Timeline.Item color="orange">
                                    2012.9-2016.7 &nbsp;&nbsp;<ins>浙江经济管理职工大学/计算机系</ins>
                                </Timeline.Item>
                            </Timeline>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
