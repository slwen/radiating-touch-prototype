import * as React from "react"
import Box from './GridBox'
import posed from 'react-pose'
import { sample } from 'lodash'

const gridStyle: React.CSSProperties = {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridColumnGap: 5,
    gridRowGap: 5,
    padding: 20
}

const defaultColor = "#191919"

const Container = posed.div({
    default: {
        scale: 1,
        opacity: 1,
        background: defaultColor,
        borderRadius: 4
    },
    touched: {
        background: ({ highlightColor }) => highlightColor
    },
    impacted: {
        scale: 1,
        opacity: 1,
        background: defaultColor,
        transition: {
            default: ({ d }) => ({
                type: 'spring',
                from: 0.25,
                to: 1,
                stiffness: 200,
                damping: 20,
                mass: 1,
                delay: d * 65
            }),
            background: ({ d, highlightColor }) => ({
                type: 'spring',
                from: highlightColor,
                to: defaultColor,
                stiffness: 200,
                damping: 50,
                mass: 1,
                delay: d * 70
            })
        }
    },
    props: { d: 0, highlightColor: "#7755CC" }
})

const defaultBoxes = [...Array(72)].map(x => 0) // Controls how many boxes are shown

export class Grid extends React.Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            touched: -1,
            boxes: defaultBoxes
        }
    }

    calculateImpactRadiation(index) {
        const positions = [...document.querySelectorAll('.Grid__box')].map(el => {
            const loc = el.getBoundingClientRect()
            return {
                x: loc.left + loc.width / 2,
                y: loc.top + loc.height / 2,
                width: loc.width
            }
        })

        return positions.map(pos => {
            return Math.sqrt(
                Math.pow(positions[index].x - pos.x, 2) +
                Math.pow(positions[index].y - pos.y, 2)
            )
        }).map(d => d / positions[index].width)
    }

    handleClick(e, index) {
        this.setState({
            boxes: defaultBoxes,
            touched: index,
            highlightColor: sample(['#00EAFF', '#FF1A5B'])
        }, () => {
            this.setState({
                boxes: this.calculateImpactRadiation(index)
            })
        })
    }

    renderChildren() {
        const { touched, highlightColor } = this.state

        return this.state.boxes.map((distanceFromImpact, index) => {
            return (
                <Container
                    pose={distanceFromImpact ? 'impacted' : touched === index ? 'touched' : 'default'}
                    d={distanceFromImpact}
                    highlightColor={highlightColor}
                    key={`container${index}`}>
                    <Box
                        distance={distanceFromImpact.distanceFromImpact}
                        onClick={(e) => this.handleClick(e, index)}
                        key={`box${index}`} />
                </Container>
            )
        })
    }

    render() {
        return (
            <div className="Grid" style={gridStyle}>
                {this.renderChildren()}
            </div>
        )

    }
}