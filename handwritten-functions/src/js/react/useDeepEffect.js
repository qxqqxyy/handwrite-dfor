function useDeepCompareEffect(effect, deps) {

    const prevDepsRef = useRef();

    // 1. 先判断是否需要更新（深比较新旧依赖）
    if (!isEqual(prevDepsRef.current, deps)) {
        prevDepsRef.current = deps; // 更新缓存
    }

    // 2. 用缓存的依赖项作为 useEffect 的依赖（浅比较）
    // 只有当深比较发现变化时，prevDepsRef.current 才会更新，从而触发 effect
    useEffect(effect, [prevDepsRef.current]);
}

export default useDeepCompareEffect;