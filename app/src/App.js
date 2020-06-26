import React, { Component } from 'react';
import './App.css';


class Student extends Component {
  constructor(props) {
    super(props);

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onEdit(e) {
    e.preventDefault();
    this.props.onEdit();
  }

  onDelete(e) {
    e.preventDefault();
    this.props.onDelete();
  }

  render() {
    console.log("Student Render");
    return (
      <div className="Student">
          <h4>{this.props.data.name}</h4>
          <li>Age: {this.props.data.age}</li>
          <li>GPA: {this.props.data.gpa}</li>

          <input
            type="button"
            value="Edit"
            onClick={this.onEdit}
          />

          <input
              type="button"
              value="Delete"
              onClick={this.onDelete}
          />
      </div>
    );
  }
}

class StudentCreateForm extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(e.target.name.value, e.target.age.value, e.target.gpa.value, e.target.category.value);
  }

  render() {
    console.log("StudentCreateForm render");
    return (
      <div className="CreateStudent">
        <h1>Add Student</h1>
        <form
          action=""
          method="post"
          onSubmit={this.onSubmit}
        >
          <p>
            <input
              type="text"
              name="name"
              placeholder="Name"
            />
          </p>
          <p>
            <input
              type="number"
              name="age"
              placeholder="Age"
            />
          </p>
          <p>
            <input
              type="number"
              name="gpa" 
              placeholder="GPA"
              step="0.1" 
            />
          </p>

          <label>Choose a category: </label>
          <select
            name="category"
            defaultValue={this.props.current_category.toLocaleLowerCase()}
          >
            <option value="unknown">Unknown</option>
            <option value="person">Person</option>
            <option value="animal">Animal</option>
          </select>

          <p>
            <input
              type="submit"
              value="Add"
            />
          </p>
        </form>
      </div>
    );
  }
}

class StudentEditForm extends Component {
  render() {
      return (
          <div className="StudentEditForm">
              <h4>Edit</h4>
              <form
                  action=""
                  method="put"
                  onSubmit={function(e) {
                      e.preventDefault();
                      this.props.onSubmit(
                          {
                              name: e.target.name.value, 
                              age: e.target.age.value,
                              gpa: e.target.gpa.value,
                              category: e.target.category.value
                          }
                      );
                  }.bind(this)}>

                  <p><input type="text" name="name" placeholder="Name" defaultValue={this.props.data.name}></input></p>
                  <p><input type="number" name="age" placeholder="Age" defaultValue={this.props.data.age}></input></p>
                  <p><input type="number" step="0.1" name="gpa" placeholder="GPA" defaultValue={this.props.data.gpa}></input></p>

                  <label>Choose a category: </label>
                  <select name="category" defaultValue={this.props.data.category}>
                      <option value="unknown">Unknown</option>
                      <option value="person">Person</option>
                      <option value="animal">Animal</option>
                  </select>

                  <p>
                      <input type="submit" value="Edit"></input>
                      <input
                          type="button"
                          value="Cancel"
                          onClick={function(e) {
                              e.preventDefault();
                              this.props.onCancel("read");
                          }.bind(this)}>
                      </input>
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
        var result = (<li>No Data</li>);
        const data_list = this.state.student_list;

        if (data_list.length !== 0) {
            if (this.state.category === this.ALL) {
                result = (data_list.map(data => (
                    <li key={data.id}>
                        <a
                            href={"./" + data.id}
                            onClick={function(e) {
                                e.preventDefault();
                                this.setState({
                                    mode: "read",
                                    selected_id: data.id,
                                });
                            }.bind(this)}>
                        {data.name}
                        </a>
                    </li>))
                );
            } else {
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
            }
        }

        return result;
    };


    getSelectedData() {
      return this.state.student_list.find(data => (
        data.id === this.state.selected_id
      ));
    }

    renderContent = () => {
        if (this.state.mode === "read" &&
            this.state.selected_id !== 0) {
          return (
            <Student
              // data={this.state.student_list.find(data => (
              //   data.id === this.state.selected_id
              // ))}
              data={this.getSelectedData()}
              onEdit={function() {
                this.setState({
                  mode: "edit",
                });
              }.bind(this)}
              onDelete={function() {
                  if (window.confirm("Are you sure you want to remove the student?")) {
                    var modified_student_list = Array.from(this.state.student_list);
                      for (let i = 0; i < modified_student_list.length; i++) {
                          if (modified_student_list[i].id === this.state.selected_id) {
                              modified_student_list.splice(i, 1);
                              break;
                          }
                      }

                      this.setState({
                          mode: "read",
                          student_list: modified_student_list,
                          selected_id: 0,
                      });
                  }
              }.bind(this)}>
            </Student>
          );
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
        } else if (this.state.mode === "edit") {
            return (<StudentEditForm data={this.state.student_list.find(data => data.id === this.state.selected_id)}
                                     onCancel={function (mode) {
                                         this.setState({
                                             mode: mode,
                                         });
                                     }.bind(this)}
                                     onSubmit={function (newData) {
                                         var modified_student_list = Array.from(this.state.student_list)
                                         for (let i = 0; i < modified_student_list.length; i++) {
                                             if (modified_student_list[i].id === this.state.selected_id) {
                                                 modified_student_list[i].name = newData.name;
                                                 modified_student_list[i].age = newData.age;
                                                 modified_student_list[i].gpa = newData.gpa;
                                                 modified_student_list[i].category = newData.category;
                                                 break;
                                             }
                                         }
                                         this.setState({
                                             mode: "read",
                                             student_list: modified_student_list,
                                         });
                                     }.bind(this)}></StudentEditForm>);
        }
    }

    render() {
        console.log("BBS Render");
        return (
            <div className="BBS">
                <nav>
                    <ul>
                        <li><a
                            href="/"
                            onClick={function (e) {
                                e.preventDefault();

                                this.setState({
                                    mode: "read",
                                    selected_id: 0,
                                    category: this.ALL,
                                });
                            }.bind(this)}>{this.ALL}
                        </a></li>

                        <li><a
                            href="/person/"
                            onClick={function (e) {
                                e.preventDefault();

                                this.setState({
                                    mode: "read",
                                    selected_id: 0,
                                    category: this.PERSON,
                                });
                            }.bind(this)}>{this.PERSON}
                        </a></li>

                        <li><a
                            href="/animal/"
                            onClick={function (e) {
                                e.preventDefault();

                                this.setState({
                                    mode: "read",
                                    selected_id: 0,
                                    category: this.ANIMAL,
                                });
                            }.bind(this)}>{this.ANIMAL}
                        </a></li>
                    </ul>
                </nav>

                <h2>{this.state.category}</h2>

                <nav>
                    <ul>
                        {this.renderDataList()}
                    </ul>
                </nav>

                <input
                    type="button"
                    value="Create"
                    onClick={function (e) {
                        e.preventDefault();
                        this.setState({
                            mode: "create",
                        });
                    }.bind(this)}>
                </input>

                {this.renderContent()}
            </div>
        );
    }
}

function App() {
  console.log("App Render");
  return (
    <div className="App">
      <header>
        <h1>Django-React Demo</h1>
      </header>

      <BBS />
    </div>
  );
}

// class App extends Component {
//     render() {
//         console.log("App Render");
//         return (
//             <div className="App">
//                 <header><h1>Django-React Demo</h1></header>
//                 <BBS></BBS>
//             </div>
//         );
//     }
// }

export default App;
