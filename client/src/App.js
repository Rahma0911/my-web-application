import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './Views/Home';
import AnnonceList from './Views/AnnonceList';
import AddAnnonce from './Views/AddAnnonce';
import Contact from './Views/Contact';
import Inscription from './Views/Inscription';
import Error from './Views/Error';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Views/Login';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { current } from "./JS/actions/user";
import PrivateRoute from './router/PrivateRoute';
import Search from './Views/Search';
import Details from './Views/Details';
import Profile from './Views/Profile';
import Settings from './Views/Settings';
import UserList from './Views/UserList';
import AdminRoute from './router/AdminRoute';

function App() {

  //state text of searching annonces
  const [text, setText] = useState("");

  //state category of searching annonces
  const [category, setCategory] = useState("");

  //useDispatch to dispatch actions from redux to the back-end
  const dispatch = useDispatch();

  //get the token from localStorage 
  const token = localStorage.getItem("token");

  //useEffect to dispatch the action of current user in our application 
  useEffect(() => {
    if (token) dispatch(current());
  }, [dispatch, token]);


  return (
    <div className="app">
      <Navbar text={text} setText={setText} category={category} setCategory={setCategory} />

      <Switch>

        <Route exact path="/" component={Home} />
        <Route path="/searchresult" render={() => (
          <Search text={text} setText={setText} category={category} setCategory={setCategory} />
        )} />

        <Route path="/annonces" component={AnnonceList} />
        <AdminRoute path="/utilisateurs" component={UserList} />

        <PrivateRoute path={["/ajouterAnnonce", "/editAnnonce/:id"]} component={AddAnnonce} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/settings" component={Settings} />

        <Route path="/contact" component={Contact} />
        <Route path={["/inscription", "/editUser/:id"]} component={Inscription} />
        <Route path="/login" component={Login} />
        <Route path="/details" component={Details} />
        <Route path="/*" component={Error}/>

      </Switch>

      <Footer/>
    </div>
  );
}

export default App;
