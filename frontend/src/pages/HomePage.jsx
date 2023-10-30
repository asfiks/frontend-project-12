import React from 'react';
import { ToastContainer } from 'react-toastify';
import MessagesBlock from '../components/MessageBlock';
import NavBlock from '../components/NavBlock';
import ChannelsBlock from '../components/ChannelsBlock';

export const HomePage = () => (
  <div className="h-100 vh-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <NavBlock />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsBlock />
            <MessagesBlock />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  </div>
);
