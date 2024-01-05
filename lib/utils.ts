import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function humanDuration(seconds: number) {
    // convert length in 00:00:00 format
    const date = new Date(0);
    date.setSeconds(seconds);
    if (date.getHours()) {
        return date.toISOString().substring(11, 19);
    }
    return date.toISOString().substring(14, 19);
}

export function naturalTime(time: string) {
    const now = new Date().getTime();
    const date = new Date(time).getTime();
    const diff = now - date;
    const sec = diff / 1000;
    if (sec < 60) {
        return `${Math.round(sec)} second${Math.round(sec) > 1 ? "s" : ""} ago`;
    }
    const min = sec / 60;
    if (min < 60) {
        return `${Math.round(min)} minute${Math.round(min) > 1 ? "s" : ""} ago`;
    }
    const hour = min / 60;
    if (hour < 24) {
        return `${Math.round(hour)} hour${Math.round(hour) > 1 ? "s" : ""} ago`;
    }
    const day = hour / 24;
    if (day < 30) {
        return `${Math.round(day)} day${Math.round(day) > 1 ? "s" : ""} ago`;
    }
    const month = day / 30;
    if (month < 12) {
        return `${Math.round(month)} month${
            Math.round(month) > 1 ? "s" : ""
        } ago`;
    }
    const year = month / 12;
    return `${Math.round(year)} year${Math.round(year) > 1 ? "s" : ""} ago`;
}

export function humanSize(bytes: number) {
    // convert size in 00.00 format
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    if (!bytes) return "0 B";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

export function stringToColor(str: string) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = "#";
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xff;
        colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
}
