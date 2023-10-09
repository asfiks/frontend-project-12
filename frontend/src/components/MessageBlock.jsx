import React, { useContext, useEffect, useRef  } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../contexts/AuthContext';
import { fetchData, selectorsMessages, addMessage } from '../slices/messagesSlice';
import { selectorsChannels } from '../slices/channelsSlice';
import { ApiContext } from '../contexts/ApiContext';
import { useTranslation } from 'react-i18next';

const MessagesBlock = () => {
    const { t } = useTranslation();
    const { token } = useContext(AuthContext);
    const username = localStorage.getItem('username')
    const dispatch = useDispatch();
    const inputRef = useRef();

    const { getNewMessage } = useContext(ApiContext);

    const messages = useSelector(selectorsMessages.selectAll);
    const { currentChannelId } = useSelector((state) => state.channels);
    const actualMessages = messages.filter((m) => m.channelId === currentChannelId)
    const channels = useSelector(selectorsChannels.selectAll);
    const currentCount = actualMessages.length;
    const nameCurrentChannel = (channels) => {
        const curentChannel = channels.find((channel) => currentChannelId === channel.id);
        return curentChannel ? curentChannel.name : null;
    };

    useEffect(() => {
      inputRef.current.focus();
    }, []);

    const handleSubmit = (message, { resetForm }) => {
      if (message.body.trim().length !== 0) {
        const dataForServer = {
          'channelId': currentChannelId,
          'username': username,
          'message': message.body,
        }
        getNewMessage(dataForServer);
        resetForm();
        inputRef.current.focus();
      }
    }
    
    return (
        <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b># {nameCurrentChannel(channels)}</b></p>
            <span className="text-muted">{t('messages.counter.key', { count: currentCount })}</span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5 ">
            {actualMessages.map((m) => (
              <div className="text-break mb-2" key={m.id}>
                <b>{m.username}</b>{`: ${m.message}`}
              </div>
            ))}
          </div>
          <div className="mt-auto px-5 py-3">
            <Formik initialValues={{ body: '' }} onSubmit={handleSubmit}>
              <Form noValidate className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <Field name="body"
                    aria-label={t('messages.new')}
                    placeholder={t('messages.input')}
                    className="border-0 p-0 ps-2 form-control"
                    innerRef={inputRef}  
                  />
                  <button type="submit" className="btn btn-group-vertical">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                      />
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
};

export default MessagesBlock;
