import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../contexts/AuthContext';
import { fetchData, selectorsChannels, setCurrentChannelId } from '../slices/channelsSlice';
import { ModalAddChannel } from './modals/AddChannel'
/* import { ModalContext } from '../contexts/ModalContext'; */


const ChannelsBlock = () => {
    const { token } = useContext(AuthContext);
    /* const { isOpenModal, openModal, closeModal } = useContext(ModalContext); */
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        dispatch(fetchData(token));
    }, [dispatch, token]);
    
    const channels = useSelector(selectorsChannels.selectAll);
    const { currentChannelId } = useSelector((state) => state.channels);
    const state = useSelector((state) => state)

    const getClassNameForChanellsButton = (id) => {
        return cn('w-100', 'rounded-0', 'text-start', 'btn', {
            'btn-secondary': id === state.channels.currentChannelId ? true : false,
            });
    };

    const handleClick = (channel) => {
        const changeChannelId = channel.id;
        dispatch(setCurrentChannelId(changeChannelId));
    }

    return (
        <>
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => setModalShow(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                    </svg>
                    <span className="visually-hidden">+</span>
                </button>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map((channel) => (
                    <li className="nav-item w-100" key={channel.id}>
                        <button type="button" onClick={() => handleClick(channel)} className={getClassNameForChanellsButton(channel.id)}>
                            <span className="me-1">#</span>{channel.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        <ModalAddChannel show={modalShow} onHide={() => setModalShow(false)} />
        </>            
    );
};

export default ChannelsBlock;
