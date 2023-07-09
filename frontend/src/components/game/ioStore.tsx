const initialState = {
    isConnected: false,
    error: null,
  };
  
  const socketReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SOCKET_CONNECTED':
        return {
          ...state,
          isConnected: true,
          error: null,
        };
      case 'SOCKET_DISCONNECTED':
        return {
          ...state,
          isConnected: false,
          error: null,
        };
      case 'SOCKET_ERROR':
        return {
          ...state,
          isConnected: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
  const socketConnected = () => ({
    type: 'SOCKET_CONNECTED',
  });
  
  const socketDisconnected = () => ({
    type: 'SOCKET_DISCONNECTED',
  });
  
  const socketError = (error) => ({
    type: 'SOCKET_ERROR',
    payload: { error },
  });


  