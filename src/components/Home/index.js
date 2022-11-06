import { useEffect, useState } from "react";
import axios from "axios";

import PostCreate from "../PostCreate";
import Posts from "../Posts";
import AvatarContextProvider from "../../Context/avatar_context";

import "./posts.css"

function Home() {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_URL_API}api/post`);
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
      <AvatarContextProvider>
        <PostCreate fetchData={fetchData} />
        <Posts data={data} fetchData={fetchData} />
      </AvatarContextProvider>
    </div>
  );

}

export default Home;
