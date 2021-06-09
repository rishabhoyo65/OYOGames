import  {useEffect,useRef} from 'react'


export default function useOutSideClick (ref,callBack,when) {
    const savedCallback = useRef(callBack);

    useEffect(() => {
        savedCallback.current = callBack;
    })

    function handler (e) {
        if(ref.current && !ref.current.contains(e.target)) {
            
            savedCallback.current();
            
        }
    }

    useEffect(() => {
        if(when) {
            document.addEventListener("click",handler);
            return () => document.removeEventListener("click",handler);
        }
    },[when])
}