import './App.scss';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer'
function App() {
  return (
    <div className="App">
        <Navbar />
           <div className='container'>
              <span>Total todos : 0</span>
              <div className='input-container'>
                <input type='text' />
                <button>Add</button>
              </div>
           </div>
        <Footer />
    </div>
  );
}

export default App;
