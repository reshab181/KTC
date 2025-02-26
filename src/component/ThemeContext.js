import { createContext } from "react";
import { Appearance } from "react-native";

export const ThemeContext = createContext(Appearance.getColorScheme() || "light");
