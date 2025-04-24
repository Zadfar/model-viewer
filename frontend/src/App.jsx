import './App.css';
import ModelList from './components/ModelList';
import Viewport from './components/Viewport';
import UploadButton from './components/UploadButton';


const App = () => {

  return (
    <>
      <div className='container'>
        <div className='dashboard'>
          <h1>3D Model Viewer</h1>
        <h2>Choose a Model</h2>
        <ModelList />
        <UploadButton />
        </div>
        <Viewport />
      </div>
    </>
  )
}

export default App;
