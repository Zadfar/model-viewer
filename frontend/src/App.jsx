import './App.css';
import ModelList from './components/ModelList';
import Viewport from './components/Viewport';
import UploadButton from './components/UploadButton';
import DeleteButton from './components/DeleteButton';
import { useModelStore } from './store/model';


const App = () => {
  const { useGrid, toggleUseGrid, useAnimation, toggleUseAnimation } = useModelStore();
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
            <div className='grid-toggle'>
              <label>Grid</label>
              <input type="checkbox" className='check' checked={useGrid} onChange={toggleUseGrid} />
            </div>
            <div className='grid-toggle'>
              <label>Animations</label>
              <input type="checkbox" className='check' checked={useAnimation} onChange={toggleUseAnimation} />
            </div>
          </div>
        </div>
        <Viewport />
      </div>
    </>
  )
}

export default App;
