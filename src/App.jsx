import Header from './components/Header'
import './App.css'
import Instructions from './components/Instructions'

function App() {

  return (
    <>
      <Header />

      <div className="content">
        <div className='main'>
          <div className='form'>
            <div className='instructions'>
              <Instructions />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
