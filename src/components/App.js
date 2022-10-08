import Navbar from './Navbar';
// import Button from 'react-bootstrap/Button';
import FormElem from './FormElem';

import '../App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Button className="primary">Couleur primaire</Button> */}
      <FormElem />
    </div>
  );
}

export default App;
