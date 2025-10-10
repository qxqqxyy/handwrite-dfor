def is_prime(n: int) -> bool:
    """判断质数：6k±1 优化"""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


def gcd(a: int, b: int) -> int:
    """最大公约数：欧几里得算法"""
    while b:
        a, b = b, a % b
    return a


def deep_clone(obj, memo=None):
    """深拷贝（支持循环引用），不依赖 copy.deepcopy"""
    if memo is None:
        memo = {}

    obj_id = id(obj)
    if obj_id in memo:
        return memo[obj_id]

    # 原子类型直接返回
    if isinstance(obj, (int, float, str, bool, type(None))):
        return obj

    if isinstance(obj, list):
        clone = [deep_clone(x, memo) for x in obj]
        memo[obj_id] = clone
        return clone

    if isinstance(obj, tuple):
        clone = tuple(deep_clone(x, memo) for x in obj)
        memo[obj_id] = clone
        return clone

    if isinstance(obj, set):
        clone = set(deep_clone(x, memo) for x in obj)
        memo[obj_id] = clone
        return clone

    if isinstance(obj, dict):
        clone = {deep_clone(k, memo): deep_clone(v, memo) for k, v in obj.items()}
        memo[obj_id] = clone
        return clone

    # 通用对象：按 __dict__ 拷贝
    clone = obj.__class__.__new__(obj.__class__)
    memo[obj_id] = clone
    for k, v in getattr(obj, "__dict__", {}).items():
        setattr(clone, k, deep_clone(v, memo))
    return clone