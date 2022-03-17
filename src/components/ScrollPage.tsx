import React, { useState, useEffect, WheelEvent, ReactElement, useRef } from 'react'

import '../styles/scrollpage.css'

type PageProps = {
    pages: ReactElement[]
}

const ScrollPage = (props: PageProps) => {


    const pageRef = useRef<HTMLDivElement>(null)
    let lastUpdate = Date.now()
    let deltaTime = 0
    const [deltaY, setDeltaY] = useState(0)
    const [bottom, setBottom] = useState(0)
    const [opacity, setOpacity] = useState(1)
    const [pageIndex, setPageIndex] = useState(0)
    const [swapPage, setSwapPage] = useState(false)
    const [prevSwap, setPrevSwap] = useState(false)
    const [pageState, setPageState] = useState(props.pages[0])
   

    function ceiling(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max);
    }

    function incrementPageIndex() {
        let newIndex = pageIndex + 1;
        if (newIndex < props.pages.length) {
            setPageIndex(newIndex)
            setPageState(props.pages[newIndex])
        }else {
            setPageIndex(0)
            setPageState(props.pages[0])
        }
    }

    function decrementPageIndex() {
        let newIndex = pageIndex - 1;
        if (newIndex >= 0) {
            setPageIndex(newIndex)
            setPageState(props.pages[newIndex])
        }else{
            setPageIndex(props.pages.length-1)
            setPageState(props.pages[props.pages.length-1])
        }


    }

    function tick() {
        let now = Date.now()
        let change = now - lastUpdate === 0 ? 1 : now - lastUpdate
        let dt = 1 / ((change) / (1000 / 60))
        
        deltaTime = dt
        lastUpdate = now
    }

    function handleScroll(event: WheelEvent) {


        let target = pageRef.current
        setDeltaY(event.deltaY)
        let direction = deltaY < 0 ? "UP" : "DOWN"
        let speed = direction === "UP" ? 0.025 : -0.025
        let height = window.innerHeight / 2
        
        let newBottom = bottom - (speed * height)

        if(newBottom + height < height){
            let newOpacity = ceiling(opacity - speed, 0, 1)
            setOpacity(newOpacity)
        }else {
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

    useEffect(() => {
        tick()
    },[deltaY]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setInterval(tick, 1000)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className='scroll-body' style={{ width: '100vw', height: '100vh' }} onWheel={handleScroll}>
            <div className='scroll-page' ref={pageRef}>{pageState}</div>
        </div>
    )
}

export default ScrollPage