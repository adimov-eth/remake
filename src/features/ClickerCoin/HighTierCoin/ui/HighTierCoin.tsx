/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, RefObject } from 'react'

import { TweenLite } from 'gsap'
import Proton from 'proton-engine'
import RAFManager from "raf-manager"

import { Canvas } from "./HighTierCoinCanvas"

interface CoinProps {
  touchAreaRef: RefObject<HTMLDivElement>
}

interface CoinState {
  loaded: boolean
  center: { x: number; y: number }
  conf: { radius: number; tha: number }
  attractionBehaviours: any[]
  proton?: any
  canvas?: HTMLCanvasElement
  renderer?: any
  offsetY: number
  speedMultiplier: number
}

const particleImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJkSURBVHjaxJeJbusgEEW94S1L//83X18M2MSuLd2pbqc4wZGqRLrKBsyZhQHny7Jk73xVL8xpVhWrcmiB5lX+6GJ5YgQ2owbAm8oIwH1VgKZUmGcRqKGGPgtEQQAzGR8hQ59fAmhJHSAagigJ4E7GPWRXOYC6owAd1JM6wDQPADyMWUqZRMqmAojHp1Vn6EQQEgUNMJLnUjMyJsM49wygBkAPw9dVFwXRkncCIIW3GRgoTQUZn6HxCMAFEFd8TwEQ78X4rHbILoAUmeT+RFG4UhQ6MiIAE4W/UsYFjuVjAIa2nIY4q1R0GFtQWG3E84lqw2GO2QOoCKBVu0BAPgDSU0eUDjjQenNkV/AW/pWChhpMTelo1a64AOKM30vk18GzTHXCNtI/Knz3DFBgsUqBGIjTInXRY1yA9xkVoqW5tVq3pDR9A0hfF5BSARmVnh7RMDCaIdcNgbPBkgzn1Bu+SfIEFSpSBmkxyrMicb0fAEuCZrWnN89veA/4XcakrPcjBWzkTuLjlbfTQPOlBhz+HwkqqPXmPQDdrQItxE1moGof1S74j/8txk8EHhTQrAE8qlwfqS5yukm1x/rAJ9Jiaa6nyATqD78aUVBhFo8b1V4DdTXdCW+IxA1zB4JhiOhZMEWO1HqnvdoHZ4FAMIhV9REF8FiUm0jsYPEJx/Fm/N8OhH90HI9YRHesWbXXZwAShU8qThe7H8YAuJmw5yOd989uRINKRTJAhoF8jbqrHKfeCYdIISZfSq26bk/K+yO3YvfKrVgiwQBHnwt8ynPB25+M8hceTt/ybPhnryJ78+tLgAEAuCFyiQgQB30AAAAASUVORK5CYII=';

