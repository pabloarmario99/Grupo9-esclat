import type { Ref } from "vue"

type Updater<T> = T | ((previous: T) => T)

function isFunction<T>(value: Updater<T>): value is (previous: T) => T {
  return typeof value === "function"
}

export function valueUpdater<T>(updaterOrValue: Updater<T>, ref: Ref<T>) {
  ref.value = isFunction(updaterOrValue)
    ? updaterOrValue(ref.value)
    : updaterOrValue
}
