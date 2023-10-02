import logo from './logo.svg';
import './App.css';
import {useEffect , useState} from 'react';
import Homepage from './components/Homepage';

function App() {

  // useEffect(()=>{
  //   fetch('/knowitall')
  //   .then((res)=>{
  //     res.text()
  //     .then(data=>{
  //       console.log(data)
  //     })
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // },[]);
  

  return (
    <div className="App">
      <Homepage/>
    </div>
  );
}

export default App;
