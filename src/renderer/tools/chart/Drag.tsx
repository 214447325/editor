import React, {useRef} from "react";

const Drag = (props) => {
    let isMoving = false;
    let position = [0, 0];
    const movingDiv = useRef();
    console.log('--------------------------------');
    console.log(props.id)
    const styles = {
        // border: `1px red solid`,
        width: `200px`,
        height: `200px`,
        position: `absolute`,
        top: `0px`,
        left: `0px`
    };

    const onMouseDown = (event) => {
        isMoving = true;
        position = [event.clientX, event.clientY];
    };

    const onMouseUp = () => {
        isMoving = false;
    };

    const onMouseMove = (event) => {
        if (!isMoving) return;
        const div = movingDiv.current;
        const deltaX = event.clientX - position[0];
        const deltaY = event.clientY - position[1];
        // @ts-ignore
        const top = parseInt(div.style.top, 0) || 0;
        // @ts-ignore
        const left = parseInt(div.style.left, 0) || 0;
        // @ts-ignore
        div.style.top = top + deltaY + "px";
        // @ts-ignore
        div.style.left = left + deltaX + "px";
        position = [event.clientX, event.clientY];

        setData(div)
    };


    const setData = (div) => {
        console.log('--------------------------------------------------');
        // @ts-ignore
        console.log(div.style.cssText)

        // @ts-ignore
        let charts: any = sessionStorage.getItem('charts') ? JSON.parse(sessionStorage.getItem('charts')) : [];
        const id = `cid${props.id}`
        let _json_ = {
            option: props.option,
            style: div.style ? div.style.cssText : '',
            id: id
        }

        let k = true;
        for (let i in charts) {
            if (charts[i].id == id) {
                charts[i] = _json_;
                k = false;
            }
        }
        if (k) {
            charts.push(_json_)
        }

        sessionStorage.setItem('charts', JSON.stringify(charts))

    }


    const styless = {
        // border: `1px red solid`,
        width: `200px`,
        height: `200px`,
        // position: `absolute`,
        // top: `0px`,
        // left: `0px`
    };

    return (

        <div
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onClick={props.onClick}
            // @ts-ignore
            ref={movingDiv}
            style={{...styles, ...props.style}} //样式可自定义并覆盖
        >

            <div
                // @ts-ignore
                style={styless}
                id={
                    // @ts-ignore
                    'cid' + props.id}></div>
        </div>
    );
};

export default Drag
