import { Navigate } from 'react-router-dom';
import ProtectedRoutes from './routes';

function App() {
  return (
     <>
      <ProtectedRoutes/>
     </>
  );
}

export default App;
