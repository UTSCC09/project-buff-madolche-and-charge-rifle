// the code is derived from "Theme Builder" blog by Tapas Adhikary
// https://css-tricks.com/theming-and-theme-switching-with-react-and-styled-components/

export const setToLS = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export const getFromLS = key => {
    const value = window.localStorage.getItem(key);

    if (value) {
        return JSON.parse(value);
    }
}