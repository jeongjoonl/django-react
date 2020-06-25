import React, { Component } from 'react';
import './App.css';

class Content extends Component {
    renderField = (data) => {
        if (data) {
            return (
                <div>
                    <li>Name: {data.name}</li>
                    <li>Age: {data.age}</li>
                    <li>GPA: {data.gpa}</li>
                </div>
            );
        }
    };

    render() {
        console.log("Content Render");
        return (
            <div className="Content">
                {this.renderField(this.props.data)}
            </div>
        );
    }
}

class BBS extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected_id: 0,
        }
    }

    renderDataList = () => {
        const data_list = this.props.data_list;

        if (data_list.length === 0) {
            return (<li>No Data</li>);
        }

        return data_list.map(data => (
            <li key={data.id}><a href={"./" + data.id} onClick={function(e) {
                e.preventDefault();
                this.setState({
                    selected_id: data.id,
                });
            }.bind(this)}>{data.name}</a></li>
        ));
    };

    getData = (selected_id) => {
        return this.props.data_list.find(data => data.id === selected_id);
    }

    render() {
        console.log("BBS Render");
        return (
            <div className="BBS">
                <h2>{this.props.category}</h2>

                <nav>
                    <ul>
                        {this.renderDataList()}
                    </ul>
                </nav>

                <Content data={this.getData(this.state.selected_id)}></Content>
            </div>
        );
    }
}

class App extends Component {
    ALL = 'All Student';
    PERSON = 'Person';
    ANIMAL = 'Animal';

    mock_student_data = [
        {
            "id": 1,
            "name": "Bob",
            "age": 3,
            "gpa": 3.0,
            "category": this.PERSON,
        },
        {
            "id": 2,
            "name": "Moon",
            "age": 10,
            "gpa": 4.0,
            "category": this.ANIMAL,
        },
        {
            "id": 3,
            "name": "Star",
            "age": 7,
            "gpa": 4.0,
            "category": this.ANIMAL,
        },
        {
            "id": 10,
            "name": "Joon",
            "age": 27,
            "gpa": 0,
            "category": this.PERSON,
        },
        {
            "id": 11,
            "name": "Toto",
            "age": 5,
            "gpa": 4.0,
            "category": this.ANIMAL,
        },
        {
            "id": 12,
            "name": "Lee",
            "age": 25,
            "gpa": 3.8,
            "category": this.PERSON,
        },
        {
            "id": 13,
            "name": "Dangdangee",
            "age": 3,
            "gpa": 2.5,
            "category": this.ANIMAL,
        },
    ]

    constructor(props) {
        super(props);

        this.state = {
            bbs_category: this.ALL,
            bbs_data: this.mock_student_data,
        }
    }

    render() {
        console.log("App Render");
        return (
            <div className="App">
                <header><h1>Django-React Demo</h1></header>
                <nav>
                    <ul>
                        <li><a href="/" onClick={function(e) {
                            e.preventDefault();
                            this.setState({
                                bbs_category: this.ALL,
                                bbs_data: this.mock_student_data,
                            });
                        }.bind(this)}>{this.ALL}</a></li>

                        <li><a href="/person/" onClick={function(e) {
                            e.preventDefault();
                            this.setState({
                                bbs_category: this.PERSON,
                                bbs_data: this.mock_student_data.filter(data => data.category === this.PERSON),
                            });
                        }.bind(this)}>{this.PERSON}</a></li>

                        <li><a href="/animal/" onClick={function(e) {
                            e.preventDefault();
                            this.setState({
                                bbs_category: this.ANIMAL,
                                bbs_data: this.mock_student_data.filter(data => data.category === this.ANIMAL),
                            });
                        }.bind(this)}>{this.ANIMAL}</a></li>
                    </ul>
                </nav>
                <BBS category={this.state.bbs_category} data_list={this.state.bbs_data}></BBS>
            </div>
        );
    }
}

export default App;
