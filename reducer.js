import { combineReducers } from 'redux'

const defaultStatus = {
  rotation: 0,
  scale: 0.1
}

function animate (preState = defaultStatus , action) {
  switch (action.type) {
    case 'ZOOMIN':
      return Object.assign({}, preState, {
        scale: preState.scale * 2
      })
    case 'ZOOMOUT':
      return Object.assign({}, preState, {
        scale: preState.scale / 2
      })
    case 'ROTATE':
      return Object.assign({}, preState, {
        rotation: preState.rotation + 0.5
      })
    default:
      return preState
  }
}


export default animate
