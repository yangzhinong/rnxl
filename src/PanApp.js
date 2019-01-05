import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    PixelRatio,
    PanResponder,
} from "react-native";

var CIRCLE_SIZE=40
var CIRCLE_COLOR='blue'
var CIRCLE_HIGHLIGHT_COLOR='green'
class PanApp extends Component {

    constructor(props){
        super(props)

        this._panResponder= PanResponder.create({
            onStartShouldSetPanResponder:this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder:this._handleMoveShouldSetPanResponder,
            onPanResponderGrant:this._handlePanResponderGrant,
            onPanResponderMove:this._handlePanResponderMove,
            onPanResponderRelease:this._handlePanResponderEnd,
            onPanResponderTerminate:this._handlePanResponderTerminate
        })
        this.state={
            numberActiveTouches:0,
            moveX:0,
            moveY:0,
            x0:0,
            y0:0,
            dx:0,
            dy:0,
            vx:0,
            vy:0,
        }
    }

    _previousLeft=0
    _previousTop=0
    _circleStyles={}
    circle=null
   
    componentDidMount (){
        this._updatePosition()
    }


    _highlight= ()=> {
        this.circle && this.circle.setNativeProps({
            backgroundColor:CIRCLE_HIGHLIGHT_COLOR
        })
    }

    _unHighlight= ()=> {
        this.circle && this.circle.setNativeProps({
           backgroundColor: CIRCLE_COLOR
        })
    }

    _updatePosition= ()=> {
        this.circle && this.circle.setNativeProps(this._circleStyles)
    }

    _handleStartShouldSetPanResponder=(e, gestureState)=>{
        return true
    }
    _handleMoveShouldSetPanResponder=()=>{
        return true
    }
    _handlePanResponderGrant= (e,o)=>{
        this._highlight()
    }

    _handlePanResponderMove= (e, gestureState)=>{

        const {stateID, moveX,moveY,x0,y0,dx,dy,vx,vy, numberActiveTouches}= gestureState
        this.setState({
            stateID,moveX,moveY,x0,y0,dx,dy,vx,vy,numberActiveTouches
        });

        this._circleStyles.left=this._previousLeft + dx;
        this._circleStyles.top = this._previousTop+dy;
        this._updatePosition();
    }
    _handlePanResponderEnd = (e, gestureState)=>{
        const {dx,dy}=gestureState;

        this._unHighlight();
        this._previousLeft +=dx;
        this._previousTop +=dy;

    }
    
    render() {
        return (
            <View style={styles.container}  >
                <View ref={(circle)=>this.circle=circle}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}
                >
                  
                </View>
                <Text>{this.state.numberActiveTouches} touches, {'\n'}
                        stateID: {`${this.state.stateID}\n`}
                        x0:{this.state.x0},
                        y0:{this.state.y0}, {'\n'}
                        dx: {this.state.dx},
                        dy: {this.state.dy},{'\n'}
                        vx: {this.state.vx},
                        vy: {this.state.vy},{'\n'}
                        moveX: {this.state.moveX}, 
                        moveY: {this.state.moveY}
                     </Text>
            </View>
        );
    }
}
export default PanApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:64
    },
    circle: {
        width:CIRCLE_SIZE,
        height:CIRCLE_SIZE,
        borderRadius:CIRCLE_SIZE/2,
        backgroundColor:CIRCLE_COLOR,
        position:'absolute',
        left:0,
        top:0,
    }
});