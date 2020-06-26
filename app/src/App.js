import React, { Component } from 'react';
import './App.css';

class Student extends Component {
    renderField = (data) => {
        if (data) {
            return (
                <div>
                    <h4>{data.name}</h4>
                    <li>Age: {data.age}</li>
                    <li>GPA: {data.gpa}</li>

                    <input type="button" value="Edit"></input>
                    <input type="button" value="Delete"></input>
                </div>
            );
        }
    };

    render() {
        console.log("Student Render");
        return (
            <div className="Student">
                {this.renderField(this.props.data)}
            </div>
        );
    }
}

class StudentCreateForm extends Component {
    render() {
        console.log(this.props.current_category.toLocaleLowerCase())
        console.log("StudentCreateForm render");
        return (
            <div className="CreateStudent">
                <h1>Add Student</h1>
                <form
                    action=""
                    method="post"
                    onSubmit={function(e) {
                        e.preventDefault();
                        this.props.onSubmit(e.target.name.value, e.target.age.value, e.target.gpa.value);
                     }.bind(this)}>

                    <p><input type="text" name="name" placeholder="Name"></input></p>
                    <p><input type="number" name="age" placeholder="Age"></input></p>
                    <p><input type="number" step="0.1" name="gpa" placeholder="GPA"></input></p>

                    <label>Choose a category: </label>
                    <select name="categories" defaultValue={this.props.current_category.toLocaleLowerCase()}>
                        <option value="unknown">Unknown</option>
                        <option value="person">Person</option>
                        <option value="animal">Animal</option>
                    </select>

                    <p>
                        <input  type="submit"></input>
                    </p>
                </form>
            </div>
        );
    }
}

class BBS extends Component {
    ALL = 'Home';
    PERSON = 'Person';
    ANIMAL = 'Animal';

    mock_student_data = [
        {
            "id": 1,
            "name": "Bob",
            "age": 3,
            "gpa": 3.0,
            "category": "person",
        },
        {
            "id": 2,
            "name": "Moon",
            "age": 10,
            "gpa": 4.0,
            "category": "animal",
        },
        {
            "id": 3,
            "name": "Star",
            "age": 7,
            "gpa": 4.0,
            "category": "animal",
        },
        {
            "id": 10,
            "name": "Joon",
            "age": 27,
            "gpa": 0,
            "category": "person"
        },
        {
            "id": 11,
            "name": "Toto",
            "age": 5,
            "gpa": 4.0,
            "category": "animal",
        },
        {
            "id": 12,
            "name": "Lee",
            "age": 25,
            "gpa": 3.8,
            "category": "person",
        },
        {
            "id": 13,
            "name": "Dangdangee",
            "age": 3,
            "gpa": 2.5,
            "category": "animal",
        },
        {
            "id": 15,
            "name": "ET",
            "age": 9999999,
            "gpa": 9999999,
            "category": "unknow",
        },
    ]

    constructor(props) {
        super(props);

        this.max_content_id = 15;

        this.state = {
            mode: "read",
            student_list: this.mock_student_data,
            selected_id: 0,
            category: this.ALL,
        }
    }

    renderDataList = () => {
        const data_list = this.state.student_list;

        if (data_list.length === 0) {
            return (<li>No Data</li>);
        }

        if (this.state.category === "Home") {
            return data_list.map(data => (
                <li key={data.id}><a href={"./" + data.id} onClick={function(e) {
                e.preventDefault();
                this.setState({
                    mode: "read",
                    selected_id: data.id,
                });
            }.bind(this)}>{data.name}</a></li>));
        }

        return data_list.filter(data => data.category.toLocaleLowerCase() === this.state.category.toLocaleLowerCase())
                        .map(data => (
                            <li key={data.id}><a href={"./" + data.id} onClick={function(e) {
                            e.preventDefault();
                            this.setState({
                                mode: "read",
                                selected_id: data.id,
                        });
            }.bind(this)}>{data.name}</a></li>
        ));
    };

    renderContent = () => {
        if (this.state.mode === "read") {
            return (<Student mode={this.state.mode} data={this.state.student_list.find(data => data.id === this.state.selected_id)}></Student>);
        } else if (this.state.mode === "create") {
            return (<StudentCreateForm current_category={this.state.category} onSubmit={function(name, age, gpa, category) {
                this.max_content_id += 1;
                this.setState({
                    mode: "read",
                    student_list: this.state.student_list.concat({
                        id: this.max_content_id,
                        name: name,
                        age: age,
                        gpa: gpa,
                        category: category,
                    }),
                    selected_id: this.max_content_id,
                });
            }.bind(this)}></StudentCreateForm>);
        }
    }

    render() {
        console.log("BBS Render");
        return (
            <div className="BBS">
                <nav>
                    <ul>
                        <li><a href="/" onClick={function(e) {
                            e.preventDefault();
                            this.setState({
                                mode: "read",
                                selected_id: 0,
                                category: this.ALL,
                            });
                        }.bind(this)}>{this.ALL}</a></li>

                        <li><a href="/person/" onClick={function(e) {
                            e.preventDefault();
                            this.setState({
                                mode: "read",
                                selected_id: 0,
                                category: this.PERSON,
                            });
                        }.bind(this)}>{this.PERSON}</a></li>

                        <li><a href="/animal/" onClick={function(e) {
                            e.preventDefault();
                            this.setState({
                                mode: "read",
                                selected_id: 0,
                                category: this.ANIMAL,
                            });
                        }.bind(this)}>{this.ANIMAL}</a></li>
                    </ul>
                </nav>

                <h2>{this.state.category}</h2>

                <nav>
                    <ul>
                        {this.renderDataList()}
                    </ul>
                </nav>

                <input type="button" value="Create" onClick={function(e){
                    e.preventDefault();
                    this.setState({
                        mode: "create",
                    });
                }.bind(this)}></input>

                {this.renderContent()}
            </div>
        );
    }
}

class App extends Component {
    render() {
        console.log("App Render");
        return (
            <div className="App">
                <header><h1>Django-React Demo</h1></header>
                <BBS></BBS>
            </div>
        );
    }
}

export default App;
