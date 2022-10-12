//Initial State
const initialState = {
  sidebarShow: true,
  asideShow: false,
  theme: 'default',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

export default changeState