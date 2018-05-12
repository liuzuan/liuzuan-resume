import React, { Component } from "react";
import { Avatar, Pagination } from "antd";
import axios from "axios";

/**
 * 模块入口
 * 留言板
 */
class Main extends Component {
    state = {
        data: [],
        curPage: 1,
        pageSize: 4,
        total: 0
    };
    formatTime = () => {
        let date = new Date();
        let Y = date.getFullYear() + "-";
        let M = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}-` : `${date.getMonth() + 1}-`;
        let D = date.getDate() + 1 < 10 ? `0${date.getDate() + 1}` : `${date.getDate() + 1}`;
        return Y + M + D;
    };

    getdata = async page => {
        page = page ? page : this.state.curPage;
        let res = await axios.get(`http://localhost:3000/resume/message?page=${page}&pageSize=${this.state.pageSize}`);
        if (res && res.status === 200) {
            this.setState({
                data: res.data.data.reverse(),
                total: res.data.statistic.count
            });
            console.log(res.data);
        }
    };
    pageChangeHandle = page => {
        this.getdata(page);
    };
    submit = async () => {
        let params = {
            username: this.refs.userName.value,
            message: this.refs.message.value,
            time: this.formatTime()
        };
        if (params.username) {
            let res = await axios.post("http://localhost:3000/resume/message", params);
            if (res && res.status === 200) {
                this.refs.userName.value = "";
                this.refs.message.value = "";
                this.getdata();
            }
            console.log(res);
        }
    };
    deleteHandle = async id => {
        let res = await axios.delete(`http://localhost:3000/resume/message?_id=${id}`);
        if (res && res.status === 200) {
            this.getdata();
        }
    };
    componentDidMount() {
        this.getdata();
    }

    render() {
        let { data } = this.state;
        return (
            <div id="section7" className="backgroundPanel">
                <div className="wrap7  panel">
                    <div className="content">
                        <h1>给我留言</h1>
                        <div className="main">
                            <section className="messageBox">
                                <input ref="userName" className="userName" type="text" placeholder="姓名" />
                                <textarea ref="message" className="message" placeholder="留言板" />
                                <button onClick={this.submit}>提交</button>
                            </section>
                            <section className="messageLists">
                                {data &&
                                    data.map((item, index) => (
                                        <Message
                                            key={item._id}
                                            data={item}
                                            deleteHandle={this.deleteHandle}
                                            id={data.length - index}
                                        />
                                    ))}
                            </section>
                            <section className="page">
                                <Pagination
                                    simple
                                    defaultPageSize={this.state.pageSize}
                                    defaultCurrent={this.state.curPage}
                                    total={this.state.total}
                                    onChange={this.pageChangeHandle}
                                />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 留言展示
 */
class Message extends Component {
    render() {
        let { data, id, deleteHandle } = this.props;
        let { message, username, time, _id } = data;
        return (
            <div className="messagePanel">
                {data._id && (
                    <section>
                        <div className="user">
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <span className="name">{username}</span>
                            <span className="floor">-{id}楼-</span>
                            <span className="time">{time}</span>
                        </div>
                        <div className="message">{message}</div>
                        <span className="del_message" onClick={() => deleteHandle(_id)}>
                            删除
                        </span>
                    </section>
                )}
            </div>
        );
    }
}

export default Main;
