import React from 'react'
import { Animated, AppRegistry, asset, Model, Pano, AmbientLight, PointLight, VrButton, Text, View, StyleSheet } from 'react-vr'
import Button from './src/component/button.js'
import animateStore from './src/store/createStore.js'

class ModelSample extends React.Component {
  constructor () {
    super()
    this.state = animateStore.getState();

    animateStore.subscribe( ()=>{
        this.setState( animateStore.getState());
    } )

    this.styles = StyleSheet.create({
      menu:{
        flex: 1,
        flexDirection: 'column',
        width:1,
        alignItems: 'stretch',
        transform:[
          {
            translate:[2, 2, -5]
          }
        ]
      }
    })
    this.rotate = this.rotate.bind(this)
  }

  rotate () {
    animateStore.dispatch({
      type : 'ROTATE'
    })

    this.frameHandle = requestAnimationFrame(this.rotate)
  }

  componentDidMount () {
    this.rotate()
  }



  componentWillUnmount () {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle)
      this.frameHandle = null
    }
  }

  zoomIn(){
    animateStore.dispatch({
      type : 'ZOOMIN'
    })

  }

  zoomOut(){
    animateStore.dispatch({
      type : 'ZOOMOUT'
    })

  }
  

  render () {
    return (
      <View>
        <Pano source={asset('sky.jpg')}/>
        <PointLight style={{color: 'white', transform: [{translate: [0, 400, 700]}]}} />
        <AmbientLight intensity={0.6} />
        <Model style={{ transform: [ {translate: [ 10, -10, -100]}, {scale: this.state.scale}, {rotateY: this.state.rotation} ] }} source={{ obj: asset('IronMan/IronMan.obj'), mtl: asset('IronMan/IronMan.mtl') }} lit={true} />
        <View style={this.styles.menu}>
          <Button text='Zoom In' callback= {this.zoomIn.bind(this)} />
          <Button text='Zoom Out' callback={this.zoomOut.bind(this) } />
        </View>
      </View> 
    )
  }
}

AppRegistry.registerComponent('ModelSample', () => ModelSample)
