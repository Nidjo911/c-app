import React from "react";
import { useEffect, useState } from "react";
import App from '../../App.js';
import './Home.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      /* 3000 == 3 seconds */
      await new Promise((r) => setTimeout(r, 1500));
      setLoading((loading) => !loading);
      
    };

    loadData(); /* pokrece asinkronu funkciju za loading */
  }, [])

  if (loading) {

    return (
      < div className="center" >
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div >
    )
  }
  else {
    return (
      < App />
    )
  }
}

export default Home;