import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../contexts/AuthContext';
import { fetchData, selectorsChannels, setCurrentChannelId } from '../slices/channelsSlice';
import {Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { AddChannelModal } from './modals/AddChannelModal';
import { RenameChannelModal } from './modals/RenameChannelModal';
import { RemoveChannelModal } from './modals/RemoveChannelModal';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

const ChannelsBlock = () => {
    const { t } = useTranslation();
    const { token } = useContext(AuthContext);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [idForRename, setIdForRename] = useState('');
    const [showRemove, setShowRemove] = useState(false);

    const handleClose = () => {
        setShow(false);
        setShowRename(false);
        setShowRemove(false);
    }
   
    useEffect(() => {
        dispatch(fetchData(token));
    }, [dispatch, token]);
    
    const channels = useSelector(selectorsChannels.selectAll);
    const { currentChannelId } = useSelector((state) => state.channels);
    
    const handleClick = (channel) => {
        const changeChannelId = channel.id;
        dispatch(setCurrentChannelId(changeChannelId));
    }


    return (
        <>
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                    <b>{t('channels.channels')}</b>
                    <Button  variant="light" className="p-0 text-primary btn btn-group-vertical" onClick={() => setShow(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                        </svg>
                        <span className="visually-hidden">+</span>
                    </Button>
                </div>
                <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                  {channels.map((channel) => (
                    <li className="nav-item w-100 d-flex" key={channel.id}>
                      {!channel.removable ? (
                        <Button
                          className="d-flex"
                          variant={channel.id === currentChannelId ? "secondary" : "light"}
                          onClick={() => handleClick(channel)}
                        >
                          <span className="me-1">{t('channels.symbolChannel')}</span>
                          {channel.name}
                        </Button>
                      ) : (
                        <Dropdown as={ButtonGroup} className="d-flex">
                          
                          <Button
                            onClick={() => handleClick(channel)}
                            variant={channel.id === currentChannelId ? "secondary" : "light"}>
                            <span className="me-1">{t('channels.symbolChannel')}</span>{channel.name}
                          </Button>
                          
                          <Dropdown.Toggle split 
                            variant={channel.id === currentChannelId ? "secondary" : "light"}
                            id="dropdown-split-basic" 
                          />

                          <Dropdown.Menu>
                              <Dropdown.Item role='button' onClick={()=> {
                                  setIdForRename(channel.id)
                                  setShowRemove(true)                                
                              }}>{t('channels.remove')}</Dropdown.Item>
                              <Dropdown.Item role="button" onClick={() => { 
                                  
                                  setIdForRename(channel.id)
                                  setShowRename(true)
                              }
                                }>{t('channels.rename')}</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </li>
                  ))}
                </ul>
            </div>
            <AddChannelModal
              show={show}
              handleClose={handleClose}
            />
            <RenameChannelModal
              id={idForRename}
              show={showRename}
              handleClose={handleClose}
            />
            <RemoveChannelModal
              id={idForRename}
              show={showRemove}
              handleClose={handleClose}              
            />
        </>            
    );
};

export default ChannelsBlock;
