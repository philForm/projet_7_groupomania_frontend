import { useEffect, useState } from "react";
import axios from "axios";

import PostCreate from "../PostCreate";
import Posts from "../Posts";

import "./posts.css"

/**
 * Création et listage de tous les posts :
 */
function Home() {

  const [data, setData] = useState([]);

  /**
   * Récupère tous les posts de la BDD
   */
  const fetchData = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_URL_API}api/post`);
      // Le résultat est assigné à data du useState
      setData(result.data);
    }
    catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data)

  return (
    <div className="App">
      <PostCreate fetchData={fetchData} />
      <Posts data={data} fetchData={fetchData} />
    </div>
  );

}

export default Home;
