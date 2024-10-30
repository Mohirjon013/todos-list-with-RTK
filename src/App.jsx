
import { Button, Input, Modal } from 'antd'
import './App.css'
import { useAddProductsMutation, useDeleteProductsMutation, useGetAllProductsQuery, useUpdateProductsMutation } from './store/productsApi'
import { useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import CustomModal from './components/CustomModal'

function App() {

  // Agar Request GET => query
  // Agar Request POST, PUT, DELETE => mutation

  // Query => {}
  // Mutation => []
  const {data = []} = useGetAllProductsQuery()
  const [saveProducts] = useAddProductsMutation()
  const [deleteTodo] = useDeleteProductsMutation()
  const [updateTodos] = useUpdateProductsMutation()


  const [todoValue, setTododValue] = useState("")
  const [modalIs, setModalIs] = useState(false)

  const [newTodoValue, setNewTodoValue] = useState("")
  const [editTodoId, setEditTodoId] = useState(null)



  function handleSubmit(e){
    e.preventDefault()
    const data ={
      title:todoValue
    }
    saveProducts(data)
    setTododValue("")
  }

  function handleEditClick(id){
    setModalIs(true)
    setEditTodoId(id)
    const updateTodo = data.find(item => item.id === id)
    setNewTodoValue(updateTodo.title)
    // console.log(newTodoValue);
    
  }
  function handleEditModal(e){
    e.preventDefault()
    updateTodos({ id: editTodoId, updateValue: { title: newTodoValue } })
    console.log(updateTodos.title);
    
    setModalIs(false)
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='w-[450px] mx-auto mt-5 flex gap-2' autoComplete='off' >
        <Input value={todoValue} onChange={(e) => setTododValue(e.target.value)} className='w-full' size='large'/>
        <Button className='' htmlType='submit' type='primary' size='large'>Submit</Button>
      </form>

      <ul className='p-5  w-[400px] mx-auto mt-3   space-y-2'>
        {data.map(item => (
          <li  className='font-bold text-[17px] bg-slate-300 p-3 rounded-md flex justify-between' key={item.id} >
            {item.title}
            <div className=" flex gap-5 mr-3">
              <button onClick={() => deleteTodo(item.id)} className='text-red-500 scale-[1.3] hover:scale-[1.8] duration-300'>
                <DeleteOutlined />
              </button>
              <button onClick={() => handleEditClick(item.id)} className='text-green-500 scale-[1.3] hover:scale-[1.8] duration-300'>
                <EditOutlined />  
              </button>
            </div>
          </li>
        ))}
      </ul>

      <CustomModal openModal={modalIs} setOpenModal={setModalIs}>
        <form onSubmit={handleEditModal} autoComplete='off' className="flex items-center gap-2 justify-between">
          <Input value={newTodoValue} onChange={(e) => setNewTodoValue(e.target.value)} name='todo' className='w-[80%]' size='large' allowClear />
          <Button className='w-[20%]' htmlType='submit' type='primary' size='large'>Edit</Button>
        </form>
      </CustomModal>
    </>
  )
}

export default App
