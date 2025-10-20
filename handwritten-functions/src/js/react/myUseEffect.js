// mount时不触发的useEffect
function myUseEffect(effect,deps) {
    const isMounted = useRef(false);
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
        } else {
            return effect();
        }
    }, deps);

}