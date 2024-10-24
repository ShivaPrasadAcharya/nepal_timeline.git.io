import React, { useState } from 'react';
import { Globe2, Info, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// TimelineData array remains the same...
const timelineData = [/* your existing timeline data */];

const CategoryIcon = ({ category }) => {
  const iconClass = "w-6 h-6";
  const getColor = () => {
    switch (category) {
      case 'complaint': return 'text-red-500';
      case 'administration': return 'text-blue-500';
      case 'monitoring': return 'text-purple-500';
      case 'governance': return 'text-green-500';
      case 'service': return 'text-orange-500';
      case 'digital': return 'text-cyan-500';
      default: return 'text-gray-500';
    }
  };
  
  return (
    <div className={`${getColor()} p-2 rounded-full bg-opacity-10 bg-current`}>
      <Info className={iconClass} />
    </div>
  );
};

const HoverCard = ({ description, title, onMouseEnter, onMouseLeave }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="absolute left-full top-0 ml-4 md:w-80 w-64 z-20"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-sm text-gray-600">
            {isFlipped ? 'नेपाली' : 'English'}
          </h4>
          <button 
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Switch language"
          >
            <Languages className="w-5 h-5 text-blue-600" />
          </button>
        </div>
        <div className="relative min-h-[80px]">
          <div className={`absolute w-full transition-opacity duration-300 ${
            isFlipped ? 'opacity-0' : 'opacity-100'
          }`}>
            <p className="text-gray-700">{description.en}</p>
          </div>
          <div className={`absolute w-full transition-opacity duration-300 ${
            isFlipped ? 'opacity-100' : 'opacity-0'
          }`}>
            <p className="text-gray-700">{description.ne}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineEntry = ({ data, isActive, onClick, index }) => {
  const [showHover, setShowHover] = useState(false);

  return (
    <div className="relative group">
      <div className="flex items-start gap-4 relative">
        {/* Timeline connector */}
        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200" />
        
        {/* Year bubble */}
        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
          isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {index + 1}
        </div>

        {/* Content */}
        <div className="flex-1 pb-8 relative">
          <div 
            className={`cursor-pointer transition-all duration-300 ${
              isActive 
                ? 'bg-blue-50 border-blue-500 shadow-md' 
                : 'bg-white hover:bg-gray-50 border-gray-200'
            } border rounded-lg p-4 flex items-center gap-4`}
            onClick={onClick}
            onMouseEnter={() => setShowHover(true)}
          >
            <CategoryIcon category={data.category} />
            <div>
              <div className="font-bold text-lg mb-1">{data.year}</div>
              <div className={`text-sm ${isActive ? 'text-blue-800' : 'text-gray-600'}`}>
                {data.title.en}
              </div>
            </div>
          </div>

          {/* Mobile view: Description expands below */}
          <div className={`md:hidden mt-2 transition-all duration-300 ${isActive ? 'block' : 'hidden'}`}>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="mb-2 font-medium text-gray-700">{data.description.en}</div>
              <div className="text-gray-600">{data.description.ne}</div>
            </div>
          </div>

          {/* Desktop view: Hover card */}
          {showHover && (
            <div className="hidden md:block">
              <HoverCard 
                description={data.description} 
                title={data.title}
                onMouseEnter={() => setShowHover(true)}
                onMouseLeave={() => setShowHover(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ne' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {language === 'en' ? 
                'Public Service Reforms in Nepal' : 
                'नेपालमा सार्वजनिक सेवा सुधार'
              }
            </h2>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
            >
              <Globe2 className="w-5 h-5 text-blue-600" />
              <span className="font-medium">
                {language === 'en' ? 'नेपाली' : 'English'}
              </span>
            </button>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            {timelineData.map((entry, index) => (
              <TimelineEntry
                key={entry.year}
                data={entry}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                index={index}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
