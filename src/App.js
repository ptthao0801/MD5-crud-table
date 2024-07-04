import React, { Component } from 'react';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentList: [
                {name: 'Alice', phone: '1234567890', email: 'alice@example.com' },
                {name: 'Bob', phone: '4567890123', email: 'bob@example.com' },
                {name: 'Charlie', phone: '7890123456', email: 'charlie@example.com' }
            ],
            student: { name: '', phone: '', email: '' },
            isValid: false,
            indexSelected: -1,
            submmitted: false
        }
    }

    handleInputChange = (e) => { //đây là đã lưu luôn những thay đổi của student vào state rồi
        this.setState((state) => {
            const { student } = state
            student[e.target.name] = e.target.value
            return { student }
        },
            () => this.checkValidation()
        )
    }
    checkValidation = () => {
        const { name, phone, email } = this.state.student
        const value = name && phone && email
        this.setState(
            { isValid: value }
        )
    }

    selectStudentToEdit = (index) => { //mục đích: thay đổi indexSelected
        this.setState({
            student: { ...this.state.studentList[index] }, // tạo bản sao của sinh viên đó 
            indexSelected: index, 
            isValid: true 
        });
    };

    handleSubmit = () => {
        if (this.state.isValid) {
            const newList = [...this.state.studentList]
            if (this.state.indexSelected > -1) { //tức user đang có select 1 student
                newList.splice(this.state.indexSelected, 1, this.state.student) // Cập nhật lại student ở vị trí indexSelected (được xác định trong handleStudentToEdit) = student mới input ở handleInputChange
            } else {
                newList.push(this.state.student)
            }
            this.setState({ //  cập nhật lại giá trị mới cho studentList, giá trị mặc định cho form, isValid và indexSelected
                studentList: newList,
                student: { name: '', phone: '', email: '' },
                isValid: false,
                indexSelected: -1,
                submitted: true
            })
        }
    }

    handleDelete = (index) => {
        const newList = this.state.studentList
        newList.splice(index, 1)
        this.setState({
            studentList: newList
        })
    }

    render() {
        const { studentList, student, submmitted, isValid } = this.state
        return (
            <div>
                <div>
                    <h1>Student List</h1>
                    <div>
                        <label>Name: </label>
                        <input name="name" value={student.name} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label>Phone: </label>
                        <input type="number" name="phone" value={student.phone} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input name="email" value={student.email} onChange={this.handleInputChange} />
                    </div>
                    <button onClick={() => this.handleSubmit()}>Submit</button>
                    <table>
                        <thead>
                            <tr>
                                {/* Tạo Table header Name, Phone, Email, Action */}
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Sử dụng phương thức map() để in danh sách student
                    Tạo button Edit với onClick gọi tới hàm handleSelect
                    Tạo button Delete với onClick gọi tới hàm handleDelete
                */ }
                            {studentList.map((student, index) => (
                                <tr>
                                    <td>{student.name}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <button onClick={() => this.selectStudentToEdit(index)}>Edit</button>
                                        <button onClick={() => this.handleDelete(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default App;
