import React, { useEffect, useState } from "react";
import { Link} from 'react-router-dom';
import axios from 'axios';
import './index.scss';

const Home = () => {
  let [data, setdata] = useState([])  

  useEffect(() => {
    getData('https://express-mongo-api-backend.herokuapp.com/api/v2/product') 
  },[])
  console.log(data);
  const getData = async (url)=> {
    const response = await axios.get(url);
    setdata(response.data)
  }

  const deleteItem = async(id) => {
    const konfirmasi =  window.confirm('yang bener?')
    if (konfirmasi) {
      try {
        await axios.delete(`https://express-mongo-api-backend.herokuapp.com/api/v2/product/${id}`)
        getData('https://express-mongo-api-backend.herokuapp.com/api/v2/product')

      } catch(e) {
        console.log(e);
      }
    }
  }

  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..."/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {
          data.map((data,index)=>(
            <tr key={data._id}>
            <td>{index+1}</td>
            <td>{data.name}</td>
            <td className="text-right">RP.{data.price}</td>
            <td className="text-center">
              <Link to={`/detail/${data._id}`} className="btn btn-sm btn-info">Detail</Link>
              <Link to={`/edit/${data._id}`} className="btn btn-sm btn-warning">Edit</Link>
              <button to="#" onClick={ () => deleteItem(data._id)} className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
          ))
        }
         
        </tbody>
      </table>
    </div>
  )
}

export default Home;