export class HighTierCoin extends Component<CoinProps, CoinState> {
  constructor(props: CoinProps) {
    super(props)

    this.state = {
      loaded: false,
      center: { x: 0, y: 0 },
      conf: { radius: 150, tha: 0 },
      attractionBehaviours: [],
      offsetY: 40,
      speedMultiplier: 0.6,
    }

    this.renderProton = this.renderProton.bind(this)
    this.handleCanvasInited = this.handleCanvasInited.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  handleCanvasInited(canvas: HTMLCanvasElement) {
    this.setState({ attractionBehaviours: [] }, () => {
      this.createProton(canvas)
      RAFManager.add(this.renderProton)
    })
  }

  componentWillUnmount() {
    try {
      RAFManager.remove(this.renderProton)
      const { proton } = this.state
      if (proton) {
        const emitter1 = proton.emitters[0]
        const emitter2 = proton.emitters[1]
        emitter1.destroy()
        emitter2.destroy()
        proton.destroy()
      }
    } catch (e) {
      console.log('unmount error', e)
    }
  }

  createProton(canvas: HTMLCanvasElement) {
    const proton = new Proton()
    const emitter1 = this.createImageEmitter({
      canvas,
      x: canvas.width / 2 + this.state.conf.radius,
      y: canvas.height / 2,
      startColor: '#4F1500',
      endColor: '#0029FF',
    })
    const emitter2 = this.createImageEmitter({
      canvas,
      x: canvas.width / 2 - this.state.conf.radius,
      y: canvas.height / 2,
      startColor: '#004CFE',
      endColor: '#6600FF',
    })
    proton.addEmitter(emitter1)
    proton.addEmitter(emitter2)

    const renderer = new Proton.WebGlRenderer(canvas)
    renderer.blendFunc('SRC_ALPHA', 'ONE')
    proton.addRenderer(renderer)

    this.setState({ proton, canvas, renderer })
  }

  createImageEmitter({
    canvas,
    x,
    y,
    startColor,
    endColor,
  }: {
    canvas: HTMLCanvasElement
    x: number
    y: number
    startColor: string
    endColor: string
  }) {
    const emitter = new Proton.Emitter()
    emitter.rate = new Proton.Rate(
      new Proton.Span(5, 7),
      new Proton.Span(0.01, 0.02)
    )

    emitter.addInitialize(new Proton.Mass(1))
    emitter.addInitialize(new Proton.Life(1))
    emitter.addInitialize(new Proton.Body([particleImage], 32))
    emitter.addInitialize(new Proton.Radius(20))

    emitter.addBehaviour(new Proton.Alpha(1, 0))
    emitter.addBehaviour(new Proton.Color(startColor, endColor))
    emitter.addBehaviour(new Proton.Scale(2.5, 0.5))
    emitter.addBehaviour(
      new Proton.CrossZone(
        new Proton.RectZone(0, 0, canvas.width, canvas.height),
        'dead'
      )
    )
    const attractionBehaviour = new Proton.Attraction(this.state.center, 0, 0)
    emitter.addBehaviour(attractionBehaviour)
    this.setState((prevState) => ({
      attractionBehaviours: [
        ...prevState.attractionBehaviours,
        attractionBehaviour,
      ],
    }))
    emitter.p.x = x
    emitter.p.y = y
    emitter.emit()

    return emitter
  }

  emitterMove() {
    const { proton, canvas, conf, offsetY, speedMultiplier } = this.state
    if (!proton || !canvas) return

    const emitter1 = proton.emitters[0]
    const emitter2 = proton.emitters[1]
    const { width, height } = canvas

    const centerX = width / 2
    const centerY = height / 2 + offsetY
    const maxRadius = Math.min(centerX, centerY)
    const radius = maxRadius / 2.5

    this.setState({
      conf: {
        ...conf,
        radius,
      },
    })

    if (emitter1) {
      this.coordinateRotation({
        emitter: emitter1,
        centerX,
        centerY,
        radius,
        tha: Math.PI / 2,
      })
    }

    if (emitter2) {
      this.coordinateRotation({
        emitter: emitter2,
        centerX,
        centerY,
        radius,
        tha: -Math.PI / 2,
      })
    }

    this.setState((prevState) => ({
      conf: {
        ...prevState.conf,
        tha: prevState.conf.tha + 0.1 * speedMultiplier,
      },
    }))
  }

  coordinateRotation({
    emitter,
    centerX,
    centerY,
    radius,
    tha,
  }: {
    emitter: any
    centerX: number
    centerY: number
    radius: number
    tha: number
  }) {
    if (emitter) {
      emitter.p.x = centerX + radius * Math.sin(tha + this.state.conf.tha)
      emitter.p.y = centerY + radius * Math.cos(tha + this.state.conf.tha)
    }
  }

  handleResize(width: number, height: number) {
    const { renderer } = this.state
    if (renderer) {
      renderer.resize(width, height)
      this.setState({
        conf: {
          ...this.state.conf,
          radius: Math.min(width, height) / 4,
        },
      })
    }
  }

  handleMouseDown() {
    const { canvas, attractionBehaviours, offsetY } = this.state
    if (!canvas) return

    const center = {
      x: canvas.width / 2,
      y: canvas.height / 2 + offsetY,
    }

    this.setState({ center }, () => {
      for (let i = 0; i < 2; i++) {
        attractionBehaviours[i].reset(this.state.center, 120, 200)
      }

      TweenLite.to(this.state.conf, 2, {
        radius: 10,
        //@ts-expect-error  TweenLite deprecated
        onComplete: () =>
          TweenLite.to(this.state.conf, 1, {
            radius:
              Math.min(this.state.canvas!.width, this.state.canvas!.height) / 4,
          }),
      })
    })
  }

  handleMouseUp() {
    setTimeout(() => {
      const { attractionBehaviours } = this.state
      for (let i = 0; i < 2; i++) {
        attractionBehaviours[i].reset(this.state.center, 0, 0)
      }
    }, 1000)
  }

  renderProton() {
    this.emitterMove()
    this.state.proton?.update()
  }

  render() {
    return (
      <Canvas
        touchAreaRef={this.props.touchAreaRef}
        onCanvasInited={this.handleCanvasInited}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onResize={this.handleResize}
        style={{}}
      />
    )
  }
}