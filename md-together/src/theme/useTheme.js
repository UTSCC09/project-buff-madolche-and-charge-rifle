// the code and schema.json in this folder are derived from "Theme Builder" blog by Tapas Adhikary
// https://css-tricks.com/theming-and-theme-switching-with-react-and-styled-components/

import { useEffect, useState } from 'react';
import { setToLS, getFromLS } from '../utils/storage';

export const useTheme = () => {
    const themes = getFromLS('all-themes');
    const [theme, setTheme] = useState(themes.data.light);
    const [themeLoaded, setThemeLoaded] = useState(false);

    const setMode = mode => {
        setToLS('theme', mode)
        setTheme(mode);
    };

    useEffect(() => {
        const localTheme = getFromLS('theme');
        localTheme ? setTheme(localTheme) : setTheme(themes.data.light);
        setThemeLoaded(true);
    }, []);
    
    return { theme, themeLoaded, setMode };
};