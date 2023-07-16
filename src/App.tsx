import Header from './components/Header';
import Navigation from './navigation/Navigation'

function App() {
  const isAuthenticated = !!localStorage.getItem('user');

  return (
    <>
      <div>
        <Navigation isAuthenticated={isAuthenticated} />
      </div>
    </>
  )
}

export default App
