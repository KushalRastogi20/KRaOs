'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    autoSave: true,
    defaultFolderPath: '/',
    encryptByDefault: false,
    aiFeatures: true,
    soundEffects: true,
    animations: true,
    neuralPulse: true,
    quantumParticles: true,
    backgroundBlur: true,
    fontSize: 'medium',
    language: 'en'
  });

  const [isLoading, setIsLoading] = useState(true);

  const applyTheme = (theme) => {
    console.log('Applying theme:', theme); // Debug log
    
    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove('light-theme', 'dark-theme', 'glassy-theme');
    
    // Apply the new theme class
    root.classList.add(`${theme}-theme`);
    
    // Force apply CSS variables directly
    if (theme === 'light') {
      root.style.setProperty('--bg-primary', 'rgba(255, 255, 255, 0.9)');
      root.style.setProperty('--bg-secondary', 'rgba(240, 240, 240, 0.8)');
      root.style.setProperty('--text-primary', '#1a1a1a');
      root.style.setProperty('--text-secondary', '#4a4a4a');
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--foreground', '#171717');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#171717';
    } else if (theme === 'dark') {
      root.style.setProperty('--bg-primary', 'rgba(0, 0, 0, 0.6)');
      root.style.setProperty('--bg-secondary', 'rgba(0, 0, 0, 0.4)');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#cccccc');
      root.style.setProperty('--background', '#0a0a0a');
      root.style.setProperty('--foreground', '#ededed');
      document.body.style.backgroundColor = '#0a0a0a';
      document.body.style.color = '#ededed';
    } else if (theme === 'glassy') {
      root.style.setProperty('--bg-primary', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--bg-secondary', 'rgba(255, 255, 255, 0.05)');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#e0e0e0');
      root.style.setProperty('--background', 'rgba(0, 0, 0, 0.8)');
      root.style.setProperty('--foreground', '#ffffff');
      document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      document.body.style.color = '#ffffff';
    }
    
    console.log('Theme applied successfully:', theme);
  };

  // Apply default theme immediately
  useEffect(() => {
    applyTheme('dark');
  }, []);

  // Load settings from localStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = localStorage.getItem('auraos-settings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          console.log('Loaded settings:', parsedSettings);
          setSettings(parsedSettings);
          applyTheme(parsedSettings.theme);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings and apply theme when settings change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('auraos-settings', JSON.stringify(settings));
        applyTheme(settings.theme);
        console.log('Settings saved and theme applied:', settings);
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    }
  }, [settings, isLoading]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'auraos-settings' && e.newValue) {
        try {
          const newSettings = JSON.parse(e.newValue);
          setSettings(newSettings);
          applyTheme(newSettings.theme);
        } catch (error) {
          console.error('Error parsing settings from storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateSetting = (key, value) => {
    console.log(`Updating setting: ${key} = ${value}`);
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateSettings = (newSettings) => {
    console.log('Updating multiple settings:', newSettings);
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const resetSettings = () => {
    console.log('Resetting settings to default');
    const defaultSettings = {
      theme: 'dark',
      autoSave: true,
      defaultFolderPath: '/',
      encryptByDefault: false,
      aiFeatures: true,
      soundEffects: true,
      animations: true,
      neuralPulse: true,
      quantumParticles: true,
      backgroundBlur: true,
      fontSize: 'medium',
      language: 'en'
    };
    setSettings(defaultSettings);
  };

  const value = {
    settings,
    updateSetting,
    updateSettings,
    resetSettings,
    isLoading
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsContext;
