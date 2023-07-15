import Navigation from './navigation/Navigation'

function App() {
  const isAuthenticated = !!localStorage.getItem('user');

  return (
    <>
      <div>
        <h1>DS App</h1>
        <Navigation isAuthenticated={isAuthenticated} />
      </div>
    </>
  )
}

export default App
