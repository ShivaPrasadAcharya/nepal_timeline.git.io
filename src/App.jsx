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
      {
        year: "Rana Period | राणा काल",
        title: {
          en: "Introduction of Public Complaint Boxes",
          ne: "सार्वजनिक उजुरी पेटिकाको सुरुवात"
        },
        description: {
          en: "Dev Shamsher introduced complaint boxes in public places to hear public grievances directly.",
          ne: "देव शम्शेरले सार्वजनिक स्थलहरूमा उजुरी पेटिका राखी जनगुनासा आफैले सुनुवाइ गर्न थालेका थिए।"
        },
        category: "complaint"
      },
      {
        year: "1957 | २०१४",
        title: {
          en: "Work Efficiency Committee",
          ne: "कार्य शीघ्र कारक समिति"
        },
        description: {
          en: "King Mahendra established 'Quick Action Committee Act 2014' under Major General Yog Bikram Rana.",
          ne: "राजा महेन्द्रले 'कार्य शीघ्र कारक समिति ऐन, २०१४' जारी गरी मेजर जनरल योग विक्रम राणाको अध्यक्षतामा एक समिति गठन।"
        },
        category: "administration"
      }
    ]
  },
  education: {
    id: 'education',
    title: {
      en: 'Education Reforms in Nepal',
      ne: 'नेपालमा शिक्षा सुधार'
    },
    data: [
      {
        year: "1951 | २००८",
        title: {
          en: "Nepal National Educational Planning Commission",
          ne: "नेपाल राष्ट्रिय शिक्षा योजना आयोग"
        },
        description: {
          en: "First systematic planning for education in Nepal under the chairmanship of Rudra Raj Pande",
          ne: "रुद्र राज पाण्डेको अध्यक्षतामा नेपालमा शिक्षाको पहिलो व्यवस्थित योजना"
        },
        category: "planning"
      },
      {
        year: "1971 | २०२८",
        title: {
          en: "New Education System Plan",
          ne: "नयाँ शिक्षा प्रणाली योजना"
        },
        description: {
          en: "Implementation of comprehensive education reform plan focusing on vocational education",
          ne: "व्यावसायिक शिक्षामा जोड दिने नयाँ शिक्षा प्रणाली योजना लागू"
        },
        category: "governance"
      }
    ]
  }
};

const CategoryIcon = ({ category }) => {
  const iconClass = "w-5 h-5"; // Reduced icon size
  const getColor = () => {
    switch (category) {
      case 'complaint': return 'text-red-500';
      case 'administration': return 'text-blue-500';
      case 'monitoring': return 'text-purple-500';
      case 'governance': return 'text-green-500';
      case 'service': return 'text-orange-500';
      case 'digital': return 'text-cyan-500';
      case 'planning': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };
  
  return (
    <div className={`${getColor()} p-1.5 rounded-full bg-opacity-10 bg-current`}>
      <Info className={iconClass} />
    </div>
  );
};

const HoverCard = ({ description, title, containerRef, isHovered }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  if (!isHovered) return null;
  
  return (
    <div 
      className="ml-2 mt-2"
      ref={containerRef}
    >
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-sm text-gray-600">
            {isFlipped ? 'नेपाली' : 'English'}
          </h4>
          <button 
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Switch language"
          >
            <Languages className="w-4 h-4 text-blue-600" />
          </button>
        </div>
        <div className="relative min-h-[60px]">
          <div className={`transition-opacity duration-300 ${
            isFlipped ? 'opacity-0' : 'opacity-100'
          }`}>
            <p className="text-sm text-gray-700">{description.en}</p>
          </div>
          <div className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${
            isFlipped ? 'opacity-100' : 'opacity-0'
          }`}>
            <p className="text-sm text-gray-700">{description.ne}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineEntry = ({ data, isActive, onClick, index, language }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverContainerRef = React.useRef(null);
  const timelineEntryRef = React.useRef(null);

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = (e) => {
    const timelineRect = timelineEntryRef.current?.getBoundingClientRect();
    const hoverRect = hoverContainerRef.current?.getBoundingClientRect();
    
    if (timelineRect && hoverRect) {
      const isMovingToHoverCard = 
        e.clientX >= hoverRect.left && 
        e.clientX <= hoverRect.right && 
        e.clientY >= Math.min(timelineRect.top, hoverRect.top) && 
        e.clientY <= Math.max(timelineRect.bottom, hoverRect.bottom);
      
      if (!isMovingToHoverCard) {
        setIsHovered(false);
      }
    }
  };

  return (
    <div className="relative group" ref={timelineEntryRef}>
      <div className="flex items-start gap-3">
        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200" />
        
        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
          isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
        } text-sm`}>
          {index + 1}
        </div>

        <div className="flex-1 pb-6">
          <div className="flex flex-col md:flex-row gap-2">
            <div 
              className={`cursor-pointer transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-50 border-blue-500 shadow-sm' 
                  : 'bg-white hover:bg-gray-50 border-gray-200'
              } border rounded-lg p-3 flex items-center gap-3 md:w-64`}
              onClick={onClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <CategoryIcon category={data.category} />
              <div>
                <div className="font-medium text-base">{data.year}</div>
                <div className={`text-sm ${isActive ? 'text-blue-800' : 'text-gray-600'}`}>
                  {language === 'en' ? data.title.en : data.title.ne}
                </div>
              </div>
            </div>

            <div 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <HoverCard 
                description={data.description} 
                title={data.title}
                containerRef={hoverContainerRef}
                isHovered={isHovered}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

function App() {
  const [language, setLanguage] = useState('en');
  const [activeTimeline, setActiveTimeline] = useState(Object.keys(timelineGroups)[0]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ne' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6 px-3">
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

          <div className="flex gap-2 flex-wrap justify-center">
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
