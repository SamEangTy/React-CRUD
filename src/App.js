import { useState } from 'react';
import './App.css';
import {Button, Input, Radio, Space, Table, } from 'antd'
import Column from 'antd/es/table/Column';
import Search from 'antd/es/transfer/search';
function App() {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [tel, setTel] = useState("")
  const [gender, setGender] = useState(1)
  const [id, setId] = useState(1)
  const [isUpdate, setIsUpdate] = useState(false)
  const [textSearch, setTextSearch] = useState("")
  const [user, setUser] = useState([])
  // console.log(textSearch);
  const handleSubmit = ()=>{
    setId(id+1)
    if(isUpdate){
        user.map((item,index)=>{
          if(item.id == id){
            user[index].id = id
            user[index].firstname = firstname
            user[index].lastname = lastname
            user[index].gender = gender
            user[index].email = email
            user[index].tel = tel
          }
        })
        setUser([...user])
    }else{
      var dataUser = {
        'id':id,
        'firstname':firstname,
        'lastname':lastname,
        'email':email,
        'tel':tel,
        'gender':gender,
      }
      user.push(dataUser)
      setUser([...user])
    }
    handleClear()
    setIsUpdate(false)
    // var form = new FormData()
    // form.append("id",id)
    // form.append("firstname",firstname)
    // form.append("lastname",lastname)
    // form.append("gender",gender)
    // form.append("email",email)
    // form.append("tel",tel)
  }
  const handleClear = ()=>{
    setId(id+1)
    setFirstname("")
    setLastname("")
    setEmail("")
    setTel("")
    setGender(1)

  }
  const handleEdit = (paramItem)=>{
    console.log(paramItem);
    setFirstname(paramItem.firstname)
    setLastname(paramItem.lastname)
    setEmail(paramItem.email)
    setTel(paramItem.tel)
    setId(paramItem.id)
    setIsUpdate(true)
  }
  const handleDelete = (paramItem)=>{
    var userTmp = user.filter((item)=>item.id !== paramItem)
    setUser([...userTmp])
  }
  return (
    <div className="app">
      <h2>React CRUD</h2>
      <div className="user">
        <h2>Users</h2>
        <div className='input'>
        <Input value={id} disabled onChange={(e)=>setId(e.target.value)} placeholder='Input ID'style={{padding:"20px",margin:10}}/>
        <Input value={firstname} onChange={(e)=>setFirstname(e.target.value)} placeholder='Input firstname'style={{padding:"20px",margin:10}}/>
        <Input value={lastname} onChange={(e)=>setLastname(e.target.value)} placeholder='Input lastname'style={{padding:"20px",margin:10}}/>
        <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Input email'style={{padding:"20px",margin:10}}/>
        <Input value={tel} onChange={(e)=>setTel(e.target.value)} placeholder='Input tel'style={{padding:"20px",margin:10}}/>
        <Radio.Group value={gender} onChange={(e)=>setGender(e.target.value)} defaultValue={gender} style={{padding:"20px",margin:10}}> 
          <Radio value={1}>Male</Radio>
          <Radio value={0}>Female</Radio>
        </Radio.Group>
        <Button type='primary' className='btn'
        onClick={handleSubmit}
        >{isUpdate ? "Update" : "Add"}
        </Button>
        {/* <Button danger className='btn'
        onClick={handleClear}
        >Clear
        </Button> */}
        </div>
        <div className='datauser'>
          <h2>Data Users</h2>
          <Search
            onChange={(e)=>setTextSearch(e.target.value)}
            style={{padding:10}}
          />
          <Table
            dataSource={user}
            rowKey="id"
            columns={[
              {
                title:"No",
                dataIndex:"id",
              },
              {
                title: "Firstname",
                dataIndex: "firstname",
                key: "fistname",
                filteredValue:[textSearch],
                onFilter: (value,record)=>{
                  return(
                   String(record.firstname).toLowerCase().includes(value.toLowerCase())||
                   String(record.lastname).toLowerCase().includes(value.toLowerCase())
                )}
              },
              {
                title:"Lastname",
                dataIndex:"lastname",
              },
              {
                title:"Gender",
                dataIndex:"gender",
                render:(value)=> value == 1 ? "Male" : "Female"
              },
              {
                title:"Email",
                dataIndex:"email",
              },
              {
                title:"Tel",
                dataIndex:"tel",
              },
              {
                title:"Action",
                render:(record)=><Space>
                  <Button type='primary' size="small" onClick={()=>handleEdit(record)}>Update</Button>  
                  <Button danger size="small" onClick={()=>handleDelete(record.id)}>Delete</Button>  
                </Space>
              },
            ]}
          >
            
             {/* <Column title="No"  dataIndex="id" key="id"  />
             <Column 
             title="First Name"
             dataIndex="firstname"
             key="firstname" 
             defaultValue={textSearch}
             onFilter={(value,record)=>{
              return String(record.firstname).toLowerCase().includes(value.toLowerCase())
             }}
             />
             <Column title="Last Name" dataIndex="lastname" key="lastname" />
             <Column title="Gender" dataIndex="gender" key="gender" render={(value)=>(value === 1 ? "Male" : "Female" )} />
             <Column title="Email" dataIndex="email" key="email" />
             <Column title="Tel" dataIndex="tel" key="tel" />      
             <Column title="Action" render={(value,record) => 
             <Space>
                <Button type='primary' size="small" onClick={()=>handleEdit(record)}>Update</Button>  
                <Button danger size="small" onClick={()=>handleDelete(record.id)}>Delete</Button>  
             </Space>
            } 
             />       */}
 
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;
