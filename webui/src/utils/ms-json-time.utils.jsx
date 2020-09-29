import React from 'react';
import Moment from 'react-moment';

export const MsJsonTime = (props) => {

    if(props.time.toString().length == 6){
        return (<Moment parse="HHmmss" format="HH:mm:ss">{props.time}</Moment>)
    }else if(props.time.toString().length == 5 ){
        return (<Moment parse="Hmmss" format="0H:mm:ss">{props.time}</Moment>)
    }else if(props.time.toString().length == 4){
        return (<Moment parse="Hmms" format="0H:mm:0s">{props.time}</Moment>)
    }else if(props.time.toString().length == 3){
        return (<Moment parse="Hmm" format="0H:mm:00">{props.time}</Moment>)
    }else if(props.time.toString().length == 2){
        return (<Moment parse="Hm" format="0H:0m:00">{props.time}</Moment>)
    }else if(props.time.toString().length == 1){
        return (<Moment parse="H" format="0H:00:00">{props.time}</Moment>)
    }
    else {
        return `00:00:00`
    }
}


export const MsJsonTimeRaw = (time) => {

    if(time.toString().length == 6){
        let formattedTime = `${time.toString().slice(0,2)}:${time.toString().slice(2,4)}:${time.toString().slice(4,6)}`
        return formattedTime
    }else if(time.toString().length == 5 ){
        let formattedTime = `0${time.toString().slice(0,1)}:${time.toString().slice(1,3)}:${time.toString().slice(3,5)}`
        return formattedTime
    }else if(time.toString().length == 4){
        let formattedTime = `0${time.toString().slice(0,1)}:${time.toString().slice(1,3)}:0${time.toString().slice(3,4)}`
        return formattedTime
    }else if(time.toString().length == 3){
        let formattedTime = `0${time.toString().slice(0,1)}:${time.toString().slice(1,3)}:00`
        return formattedTime
    }else if(time.toString().length == 2){
        let formattedTime = `0${time.toString().slice(0,1)}:0${time.toString().slice(1,2)}:00`
        return formattedTime
    }else if(time.toString().length == 1){
        let formattedTime = `0${time.toString().slice(0,1)}:00:00`
        return formattedTime
    }
    else {
        return `00:00:00`
    }
}



export default MsJsonTime