import React from "react"
import "./with-loading.styles.css"

export const WithLoading = (Component) => {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />
    return (
      <div>
        <div stlye={{ height: "50px" }} className={"loader"}>
          Loading...
        </div>
      </div>
    )
  }
}

export default WithLoading
