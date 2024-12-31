import React, { useState } from 'react';
import { Globe2, Info, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Data structure for multiple timelines
const timelineGroups = {
  publicService: {
    id: 'publicService',
    title: {
      en: 'Public Service Reforms in Nepal',
      ne: 'नेपालमा सार्वजनिक सेवा सुधार'
    },
    data: [
      // Original timeline data here...
    ]
  },
  education: {
    id: 'education',
    title: {
      en: 'Education Reforms in Nepal',
      ne: 'नेपालमा शिक्षा सुधार'
    },
    data: [
      // Add education timeline data...
    ]
  }
  // Add more timeline groups as needed
};

// Existing CategoryIcon component remains the same
const CategoryIcon = ({ category }) => {
  // ... (previous code)
};

// Existing HoverCard component remains the same
const HoverCard = ({ description, title, containerRef, isHovered }) => {
  // ... (previous code)
};

// Existing TimelineEntry component remains the same
const TimelineEntry = ({ data, isActive, onClick, index, language }) => {
  // ... (previous code)
};

// New Timeline component to handle individual timelines
const Timeline = ({ timelineData, title, language, isActive }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!isActive) return null;

  return (
    <Card className="w-full max-w-3xl mx-auto mb-8">
      <CardContent className="p-4">
        <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
          {language === 'en' ? title.en : title.ne}
        </h2>
        
        <div className="relative max-w-3xl mx-auto">
          {timelineData.map((entry, index) => (
            <TimelineEntry
              key={entry.year}
              data={entry}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              index={index}
              language={language}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Modified App component to handle multiple timelines
function App() {
  const [language, setLanguage] = useState('en');
  const [activeTimeline, setActiveTimeline] = useState(Object.keys(timelineGroups)[0]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ne' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6 px-3">
      {/* Language and Timeline Selection Header */}
      <div className="w-full max-w-3xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
          >
            <Globe2 className="w-5 h-5 text-blue-600" />
            <span className="font-medium">
              {language === 'en' ? 'नेपाली' : 'English'}
            </span>
          </button>

          {/* Timeline Selection Buttons */}
          <div className="flex gap-2">
            {Object.values(timelineGroups).map((timeline) => (
              <button
                key={timeline.id}
                onClick={() => setActiveTimeline(timeline.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTimeline === timeline.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                } border border-blue-200`}
              >
                {language === 'en' ? timeline.title.en : timeline.title.ne}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      {Object.values(timelineGroups).map((timeline) => (
        <Timeline
          key={timeline.id}
          timelineData={timeline.data}
          title={timeline.title}
          language={language}
          isActive={activeTimeline === timeline.id}
        />
      ))}
    </div>
  );
}

export default App;
