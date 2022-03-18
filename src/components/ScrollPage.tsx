import React, { useState, useEffect, ReactElement, useRef } from 'react'

import '../styles/scrollpage.css'

type PageProps = {
    pages: ReactElement[]
}

const ScrollPage = (props: PageProps) => {


    const pageRef = useRef<HTMLDivElement>(null)



    
    const [pageState, setPageState] = useState(props.pages[0])
    const [pageIndex, setPageIndex] = useState(0)

    const swapPage = useRef(false)
    const prevSwap = useRef(false)
    const downY = useRef(0)
    const deltaY = useRef(0)
    const bottom = useRef(0)
    const mouseDown = useRef(false)
    const opacity = useRef(1)



    function ceiling(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max);
    }

    function incrementPageIndex() {
        let newIndex = pageIndex + 1;
        if (newIndex < props.pages.length) {
            setPageIndex(newIndex)
            setPageState(props.pages[newIndex])
        } else {
            setPageIndex(0)
            setPageState(props.pages[0])
        }
    }

    function decrementPageIndex() {
        let newIndex = pageIndex - 1;
        if (newIndex >= 0) {
            setPageIndex(newIndex)
            setPageState(props.pages[newIndex])
        } else {
            setPageIndex(props.pages.length - 1)
            setPageState(props.pages[props.pages.length - 1])
        }


    }

    function handleScroll() {


        let target = pageRef.current
        let direction = deltaY.current > 0 ? "UP" : "DOWN"
        let speed = direction === "UP" ? 0.015 : -0.015

        let height = window.innerHeight / 2

        let newBottom = bottom.current - (speed * height)

        if (newBottom + height < height) {
            let newOpacity = ceiling(opacity.current - speed, 0, 1)
            opacity.current = newOpacity
        } else {
            let newOpacity = ceiling(opacity.current + speed, 0, 1)
            opacity.current = newOpacity
        }



        newBottom = newBottom < -height ? height : newBottom > height ? -height : newBottom


        bottom.current = newBottom

        swapPage.current = bottom.current <= height && bottom.current >= height - 10

        if (swapPage.current && !prevSwap.current && direction === "DOWN") {
            incrementPageIndex()
        } else if (!swapPage.current && prevSwap.current && direction === "UP") {
            decrementPageIndex()
        }



        if (target) {
            target.style.transform = `translateY(${bottom.current}px)`
            target.style.opacity = String(opacity.current)
        }

        if (swapPage.current !== prevSwap.current) {
            prevSwap.current = swapPage.current
        }


    }



    function move(event: PointerEvent) {
        deltaY.current = event.clientY - downY.current

        handleScroll()
    }


    function mouseDownEvent(e: any) {
        let event = e as PointerEvent


        mouseDown.current = true

        downY.current = event.clientY
        event.preventDefault()
        return false
    }

    function mouseMoveEvent(e: any) {
        let event = e as PointerEvent

        if (mouseDown.current) {
            move(event)
        }

        event.preventDefault()
    }


    function mouseUpEvent(e: any) {
        let event = e as PointerEvent
        
        mouseDown.current = false
        event.preventDefault()
    }



    useEffect(() => {

        window.ondragstart = function () { return false }
        window.onselectstart = function () { return false }

    }, [])


    return (
        <div className='scroll-body' style={{ width: '125vw', height: '125vh' }} onPointerDown={mouseDownEvent} onPointerUp={mouseUpEvent} onPointerMove={mouseMoveEvent} onPointerLeave={mouseUpEvent}>
            <div className='scroll-page' ref={pageRef}>{pageState}</div>
        </div>
    )
}

export default ScrollPage