'use client';

import { useSettings } from '../contexts/SettingsContext';

export default function SettingsTest() {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="p-6 bg-primary text-primary">
      <h1>Settings Test</h1>
      <p>Current theme: {settings.theme}</p>
      
      <div className="space-y-2 mt-4">
        <button 
          onClick={() => updateSetting('theme', 'light')}
          className="px-4 py-2 bg-secondary text-secondary mr-2 rounded"
        >
          Light Theme
        </button>
        <button 
          onClick={() => updateSetting('theme', 'dark')}
          className="px-4 py-2 bg-secondary text-secondary mr-2 rounded"
        >
          Dark Theme
        </button>
        <button 
          onClick={() => updateSetting('theme', 'glassy')}
          className="px-4 py-2 bg-secondary text-secondary mr-2 rounded"
        >
          Glassy Theme
        </button>
      </div>
      
      <div className="mt-4 p-4 bg-secondary">
        <p className="text-secondary">This should change color with themes</p>
      </div>
    </div>
  );
}
