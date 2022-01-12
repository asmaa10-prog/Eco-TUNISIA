import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.svg';

const Home = () => {
  return (
<div id="page-home">
    <div className="content">
    <header>
        <h3>Eco-TUNISIA </h3>
      </header>
      <main>
        <h1>Garbage collector</h1>
        <p>Together for a bette future</p>

        <Link to="/create-point">
          <span>
            <FiLogIn />
          </span>
          <strong>Add a collection point </strong>
        </Link>
      </main>
    </div>
  </div>
  )
}

export default Home;