import { useEffect, useState } from "react";

function SizeTracker() {
    const [width, setWidth] = useState(window.innerWidth);

    const handleResizeWindow = (evt) => {
        setWidth(evt.target.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResizeWindow);
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        }
    }, []);
    return width;
};

export default SizeTracker;