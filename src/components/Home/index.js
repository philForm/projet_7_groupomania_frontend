import { useEffect, useState } from "react";
import axios from "axios";

import PostCreate from "../PostCreate";
import Posts from "../Posts";

import "./posts.css"

function Home() {

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_URL_API}api/post`)
        setData(result.data)
      }
      catch (error) {
        console.error(error)
      }

    }
    fetchData()

  }, [])
  console.log(data)

  return (
    <div className="App">
      <PostCreate />
      <Posts data={data} />
      {/* <Posts /> */}
    </div>
  );

}

export default Home;
