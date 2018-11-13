import * as React from "react"

const boxStyle: React.CSSProperties = {
  background: "transparent",
  color: "#fff",
  display: "flex",
  width: 48,
  height: 48,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 6,
  position: "relative"
}

export default class Box extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      scale: 1
    }
  }

  render() {
    return (
      <div
        className="Grid__box"
        style={{ ...boxStyle, transform: `scale(${this.state.scale})` }}
        onClick={(e) => { this.props.onClick(e) }} />
    )
  }
}