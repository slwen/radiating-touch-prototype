import { Data, animate, Override, Animatable } from "framer"
import * as React from "react"

const data = Data({
    scale: Animatable(1),
    tappedItem: undefined
})

export const Scale: Override = props => {
    console.log(props)
    return {
        scale: data.scale,
        onTap(e) {
            data.tappedItem = e.target.id
            data.scale.set(0.8)
            animate.spring(data.scale, 1)
        },
    }
}


export const RippleReaction: Override = props => {

    React.cloneElement(props.children, { index: "hello" })
    console.log(props.children)
}