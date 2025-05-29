import { useState } from "react";
import { useTheme } from "@/constants/theme/ThemeContext";

export function useSettings() {
  const { theme, toggleTheme } = useTheme();
  const [twoFA, setTwoFA] = useState(true);
  const [mobilePush, setMobilePush] = useState(true);
  const [desktopNotif, setDesktopNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== theme) {
      toggleTheme();
    }
  };

  return {
    theme,
    twoFA,
    mobilePush,
    desktopNotif,
    emailNotif,
    setTwoFA,
    setMobilePush,
    setDesktopNotif,
    setEmailNotif,
    handleThemeChange,
  };
}
