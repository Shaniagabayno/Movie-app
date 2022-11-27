import './App.css';
import { Route, Routes } from 'react-router-dom';

//Import All Components
import Login from './Components/Login';
import MainPage from './Components/MainPage';
import MoviesMain from './Components/MoviesComp/MoviesMain'
import EditMovie from './Components/MoviesComp/EditMovie';
import AddMovie from './Components/MoviesComp/AddMovie'
import MembersMain from './Components/SubscriptionsComp/MembersMain'
import EditMember from './Components/SubscriptionsComp/EditMember';
import AddMember from './Components/SubscriptionsComp/AddMember';

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />}>
          <Route path="subscriptions" element={<MembersMain />} />
          <Route path="subscriptions/add" element={<AddMember />} />
          <Route path="subscriptions/edit/:id" element={<EditMember />} />
          <Route path="movies" element={<MoviesMain />} />
          <Route path="movies/add" element={<AddMovie />} />
          <Route path="movies/edit/:id" element={<EditMovie />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
