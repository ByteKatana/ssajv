import React from "react"
import {
  FiXOctagon,
  FiCheckCircle,
  FiRepeat,
  FiAlertCircle,
  FiLoader,
  FiInfo
} from "react-icons/fi"

export const LastRunOutCome = (props) => {
  if (props.message) {
    if (props.isColored) {
      if (props.outcome == 0) {
        return (
          <FiXOctagon color={"#d73a49"} size={"24px"} title={` Fail: ${props.message}`} />
        )
      } else if (props.outcome == 1) {
        return (
          <FiCheckCircle
            color={"#28a745"}
            size={"24px"}
            title={`Succeed: ${props.message}`}
          />
        )
      } else if (props.outcome == 2) {
        return (
          <FiRepeat color={"#34d5eb"} size={"24px"} title={` Retry: ${props.message}`} />
        )
      } else if (props.outcome == 3) {
        return (
          <FiAlertCircle
            color={"#eb9634"}
            size={"24px"}
            title={`Cancel: ${props.message}`}
          />
        )
      } else if (props.outcome == 4) {
        return (
          <FiLoader
            color={"#34ebc3"}
            size={"24px"}
            title={`In progress: ${props.message}`}
          />
        )
      } else {
        return (
          <FiInfo color={"#6f42c1"} size={"24px"} title={`Unknown: ${props.message}`} />
        )
      }
    } else {
      if (props.outcome == 0) {
        return (
          <FiXOctagon color={"#292b2c"} size={"24px"} title={` Fail: ${props.message}`} />
        )
      } else if (props.outcome == 1) {
        return (
          <FiCheckCircle
            color={"#292b2c"}
            size={"24px"}
            title={`Succeed: ${props.message}`}
          />
        )
      } else if (props.outcome == 2) {
        return (
          <FiRepeat color={"#292b2c"} size={"24px"} title={` Retry: ${props.message}`} />
        )
      } else if (props.outcome == 3) {
        return (
          <FiAlertCircle
            color={"#292b2c"}
            size={"24px"}
            title={`Cancel: ${props.message}`}
          />
        )
      } else if (props.outcome == 4) {
        return (
          <FiLoader
            color={"#292b2c"}
            size={"24px"}
            title={`In progress: ${props.message}`}
          />
        )
      } else {
        return (
          <FiInfo color={"#292b2c"} size={"24px"} title={`Unknown: ${props.message}`} />
        )
      }
    }
  } else {
    if (props.isColored) {
      if (props.outcome == 0) {
        return <FiXOctagon color={"#d73a49"} size={"24px"} />
      } else if (props.outcome == 1) {
        return <FiCheckCircle color={"#28a745"} size={"24px"} />
      } else if (props.outcome == 2) {
        return <FiRepeat color={"#34d5eb"} size={"24px"} />
      } else if (props.outcome == 3) {
        return <FiAlertCircle color={"#eb9634"} size={"24px"} />
      } else if (props.outcome == 4) {
        return <FiLoader color={"#34ebc3"} size={"24px"} />
      } else {
        return <FiInfo color={"#6f42c1"} size={"24px"} />
      }
    } else {
      if (typeof props.filterVal != undefined) {
        if (props.outcome == 0) {
          return (
            <FiXOctagon
              className={props.filterVal == "0" ? "text-black" : "text-secondary"}
              size={"24px"}
            />
          )
        } else if (props.outcome == 1) {
          return (
            <FiCheckCircle
              className={props.filterVal == "1" ? "text-black" : "text-secondary"}
              size={"24px"}
            />
          )
        } else if (props.outcome == 2) {
          return (
            <FiRepeat
              className={props.filterVal == "2" ? "text-black" : "text-secondary"}
              size={"24px"}
            />
          )
        } else if (props.outcome == 3) {
          return (
            <FiAlertCircle
              className={props.filterVal == "3" ? "text-black" : "text-secondary"}
              size={"24px"}
            />
          )
        } else if (props.outcome == 4) {
          return (
            <FiLoader
              className={props.filterVal == "4" ? "text-black" : "text-secondary"}
              size={"24px"}
            />
          )
        } else {
          return (
            <FiInfo
              className={props.filterVal == "5" ? "text-black" : "text-secondary"}
              size={"24px"}
            />
          )
        }
      } else {
        if (props.outcome == 0) {
          return <FiXOctagon className={"text-secondary"} size={"24px"} />
        } else if (props.outcome == 1) {
          return <FiCheckCircle className={"text-secondary"} size={"24px"} />
        } else if (props.outcome == 2) {
          return <FiRepeat className={"text-secondary"} size={"24px"} />
        } else if (props.outcome == 3) {
          return <FiAlertCircle className={"text-secondary"} size={"24px"} />
        } else if (props.outcome == 4) {
          return <FiLoader className={"text-secondary"} size={"24px"} />
        } else {
          return <FiInfo className={"text-secondary"} size={"24px"} />
        }
      }
    }
  }
}

export default LastRunOutCome
