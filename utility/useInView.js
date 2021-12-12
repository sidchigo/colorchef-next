import { useEffect } from "react";

let listener = new WeakMap();
let observer;

function handleIntersections(entries) {
    entries.forEach(entry => {
        if (listener.has(entry.target)) {
            let cb = listener.get(entry.target);

            if (entry.isIntersecting || entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);
                listener.delete(entry.target);
                cb();
            }
        }
    });
}

function getIntersectionObserver() {
    if (observer === undefined) {
        observer = new IntersectionObserver(handleIntersections, {
            rootMargin: '0px',
            threshold: '1'
        });
    }
    return observer;
}

export function useInView(element, callback) {
    useEffect(() => {
        let target = element.current;
        let observer = getIntersectionObserver();
        listener.set(target, callback);
        observer.observe(target);

        return () => {
            listener.delete(target);
            observer.unobserve(target);
        }
    })
}