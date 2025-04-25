import './App.css';
import ModelList from './components/ModelList';
import Viewport from './components/Viewport';
import UploadButton from './components/UploadButton';
import DeleteButton from './components/DeleteButton';


const App = () => {

  return (
    <>
      <div className='container'>
        <div className='dashboard'>
          <div className='header'>
            <h1>3D Model Viewer</h1>
          </div>
          <div className='dashboard-items'>
            <h2>Choose a Model</h2>
            <ModelList />
            <UploadButton />
            <DeleteButton />
          </div>
        </div>
        <Viewport />
      </div>
    </>
  )
}

export default App;
