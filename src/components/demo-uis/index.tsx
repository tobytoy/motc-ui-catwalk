import React from 'react';
import { TDXClassicPortalUI } from './TDXClassicPortalUI';
import { TDXModernTableUI } from './TDXModernTableUI';
import { TDXMasterDetailUI } from './TDXMasterDetailUI';
import { TDXBentoMatrixUI } from './TDXBentoMatrixUI';
import { TDXDeveloperSandboxUI } from './TDXDeveloperSandboxUI';
import { TDXCommandRadarUI } from './TDXCommandRadarUI';
import { TDXCommandPaletteUI } from './TDXCommandPaletteUI';
import { TDXScenarioJourneyUI } from './TDXScenarioJourneyUI';
import { TDXCatalogExplorerUI } from './TDXCatalogExplorerUI';
import { ShowcaseItem } from '../../types';
import { Image as ImageIcon } from 'lucide-react';

export const UI_COMPONENTS_MAP: Record<string, React.FC> = {
  // 8 Total TDX Data Presentation Paradigms
  TDXClassicPortalUI,
  TDXModernTableUI,
  TDXMasterDetailUI,
  TDXBentoMatrixUI,
  TDXDeveloperSandboxUI,
  TDXCommandRadarUI,
  TDXCommandPaletteUI,
  TDXScenarioJourneyUI,
  TDXCatalogExplorerUI,
};

interface DynamicUIRendererProps {
  item: ShowcaseItem;
}

export const DynamicUIRenderer: React.FC<DynamicUIRendererProps> = ({ item }) => {
  // If there's an image URL for custom uploaded screenshots
  if (item.imageUrl) {
    return (
      <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden group">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm">{item.title}</h4>
            <p className="text-xs text-slate-400">{item.subtitle}</p>
          </div>
          <span className="text-xs font-mono px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">客製圖片展示</span>
        </div>
      </div>
    );
  }

  // If matching component exists in map
  if (item.componentName && UI_COMPONENTS_MAP[item.componentName]) {
    const Component = UI_COMPONENTS_MAP[item.componentName];
    return <Component />;
  }

  // Fallback view
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-950 text-slate-300">
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 mb-4">
        <ImageIcon className="w-12 h-12" />
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
      <p className="text-sm text-slate-400 max-w-md">{item.description}</p>
    </div>
  );
};
