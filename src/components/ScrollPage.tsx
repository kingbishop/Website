import React, { useState, useEffect, ReactElement, useRef } from 'react'

import '../styles/scrollpage.css'

type PageProps = {
    pages: ReactElement[]
}

const ScrollPage = (props: PageProps) => {


    const pageRef = useRef<HTMLDivElement>(null)



    const [opacity, setOpacity] = useState(1)
    const [pageIndex, setPageIndex] = useState(0)
    const [swapPage, setSwapPage] = useState(false)
    const [prevSwap, setPrevSwap] = useState(false)

    const [pageState, setPageState] = useState(props.pages[0])

    const [downY, setDownY] = useState(0)
    const [deltaY, setDeltaY] = useState(0)
    const [bottom, setBottom] = useState(0)
    const mouseDown = useRef(false)



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
        let direction = deltaY > 0 ? "UP" : "DOWN"
        let speed = deltaY * 0.000055

        let height = window.innerHeight / 2

        let newBottom = bottom - (speed * height)

        if (newBottom + height < height) {
            let newOpacity = ceiling(opacity - speed, 0, 1)
            setOpacity(newOpacity)
        } else {
            let newOpacity = ceiling(opacity + speed, 0, 1)
            setOpacity(newOpacity)
        }



        newBottom = newBottom < -height ? height : newBottom > height ? -height : newBottom


        setBottom(newBottom)

        setSwapPage(bottom <= height && bottom >= height - 10)

        if (swapPage && !prevSwap && direction === "DOWN") {
            incrementPageIndex()
        } else if (!swapPage && prevSwap && direction === "UP") {
            decrementPageIndex()
        }



        if (target) {
            //target.style.opacity = String(opacity)
            target.style.bottom = String(newBottom) + "px"
            target.style.opacity = String(opacity)
        }

        if (swapPage !== prevSwap) {
            setPrevSwap(swapPage)
        }


    }



    function move(event: PointerEvent) {
        setDeltaY(event.clientY - downY)

        handleScroll()
    }




    function mouseDownEvent(e: any) {
        let event = e as PointerEvent


        mouseDown.current = true

        setDownY(event.clientY)

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

    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className='scroll-body' style={{ width: '125vw', height: '125vh' }} onPointerDown={mouseDownEvent} onPointerUp={mouseUpEvent} onPointerMove={mouseMoveEvent} onPointerLeave={mouseUpEvent}>
            <div className='scroll-page' ref={pageRef}>{pageState}</div>
        </div>
    )
}

export default ScrollPage